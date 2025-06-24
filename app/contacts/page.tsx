import { combineWithDefaultMetadata } from '@/config/metadata';
import styles from "./page.module.scss";
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Контакты"
});

export default function ContactsPage(): ReactElement {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Контакты</h1>
		</main>
	);
}
