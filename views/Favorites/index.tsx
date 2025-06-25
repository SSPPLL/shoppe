import { FC } from 'react';
import styles from './page.module.scss';

export const FavoritesPageComponent: FC = () => {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Избранное</h1>
		</main>
	);
};