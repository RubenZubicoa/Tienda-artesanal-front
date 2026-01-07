import { Manufacturer } from "./Manufacturer";

export type MeetingPoint = {
    uuid: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    manufacturerId: Manufacturer['uuid'];
    description?: string;
}

export type MeetingPointDB = {
    uuid: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    manufacturerId: string;
    description?: string;
    isDeleted?: boolean;
}

export type AddMeetingPointDB = Omit<MeetingPointDB, 'uuid' | 'isDeleted'>;
export type UpdateMeetingPointDB = Omit<MeetingPointDB, 'uuid' | 'isDeleted'>;

export const mapMeetingPointToMeetingPoint = (meetingPointDB: MeetingPointDB): MeetingPoint => {
    return {
        uuid: meetingPointDB.uuid,
        name: meetingPointDB.name,
        location: meetingPointDB.location,
        manufacturerId: meetingPointDB.manufacturerId,
        description: meetingPointDB.description,
    };
}