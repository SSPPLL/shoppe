import { FiltersModel } from '@/model/filters';
import { ProductsModel } from '@/model/products';

export interface ProductsPageComponentProps {
	page?: string,
	products: ProductsModel | null,
	filters: FiltersModel | null
}