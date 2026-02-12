import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LocationService } from '../../../../core/services/location.service';
import { getLocationFromAddress } from '../../../../shared/utils/geocoder';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private readonly locationService = inject(LocationService);

  public changeLocation(address: string) {
      this.locationService.changeLocationAndGetManufacturers(address);
  }

}
