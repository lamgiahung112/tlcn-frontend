export type Sortable<T extends string> = {
	[key in T]: "asc" | "desc" | undefined
}

export type Pagable = {
	page: number
	size: number
}
