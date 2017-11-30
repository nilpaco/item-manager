import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { FavoriteService } from './favorite.service';
import { Subject } from 'rxjs';
import "rxjs/add/operator/debounceTime";
import { ItemManager } from '../models/items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  searchQueryChanged: Subject<string> = new Subject<string>();  
  public items: ItemManager.Item[];
  private page: number = 1;
  public limit: number = 5;
  public totalItems: number = 0;
  public pageSize: number = 5;
  public favorites: ItemManager.Item[];
  public filterBy: ItemManager.Filter =  new ItemManager.Filter('', '', '');
  public filters = [
    { name: 'title' },
    { name: 'price' },
    { name: 'description' },
    { name: 'email' }
  ];
  filter: ItemManager.Item = new ItemManager.Item();
  
  constructor(
    private service: ItemsService,
    public data: FavoriteService,
  ) {
    this.searchQueryChanged
    .debounceTime(1500)
    .distinctUntilChanged()
    .subscribe(search => {
      this.filterBy.search = search;
      this.getData();
     });
  }

  ngOnInit() {
    this.getData();
    this.data.currentFavoritos.subscribe(favorites => {
      this.favorites = favorites;
      if (this.items && this.items.length > 0) {
        this.items = this.parseItems(this.items);        
      }
    });
  }

  getData(): void {
    this.items = undefined;
    this.service.getItems().subscribe(response => {
      // set timeout to fake server response time
      setTimeout(() => {
        this.totalItems = response.body.length;
        this.items = this.parseItems(response.body);  
      }, 1000);
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

  sort(orderBy: string): void {
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
    this.getData();
  }

  valuechange($event): void {
    this.searchQueryChanged.next($event);    
  }

  parseItems(data): ItemManager.Item[] {
    data.forEach(item => {
      const actual = this.favorites.find(favorite => favorite.id === item.id);
      item._liked = (actual) ? true : false;
    });
    return data
  }

  nextPage($event): void {
    this.page = $event.pageIndex+1;
  }

}
