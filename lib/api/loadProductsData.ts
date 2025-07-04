import { getFilters } from '@/services/filters'
import { getProducts } from '@/services/products'
import { PRODUCTS_PER_PAGE } from '@/config/products'
import { FiltersModel, FiltersSearchParams } from '@/model/filters'
import { ProductsModel } from '@/model/products'

export interface LoadProductsDataParams extends Partial<FiltersSearchParams> {
	page: number
}

export const loadProductsData = async ({
	page,
	priceMax,
	priceMin,
	categoryId,
	discounted,
	name
}: LoadProductsDataParams): Promise<[FiltersModel | null, ProductsModel | null]> => {
	return await Promise.all([
		getFilters(),
		getProducts({
			limit: PRODUCTS_PER_PAGE,
			offset: (page - 1) * PRODUCTS_PER_PAGE,
			priceMax,
			priceMin,
			categoryId,
			name,
			discounted
		})
	])
}