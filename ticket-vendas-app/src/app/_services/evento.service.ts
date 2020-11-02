import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiasEventoResponse, EventoResponse } from '../_models/eventoModel';


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

  getDatas(id: string): Observable<Array<DiasEventoResponse>> {
    return this.http.get<Array<DiasEventoResponse>>(`${this.endpoint}/${id}/datas`, ).pipe(take(1));
  }

}
