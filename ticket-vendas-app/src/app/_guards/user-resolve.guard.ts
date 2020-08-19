import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolveGuard implements Resolve<boolean> {

  resolve(route: ActivatedRouteSnapshot): boolean {
    if (route.params && JSON.parse(route.params['terms'])) {
      return route.params['terms'];
    }

    return false;
  }

}
