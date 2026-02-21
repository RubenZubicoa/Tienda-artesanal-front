import { Component, inject, input, output } from '@angular/core';
import { ProductsFormFiltersService } from '../../services/products-form-filters.service';
import { CommonModule } from '@angular/common';
import { FiltersContainerComponent } from '../../../shared/components/filters-container/filters-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProductFilters } from '../../../core/models/Product';
import { PRODUCTS_CHIPS } from '../../models/products-chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EnumsService } from '../../../core/services/enums.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products-filters',
  imports: [CommonModule, FiltersContainerComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatSlideToggleModule, TranslatePipe],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss'
})
export class ProductsFiltersComponent {
  public readonly formService = inject(ProductsFormFiltersService);
  private readonly enumsService = inject(EnumsService);
  
  public maxPrice = input<number>(100);
  public applyFilters = output<ProductFilters>(); 

  public filters: ProductFilters | undefined = undefined;
  public readonly chips = PRODUCTS_CHIPS;
  public categories = this.enumsService.categories;

  ngOnInit(): void {
    this.filters = this.formService.obtenerDatos(this.formService.form);
  }

  applyFiltersClick() {
    this.filters = this.formService.obtenerDatos(this.formService.form);
    this.applyFilters.emit(this.filters);
  }

  clearFiltersClick() {
    this.formService.reset(this.formService.form);
    this.filters = undefined;
    this.applyFilters.emit({});
  }

  removeFilter(filters: ProductFilters | undefined) {
    if (filters !== undefined) {
      this.filters = filters;
      this.formService.actualizarFormulario(this.formService.form, filters);
      this.applyFiltersClick();
    }
  }
}
