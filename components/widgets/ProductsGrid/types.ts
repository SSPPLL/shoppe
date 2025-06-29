import { ProductModel } from '@/model/product';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductsGridProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	products: ProductModel[],
	size?: 'lg' | 'md';
};