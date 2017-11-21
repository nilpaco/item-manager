import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './items/favorite.service';
import { MatDialog } from '@angular/material';
import { FavoritesDialogComponent } from './favorites-dialog/favorites-dialog.component';
import { ItemManager } from './models/items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Item manager';
  public favorites: ItemManager.Item[];
  
  constructor(
    private data: FavoriteService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.data.currentFavoritos.subscribe(result => this.favorites = result);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(FavoritesDialogComponent, {
      width: '450px',
      disableClose: true,
      data: this.favorites 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
