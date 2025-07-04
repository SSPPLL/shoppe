import { ProductCardProps } from '@/components/entities/ProductCard/types';
import { ProductModel } from '@/model/product';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductsGridProps extends DetailedHTMLProps<
	HTMLAttributes<HTMLUListElement>, HTMLUListElement
>, Partial<Pick<ProductCardProps, 'nameAs'>> {
	products: ProductModel[],
	size?: 'lg' | 'md';
};