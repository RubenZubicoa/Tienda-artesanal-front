import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { mapManufacturerToCardData } from '../../../shared/components/card/card.models';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from '../../../shared/components/map/map.component';
import { getLocationFromAddress } from '../../../shared/utils/geocoder';
import { MapMarker } from '../../../shared/components/map/map.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManufacturersDialogComponent } from '../../components/manufacturers-dialog/manufacturers-dialog.component';
import { ManufacturerService } from '../../services/manufacturer.service';
import {
  getDistanceBetweenCoordinates,
} from '../../../shared/utils/location';
import {
  Manufacturer,
  ManufacturerFilters,
  ManufacturerWithLocation,
} from '../../../core/models/Manufacturer';
import { ManufacturersFiltersComponent } from '../../components/manufacturers-filters/manufacturers-filters.component';
import { ManufacturerPageViews } from '../../models/manufacturer-page-views';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-manufacturers',
  imports: [
    CardComponent,
    CommonModule,
    BreadcrumbsComponent,
    MatButtonToggleModule,
    MatIconModule,
    MapComponent,
    RouterModule,
    MatDialogModule,
    ManufacturersFiltersComponent,
  ],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss',
})
export class ManufacturersComponent {
  public view = signal<ManufacturerPageViews>(ManufacturerPageViews.LIST);

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly locationService = inject(LocationService);

  public manufacturersLocations = this.locationService.manufacturersLocations;
  public markers = computed(() =>
    this.manufacturersLocations()?.map((manufacturer) => manufacturer.marker) ?? []
  );
  public manufacturersCards = computed(() =>
    this.manufacturersLocations()?.map(mapManufacturerToCardData)
  );
  public currentLocation = this.locationService.location;
  public filters = signal<ManufacturerFilters>({ maxDistance: 20 });
  public mapLocation = computed(
    () => this.filters().location ?? this.currentLocation()
  );
  public readonly views = ManufacturerPageViews;

  public goToManufacturersDetails(manufacturerId: string) {
    this.router.navigate(['/manufacturers', manufacturerId]);
  }

  public toggleView(view: ManufacturerPageViews) {
    this.view.set(view);
  }

  public showManufacturersDetails(manufacturerId: string) {
    const manufacturer = this.manufacturersLocations()?.find(
      (manufacturer) => manufacturer.uuid === manufacturerId
    );
    if (manufacturer) {
      this.dialog.open(ManufacturersDialogComponent, {
        data: {
          manufacturer: manufacturer,
        },
      });
    }
  }

  public applyFilters(filters: ManufacturerFilters) {
    this.filters.set(filters);
  }
}
