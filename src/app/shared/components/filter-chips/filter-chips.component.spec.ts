import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterChipsComponent } from './filter-chips.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AplicacionFiltros } from '../../../aplicacion/models/aplicacion-filters';
import { APLICACION_CHIPS } from '../../../aplicacion/models/aplicacion-chips';

const filters: AplicacionFiltros = { codigo: 'Test', nombre: 'Test' };
const chips = APLICACION_CHIPS;

describe('Filter chips component', () => {
  let component: FilterChipsComponent<AplicacionFiltros>;
  let fixture: ComponentFixture<FilterChipsComponent<AplicacionFiltros>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterChipsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterChipsComponent<AplicacionFiltros>);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('filters', filters);
    fixture.componentRef.setInput('chips', chips);

    fixture.detectChanges();
  });

  it('El componente deberia de estar creado', () => {
    expect(component).toBeDefined();
  });

  describe('isFiltersEmpty', () => {
    it('deberia de devolver false', () => {
      expect(component).toBeDefined();
      expect(component.isFiltersEmpty()).toBeFalse();
    });
    it('deberia de devolver true', () => {
      fixture.componentRef.setInput('filters', []);
      fixture.detectChanges();
      expect(component).toBeDefined();
      expect(component.isFiltersEmpty()).toBeTrue();
    });
  });

  describe('remove', () => {
    it('deberia de emitir removeChip', () => {
        spyOn(component.removeChip, 'emit');
        component.remove('codigo');
        expect(component.removeChip.emit).toHaveBeenCalledWith('codigo')
    })
    it('deberia de emitir removeChip con rangeDate', () => {
        spyOn(component.removeChip, 'emit');
        component.remove({ startProperty: 'fechaAperturaExpediente.greaterThanOrEqual', endProperty: 'fechaAperturaExpediente.lessThanOrEqual' });
        expect(component.removeChip.emit).toHaveBeenCalledWith({ startProperty: 'fechaAperturaExpediente.greaterThanOrEqual', endProperty: 'fechaAperturaExpediente.lessThanOrEqual' });
    })
  })

  describe('clearFiltersClick', () => {
    it('deberia emitir clearFilters', () => {
        spyOn(component.clearFilters, 'emit');
        component.clearFiltersClick();
        expect(component.clearFilters.emit).toHaveBeenCalled();
    })
  })
});
