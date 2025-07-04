import { API } from '@/config/api';
import { objectToQueryString } from '@/lib/utils/query-string';
import { FiltersSearchParams } from '@/model/filters';
import { ProductsModel } from '@/model/products';

export interface GetProductsParams extends Partial<FiltersSearchParams> {
	limit: number;
	offset: number;
}

export const getProducts = async (params?: GetProductsParams): Promise<ProductsModel | null> => {
	const res = await fetch(API.PRODUCTS + (params ? `?${objectToQueryString(params)}` : ''), {
		next: {
			revalidate: 1000,
			tags: ['products']
		}
	})

	if (!res.ok) {
		return null;
	}

	return res.json();
}