import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

const urlservice = environment.urlService + 'helloWorld';

@Injectable({
  providedIn: 'root'
})
export class testeApi {

  
  constructor(private http: HttpClient) { }

  getInfo() {
    debug;
    return this.http.get(urlservice).toPromise();
  }

  
}
