import { FC } from 'react';
import styles from './page.module.scss';
import { ProductPageComponentProps } from './types';

export const ProductPageComponent: FC<ProductPageComponentProps> = ({ sku }) => {
	return (
		<main className={styles.wrapper}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Товар {sku}</h1>
			</div>
			<div className={styles.info}></div>
		</main>
	);
};