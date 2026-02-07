import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from '../../../shared/components/map/map.component';
import { MapMarker } from '../../../shared/components/map/map.models';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';

@Component({
  selector: 'app-select-meeting-point-dialog',
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MapComponent, ReactiveFormsModule],
  templateUrl: './select-meeting-point-dialog.component.html',
  styleUrl: './select-meeting-point-dialog.component.scss'
})
export class SelectMeetingPointDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<SelectMeetingPointDialogComponent>);
  private readonly toastService = inject(ToastService);

  public readonly data = inject<{ manufacturerId: Manufacturer['uuid'], name: Manufacturer['name'], meetingPoints: MeetingPoint[] }>(MAT_DIALOG_DATA);
  public selectedMeetingPoint = signal<MeetingPoint | undefined>(undefined);
  public markers: MapMarker[] = [];

  ngOnInit(): void {
    this.data.meetingPoints.forEach(meetingPoint => {
      this.markers.push({
        id: meetingPoint.uuid,
        lat: meetingPoint.location.latitude,
        lng: meetingPoint.location.longitude,
        isClickable: true,
        draggable: false,
      });
    });
  }

  public onMarkerClick(event: string): void {
    this.selectedMeetingPoint.set(this.data.meetingPoints.find(meetingPoint => meetingPoint.uuid === event));
  }

  public selectMeetingPoint(): void {
    const meetingPoint = this.selectedMeetingPoint();
    if (!meetingPoint) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al seleccionar punto de encuentro', 'No se ha seleccionado un punto de encuentro');
      return;
    }
    this.dialogRef.close({ manufacturerId: this.data.manufacturerId, meetingPointId: meetingPoint.uuid });
  }

}
