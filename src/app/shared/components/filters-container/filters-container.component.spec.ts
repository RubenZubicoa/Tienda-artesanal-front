import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersContainerComponent } from './filters-container.component';
import { AplicacionFiltros } from '../../../aplicacion/models/aplicacion-filters';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APLICACION_CHIPS } from '../../../aplicacion/models/aplicacion-chips';
import { FilterChip } from '../filter-chips/filter-chip';
import { VisorExpedientesFiltros } from '../../../visor-expedientes/models/visor-expediente-filtros';

const filters: VisorExpedientesFiltros = {
  'identificador.contains': 'Test',
  'fechaAperturaExpediente.greaterThanOrEqual': new Date(),
  'fechaAperturaExpediente.lessThanOrEqual': new Date(),
};
const chips: FilterChip[] = APLICACION_CHIPS;

describe('FiltersContainerComponent', () => {
  let component: FiltersContainerComponent<VisorExpedientesFiltros>;
  let fixture: ComponentFixture<
    FiltersContainerComponent<VisorExpedientesFiltros>
  >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersContainerComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FiltersContainerComponent<VisorExpedientesFiltros>
    );
    component = fixture.componentInstance;
    fixture.componentRef.setInput('filters', filters);
    fixture.componentRef.setInput('chips', chips);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('removeFilter', () => {
    it('deberia de emitir removeChip', () => {
      spyOn(component.removeChip, 'emit');
      component.removeFilter('identificador.contains');
      expect(component.removeChip.emit).toHaveBeenCalledWith({
        ...filters,
        'identificador.contains': null,
      });
    });
    it('deberia de emitir removeChip con un rangeDate', () => {
      spyOn(component.removeChip, 'emit');
      component.removeFilter({startProperty: 'fechaAperturaExpediente.greaterThanOrEqual', endProperty: 'fechaAperturaExpediente.lessThanOrEqual'});
      expect(component.removeChip.emit).toHaveBeenCalledWith({
        ...filters,
        'fechaAperturaExpediente.greaterThanOrEqual': null,
        'fechaAperturaExpediente.lessThanOrEqual': null,
      });
    });
    it('si los filtros son undefined, no deberia de emitir removeChip', () => {
      spyOn(component.removeChip, 'emit');
      fixture.componentRef.setInput('filters', undefined);
      fixture.detectChanges();
      component.removeFilter(undefined);
      expect(component.removeChip.emit).not.toHaveBeenCalled();
    });
  });

  describe('clearFiltersClick', () => {
    it('deberia de emitir clearFilters', () => {
      spyOn(component.clearFilters, 'emit');
      component.clearFiltersClick();
      expect(component.clearFilters.emit).toHaveBeenCalled();
    });
  });

  describe('applyFiltersClick', () => {
    it('deberia de emitir applyFilters', () => {
      spyOn(component.applyFilters, 'emit');
      component.applyFiltersClick();
      expect(component.applyFilters.emit).toHaveBeenCalled();
    });
  });
});
