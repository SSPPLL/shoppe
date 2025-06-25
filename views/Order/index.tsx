import { FC } from 'react';
import { OrderPageComponentProps } from './types';
import styles from './page.module.scss';

export const OrderPageComponent: FC<OrderPageComponentProps> = ({ id }) => {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Мы получили ваш заказ</h1>
			<div className={styles.content}>
				{id}
			</div>
		</main>
	);
};