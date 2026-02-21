import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CarritoService } from '../../../carrito/services/carrito.service';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CarruselComponent } from '../../../shared/components/carrusel/carrusel.component';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, BreadcrumbsComponent, MatInputModule, CarruselComponent, MatDividerModule, RouterModule, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent  {
  private readonly carritoService = inject(CarritoService);
  private readonly toastService = inject(ToastService);
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  public product = input.required<Product>();
  public manufacturer = signal<Manufacturer | undefined>(undefined);

  constructor(){
    effect(() => {
      this.manufacturerService.getManufacturer(this.product().manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(manufacturer => {
        this.manufacturer.set(manufacturer);
      });
    }, { allowSignalWrites: true });
  }

  public addProductToCart(quantity: string) {
    this.carritoService.addProduct(this.product(), Number(quantity));
    this.toastService.showMessage(ToastTypes.SUCCESS, this.translate.instant('product-details.toast-success-title'), this.translate.instant('product-details.toast-success-message'));
  }
}
