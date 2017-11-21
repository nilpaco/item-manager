import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public items: any[];
  public totalItems: number;
  public pageSize: number = 5;
  public favorites: any[];

  constructor(
    private service: ItemsService,
    public data: FavoriteService,
  ) { }

  ngOnInit() {
    this.getData(0);
    this.data.currentFavoritos.subscribe(favorites => {
      this.favorites = favorites
    });    
  }

  getData(page: number): void {
    this.items = undefined;
    this.service.getItems(page+1).subscribe(response => {
      this.totalItems = response.headers.get('X-Total-Count');
      this.items = this.parseItems(response.body);
    });
  }

  addFavorites($event): void {
    $event._liked = !$event._liked;
    if ($event._liked) {
      this.favorites.push($event)
      let temp = []
      this.favorites = this.favorites.filter(favorite => {
        if (temp.indexOf(favorite.id) == -1) {
          temp.push(favorite.id);
          return true;
        }
        return false;
      })
    } else {
      this.favorites = this.favorites.filter(favorite => favorite.id !== $event.id);
    }
    this.data.changeFavoritos(this.favorites);
    this.items = this.parseItems(this.items);
  }

  parseItems(data): any[] {
    data.forEach(item => {
      const actual = this.favorites.find(favorite => favorite.id === item.id);
      item._liked = (actual) ? true : false;
    });
    return data
  }

  nextPage($event): void {
    this.getData($event.pageIndex);
  }

}
