import { Injectable } from '@angular/core';
// import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { UserStateService } from './user-state.service';
import { UsersService } from './users.service';
import { UserResponse } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  private pushToken: string;
  private user: UserResponse;

  constructor(
    private alertController: AlertController,
    private plt: Platform,
    private firebaseNative: FirebaseX,
    private usersService: UsersService,
    private userState: UserStateService) {

    this.plt.ready().then(() => {
      this.onTokenRefresh();
      this.getToken();
      this.listenToNotifications().subscribe(
        data => {
          this.presentAlert(data.body);
        },
        e => {
        }
      );
    });

    this.userState.getUser$
      .subscribe(user => {
        this.user = user;
      });
  }

  private updateTokenPush() {
    if (this.user && (!this.user.idPushNotification || !this.user.idPushNotification.includes(this.pushToken))) {
      console.log('usuário não possui pushToken salvo');
      // console.log(this.user);
      // console.log(this.pushToken);
      if (this.user.idPushNotification) {
        this.user.idPushNotification.push(this.pushToken);
      } else {
        this.user.idPushNotification = new Array(this.pushToken);
      }
      console.log(this.user);
      this.usersService.putUser(this.user)
        .subscribe(userResponse => {
          // userResponse está null
          this.userState.setUser(this.user);
        });
    }
  }

  private async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Pet Car People',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  // private getToken() {
  //   this.FCMPlugin.getToken()
  //     .then(t => {
  //       localStorage.setItem('pushToken', t);
  //       this.pushToken = t;
  //       this.updateTokenPush();
  //     })
  //     .catch(e => {
  //     });
  // }

  private onTokenRefresh() {
    this.firebaseNative.onTokenRefresh()
      .subscribe(token => {
        localStorage.setItem('pushToken', String(token));
        this.pushToken = token;
      });
  }

  // Get permission from the user
  async getToken() {

    if (this.plt.is('android')) {
      this.pushToken = await this.firebaseNative.getToken();
    }

    if (this.plt.is('ios')) {
      this.pushToken = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    this.updateTokenPush();
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onMessageReceived();
  }


}
