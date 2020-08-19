import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private userSource$ = new BehaviorSubject<UserResponse | null>(JSON.parse(localStorage.getItem('user')));
  private userFbSource$ = new BehaviorSubject<firebase.User | null>(JSON.parse(localStorage.getItem('userFb')));
  private userReady$ = new BehaviorSubject<boolean>(false);

  getUser$ = this.userSource$.asObservable();
  getUserFb = this.userFbSource$.asObservable();
  getUserReady = this.userReady$.asObservable();

  constructor() {
  }

  setUser(user: UserResponse) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSource$.next(user);
  }

  setFbUser(user: firebase.User) {
    localStorage.setItem('userFb', JSON.stringify(user));
    this.userFbSource$.next(user);
  }

  setUserReady(ready: boolean) {
    localStorage.setItem('userReady', JSON.stringify(ready));
    this.userReady$.next(ready);
  }

}
