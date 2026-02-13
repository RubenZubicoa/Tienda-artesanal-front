import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LocationService } from '../../../../core/services/location.service';
import { getLocationFromAddress } from '../../../../shared/utils/geocoder';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private readonly locationService = inject(LocationService);

  // public addressFormControl = new FormControl<string>('');

  // ngOnInit(): void {
  //   this.addressFormControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
  //     if (value) {
  //       this.changeLocation(value);
  //     }
  //   });
  // }

  public changeLocation(address: string) {
    if (address) {
      this.locationService.changeLocationAndGetManufacturers(address);
    }
  }

}
