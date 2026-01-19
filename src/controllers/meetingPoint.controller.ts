import { Request, Response } from "express";
import { getMeetingPointsByManufacturerId as getMeetingPointsByManufacturerIdModel, createMeetingPoint as createMeetingPointModel, updateMeetingPoint as updateMeetingPointModel, deleteMeetingPoint as deleteMeetingPointModel, getMeetingPointsByFilters as getMeetingPointsByFiltersModel, getMeetingPointById as getMeetingPointByIdModel } from "../models/meetingPoint.model";
import { isCreateMeetingPoint, isUpdateMeetingPoint, MeetingPoint, MeetingPointFilters, UpdateMeetingPoint } from "../types/MeetingPoint";

export async function getMeetingPointsByManufacturerId(req: Request<{ manufacturerId: string }>, res: Response) {
    const manufacturerId = req.params.manufacturerId;
    try {
        const meetingPoints = await getMeetingPointsByManufacturerIdModel(manufacturerId);
        res.status(200).json(meetingPoints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los puntos de encuentro", error: error });
    }
}

export async function getMeetingPointsByFilters(req: Request<{}, {}, MeetingPointFilters>, res: Response) {
    const filters: MeetingPointFilters = req.body;
    try {
        const meetingPoints = await getMeetingPointsByFiltersModel(filters);
        res.status(200).json(meetingPoints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los puntos de encuentro", error: error });
    }
}

export async function getMeetingPointById(req: Request<{ id: string }>, res: Response) {
    const meetingPointId = req.params.id;
    try {
        const meetingPoint = await getMeetingPointByIdModel(meetingPointId);
        res.status(200).json(meetingPoint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el punto de encuentro", error: error });
    }
}

export async function createMeetingPoint(req: Request<{}, {}, MeetingPoint>, res: Response) {
    const meetingPoint: MeetingPoint = req.body;
    if (!isCreateMeetingPoint(meetingPoint)) {
        return res.status(400).json({ message: "Datos de punto de encuentro inválidos" });
    }
    try {
        const result = await createMeetingPointModel(meetingPoint);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el punto de encuentro", error: error });
    }
}

export async function updateMeetingPoint(req: Request<{ id: string }, {}, MeetingPoint>, res: Response) {
    const meetingPointId = req.params.id;
    const meetingPoint: UpdateMeetingPoint = req.body;
    if (!isUpdateMeetingPoint(meetingPoint)) {
        return res.status(400).json({ message: "Datos de punto de encuentro inválidos" });
    }
    try {
        const result = await updateMeetingPointModel(meetingPointId, meetingPoint);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el punto de encuentro", error: error });
    }
}

export async function deleteMeetingPoint(req: Request<{ id: string }>, res: Response) {
    const meetingPointId = req.params.id;
    try {
        const result = await deleteMeetingPointModel(meetingPointId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el punto de encuentro", error: error });
    }
}