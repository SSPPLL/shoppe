'use client';
import { FC, useState } from 'react';
import { GridProps } from './types';
import { CardGrid } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { ProductCard } from '@/components/entities';
import styles from './Grid.module.scss';
import cn from 'classnames';

export const Grid: FC<GridProps> = ({ className, ...props }) => {
	const [liked, setLiked] = useState(false);
	const [addedToCart, setAddedToCart] = useState(false);

	return (
		<CardGrid className={cn(styles.grid, className)} {...props} >
			<ProductCard
				href={ROUTES.PRODUCT('1')}
				name='Товар'
				nameAs='h2'
				imageSrc='/placeholder.jpg'
				price={1000}
				discount={200}
				liked={liked}
				setLiked={setLiked}
				addedToCart={addedToCart}
				setAddedToCart={setAddedToCart}
			/>
			<ProductCard
				href={ROUTES.PRODUCT('1')}
				name='Товар'
				nameAs='h2'
				imageSrc='/placeholder.jpg'
				price={1000}
				discount={200}
				liked={liked}
				setLiked={setLiked}
				addedToCart={addedToCart}
				setAddedToCart={setAddedToCart}
			/>
		</CardGrid>
	);
}