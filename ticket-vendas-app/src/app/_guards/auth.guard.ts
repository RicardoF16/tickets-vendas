import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (public navCtrl: NavController) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = localStorage.getItem('userData');
        if (user)
            user = JSON.parse(user);

        if (user) {
            return true;
        } else {
            this.navCtrl.navigateRoot(['login']);
            return false;
        }
    }

}
