import { FC } from 'react';
import styles from './page.module.scss';
import { ProductPageComponentProps } from './types';
import { Rating } from '@/components/ui';

export const ProductPageComponent: FC<ProductPageComponentProps> = ({ sku }) => {
	return (
		<main className={styles.wrapper}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Товар {sku}</h1>
				<Rating rating={0} isEditable />
			</div>
			<div className={styles.info}></div>
		</main>
	);
};