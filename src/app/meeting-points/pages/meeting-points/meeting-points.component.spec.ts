import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPointsComponent } from './meeting-points.component';

describe('MeetingPointsComponent', () => {
  let component: MeetingPointsComponent;
  let fixture: ComponentFixture<MeetingPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
