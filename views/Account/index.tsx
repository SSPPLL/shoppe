import { FC } from 'react';
import styles from './page.module.scss';

export const AccountPageComponent: FC = () => {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Мой аккаунт</h1>
		</main>
	);
};