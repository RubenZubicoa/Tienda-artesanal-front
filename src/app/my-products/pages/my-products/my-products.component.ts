import { Component, effect, inject, input, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { Product } from '../../../core/models/Product';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';
import { MANUFACTURERS_LIST } from '../../../core/data/manufacturers';
import { AddProductDialogComponent } from '../../components/add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-products',
  imports: [CommonModule, BreadcrumbsComponent, CardComponent],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent {

  public manufacturer = signal<Manufacturer | undefined>(MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === '1'));
  public readonly router = inject(Router);
  public readonly dialog = inject(MatDialog);


  public products: Product[] = [];
  public cards = signal<CardData[]>([]);

  constructor(){
    effect(() => {
      this.products = PRODUCTS_LIST.filter(product => product.manufacturerId === this.manufacturer()?.uuid);
      this.cards.set(this.products.map(mapProductToCardData));
    });
  }

  public goToProductDetails(card: CardData) {
    const product = PRODUCTS_LIST.find(product => product.uuid === card.uuid);
    this.dialog.open(AddProductDialogComponent, {
      data: {
        product: product
      }
    });
  }

  public goToAddProduct() {
    this.dialog.open(AddProductDialogComponent, {
      data: {
        product: undefined
      }
    });
  }
}
