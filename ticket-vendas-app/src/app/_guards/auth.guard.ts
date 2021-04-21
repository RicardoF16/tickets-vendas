import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GenericAlertService } from '../_services/generic-alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (
        public navCtrl: NavController,
        public gAlert: GenericAlertService
        ) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        let user = localStorage.getItem('user');
        if (user)
            user = JSON.parse(user);

        if (user) {
            return true;
        } else {
            localStorage.clear();
            this.navCtrl.navigateRoot(['login']);
            this.gAlert.presentToastInfo('Para executar essa ação, é necessário que faça o login.');
            return false;
        }
    }

}
