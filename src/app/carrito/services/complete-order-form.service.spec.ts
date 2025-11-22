import { TestBed } from '@angular/core/testing';

import { CompleteOrderFormService } from './complete-order-form.service';

describe('CompleteOrderFormService', () => {
  let service: CompleteOrderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteOrderFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
