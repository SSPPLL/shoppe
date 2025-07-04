import { getFilters } from '@/services/filters'
import { FilterCategory } from '@/model/filters'
import { ProductModel } from '@/model/product'
import { getProduct } from '@/services/product'

export const loadProductData = async (sku: string): Promise<[FilterCategory | null, ProductModel | null]> => {
	const [filters, product] = await Promise.all([
		getFilters(),
		getProduct(sku)
	])

	const categoryIndex = filters
		? filters.categories.findIndex((category: FilterCategory) => category.id === product?.categoryId)
		: -1;

	return [
		filters?.categories[categoryIndex] || null,
		product
	]
}