import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CarritoService } from '../../services/carrito.service';
import { CardData, mapProductCartToCardData } from '../../../shared/components/card/card.models';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, BreadcrumbsComponent, CardComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  private readonly carritoService = inject(CarritoService);
  
  public products = computed(() => this.carritoService.carrito());
  public cards = computed(() => this.products().map(mapProductCartToCardData));

  public removeProductFromCart(card: CardData) {
    this.carritoService.removeProduct(card.uuid);
  }
}
