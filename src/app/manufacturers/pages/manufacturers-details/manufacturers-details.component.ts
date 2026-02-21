import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';
import { ProductsService } from '../../../products/services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-manufacturers-details',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent, TranslatePipe],
  templateUrl: './manufacturers-details.component.html',
  styleUrl: './manufacturers-details.component.scss'
})
export class ManufacturersDetailsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);
 
  public manufacturer = input<Manufacturer>();
  public readonly router = inject(Router);

  public products: Product[] = [];
  public cards = signal<CardData[]>([]);

  constructor(){
    effect(() => {
      this.productsService.getProductsByManufacturer(this.manufacturer()?.uuid ?? '').pipe(takeUntilDestroyed(this.destroyRef)).subscribe(products => {
        this.products = products;
        this.cards.set(products.map(mapProductToCardData));
      });
      this.cards.set(this.products.map(mapProductToCardData));
    }, { allowSignalWrites: true });
  }

  public goToProductDetails(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }
}
