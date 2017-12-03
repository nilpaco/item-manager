import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class ItemsService {

  private url = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  public getItems(): Observable<any> {
    const url = `${this.url}/items`;
    return this.http.get(url, {observe: 'response'});
  }

}
