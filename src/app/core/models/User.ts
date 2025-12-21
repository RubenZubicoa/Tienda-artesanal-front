export type User = {
    uuid: string;
    name: string;
    email: string;
    manufacturerId?: string;
}

export type UserDB = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    manufacturerId?: string;
    createdAt?: number;
    updatedAt?: number;
    isDeleted?: boolean;
}

export function mapUserToUser(userDB: UserDB): User {
    return {
        uuid: userDB._id ?? '',
        name: userDB.name,
        email: userDB.email,
        manufacturerId: userDB.manufacturerId,
    }
}