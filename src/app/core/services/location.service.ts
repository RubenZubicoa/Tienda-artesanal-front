import { inject, Injectable, signal } from '@angular/core';
import { Location } from '../models/Locations';
import { getCurrentLocation, getDistanceBetweenCoordinates } from '../../shared/utils/location';
import { Manufacturer, ManufacturerWithLocation } from '../models/Manufacturer';
import { getLocationFromAddress } from '../../shared/utils/geocoder';
import { MapMarker } from '../../shared/components/map/map.models';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _location = signal<Location | null>(null);
  private _manufacturersLocations = signal<ManufacturerWithLocation[] | undefined>(undefined);
  private _maxDistance = signal<number>(5);
  private manufacturerService = inject(ManufacturerService);
  private router = inject(Router);

  public get location() {
    return this._location.asReadonly();
  }

  public get manufacturersLocations() {
    return this._manufacturersLocations.asReadonly();
  }

  private setLocation(location: Location | null) {
    this._location.set(location);
  }

  constructor() {
    this.getCurrentLocation();
  }

  public getManufacturersIds(){
    return this._manufacturersLocations()?.map((manufacturer) => manufacturer.uuid) ?? [];
  }

  public changeLocationAndGetManufacturers(address: string) {
    getLocationFromAddress(address).then((location) => {
      this.setLocation(location);
      this.getManufacturers();
      this.router.navigate(['/manufacturers']);
    });
  }

  private getCurrentLocation() {
    getCurrentLocation().then((location) => {
      this.setLocation(location);
      this.getManufacturers();
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
    manufacturers.forEach((manufacturer) => {
      getLocationFromAddress(manufacturer.address ?? '').then((location) => {
        const distance = getDistanceBetweenCoordinates(
          mapLocation ?? { lat: 0, lng: 0 },
          location ?? { lat: 0, lng: 0 }
        );
        if (distance <= maxDistance) {
          manufacturer.latitude = location?.lat;
          manufacturer.longitude = location?.lng;
          const marker: MapMarker = {
            id: manufacturer.uuid,
            lat: location?.lat ?? 0,
            lng: location?.lng ?? 0,
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
      });
    });
  }
}
