import { combineWithDefaultMetadata } from '@/config/metadata';
import styles from "./page.module.scss";
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "О нас"
});

export default function AboutPage(): ReactElement {
	return (
		<main className={styles.wrapper}>
			<article className={styles.content}>
				<h1 className={styles.title}>О нас</h1>
			</article>
		</main>
	);
}
