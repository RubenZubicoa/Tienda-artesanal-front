import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonComponent } from './filter-button.component';
import { Overlay } from '@angular/cdk/overlay';

const trigger: any = {
  elementRef: {
    nativeElement: {
      getBoundingClientRect: () => {
        return { y: 23 };
      },
    },
  },
};

const overlayRef = {
  detach: () => {},
  attach: () => {},
  backdropClick: () => {},
} as any;

describe('FilterButtonComponent', () => {
  let component: FilterButtonComponent;
  let fixture: ComponentFixture<FilterButtonComponent>;

  let overlay: jasmine.SpyObj<Overlay>;

  beforeEach(async () => {
    overlay = jasmine.createSpyObj('Overlay', ['position', 'create']);

    await TestBed.configureTestingModule({
      imports: [FilterButtonComponent],
      providers: [{ provide: Overlay, useValue: overlay }],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('si overlayRef no esta definido, no deberia de hacer nada', () => {
      component.ngOnDestroy();

      expect(component.overlayRef).toBeUndefined();
    });

    it('si overlayRef esta definido, deberia de llamar a detach', () => {
      component.overlayRef = {
        detach: () => {},
      } as any;
      spyOn(component.overlayRef!, 'detach');

      component.ngOnDestroy();

      expect(component.overlayRef?.detach).toHaveBeenCalled();
    });
  });

  describe('openMenu', () => {
    it('si overlayRef no esta definido, no deberia de hacer nada', () => {
      overlay.create.and.returnValue(overlayRef);
      component.openMenu(trigger);

      expect(component.overlayRef).toBeDefined();
    });
  });

  describe('closeMenu', () => {
    it('deberia de poner isMenuOpen a false', () => {
      component.isMenuOpen.set(true);
      component.closeMenu();

      expect(component.isMenuOpen()).toBeFalse(); 
      expect(component.overlayRef).toBeUndefined();
    });

    it('deberia de poner isMenuOpen a false, si overlayRef esta definido llamar a detach', () => {
      component.overlayRef = {
        detach: () => {},
      } as any;
      spyOn(component.overlayRef!, 'detach');
      component.isMenuOpen.set(true);

      component.closeMenu();

      expect(component.isMenuOpen()).toBeFalse();
      expect(component.overlayRef?.detach).toHaveBeenCalled();
    });
  });

  describe('applyFiltersClick', () => {
    it('deberia de emitir los filtros y llamar a closeMenu', () => {
      spyOn(component.applyFilters, 'emit');
      spyOn(component, 'closeMenu');

      component.applyFiltersClick();

      expect(component.applyFilters.emit).toHaveBeenCalled();
      expect(component.closeMenu).toHaveBeenCalled();
    });
  });

  describe('applyFiltersClick', () => {
    it('deberia de emitir clearFilters y llamar a closeMenu', () => {
      spyOn(component.clearFilters, 'emit');
      spyOn(component, 'closeMenu');

      component.clearFiltersClick();

      expect(component.clearFilters.emit).toHaveBeenCalled();
      expect(component.closeMenu).toHaveBeenCalled();
    });
  });
});
