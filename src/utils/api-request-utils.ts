export type Sortable<T extends string> = {
    [key in T]: 'ASC' | 'DESC' | undefined
}

export type Pagable = {
    page: number;
    size: number;
}