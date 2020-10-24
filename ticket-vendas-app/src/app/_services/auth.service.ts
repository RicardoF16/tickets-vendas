import { Injectable, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserStateService } from './user-state.service';
import { auth } from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { AppStateService } from './app-state.service';
import { User, UserGoogle } from '../_models/user';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private af: AngularFireAuth,
    private userState: UserStateService,
    private appState: AppStateService,
    private userService: UsersService,
    private facebook: Facebook,
    private platform: Platform,
    private googleSignin: GooglePlus,
    private router: Router
  ) {

    // this.af.authState.subscribe(userFb => {
    //   this.userState.setFbUser(userFb);
    
    //   if (userFb) {
    //     userFb.getIdToken(true).then(token => {
    //       this.appState.setToken(token);
    //       this.userState.setUserReady(true);
    //     });
    //   }
    // });

    this.userState.getUserFb.subscribe(user => {
      if (user && user['ra']) {
        console.log(user['ra']);
        this.appState.setToken(user['ra']);
      }
    });
  }

  login(email: string, passowrd: string): Promise<firebase.auth.UserCredential> {    
    return this.af.auth.signInWithEmailAndPassword(email, passowrd);
  }

  doGoogleLogin() {
    return new Promise((resolve, reject) => {
      
      let options = {
        // tslint:disable-next-line:max-line-length
        // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        
        //PROD
        //'webClientId': '742674802842-fq48qibk4ie5hjhrsgk1ko5cvbvgvaoo.apps.googleusercontent.com', 
        
        //DEV
        'webClientId': '583783993277-v6iu1ubijs774422n53icp7ucmm6k5i6.apps.googleusercontent.com', 
        // tslint:disable-next-line:max-line-length
        // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        'offline': true
      };
      if (this.platform.is('android')) {
        options = {
          // tslint:disable-next-line:max-line-length
          // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          //'webClientId': '583783993277-qla5tofs67a7e8d2491ojan8fli9c735.apps.googleusercontent.com',
          //'webClientId': '583783993277-v6iu1ubijs774422n53icp7ucmm6k5i6.apps.googleusercontent.com',
          'webClientId': '583783993277-v6iu1ubijs774422n53icp7ucmm6k5i6.apps.googleusercontent.com', 
          // tslint:disable-next-line:max-line-length
          // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
          'offline': true
        };
      }
      
      this.googleSignin.login(options).then((userGoogle: UserGoogle) => {
        
        alert('Entrou no login google!!!');
        alert('Token >> ' + userGoogle.idToken);
        const googleCredential = auth.GoogleAuthProvider.credential(userGoogle.idToken);
        alert('const googleCredential >> ' + userGoogle.idToken);

        this.af.auth.signInAndRetrieveDataWithCredential(googleCredential)
          .then(resp => {

            alert('googleCredential >> ' + googleCredential);

            this.appState.setToken(resp.user['ra']);
            if (!resp.additionalUserInfo.isNewUser) {
              this.userService
                .getUserInfo(resp.user.uid)
                .toPromise()
                .then(data => {
                  this.userState.setUser(data);
                  resolve(data);
                }, err => {
                  if (err.error === 'user not found') {
                    const user: User = {
                      id: resp.user.uid,
                      email: resp.user.email,
                      imagemURL: resp.user.photoURL,
                      nome: resp.user.displayName,
                      
                    };
                    this.userService
                      .postUserSocial(user)
                      .toPromise()
                      .then(data => {
                        this.userState.setUser(data);
                        resolve(data);
                      })
                      .catch(err1 => {
                        console.log(err1);
                        reject(err1);
                      });
                  } else {
                    console.log(err);
                    reject(err);
                  }
                });
            } else {
              const user: User = {
                id: resp.user.uid,
                email: resp.user.email,
                imagemURL: resp.user.photoURL,
                nome: resp.user.displayName ? resp.user.displayName : ((resp.user.email).split('@'))[0]
              };
              this.userService
                .postUserSocial(user)
                .toPromise()
                .then(data => {
                  // console.log(data);
                  this.userState.setUser(data);
                  resolve(data);
                })
                .catch(err1 => {
                  alert(err1);
                  console.log(err1);
                  reject(err1);
                });
            }
          }, e => {
            console.log(e);
            alert('1 >> ' + e);
          });
      }, err => {
        console.log(err);
        alert('2 >> ' + err);
        reject();
      }).catch(err => {
        alert('3 >> ' + err);
        reject();
        console.log(err);
      });
    });

  }

  
  facebookLogin(): Promise<any> {    
    return new Promise<any>((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.facebook
          .login(['email', 'public_profile'])
          .then(res => {
            const facebookCredential = auth.FacebookAuthProvider
              .credential(res.authResponse.accessToken);

            this.af.auth.signInAndRetrieveDataWithCredential(facebookCredential)
              .then(resp => {

                this.appState.setToken(resp.user['ra']);

                if (!resp.additionalUserInfo.isNewUser) {
                  this.userService
                    .getUserInfo(resp.user.uid)
                    .toPromise()
                    .then(data => {
                      // console.log(data);
                      this.userState.setUser(data);
                      resolve(data);
                    }, err => {
                      console.log(err);
                      reject(err);
                    });
                } else {
                  const user: User = {
                    id: resp.user.uid,
                    email: resp.user.email,
                    imagemURL: resp.user.photoURL,
                    nome: resp.user.displayName
                  };
                  this.userService
                    .postUserSocial(user)
                    .toPromise()
                    .then(data => {
                      console.log(data);
                      this.userState.setUser(data);
                      resolve(data);
                    })
                    .catch(err1 => {
                      console.log(err1);
                      reject(err1);
                    });
                }
              }, err => {
                console.log(err);
                reject(err);
              });
          }, err => {
            console.log(err);
            reject(err);
          })
          .catch(e => {
            reject(e);
          });
      }
    });
  }

  logoff(): Promise<void> {
    this.userState.setFbUser(null);
    this.userState.setUser(null);
    this.router.navigate(['/login']);
    return this.af.auth.signOut();
  }

  forgotPassword(email: string): Promise<void> {
    return this.af.auth.sendPasswordResetEmail(email);
  }

}
