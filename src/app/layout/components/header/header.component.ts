import { Component, computed, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CarritoService } from '../../../carrito/services/carrito.service';
import { RouterModule } from '@angular/router';
import { SectionButtonComponent } from '../../../shared/components/section-button/section-button.component';
import { HEADER_SECTIONS, Section } from '../../../core/models/Section';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatBadgeModule, RouterModule, SectionButtonComponent, MatMenuModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly carritoService = inject(CarritoService);
  private readonly currentUserService = inject(CurrentUserService);

  public readonly currentUser = this.currentUserService.currentUser;

  public readonly manufacturerImage = computed(() => this.currentUserService.currentManufacturer()?.image);
  public readonly productsSelected = computed(() => this.carritoService.carrito().length);
  
  public readonly headerSections = computed(() => HEADER_SECTIONS.map((section) => {
    if (section.title === 'Carrito') {
      section.badge = this.productsSelected();
    }
    return section;
  }));
  
  

}
