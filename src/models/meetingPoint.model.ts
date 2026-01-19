import { Filter, ObjectId } from "mongodb";
import { clientDB, database } from "../db/database";
import { CreateMeetingPoint, MeetingPoint, MeetingPointFilters, UpdateMeetingPoint } from "../types/MeetingPoint";

export async function getMeetingPointsByManufacturerId(manufacturerId: string) {
    try {
        await clientDB.connect();
        const meetingPoints = await database.collection("MeetingPoints").find({ manufacturerId: manufacturerId, isDeleted: false }).toArray();
        await clientDB.close();
        return meetingPoints;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los puntos de encuentro");
    }
}

export async function getMeetingPointsByFilters(filters: MeetingPointFilters) {
    try {
        await clientDB.connect();
        const query: Filter<MeetingPoint> = {};
        if (filters.manufacturerId) {
            query.manufacturerId = { $regex: filters.manufacturerId, $options: 'i' };
        }
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.description) {
            query.description = { $regex: filters.description, $options: 'i' };
        }
        query.isDeleted = false;
        const meetingPoints = await database.collection<MeetingPoint>("MeetingPoints").find(query).toArray();
        await clientDB.close();
        return meetingPoints;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los puntos de encuentro");
    }
}

export async function getMeetingPointById(meetingPointId: string) {
    try {
        await clientDB.connect();
        const meetingPoint = await database.collection("MeetingPoints").findOne({ _id: new ObjectId(meetingPointId) });
        await clientDB.close();
        return meetingPoint;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener el punto de encuentro");
    }
}

export async function createMeetingPoint(meetingPoint: CreateMeetingPoint) {
    try {
        await clientDB.connect();
        meetingPoint.isDeleted = false;
        const result = await database.collection("MeetingPoints").insertOne(meetingPoint);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el punto de encuentro");
    }
}

export async function updateMeetingPoint(meetingPointId: string, meetingPoint: UpdateMeetingPoint) {
    try {
        await clientDB.connect();
        const id = new ObjectId(meetingPointId);
        const result = await database.collection("MeetingPoints").updateOne({ _id: id }, { $set: meetingPoint });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el punto de encuentro");
    }
}

export async function deleteMeetingPoint(meetingPointId: string) {
    try {
        await clientDB.connect();
        const id = new ObjectId(meetingPointId);
        const result = await database.collection("MeetingPoints").updateOne({ _id: id }, { $set: { isDeleted: true } });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el punto de encuentro");
    }
}