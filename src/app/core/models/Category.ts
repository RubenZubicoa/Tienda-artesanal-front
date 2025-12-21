export type Category = {
    uuid: string;
    name: string;
}

export type CategoryDB = {
    _id?: string;
    name: string;
}

export const mapCategoryToCategory = (categoryDB: CategoryDB): Category => {
    return {
        uuid: categoryDB._id ?? '',
        name: categoryDB.name,
    }
}