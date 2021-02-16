import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserResponse, User } from '../_models/user';
import { MeusTiketsResponse, MeusTikets, MeusTiketsListResponse } from 'src/app/_models/meusTickets';
import { TypeItem } from '../_models/enums';


@Injectable({
  providedIn: 'root'
})
export class MeusTicketsService {

  private readonly endpoint = `${environment.urlService}compra`;
  constructor(private http: HttpClient) { }

  post(idUser: string, tickets: MeusTikets): Observable<MeusTiketsResponse> {
    return this.http.post<MeusTiketsResponse>(`${this.endpoint}`, tickets).pipe(take(1));
  }

  getMeusTickets(): Observable<MeusTiketsListResponse> {
    return this.http.get<any>(`${this.endpoint}/me`).pipe(take(1));
  }

}
