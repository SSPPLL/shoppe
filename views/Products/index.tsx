import { FC } from 'react';
import { ProductsPageComponentProps } from './types';
import { Pagination, Search } from './components';
import styles from './page.module.scss';
import { isPageNumberValid } from '@/lib/utils/isPageNumberValid';
import { notFound } from 'next/navigation';

export const ProductsPageComponent: FC<ProductsPageComponentProps> = ({ page }) => {
	if (page && !isPageNumberValid(page, 24)) {
		notFound();
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Каталог товаров</h1>
			<aside className={styles.aside}>
				<Search className={styles.search} />
			</aside>
			<main className={styles.content}>
				<Pagination className={styles.pagination} totalPages={24} />
			</main>
		</div>
	);
};