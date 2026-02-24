import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/components/toast/toast.service';
import { inject } from '@angular/core';
import { ToastTypes } from '../../shared/components/toast/toastData';
import { TranslateService } from '@ngx-translate/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const translate = inject(TranslateService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.showMessage(ToastTypes.ERROR, translate.instant('error.title'), error.error.message ?? translate.instant('error.message'));
      return throwError(() => error);
    })
  );
};
