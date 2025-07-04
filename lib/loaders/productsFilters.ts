import { FiltersSearchParams } from '@/model/filters'
import { createLoader, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs/server'

const throttle = {
	throttleMs: 500
}

export const filtersDefaults: FiltersSearchParams = {
	name: '',
	priceMin: null,
	priceMax: null,
	categoryId: 0,
	discounted: false
}

export const productsFiltersSearchParams = {
	name: parseAsString
		.withDefault('')
		.withOptions({
			clearOnDefault: true,
			...throttle
		}),
	priceMin: parseAsInteger.withOptions(throttle),
	priceMax: parseAsInteger.withOptions(throttle),
	categoryId: parseAsInteger
		.withDefault(0)
		.withOptions({
			clearOnDefault: true,
			...throttle
		}),
	discounted: parseAsBoolean
		.withDefault(false)
		.withOptions({
			clearOnDefault: true,
			...throttle
		})
}

export const getDirtyFilters = (filters: FiltersSearchParams): Partial<FiltersSearchParams> => {
	const dirty: Partial<FiltersSearchParams> = {};

	for (const [key, value] of Object.entries(filters)) {
		if (value !== filtersDefaults[key as keyof FiltersSearchParams]) {
			dirty[key as keyof FiltersSearchParams] = value;
		}
	}

	return dirty
}

export const loadProductsFiltersSearchParams = createLoader(productsFiltersSearchParams)