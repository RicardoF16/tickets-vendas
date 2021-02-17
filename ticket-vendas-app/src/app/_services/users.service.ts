import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserResponse, User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly endpoint = `${environment.urlService}usuarios`;
  constructor(private http: HttpClient) { }

  postUser(user: User): Observable<UserResponse> {
    if (!user.imagemURL) {
      user.imagemURL = '';
    }
    return this.http.post<UserResponse>(this.endpoint, user).pipe(take(1));
  }

  postUserSocial(user: User): Observable<UserResponse> {
    if (!user.imagemURL) {
      user.imagemURL = '';
    }
    return this.http.post<UserResponse>(`${this.endpoint}/social`, user).pipe(take(1));
  }

  putUser(user: UserResponse): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.endpoint}/me`, user).pipe(take(1));
  }

  getUserInfo(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.endpoint}/${userId}`).pipe(take(1));
  }

  verifyUser(cpf: string, email: string): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/verify`, { cpf: cpf, email: email }).pipe(take(1));
  }

}
