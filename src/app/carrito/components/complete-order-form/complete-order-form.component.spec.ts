import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderFormComponent } from './complete-order-form.component';

describe('CompleteOrderFormComponent', () => {
  let component: CompleteOrderFormComponent;
  let fixture: ComponentFixture<CompleteOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
