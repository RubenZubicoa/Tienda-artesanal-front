import { Component, DestroyRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LocationService } from '../../../../core/services/location.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  private readonly locationService = inject(LocationService);
  private readonly destroyRef = inject(DestroyRef);

  public addressFormControl = new FormControl('');

  constructor() {
    this.addressFormControl.valueChanges.pipe(debounceTime(600), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value) {
        this.changeLocation(value);
      }
    });
  }


  public changeLocation(address: string) {
    if (address) {
      this.locationService.changeLocationAndGetManufacturers(address);
    }
  }

}
