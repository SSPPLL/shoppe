import { FiltersSearchParams } from '@/model/filters'
import { createLoader, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs/server'
import { getObjectDifference } from '../utils/get-object-difference'

const throttle = {
	throttleMs: 500
}

export const filtersDefaults = {
	name: '',
	priceMin: null,
	priceMax: null,
	categoryId: 0,
	discounted: false
} as const

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

export const getDirtyFilters = (filters: Record<string, unknown>): Partial<FiltersSearchParams> => {
	return getObjectDifference(filtersDefaults, filters);
}

export const loadProductsFiltersSearchParams = createLoader(productsFiltersSearchParams)