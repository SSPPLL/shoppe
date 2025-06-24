import styles from "./layout.module.scss";
import { ReactElement, ReactNode } from 'react';
import { Metadata } from 'next';
import { combineWithDefaultMetadata } from '@/config/metadata';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Товар"
});

export default async function ProductsLayout({
	children,
	info,
}: Readonly<{
	children: ReactNode;
	info: ReactNode;
}>): Promise<ReactElement> {
	return (
		<main className={styles.wrapper}>
			{children}
			{info}
		</main>
	);
}