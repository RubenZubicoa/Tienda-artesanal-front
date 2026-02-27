import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { MeetingPointsFormService } from '../../services/meeting-points-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from '../../../shared/components/map/map.component';
import { MapMarker } from '../../../shared/components/map/map.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddMeetingPointDB, MeetingPoint, UpdateMeetingPointDB } from '../../../core/models/MeetingPoint';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { MeetingPointsService } from '../../services/meeting-points.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meeting-point',
  imports: [CommonModule, BreadcrumbsComponent, TranslatePipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MapComponent],
  templateUrl: './add-meeting-point.component.html',
  styleUrl: './add-meeting-point.component.scss'
})
export class AddMeetingPointComponent implements OnInit {
  private readonly meetingPointsFormService = inject(MeetingPointsFormService);
  private readonly meetingPointsService = inject(MeetingPointsService);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);


  public meetingPoint = input<MeetingPoint | undefined>();
  public isUpdateMode = computed(() => this.meetingPoint() !== undefined);

  public form = this.meetingPointsFormService.crearFormulario();

  public marker = signal<MapMarker | undefined>(undefined);

  ngOnInit(): void {
    const meetingPoint = this.meetingPoint();
    if (meetingPoint) {
      this.meetingPointsFormService.actualizarFormulario(this.form, meetingPoint);
      this.marker.set({
        id: '1',
        lat: meetingPoint.location.latitude,
        lng: meetingPoint.location.longitude,
      });
    }
  }
  
  public onMapClick(event: { lat: number, lng: number }): void {
    this.marker.set({
      id: '1',
      lat: event.lat,
      lng: event.lng,
      isClickable: true,
      draggable: true,
    });
  }

  public saveMeetingPoint(): void {
    const location = this.marker();
    if (!location) {
      this.toastService.showMessage(ToastTypes.ERROR, this.translate.instant('meeting-points.toast-error-title'), this.translate.instant('meeting-points.toast-error-message'));
      return;
    }
    const manufacturerId = this.currentUserService.currentManufacturer()?.uuid ?? '';
    if (!manufacturerId) {
      this.toastService.showMessage(ToastTypes.ERROR, this.translate.instant('meeting-points.toast-error-title'), this.translate.instant('meeting-points.toast-error-message'));
      return;
    }
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toastService.showMessage(ToastTypes.ERROR, this.translate.instant('meeting-points.toast-error-title'), this.translate.instant('meeting-points.toast-error-message'));
      return;
    }
    const formData = this.meetingPointsFormService.obtenerDatos(this.form);
    const meetingPoint: AddMeetingPointDB = {
      name: formData.name,
      description: formData.description,
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
      manufacturerId: manufacturerId,
    };
    if (this.isUpdateMode()) {
      this.updateMeetingPoint(this.meetingPoint()!.uuid, meetingPoint);
    } else {
      this.createMeetingPoint(meetingPoint);
    }
  }

  private createMeetingPoint(meetingPoint: AddMeetingPointDB): void {
    this.meetingPointsService.createMeetingPoint(meetingPoint).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.toastService.showMessage(ToastTypes.SUCCESS, this.translate.instant('meeting-points.toast-success-title'), this.translate.instant('meeting-points.toast-success-message'));
        this.router.navigate(['/meeting-points']);
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, this.translate.instant('meeting-points.toast-error-title'), this.translate.instant('meeting-points.toast-error-message'));
      }
    });
  }

  private updateMeetingPoint( meetingPointId: MeetingPoint['uuid'], meetingPoint: UpdateMeetingPointDB): void {
    this.meetingPointsService.updateMeetingPoint(meetingPointId, meetingPoint).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, this.translate.instant('meeting-points.toast-success-title'), this.translate.instant('meeting-points.toast-success-message'));
        this.router.navigate(['/meeting-points']);
      },
    });
  }


}
