import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FavoriteService } from '../items/favorite.service';

@Component({
  selector: 'app-favorites-dialog',
  templateUrl: './favorites-dialog.component.html',
  styleUrls: ['./favorites-dialog.component.scss']
})
export class FavoritesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FavoritesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: FavoriteService
  ) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addFavorites($event): void {
    $event._liked = !$event._liked;
    if ($event._liked) {
      this.data.push($event)
      let temp = []
      this.data = this.data.filter(favorite => {
        if (temp.indexOf(favorite.id) == -1) {
          temp.push(favorite.id);
          return true;
        }
        return false;
      })
    } else {
      this.data = this.data.filter(favorite => favorite.id !== $event.id);
    }
    this.dataService.changeFavoritos(this.data);
  }

}
