import { combineWithDefaultMetadata } from '@/config/metadata';
import styles from "./page.module.scss";
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Личный кабинет"
});

export default function AccountPage(): ReactElement {
	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Мой аккаунт</h1>
		</main>
	);
}
