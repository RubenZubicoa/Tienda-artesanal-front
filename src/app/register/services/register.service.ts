import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { API_CONFIG } from '../../core/config/api.config';
import { UpdateUserDB, User, UserDB } from '../../core/models/User';
import { AddManufacturerDB, Manufacturer, UpdateManufacturerDB } from '../../core/models/Manufacturer';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { InsertOneResult } from '../../core/models/InsertOneResult';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../shared/components/toast/toast.service';
import { ToastTypes } from '../../shared/components/toast/toastData';

export type RegisterData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  manufacturer?: {
    name: string;
    phone: string;
    email: string;
    address: string;
    website?: string;
    socialMedia?: string;
    description?: string;
    image?: string;
    latitude?: number;
    longitude?: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.USERS_URL;
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly toastService = inject(ToastService);

  register(registerData: RegisterData, imageFile?: File) {
    const userData: Partial<UserDB> = {
      name: registerData.name,
      phone: registerData.phone,
      email: registerData.email,
      password: registerData.password,
    };
    const manufacturer = registerData.manufacturer;
    if (manufacturer) {
      this.createManufacturer(registerData, imageFile);
    } else {
      this.createUser(userData).subscribe(() => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Registro exitoso', 'Tu cuenta ha sido creada correctamente');
      });
    }
  }

  update(userId: User['uuid'], manufacturerId: Manufacturer['uuid'], registerData: RegisterData, destroyRef: DestroyRef, imageFile?: File, oldImage?: string): void {
    const userData: UpdateUserDB = {
      name: registerData.name,
      phone: registerData.phone,
      email: registerData.email,
      password: registerData.password,
    };
    this.updateUser(userId, userData).pipe(
      takeUntilDestroyed(destroyRef),
      switchMap(() => {
        const manufacturerFormData = registerData.manufacturer;
        if (manufacturerFormData) {
          const manufacturerData: UpdateManufacturerDB = {
            name: manufacturerFormData.name,
            phone: manufacturerFormData.phone,
            email: manufacturerFormData.email,
            address: manufacturerFormData.address,
            description: manufacturerFormData.description,
            website: manufacturerFormData.website,
            socialMedia: manufacturerFormData.socialMedia,
            image: manufacturerFormData.image,
          };
          return this.manufacturerService.updateManufacturer(manufacturerId, manufacturerData);
        }
        return of(undefined);
      })
    ).subscribe({
      next: () => {
        if (imageFile) {
          this.manufacturerService.uploadManufacturerImage(manufacturerId, imageFile).subscribe();
        }
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Actualización exitosa', 'Tu cuenta ha sido actualizada correctamente');
      },
    });
  }

  private createManufacturer(registerData: RegisterData, imageFile?: File) {
    if (registerData.manufacturer) {
      const manufacturer: AddManufacturerDB = {
        name: registerData.manufacturer.name,
        phone: registerData.manufacturer.phone,
        email: registerData.manufacturer.email,
        address: registerData.manufacturer.address,
        website: registerData.manufacturer.website,
        socialMedia: registerData.manufacturer.socialMedia,
        description: registerData.manufacturer.description,
        image: registerData.manufacturer.image,
        latitude: registerData.manufacturer.latitude,
        longitude: registerData.manufacturer.longitude,
      };
      this.manufacturerService.createManufacturer(manufacturer).subscribe((rowInserted: InsertOneResult) => {
        if (imageFile) {
          this.manufacturerService.uploadManufacturerImage(rowInserted.insertedId, imageFile).subscribe(() => {
            const createUser = this.createUser({
              name: registerData.name,
              email: registerData.email,
              password: registerData.password,
              manufacturerId: rowInserted.insertedId
            }).subscribe(() => {
              this.toastService.showMessage(ToastTypes.SUCCESS, 'Registro exitoso', 'Tu cuenta ha sido creada correctamente');
            });
          });
        }
        else {
          this.createUser({
            name: registerData.name,
            phone: registerData.phone,
            email: registerData.email,
            password: registerData.password,
            manufacturerId: rowInserted.insertedId
          }).subscribe(() => {
            this.toastService.showMessage(ToastTypes.SUCCESS, 'Registro exitoso', 'Tu cuenta ha sido creada correctamente');
          });
        }
      });
    }
  }

  private createUser(userData: Partial<UserDB>): Observable<InsertOneResult> {
    return this.http.post<InsertOneResult>(this.url, userData);
  }

  private updateUser(userId: User['uuid'], userData: Partial<UserDB>): Observable<void> {
    return this.http.put<void>(this.url + '/' + userId, userData);
  }
}

