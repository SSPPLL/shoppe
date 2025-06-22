import { combineWithDefaultMetadata } from '@/config/metadata';
import styles from "./page.module.scss";
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Доставка и возврат"
});

export default function DeliveryAndReturnPage(): ReactElement {
	return (
		<main className={styles.wrapper}>
			<article className={styles.content}>
				<h1 className={styles.title}>Доставка и возврат</h1>
			</article>
		</main>
	);
}
