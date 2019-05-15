import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import{} from './pages/comprar-creditos/comprar-creditos.page'
import{} from './login/login.page'



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Login',
      url: 'login',
      icon: 'login'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Comprar Creditos',
      url: '/comprar-creditos',
      icon: ''
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('Teste git');

      // this.appPages.push(
      //   {
      //     title: 'Login',
      //     url: '/login',
      //     icon: ''
      //   }
      // );


    });
  }
}
