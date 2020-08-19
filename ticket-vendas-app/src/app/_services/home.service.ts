import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventosResponse } from '../_models/home';
import { TypeItem } from '../_models/enums';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly endpoint = `${environment.urlService}eventos`;
  constructor(private http: HttpClient) { }

  

  /*postUserSocial(user: User): Observable<UserResponse> {
    if (!user.imagemURL) {
      user.imagemURL = '';
    }
    return this.http.post<UserResponse>(`${this.endpoint}/social`, user).pipe(take(1));
  }*/
 

  getEventos(): Observable<EventosResponse> {
    return this.http.get<EventosResponse>(`${this.endpoint}`).pipe(take(1));
  }

}
