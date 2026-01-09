export type FilterChip = {
    title: string;
    property?: string;
    rangeDate?: {
        startProperty: string;
        endProperty: string;
    };
}

export type FilterChips = FilterChip[];