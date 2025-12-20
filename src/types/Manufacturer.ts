import { MeetingPoint } from "./MeetingPoint";
import { ObjectId } from "mongodb";

export type Manufacturer = {
    _id?: ObjectId;
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    website?: string;
    image?: string;
    meetingPoints?: MeetingPoint[];
    createdAt: number;
    updatedAt?: number;
    isDeleted?: boolean;
}