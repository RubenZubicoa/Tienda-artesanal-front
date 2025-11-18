import { Component, computed, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MANUFACTURERS_LIST } from '../../../core/data/manufacturers';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { mapManufacturerToCardData } from '../../../shared/components/card/card.models';

@Component({
  selector: 'app-manufacturers',
  imports: [CardComponent, CommonModule],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.scss'
})
export class ManufacturersComponent {

  public manufacturers = signal<Manufacturer[]>(MANUFACTURERS_LIST);

  public cards = computed(() => this.manufacturers().map(mapManufacturerToCardData));

}
