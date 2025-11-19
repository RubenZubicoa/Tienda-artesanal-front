import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';
import { TestBed } from '@angular/core/testing';
import { ToastTypes } from './toastData';
import { ToastComponent } from './toast.component';

describe('ToastService', () => {
  let service: ToastService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const setup = (snackBar: unknown) =>
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackBar }],
    }).inject(ToastService);

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    service = setup(snackBar);
  });

  it('el servicio deberia de estar definido', () => {
    expect(service).toBeTruthy();
  });

  describe('showMessage', () => {
    it('deberia de llamar a openFromComponent', () => {
      const type = ToastTypes.SUCCESS;
      const title = 'title';
      const message = 'message';
      const details = 'details';
      const duration = 10000;

      service.showMessage(type, title, message, details, duration);

      expect(snackBar.openFromComponent).toHaveBeenCalledWith(ToastComponent, {
        data: { title, message, type, details },
        duration: duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snackbar',
      });
    });
  });
});
