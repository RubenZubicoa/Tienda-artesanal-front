import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private user = signal<User | undefined>(undefined);
  public isManufacturer = computed(() => this.user()?.manufacturerId !== undefined);

  public get currentUser() {
    return this.user.asReadonly();
  }

  public setCurrentUser(user: User) {
    this.user.set(user);
  }
}
