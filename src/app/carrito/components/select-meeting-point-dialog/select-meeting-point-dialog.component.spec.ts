import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMeetingPointDialogComponent } from './select-meeting-point-dialog.component';

describe('SelectMeetingPointDialogComponent', () => {
  let component: SelectMeetingPointDialogComponent;
  let fixture: ComponentFixture<SelectMeetingPointDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMeetingPointDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMeetingPointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
