import { TestBed } from '@angular/core/testing';

import { MeetingPointsService } from './meeting-points.service';

describe('MeetingPointsService', () => {
  let service: MeetingPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
