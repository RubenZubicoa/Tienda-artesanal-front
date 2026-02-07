import { Component, input } from '@angular/core';
import { DataItemComponent } from '../data-item/data-item.component';
import { CommonModule } from '@angular/common';
import { DataSection } from './models';

@Component({
  selector: 'app-data-section',
  imports: [CommonModule, DataItemComponent],
  templateUrl: './data-section.component.html',
  styleUrl: './data-section.component.scss'
})
export class DataSectionComponent {
  public data = input.required<DataSection>();
}
