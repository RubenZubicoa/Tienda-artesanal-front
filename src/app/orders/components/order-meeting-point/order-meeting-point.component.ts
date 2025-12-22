import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../../shared/components/map/map.component';

@Component({
  selector: 'app-order-meeting-point',
  imports: [CommonModule, MapComponent],
  templateUrl: './order-meeting-point.component.html',
  styleUrl: './order-meeting-point.component.scss'
})
export class OrderMeetingPointComponent {

}
