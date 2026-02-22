import { Component, computed, input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../../shared/components/map/map.component';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { MapMarker } from '../../../shared/components/map/map.models';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-order-meeting-point',
  imports: [CommonModule, MapComponent, TranslatePipe],
  templateUrl: './order-meeting-point.component.html',
  styleUrl: './order-meeting-point.component.scss'
})
export class OrderMeetingPointComponent {
  public meetingPoint = input.required<MeetingPoint>()
  public marker: Signal<MapMarker> = computed(() => {
    return {
      id: this.meetingPoint().uuid,
      lat: this.meetingPoint().location.latitude,
      lng: this.meetingPoint().location.longitude,
      isClickable: false,
      draggable: false,
    }
  })
}
