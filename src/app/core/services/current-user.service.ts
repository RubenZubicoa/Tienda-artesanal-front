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

  private user = signal<User | undefined>({
    "uuid": "695393864cdd9f39237b8585",
    "name": "Ruben Zubicoa",
    "email": "rubenzubicoa@gmail.com",
    "password": "$2b$10$kPlVuvLkdgVX.MqSoOYvXesmnm.zJpNiSRpJcBop05QvHHEnP.EOi",
    "manufacturerId": "6947d19f5df928a95527d6ef",
    "phone": "663437945"
});
  private manufacturer = signal<Manufacturer | undefined>({
    "uuid": "6947d19f5df928a95527d6ef",
    "name": "Ruben Zubicoa",
    "phone": "666666666",
    "email": "rubenzubicoa@gmail.com",
    "image": "https://res.cloudinary.com/dlfkse85a/image/upload/v1770213188/1770213189154-equipo.jpg.jpg",
    "address": "Zegama",
    "description": "description de ruben zubicoa",
});
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
