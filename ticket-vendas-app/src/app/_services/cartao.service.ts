import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartaoResponse } from '../_models/cartaoModel';


@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  private readonly endpoint = `${environment.urlService}cartao`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<CartaoResponse>> {
    return this.http.get<Array<CartaoResponse>>(`${this.endpoint}`).pipe(take(1));
  }

  getById(id: string): Observable<CartaoResponse> {
    return this.http.get<CartaoResponse>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  put(cartao: CartaoResponse): Observable<CartaoResponse> {
    return this.http.put<CartaoResponse>(`${this.endpoint}/${cartao.id}`, cartao).pipe(take(1));
  }

  post(cartao: CartaoResponse): Observable<CartaoResponse> {
    return this.http.post<CartaoResponse>(`${this.endpoint}`, cartao).pipe(take(1));
  }

  delete(idCart: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.endpoint}/${idCart}`).pipe(take(1));
  }
}
