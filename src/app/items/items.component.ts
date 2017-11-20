import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public items: any[];
  public totalItems: number;
  public pageSize: number = 5;

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit() {
    this.getData(1);
  }

  getData(page: number): void {
    this.items = undefined;
    this.service.getItems(page).subscribe(response => {
      this.totalItems = response.headers.get('X-Total-Count');
      this.items = response.body;
    });
  }

  nextPage($event): void {
    this.getData($event.pageIndex);
  }

}
