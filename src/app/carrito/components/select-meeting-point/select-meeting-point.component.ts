import { Component, computed, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Manufacturer, ManufacturerWithMeetingPoints } from '../../../core/models/Manufacturer';
import { MeetingPointsService } from '../../../meeting-points/services/meeting-points.service';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarritoService } from '../../services/carrito.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SelectMeetingPointDialogComponent } from '../select-meeting-point-dialog/select-meeting-point-dialog.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-select-meeting-point',
  imports: [CommonModule, MatSelectModule, MatIconModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './select-meeting-point.component.html',
  styleUrl: './select-meeting-point.component.scss'
})
export class SelectMeetingPointComponent implements OnInit {

  private readonly manufacturerService = inject(ManufacturerService);
  private readonly carritoService = inject(CarritoService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  public disabledForm = input<boolean>(false);
  public manufacturersIds = signal<Manufacturer['uuid'][]>([]);
  public meetingPointsFormControl = new FormControl<MeetingPoint['uuid'] | undefined>(undefined);
  public selectedMeetingPoint = output<{ manufacturerId: Manufacturer['uuid'], meetingPointId: MeetingPoint['uuid'] }>();

  public data: Record<Manufacturer['uuid'], ManufacturerWithMeetingPoints> = {};

  ngOnInit(): void {
    const manufacturersIds = Object.keys(this.carritoService.getProductsCartByManufacturer());
    this.manufacturersIds.set(manufacturersIds);
    manufacturersIds.forEach(manufacturerId => {
      this.manufacturerService.getManufacturerWithMeetingPoints(manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(manufacturerWithMeetingPoints => {
        this.data[manufacturerId] = manufacturerWithMeetingPoints;
      });
    });
  }

  public onChangeMeetingPoint(manufacturerId: Manufacturer['uuid'], meetingPointId: MeetingPoint['uuid']): void {
    this.selectedMeetingPoint.emit({ manufacturerId, meetingPointId });
  }

  public openMeetingPointDialog(manufacturerId: Manufacturer['uuid'], meetingPoints: MeetingPoint[]): void {
    const dialogRef = this.dialog.open(SelectMeetingPointDialogComponent, {
      data: { manufacturerId, meetingPoints },
      width: '80vw',
      height: '90vh',
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.selectedMeetingPoint.emit({ manufacturerId, meetingPointId: result.uuid });
        this.meetingPointsFormControl.setValue(result.meetingPointId);
      }
    });
  }

}
