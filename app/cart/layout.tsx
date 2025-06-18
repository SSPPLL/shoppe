import styles from "./layout.module.scss";
import { ReactElement, ReactNode } from 'react';
import { Metadata } from 'next';
import { combineWithDefaultMetadata } from '@/config/metadata';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Корзина"
});

export default async function CartLayout({
	children,
	form,
	main
}: Readonly<{
	children: ReactNode;
	form: ReactNode;
	main: ReactNode;
}>): Promise<ReactElement> {
	return (
		<main className={styles.wrapper}>
			{children}
			<div className={styles.content}>
				{main}
				{form}
			</div>
		</main>
	);
}