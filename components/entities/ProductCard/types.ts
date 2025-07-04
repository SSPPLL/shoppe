import { ProductModel } from '@/model/product';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductCardProps extends DetailedHTMLProps<
	HTMLAttributes<HTMLLIElement>, HTMLLIElement
>, Pick<ProductModel, 'name' | 'price' | 'discount'> {
	nameAs: 'h2' | 'h3' | 'div';
	imageSrc: string;
	liked: boolean;
	setLiked: (liked: boolean) => void;
	addedToCart: boolean;
	setAddedToCart: (addedToCart: boolean) => void;
	href: string;
}