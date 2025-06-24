import styles from "./layout.module.scss";
import { ReactElement, ReactNode } from 'react';

export default async function AuthLayout({
	children
}: Readonly<{
	children: ReactNode;
}>): Promise<ReactElement> {
	return (
		<main className={styles.wrapper}>{children}</main>
	);
}