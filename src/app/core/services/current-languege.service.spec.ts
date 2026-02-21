import { TestBed } from '@angular/core/testing';

import { CurrentLanguegeService } from './current-languege.service';

describe('CurrentLanguegeService', () => {
  let service: CurrentLanguegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentLanguegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
