import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './items/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Item manager';
  public favorites: any[];
  
  constructor(
    private data: FavoriteService
  ) { }

  ngOnInit() {
    this.data.currentFavoritos.subscribe(result => this.favorites = result);
  }

}
