import { combineWithDefaultMetadata } from '@/config/metadata';
import styles from "./page.module.scss";
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Избранное"
});

export default function FavoritesPage(): ReactElement {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Избранное</h1>
		</main>
	);
}
