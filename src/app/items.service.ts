import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemsService {

  private url = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  public getItems(page: number): Observable<any> {
    const url = `${this.url}/items?_page=${page}&_limit=5`;
    return this.http.get(url, {observe: 'response'});
  }

}
