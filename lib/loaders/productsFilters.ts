import { createLoader, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs/server'

const throttle = {
	throttleMs: 500
}

export const productsFiltersSearchParams = {
	name: parseAsString.withOptions({
		clearOnDefault: true,
		...throttle
	}),
	priceMin: parseAsInteger.withOptions(throttle),
	priceMax: parseAsInteger.withOptions(throttle),
	categoryId: parseAsInteger
		.withOptions({
			clearOnDefault: true,
			...throttle
		}),
	discounted: parseAsBoolean
		.withOptions({
			clearOnDefault: true,
			...throttle
		})
}

export const loadProductsFiltersSearchParams = createLoader(productsFiltersSearchParams)