import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Product, ProductFilters } from '../../../core/models/Product';
import { mapProductToCardData } from '../../../shared/components/card/card.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ProductsFiltersComponent } from '../../../products/components/products-filters/products-filters.component';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-products',
  imports: [CommonModule, BreadcrumbsComponent, CardComponent, ProductsFiltersComponent, TranslatePipe],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productsService = inject(ProductsService);
  private readonly toastService = inject(ToastService);
  private readonly currentUserService = inject(CurrentUserService);

  public products = signal<Product[]>([]);
  public cards = computed(() => this.products().map(mapProductToCardData));
  public filters = signal<ProductFilters>({});

  ngOnInit(): void {
    if (this.currentUserService.isManufacturer()) {
      this.getProducts();
    } else {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener productos', 'No tienes un fabricante asociado, por favor contacta al administrador o inicia sesión como fabricante');
    }
  }

  public getProducts() {
    const filters = this.filters();
    filters.manufacturerId = this.currentUserService.currentUser()?.manufacturerId;
    this.productsService.getProductsByFilters(filters).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener productos', 'No se han podido obtener los productos');
      }
    });
  }

  public openFormDialog(uuid?: Product['uuid']) {
    if (uuid) {
      this.router.navigate(['/my-products', uuid]);
      return;
    }
    this.router.navigate(['/my-products/add-product']);
  }

  public toggleProductStock(uuid: Product['uuid']) {
    const product = this.products().find(product => product.uuid === uuid);
    if (!product) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al eliminar producto', 'El producto no existe');
      return;
    }
    this.updateProductStock(uuid, product, product.stock === 0 ? 1 : 0);
  }

  public applyFilters(filters: ProductFilters) {
    this.filters.set(filters);
    this.getProducts();
  }

  private updateProductStock(uuid: Product['uuid'], product: Product, stock: number) {
    this.productsService.updateProduct(uuid, {...product, stock}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.getProducts();
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al actualizar producto', 'El producto no ha sido actualizado correctamente');
      }
    });
  }
}
