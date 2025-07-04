import { API } from '@/config/api';
import { ProductModel } from '@/model/product';

export const getProduct = async (sku: string): Promise<ProductModel | null> => {
	const res = await fetch(API.PRODUCT + sku, {
		next: {
			revalidate: 1000,
			tags: ['product']
		}
	})

	if (!res.ok) {
		return null;
	}

	return res.json();
}