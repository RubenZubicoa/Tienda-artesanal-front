import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductsMonthComponent } from './total-products-month.component';

describe('TotalProductsMonthComponent', () => {
  let component: TotalProductsMonthComponent;
  let fixture: ComponentFixture<TotalProductsMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalProductsMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalProductsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
