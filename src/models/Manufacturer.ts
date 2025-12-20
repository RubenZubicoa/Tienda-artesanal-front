import { MeetingPoint } from "./MeetingPoint";

export type Manufacturer = {
    uuid: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    image?: string;
    createdAt: number;
    updatedAt?: number;
    meetingPoints?: MeetingPoint[];
}