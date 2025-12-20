export type MeetingPoint = {
    uuid: string;
    name: string;
    address?: string;
    location?: {
        latitude: number;
        longitude: number;
    }
}