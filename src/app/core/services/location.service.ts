import { inject, Injectable, signal } from '@angular/core';
import { Location } from '../models/Locations';
import { getCurrentLocation, getDistanceBetweenCoordinates } from '../../shared/utils/location';
import { Manufacturer, ManufacturerWithLocation } from '../models/Manufacturer';
import { getLocationFromAddress } from '../../shared/utils/geocoder';
import { MapMarker } from '../../shared/components/map/map.models';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { ToastService } from '../../shared/components/toast/toast.service';
import { ToastTypes } from '../../shared/components/toast/toastData';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _location = signal<Location | null>(null);
  private _manufacturersLocations = signal<ManufacturerWithLocation[] | undefined>(undefined);
  private _maxDistance = signal<number>(10);
  private manufacturerService = inject(ManufacturerService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  public get location() {
    return this._location.asReadonly();
  }

  public get manufacturersLocations() {
    return this._manufacturersLocations.asReadonly();
  }

  private setLocation(location: Location | null) {
    this._location.set(location);
  }

  public getManufacturersIds() {
    return this._manufacturersLocations()?.map((manufacturer) => manufacturer.uuid) ?? [];
  }

  public getManufacturersByLocation() {
    const location = this.location();
    if (location) {
      this.getManufacturers();
    } else {
      this.getCurrentLocationAndSearchManufacturers();
    }
  }

  public changeLocationAndGetManufacturers(address: string) {
    getLocationFromAddress(address).then((location) => {
      this.setLocation(location);
      this.getManufacturers();
      this.router.navigate(['/manufacturers']);
    });
  }

  public getCurrentLocationAndSearchManufacturers() {
    this.startLoading();
    getCurrentLocation().then((location) => {
      this.setLocation(location);
      this.getManufacturers();
    }).catch((error) => {
      this.stopLoading();
      this.toastService.showMessage(ToastTypes.INFO, 'No hemos podido obtener tu ubicación', 'Por favor, introduce una ubicación manualmente para poder ver los artesanos cercanos');
    });
  }

  private getManufacturers() {
    this.manufacturerService.getManufacturers().subscribe((manufacturers) => {
      this.getManufacturerLocations(manufacturers);
    });
  }

  private getManufacturerLocations(manufacturers: Manufacturer[]) {
    const maxDistance = this._maxDistance();
    const mapLocation = this.location();
    this._manufacturersLocations.set([]);
    manufacturers.forEach((manufacturer, index, array) => {
      const manufacturerLocation = { lat: manufacturer.latitude ?? 0, lng: manufacturer.longitude ?? 0 };
      const distance = getDistanceBetweenCoordinates(
        mapLocation ?? { lat: 0, lng: 0 },
        manufacturerLocation
      );
      if (distance <= maxDistance) {
        const marker: MapMarker = {
          id: manufacturer.uuid,
          lat: manufacturerLocation.lat,
          lng: manufacturerLocation.lng,
          isClickable: true,
        };

        this._manufacturersLocations.update((manufacturers) => [
          ...manufacturers!,
          {
            ...manufacturer,
            marker,
          },
        ]);
      }
      if (index === array.length - 1) {
        this.stopLoading();
      }
    });
  }

  private startLoading() {
    this.loadingService.startLoading({ id: 'getCurrentLocation', method: 'GET' });
  }

  private stopLoading() {
    this.loadingService.stopLoading({ id: 'getCurrentLocation', method: 'GET' });
  }
}
