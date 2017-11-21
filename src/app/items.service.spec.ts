import { TestBed, inject } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { HttpClientModule } from '@angular/common/http';

describe('ItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,        
      ],
      providers: [ItemsService]
    });
  });

  it('should create ItemsService', inject([ItemsService], (service: ItemsService) => {
    expect(service).toBeTruthy();
  }));
  it('should return a list of items', inject([ItemsService], (service: ItemsService) => {
    service.getItems(0, {
      search: '',
      orderBy: '',
      order: '',
    }).subscribe((result) => {
      expect(result.body.length).toBeGreaterThan(0);
    });
  }));
});
