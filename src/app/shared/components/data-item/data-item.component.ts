import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DataItem } from './models';

@Component({
  selector: 'app-data-item',
  imports: [CommonModule],
  templateUrl: './data-item.component.html',
  styleUrl: './data-item.component.scss'
})
export class DataItemComponent {
  public data = input.required<DataItem>();

}
