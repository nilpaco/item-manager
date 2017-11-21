import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FavoriteService {

  private favoritosSource = new BehaviorSubject<any[]>([]);
  currentFavoritos = this.favoritosSource.asObservable();

  constructor() { }
  
  changeFavoritos(favoritos: any[]) {
    this.favoritosSource.next(favoritos);
  }

}