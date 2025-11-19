import { Component, computed, inject, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MANUFACTURERS_LIST } from '../../../core/data/manufacturers';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { CardData, mapManufacturerToCardData } from '../../../shared/components/card/card.models';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-manufacturers',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss'
})
export class ManufacturersComponent {

  public manufacturers = signal<Manufacturer[]>(MANUFACTURERS_LIST);

  public cards = computed(() => this.manufacturers().map(mapManufacturerToCardData));

  public readonly router = inject(Router);

  public goToManufacturersDetails(card: CardData) {
    this.router.navigate(['/manufacturers', card.uuid]);
  }

}
