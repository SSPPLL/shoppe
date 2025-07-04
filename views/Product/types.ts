import { FilterCategory } from '@/model/filters';
import { ProductModel } from '@/model/product';

export interface ProductPageComponentProps {
	product: ProductModel;
	category: FilterCategory;
}