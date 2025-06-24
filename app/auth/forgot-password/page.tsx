import { Metadata } from 'next';
import styles from "./page.module.scss";
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Сброс пароля"
});

export default function ForgotPasswordPage(): ReactElement {
	return (
		<h1 className={styles.title}>Забыли пароль?</h1>
	);
}
