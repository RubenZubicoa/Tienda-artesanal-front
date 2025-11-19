import { inject, Injectable } from '@angular/core';
import { ToastData, ToastTypes } from './toastData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  showMessage(type: ToastTypes, title: string, message: string, details?: string, duration = 5000) {
    this.snackBar.openFromComponent<ToastComponent, ToastData>(ToastComponent, {
      data: { title, message, type, details },
      duration: duration, 
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snackbar'
    });
  }
}
