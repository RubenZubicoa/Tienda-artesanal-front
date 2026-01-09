import { Component, input, output } from '@angular/core';
import { FilterChip } from '../filter-chips/filter-chip';
import { FilterButtonComponent } from '../filter-button/filter-button.component';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters-container',
  standalone: true,
  imports: [
    CommonModule,
    FilterChipsComponent,
    FilterButtonComponent,
  ],
  templateUrl: './filters-container.component.html',
  styleUrl: './filters-container.component.scss'
})
export class FiltersContainerComponent<T> {

  public filters = input.required<T>();
  public chips = input.required<FilterChip[]>();
  public applyFilters = output<void>();
  public clearFilters = output<void>(); 
  public removeChip = output<T>();


  removeFilter(property: string | FilterChip['rangeDate']) {
    const filters = { ...this.filters() };
    if (filters !== undefined && property !== undefined) {
      if (typeof property !== 'object') {
        (filters![property as keyof T] as any) = null;
      }
      if (typeof property === 'object') {
        (filters![property.startProperty as keyof T] as any) = null;
        (filters![property.endProperty as keyof T] as any) = null;
      }
      this.removeChip.emit(filters as T);
    }
  }

  clearFiltersClick() {
    this.clearFilters.emit();
  }

  applyFiltersClick() {
    this.applyFilters.emit();
  }

}
