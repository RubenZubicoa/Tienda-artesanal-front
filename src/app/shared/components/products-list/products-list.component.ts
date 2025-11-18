import { Component, computed, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { mapProductToCardData } from '../card/card.models';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  public products = input.required<Product[]>();

  public cards = computed(() => this.products().map(mapProductToCardData));

}
