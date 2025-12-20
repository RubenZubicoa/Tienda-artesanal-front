import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../core/config/api.config';
import { from, map, Observable, switchMap } from 'rxjs';
import { Manufacturer, ManufacturerDB, mapManufacturerToManufacturer } from '../../core/models/Manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.MANUFACTURERS_URL;

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<ManufacturerDB[]>(this.url).pipe(map(manufacturers => manufacturers.map(mapManufacturerToManufacturer)));
  }

  createManufacturer(manufacturer: Manufacturer): Observable<void> {
    return this.http.post<void>(this.url, manufacturer);
  }

  updateManufacturer(manufacturer: Manufacturer): Observable<void> {
    return this.http.put<void>(this.url, manufacturer);
  }

  deleteManufacturer(manufacturerId: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + manufacturerId);
  }
}
