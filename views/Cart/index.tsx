import { FC } from 'react';
import styles from './page.module.scss';

export const CartPageComponent: FC = () => {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Корзина</h1>
			<div className={styles.content}>
				<div className={styles.cart}></div>
				<form className={styles.form}></form>
			</div>
		</main>
	);
};