import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TruncateTextDirective } from '../../directives/truncate-text.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterChip } from './filter-chip';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    TruncateTextDirective,
    MatTooltipModule,
    DatePipe,
    MatIconModule,
  ],
  templateUrl: './filter-chips.component.html',
  styleUrl: './filter-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterChipsComponent<T> {
  public filters = input.required<T>();
  public chips = input.required<FilterChip[]>();
  public removeChip = output<string | FilterChip['rangeDate']>();
  public clearFilters = output<void>();

  public isFiltersEmpty = computed(() => {
    const filters = this.filters();
    if (filters !== undefined) {
      const hasValues = Object.entries(filters as unknown as object).some(([key, value]) => {
        if (value === undefined && value === null) {
          return false;
        }
        if (Array.isArray(value)) {
          return value.length > 0;
        }
          if (typeof value === 'string'  ) {
          return value.trim() !== '';
        }
        if (typeof value === 'number') {
          return value > 0;
        }
        if (value instanceof Date) {
          return true
        }
        return false;
      });
      return !hasValues;
    }
    return true;
  });

  remove(propertyOrRangeDate: FilterChip['property'] | FilterChip['rangeDate']) {
    this.removeChip.emit(propertyOrRangeDate);
  }

  clearFiltersClick() {
    this.clearFilters.emit();
  }
}
