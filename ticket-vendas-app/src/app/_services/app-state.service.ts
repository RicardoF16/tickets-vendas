import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private param$ = new BehaviorSubject<any | null>(JSON.parse(localStorage.getItem('param')));
  private network$ = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('network')));
  private token$ = new BehaviorSubject<string>(localStorage.getItem('token'));

  getNetwork$ = this.network$.asObservable();
  getParam$ = this.param$.asObservable();
  getToken$ = this.param$.asObservable();

  constructor() {
  }

  setParam(param: any) {
    localStorage.setItem('param', JSON.stringify(param));
    this.param$.next(param);
  }

  setNetwork(status: boolean) {
    localStorage.setItem('network', JSON.stringify(status));
    this.network$.next(status);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token$.next(token);
  }

  get token() {
    return localStorage.getItem('token');
  }

}
