import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import{} from './pages/comprar-creditos/comprar-creditos.page'
import{} from './login/login.page'
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './_services/language.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Eventos',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Meus Tickets',
      url: '/meus-tickets',
      icon: 'home'
    },
    {
      title: 'Sair',
      url: '/login',
      icon: 'login'
    }
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private languageService: LanguageService,
    private menuController: MenuController
  ) {
    this.initializeApp();
    this.languageService.getUserLanguage$
      .subscribe(lang => {
        lang = lang ? lang : 'pt-br';
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
      // this.appPages.push(
      //   {
      //     title: 'Login',
      //     url: '/login',
      //     icon: ''
      //   }
      // );

    });
  }

  clickEventHandler(appPage: { title: string, url: string, icon: string }) {
    switch (appPage.icon) {
      case 'log-out':
        this.logoff();
        break;

      default:
        break;
    }
  }

  logoff() {
    this.auth.logoff();
    this.menuController.close();
    this.router.navigateByUrl('/login');
  }

}
