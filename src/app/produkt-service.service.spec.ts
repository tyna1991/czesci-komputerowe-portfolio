import { TestBed, inject } from '@angular/core/testing';

import { ProduktServiceService } from './produkt-service.service';

describe('ProduktServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduktServiceService]
    });
  });

  it('should be created', inject([ProduktServiceService], (service: ProduktServiceService) => {
    expect(service).toBeTruthy();
  }));
});
