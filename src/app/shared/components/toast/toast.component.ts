import { Component, inject, Inject, signal } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { ToastData, ToastTypes } from './toastData';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

const CHECK_CIRCLE = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#348466"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
`;

const INFO_FILLED = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#365585"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
`;

const ERROR_FILLED = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ba1a1a"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
`;

const WARNING_FILLED = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6c5424"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg>
`;

@Component({
  selector: 'app-toast',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  public readonly TOAST_TYPES = ToastTypes;
  public readonly snackBarRef = inject(MatSnackBarRef<ToastComponent>);
  public iconRegistry = inject(MatIconRegistry);
  public sanitizer = inject(DomSanitizer);
  public displayDetails = signal<boolean>(false);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ToastData) {
    this.iconRegistry.addSvgIconLiteral('check_circle_filled', this.sanitizer.bypassSecurityTrustHtml(CHECK_CIRCLE));
    this.iconRegistry.addSvgIconLiteral('info_filled', this.sanitizer.bypassSecurityTrustHtml(INFO_FILLED));
    this.iconRegistry.addSvgIconLiteral('error_filled', this.sanitizer.bypassSecurityTrustHtml(ERROR_FILLED));
    this.iconRegistry.addSvgIconLiteral('warning_filled', this.sanitizer.bypassSecurityTrustHtml(WARNING_FILLED));
  }

  close(): void {
    this.snackBarRef.dismiss();
  }

  toggleDetails(): void {
    this.displayDetails.set(!this.displayDetails());
  }
}
