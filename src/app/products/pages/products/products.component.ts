import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { CardData, mapProductToCardData } from '../../../shared/components/card/card.models';
import { ProductsService } from '../../services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsFiltersComponent } from '../../components/products-filters/products-filters.component';
import { Product, ProductFilters } from '../../../core/models/Product';
import { LocationService } from '../../../core/services/location.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CardComponent, CommonModule, BreadcrumbsComponent, ProductsFiltersComponent, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  {

  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly locationService = inject(LocationService);

  public manufacturersLocations = this.locationService.manufacturersLocations;
  public productsOfManufacturers = signal<Product[] | undefined>(undefined);
  public filters = signal<ProductFilters>({});
  public cards = computed(() => this.productsOfManufacturers()?.map(mapProductToCardData) ?? []);
  public maxPrice = computed(() => this.productsOfManufacturers()?.reduce((max, product) => Math.max(max, product.price), 0) ?? 0);
  public readonly router = inject(Router);

  constructor(){
    effect(() => {
      this.getProductsRequest();
    });
  }

  public applyFilters(filters: ProductFilters) {
    const manufacturersIds = this.locationService.getManufacturersIds();
    this.filters.set({...filters, manufacturers: manufacturersIds});
    this.productsService.getProductsByFilters(filters).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(products => {
      this.productsOfManufacturers.set(products);
    });
  }

  public goToProductDetails(card: CardData) {
    this.router.navigate(['/products', card.uuid]);
  }

  private getProductsRequest() {
    const manufacturersIds = this.locationService.getManufacturersIds();
    if (manufacturersIds.length > 0) {
      this.productsService.getProductsByFilters({manufacturers: manufacturersIds}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(products => {
        this.productsOfManufacturers.set(products);
      });
    }
    else {
      this.productsOfManufacturers.set(undefined);
    }
  }
}
