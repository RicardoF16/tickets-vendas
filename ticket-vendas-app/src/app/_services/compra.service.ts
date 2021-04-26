import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Carrinho } from '../_models/carrinho';


@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private readonly endpoint = `${environment.urlService}compra`;
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}`).pipe(take(1));
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/me`).pipe(take(1));
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${id}`,).pipe(take(1));
  }

  post(body: Carrinho): Observable<Array<any>> {
    return this.http.post<any>(`${this.endpoint}`, body).pipe(take(1));
  }

}
