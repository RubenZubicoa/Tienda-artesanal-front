import { Component, computed, effect, inject, input } from '@angular/core';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manufacturers-details',
  imports: [ProductsListComponent, CommonModule],
  templateUrl: './manufacturers-details.component.html',
  styleUrl: './manufacturers-details.component.scss'
})
export class ManufacturersDetailsComponent {
 
  public manufacturer = input.required<Manufacturer>();
  public route = inject(ActivatedRoute);


  public products: Product[] = [];

  constructor(){
    effect(() => {
      this.products = PRODUCTS_LIST.filter(product => product.manufacturerId === this.manufacturer().uuid);
      console.log(this.products);
    });
  }
}
