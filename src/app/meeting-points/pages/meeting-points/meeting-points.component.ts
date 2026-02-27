import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MEETING_POINTS_COLUMNS } from '../../models/meeting-points-columns';
import { MeetingPoint, MeetingPointFilters } from '../../../core/models/MeetingPoint';
import { MeetingPointsService } from '../../services/meeting-points.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-points',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent, TranslatePipe],
  templateUrl: './meeting-points.component.html',
  styleUrl: './meeting-points.component.scss'
})
export class MeetingPointsComponent implements OnInit {
  private readonly meetingPointsService = inject(MeetingPointsService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public readonly columns = MEETING_POINTS_COLUMNS;
  public meetingPoints = signal<MeetingPoint[]>([]);

  ngOnInit(): void {
    if (this.currentUserService.isManufacturer()) {
      this.getMeetingPoints();
    } else {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al obtener puntos de encuentro', 'No tienes un fabricante asociado, por favor contacta al administrador o inicia sesión como fabricante');
    }
  }

  public createMeetingPoint() {
    this.router.navigate(['/meeting-points/add-meeting-point']);
  }

  public editMeetingPoint(meetingPoint: MeetingPoint) {
    this.router.navigate(['/meeting-points', meetingPoint.uuid]);
  }

  public deleteMeetingPoint(meetingPoint: MeetingPoint) {
    const confirmed = confirm('¿Estás seguro de querer eliminar este punto de encuentro?');
    if (!confirmed) {
      return;
    }
    this.meetingPointsService.deleteMeetingPoint(meetingPoint.uuid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.getMeetingPoints();
      },
    });
  }

  private getMeetingPoints(){
    const manufacturerId = this.currentUserService.currentManufacturer()?.uuid ?? '';
    const filters: MeetingPointFilters = {
      manufacturerId: manufacturerId,
    };
    this.meetingPointsService.getMeetingPointsByFilters(filters).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.meetingPoints.set(data);
      },
    });
  }


}
