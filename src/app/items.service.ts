import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class ItemsService {

  private url = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  /*handleFilters(filterBy): string {
    let sorting = '';
    let filtering = '';
    if (filterBy.orderBy && filterBy.order) {
      sorting = `&_sort=${filterBy.orderBy}&_order=${filterBy.order}`;
    }
    if (filterBy.search) {
      filtering = `&q=${filterBy.search}`
    }
    return `${sorting}${filtering}`
  }*/

  public getItems(): Observable<any> {
    const url = `${this.url}/items`;
    return this.http.get(url, {observe: 'response'});
  }

}
