import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ToastComponent } from './toast.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastData, ToastTypes } from './toastData';

const mockData: ToastData = {
  type: ToastTypes.SUCCESS,
  title: 'Éxito',
  message: 'Operación realizada correctamente',
};

describe('Toast component', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  let snackBarRef: jasmine.SpyObj<MatSnackBarRef<ToastComponent>>;
  //   let iconRegistry: jasmine.SpyObj<MatIconRegistry>;
  //   let sanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    snackBarRef = jasmine.createSpyObj('MatSnackBarRef', ['dismiss']);
    // iconRegistry = jasmine.createSpyObj('MatIconRegistry', [
    //   'addSvgIconLiteral','getNamedSvgIcon'
    // ]);
    // sanitizer = jasmine.createSpyObj('Sanitizer', ['bypassSecurityTrustHtml']);

    TestBed.configureTestingModule({
      imports: [ToastComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatSnackBarRef, useValue: snackBarRef },
        // { provide: MatIconRegistry, useValue: iconRegistry },
        // { provide: DomSanitizer, useValue: sanitizer },
        { provide: MAT_SNACK_BAR_DATA, useValue: mockData },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;

    spyOn(component.iconRegistry, 'addSvgIconLiteral');
    spyOn(component.sanitizer, 'bypassSecurityTrustUrl');
    fixture.detectChanges();
  });

  it('el componente deberia de estar creado', () => {
    expect(component).toBeDefined();
    expect(component.data).toEqual(mockData);
    expect(component.data.title).toBe('Éxito');
  });

  describe('constructor', () => {
    it('deberia de agregar los 4 iconos', () => {
      TestBed.createComponent(ToastComponent);
      expect(component.iconRegistry.addSvgIconLiteral).toHaveBeenCalledTimes(4);

      expect(component.iconRegistry.addSvgIconLiteral).toHaveBeenCalledWith(
        'check_circle_filled',
        jasmine.anything()
      );
      expect(component.iconRegistry.addSvgIconLiteral).toHaveBeenCalledWith(
        'info_filled',
        jasmine.anything()
      );
      expect(component.iconRegistry.addSvgIconLiteral).toHaveBeenCalledWith(
        'error_filled',
        jasmine.anything()
      );
      expect(component.iconRegistry.addSvgIconLiteral).toHaveBeenCalledWith(
        'warning_filled',
        jasmine.anything()
      );
    });
  });

  describe('close', () => {
    it('deberia de llamar a dismiss', () => {
      component.close();
      expect(snackBarRef.dismiss).toHaveBeenCalled();
    });
  });
});
