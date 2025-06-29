'use client';
import { FC, memo, useState } from 'react';
import { ProductsGridProps } from './types';
import { ROUTES } from '@/config/routes';
import { ProductCard } from '@/components/entities';
import styles from './ProductsGrid.module.scss';
import cn from 'classnames';

const ProductsGridComponent: FC<ProductsGridProps> = ({ className, size = 'md', products, ...props }) => {
	const [liked, setLiked] = useState(false);
	const [addedToCart, setAddedToCart] = useState(false);

	return (
		<ul className={cn(styles.grid, styles[size], className)} {...props} >
			{products.map((product, id) => (
				<ProductCard
					key={id}
					href={ROUTES.PRODUCT(product.sku.toString())}
					name={product.name}
					nameAs='h2'
					imageSrc={product.images[0]}
					price={product.price}
					discount={product.discount}
					liked={liked}
					setLiked={setLiked}
					addedToCart={addedToCart}
					setAddedToCart={setAddedToCart}
				/>
			))}
		</ul>
	);
}

export const ProductsGrid = memo(ProductsGridComponent)