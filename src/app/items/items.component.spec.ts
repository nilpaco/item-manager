import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
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
import { FavoriteService } from './favorite.service';
import { ItemsService } from '../items.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs/Subject';
import { ItemSortPipe } from '../pipes/item-sort.pipe';
import { ItemFilterPipe } from '../pipes/item-filter.pipe';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatPaginatorModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [ ItemsComponent, ItemFilterPipe, ItemSortPipe ],
      providers: [
        FavoriteService,
        ItemsService,
        Subject
      ]
    })
    .compileComponents();
  }));
  it('should create items component', async(() => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should display a paginator', () => {
    const fixture = TestBed.createComponent(ItemsComponent); 
    const app = fixture.componentInstance;
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.querySelector('mat-paginator')).toBeTruthy();      
  });
  it('should display a loading spinner', () => {
    const fixture = TestBed.createComponent(ItemsComponent); 
    const app = fixture.componentInstance;
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.querySelector('mat-spinner')).toBeTruthy();      
  });
  it('should display a filters', () => {
    const fixture = TestBed.createComponent(ItemsComponent); 
    const app = fixture.componentInstance;
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.querySelector('mat-form-field')).toBeTruthy();      
  });
});
