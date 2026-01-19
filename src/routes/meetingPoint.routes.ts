import { Router } from "express";
import { createMeetingPoint, deleteMeetingPoint, getMeetingPointById, getMeetingPointsByFilters, getMeetingPointsByManufacturerId, updateMeetingPoint } from "../controllers/meetingPoint.controller";

export const meetingPointRoutes = Router();

meetingPointRoutes.get('/manufacturer/:manufacturerId', getMeetingPointsByManufacturerId);
meetingPointRoutes.get('/:id', getMeetingPointById);
meetingPointRoutes.post('/criteria', getMeetingPointsByFilters);
meetingPointRoutes.post('/', createMeetingPoint);
meetingPointRoutes.put('/:id', updateMeetingPoint);
meetingPointRoutes.delete('/:id', deleteMeetingPoint);

export default meetingPointRoutes;