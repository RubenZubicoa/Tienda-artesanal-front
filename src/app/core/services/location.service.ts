import { inject, Injectable, signal } from '@angular/core';
import { Location } from '../models/Locations';
import { Manufacturer, ManufacturerWithLocation } from '../models/Manufacturer';
import { MapMarker } from '../../shared/components/map/map.models';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _location = signal<Location | null>(null);
  private _manufacturersLocations = signal<ManufacturerWithLocation[] | undefined>(undefined);
  private manufacturerService = inject(ManufacturerService);

  public get location() {
    return this._location.asReadonly();
  }

  public get manufacturersLocations() {
    return this._manufacturersLocations.asReadonly();
  }

  public getManufacturersIds() {
    return this._manufacturersLocations()?.map((manufacturer) => manufacturer.uuid) ?? [];
  }

  public getManufacturers() {
    this.manufacturerService.getManufacturers().subscribe((manufacturers) => {
      this.getManufacturerLocations(manufacturers);
    });
  }

  private getManufacturerLocations(manufacturers: Manufacturer[]) {
    this._manufacturersLocations.set([]);
    manufacturers.forEach((manufacturer) => {
      const manufacturerLocation = { lat: manufacturer.latitude ?? 0, lng: manufacturer.longitude ?? 0 };
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
    });
  }
}
