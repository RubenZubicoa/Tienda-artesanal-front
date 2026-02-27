import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingPointComponent } from './add-meeting-point.component';

describe('AddMeetingPointComponent', () => {
  let component: AddMeetingPointComponent;
  let fixture: ComponentFixture<AddMeetingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMeetingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
