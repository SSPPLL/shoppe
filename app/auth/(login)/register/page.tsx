import { Metadata } from 'next';
import styles from "./page.module.scss";
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Регистрация"
});

export default function RegisterPage(): ReactElement {
	return (
		<form className={styles.form}></form>
	);
}
