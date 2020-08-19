import { User } from '../_models/user';
import { Exemplo } from '../_models/exemplo';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExemplosService {

  private readonly endpoint = `${environment.urlService}exemplos`; 
  constructor(private http: HttpClient) { }
  
  getExemplos(id:string): Observable<Exemplo> {
    debugger;  
    return this.http.get<Exemplo>(`${this.endpoint}/${id}`).pipe(take(1));
  }
  
}

