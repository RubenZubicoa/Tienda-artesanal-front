import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { Manufacturer } from '../models/Manufacturer';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);

  private user = signal<User | undefined>(undefined);
  private manufacturer = signal<Manufacturer | undefined>(undefined);
  public isManufacturer = computed(() => this.user()?.manufacturerId !== undefined);

  public get currentUser() {
    return this.user.asReadonly();
  }

  public get currentManufacturer() {
    return this.manufacturer.asReadonly();
  }

  public setCurrentUser(user: User | undefined) {
    this.user.set(user);
  }

  constructor() {
    effect(() => {
      if (this.user()) {
        const manufacturerId = this.user()?.manufacturerId;
        if (manufacturerId) {
          this.manufacturerService.getManufacturer(manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(manufacturer => {
            this.manufacturer.set(manufacturer);
          });
        }
      }else{
        this.manufacturer.set(undefined);
      }
    });
  }


}
