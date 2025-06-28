import { ProductModel } from './product'

export interface ProductsModel {
	totalProducts: number;
	limit: number;
	offset: number;
	products: ProductModel[];
}