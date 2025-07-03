import { FC, memo, ReactElement } from 'react';
import styles from './page.module.scss';

export const AccountPageComponent: FC = memo(function Component(): ReactElement {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Мой аккаунт</h1>
		</main>
	);
});