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
  private page: number = 0;
  public totalItems: number;
  public pageSize: number = 5;
  public favorites: any[];
  public filterBy = {
    search: '',
    orderBy: '',
    order: ''
  };

  constructor(
    private service: ItemsService,
    public data: FavoriteService,
  ) { }

  ngOnInit() {
    this.getData(this.page);
    this.data.currentFavoritos.subscribe(favorites => {
      this.favorites = favorites
    });
  }

  getData(page: number, sortBy?: string): void {
    this.items = undefined;
    this.service.getItems(page+1, this.filterBy).subscribe(response => {
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

  filter(search: string, orderBy: string): void {
    if (this.filterBy.orderBy !== orderBy) {
      this.filterBy.order = undefined;
    }
    this.filterBy.orderBy = orderBy;
    if (this.filterBy.orderBy && !this.filterBy.order) {
      this.filterBy.order = 'asc';
    } else if (this.filterBy.orderBy && this.filterBy.order === 'asc') {
      this.filterBy.order = 'desc';
    } else if (this.filterBy.orderBy && this.filterBy.order === 'desc') {
      this.filterBy.order = undefined;
      this.filterBy.orderBy = undefined;
    }
    this.getData(this.page);
  }

  parseItems(data): any[] {
    data.forEach(item => {
      const actual = this.favorites.find(favorite => favorite.id === item.id);
      item._liked = (actual) ? true : false;
    });
    return data
  }

  nextPage($event): void {
    this.page = $event.pageIndex;
    this.getData($event.pageIndex);
  }

}
