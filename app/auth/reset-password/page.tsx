import { Metadata } from 'next';
import styles from "./page.module.scss";
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Новый пароль"
});

export default function ResetPasswordPage(): ReactElement {
	return (
		<h1 className={styles.title}>Сброс пароля</h1>
	);
}
