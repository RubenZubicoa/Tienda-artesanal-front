import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMeetingPointComponent } from './order-meeting-point.component';

describe('OrderMeetingPointComponent', () => {
  let component: OrderMeetingPointComponent;
  let fixture: ComponentFixture<OrderMeetingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderMeetingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMeetingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
