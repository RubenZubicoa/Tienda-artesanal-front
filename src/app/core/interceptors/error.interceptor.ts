import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/components/toast/toast.service';
import { inject } from '@angular/core';
import { ToastTypes } from '../../shared/components/toast/toastData';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.showMessage(ToastTypes.ERROR, 'Error', error.error.message ?? 'Ha ocurrido un error al realizar la solicitud');
      return throwError(() => error);
    })
  );
};
