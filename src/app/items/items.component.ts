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

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getItems(0).subscribe(response => {
      this.totalItems = response.headers.get('X-Total-Count');
      this.items = response.body;
    });
  }

}
