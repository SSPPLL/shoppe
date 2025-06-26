export interface FilterCategory {
	id: number,
	name: string
}

export interface FiltersModel {
	categories: FilterCategory[],
	maxPrice: number,
	minPrice: number
}