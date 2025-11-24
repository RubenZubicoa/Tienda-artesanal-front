import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MANUFACTURERS_LIST } from '../../../core/data/manufacturers';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { CardData, mapManufacturerToCardData } from '../../../shared/components/card/card.models';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from '../../../shared/components/map/map.component';
import { getLocationFromAddress } from '../../../shared/utils/geocoder';

@Component({
  selector: 'app-manufacturers',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent, MatButtonToggleModule, MatIconModule, MapComponent],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss'
})
export class ManufacturersComponent implements OnInit {

  public manufacturers = signal<Manufacturer[]>(MANUFACTURERS_LIST);
  public manufacturersLocations = signal<{ lat: number; lng: number }[]>([]);

  public cards = computed(() => this.manufacturers().map(mapManufacturerToCardData));
  public view = signal<'map' | 'list'>('map');

  public readonly router = inject(Router);

  public goToManufacturersDetails(card: CardData) {
    this.router.navigate(['/manufacturers', card.uuid]);
  }

  public toggleView(view: 'map' | 'list') {
    this.view.set(view);
  }

  ngOnInit(): void {
    this.manufacturers().forEach(manufacturer => {
      getLocationFromAddress(manufacturer.city ?? '').then(location => {
        manufacturer.latitude = location?.lat;
        manufacturer.longitude = location?.lng;
        this.manufacturersLocations.set([...this.manufacturersLocations(), { lat: location?.lat ?? 0, lng: location?.lng ?? 0 }]);
      });
    });
  }

}
