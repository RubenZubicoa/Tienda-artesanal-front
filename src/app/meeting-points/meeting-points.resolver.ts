import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { MeetingPointsService } from "./services/meeting-points.service";
import { MeetingPoint } from "../core/models/MeetingPoint";

export const meetingPointResolver: ResolveFn<MeetingPoint | undefined> = (route, state) => {
    const id = route.params['id'];
    return inject(MeetingPointsService).getMeetingPoint(id);
}