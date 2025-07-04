import { FC, ReactElement } from 'react';
import styles from './page.module.scss';
import { ProductPageComponentProps } from './types';
import { Rating } from '@/components/ui';

export const ProductPageComponent: FC<ProductPageComponentProps> = ({ product, category }): ReactElement => {
	return (
		<main className={styles.wrapper}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Товар {product.name} в категории {category.name}</h1>
				<Rating rating={0} isEditable />
			</div>
			<div className={styles.info}></div>
		</main>
	);
};