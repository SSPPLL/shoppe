export interface FilterCategory {
	id: number,
	name: string
}

export interface FiltersModel {
	categories: FilterCategory[],
	maxPrice: number,
	minPrice: number
}

export interface FiltersSearchParams {
	priceMin: number | null,
	priceMax: number | null,
	categoryId: number | null,
	discounted: boolean | null,
	name: string | null,
}