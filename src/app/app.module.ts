import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { BidiModule } from '@angular/cdk/bidi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemsService } from './items.service';
import { FavoriteService } from './items/favorite.service';
import { FavoritesDialogComponent } from './favorites-dialog/favorites-dialog.component';
import { ItemFilterPipe } from './pipes/item-filter.pipe';
import { ItemSortPipe } from './pipes/item-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    FavoritesDialogComponent,
    ItemFilterPipe,
    ItemSortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BidiModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [ ItemsService, FavoriteService ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    FavoritesDialogComponent
  ]
})
export class AppModule { }
