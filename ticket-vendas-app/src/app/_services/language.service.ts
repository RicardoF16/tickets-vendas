import { Injectable } from '@angular/core';
import { Language } from '../_models/language';
import { BehaviorSubject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languages: Array<Language> = new Array<Language>();
  private userLanguage$ = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('language')));

  getUserLanguage$ = this.userLanguage$.asObservable();
  private userLang: string;

  constructor(private translate: TranslateService, private platform: Platform, private globalization: Globalization) {
    this.onChangeLanguage();

    this.languages.push(
      { name: 'English', code: 'en-us' },
      { name: 'Español', code: 'es-us' },
      { name: 'Português', code: 'pt-br' }
    );

    this.getUserLanguage$.subscribe(lang => {
      this.userLang = lang;
    });

    
    this.platform.ready().then(() => {
      // if (!this.userLang) {
      this.globalization.getPreferredLanguage()
        .then(res => {
          // alert('glob ' + String(res.value.toLocaleLowerCase()));
          this.setDefaultLanguage(res.value.toLocaleLowerCase());
        })
        .catch(e => {
          // alert(JSON.stringify(e));
          this.setDefaultLanguage(null);
        });
      // } else {
      //   this.setDefaultLanguage(this.userLang);
      // }
    });
  }

  getLanguages() {
    return this.languages;
  }

  private onChangeLanguage() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event);
      this.translate.setDefaultLang(event.lang);
      this.translate.use(event.lang);
    });
  }

  setDefaultLanguage(language: string) {
    console.log(language);
    //alert(String(language));
    
    if (!(!!this.languages.find(lang => lang.code === language))) {
      
      language = 'pt-br';
    }
    localStorage.setItem('language', JSON.stringify(language));
    this.userLanguage$.next(language);
  }
}
