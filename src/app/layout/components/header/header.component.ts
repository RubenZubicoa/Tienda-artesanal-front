import { Component, computed, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CarritoService } from '../../../carrito/services/carrito.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatBadgeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly carritoService = inject(CarritoService);

  public readonly productsSelected = computed(() => this.carritoService.carrito().length);

}
