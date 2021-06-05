import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiasEventoResponse, EventoResponse } from '../_models/eventoModel';
import { IngressoModel } from '../_models/IngressoModel';
import { DestaqueResponse } from '../_models/destaqueModel';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly endpoint = `${environment.urlService}evento`;
  constructor(private http: HttpClient) { }

  /*postUserSocial(user: User): Observable<UserResponse> {
    if (!user.imagemURL) {
      user.imagemURL = '';
    }
    return this.http.post<UserResponse>(`${this.endpoint}/social`, user).pipe(take(1));
  }*/


  getEventos(): Observable<Array<EventoResponse>> {
    return this.http.get<Array<EventoResponse>>(`${this.endpoint}`).pipe(take(1));
  }

  getDestaques(): Observable<Array<DestaqueResponse>> {
    return this.http.get<Array<DestaqueResponse>>(`${this.endpoint}/destaques`).pipe(take(1));
  }

  getEventoById(id: string): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.endpoint}/${id}`,).pipe(take(1));
  }

  getDatas(id: string): Observable<Array<DiasEventoResponse>> {
    return this.http.get<Array<DiasEventoResponse>>(`${this.endpoint}/${id}/datas`,).pipe(take(1));
  }

  getLotes(idEvento: string, idDiaEvento): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.endpoint}/${idEvento}/${idDiaEvento}/lotes`,).pipe(take(1));
  }

}
