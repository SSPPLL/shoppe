import { Pagination } from '@/components/layout';
import styles from "./layout.module.scss";
import { ReactElement, ReactNode } from 'react';
import { Metadata } from 'next';
import { combineWithDefaultMetadata } from '@/config/metadata';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Каталог"
});

export default async function ProductsLayout({
	children,
	heading,
	sidebar,
}: Readonly<{
	children: ReactNode;
	heading: ReactNode;
	sidebar: ReactNode;
}>): Promise<ReactElement> {
	return (
		<div className={styles.wrapper}>
			{heading}
			<div className={styles.sidebar}>{sidebar}</div>
			<main className={styles.content}>
				{children}
				<Pagination className={styles.pagination} totalPages={24} />
			</main>
		</div>
	);
}