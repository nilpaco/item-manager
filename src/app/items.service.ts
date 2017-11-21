import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemsService {

  private url = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  public getItems(page: number, filterBy?): Observable<any> {
    let sorting = '';
    if (filterBy.orderBy && filterBy.order) {
      sorting = `&_sort=${filterBy.orderBy}&_order=${filterBy.order}`;
    }
    const url = `${this.url}/items?_page=${page}&_limit=5${sorting}`;
    return this.http.get(url, {observe: 'response'});
  }

}
