import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventoResponse } from '../_models/eventoModel';
import { TypeItem } from '../_models/enums';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly endpoint = `${environment.urlService}eventos`;
  constructor(private http: HttpClient) { }  

  /*postUserSocial(user: User): Observable<UserResponse> {
    if (!user.imagemURL) {
      user.imagemURL = '';
    }
    return this.http.post<UserResponse>(`${this.endpoint}/social`, user).pipe(take(1));
  }*/
 

  getEventos(): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.endpoint}`).pipe(take(1));
  }

  getEventoById(id: string): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.endpoint}/${id}`, ).pipe(take(1));
  }

}
