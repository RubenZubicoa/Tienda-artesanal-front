import { inject, Injectable, signal } from '@angular/core';
import { LoginService } from '../../login/services/login.service';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { of } from 'rxjs';
import { ToastService } from '../../shared/components/toast/toast.service';
import { ToastTypes } from '../../shared/components/toast/toastData';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token = signal<string | undefined>(undefined);
  private loginService = inject(LoginService);
  private currentUserService = inject(CurrentUserService);
  private toastService = inject(ToastService);

  public get currentToken() {
    return this.token.asReadonly();
  }

  public verifyToken() {
    const token = this.getTokenFromLocalStorage();
    if (token) {
      this.loginService.verifyToken(token).subscribe({
        next: (user: User) => {
            this.currentUserService.setCurrentUser(user);
            this.token.set(token);
        },
        error: () => {
          this.toastService.showMessage(ToastTypes.INFO, 'Sesion expirada', 'Tu sesión ha expirado, por favor inicia sesión nuevamente');
          this.logout();
        }
      });
    }
  }

  public setCurrentToken(token: string) {
    this.token.set(token);
    this.saveTokenToLocalStorage(token);
  }

  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUserService.clearCurrentUser();
  }
}
