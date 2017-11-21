import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemManager } from '../models/items';

@Injectable()
export class FavoriteService {

  private favoritosSource = new BehaviorSubject<ItemManager.Item[]>([]);
  currentFavoritos = this.favoritosSource.asObservable();

  constructor() { }
  
  changeFavoritos(favoritos: ItemManager.Item[]) {
    this.favoritosSource.next(favoritos);
  }

}