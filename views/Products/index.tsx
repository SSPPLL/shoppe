import { FC } from 'react';
import { ProductsPageComponentProps } from './types';
import { Filters, Pagination } from './components';
import styles from './page.module.scss';
import { isPageNumberValid } from '@/lib/utils/isPageNumberValid';
import { notFound } from 'next/navigation';

const PAGES_TOTAL_COUNT = 24;

export const ProductsPageComponent: FC<ProductsPageComponentProps> = ({ page }) => {
	if (page && !isPageNumberValid(page, PAGES_TOTAL_COUNT)) {
		notFound();
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Каталог товаров</h1>
			<Filters className={styles.filters} defaultMin={0} defaultMax={180} />
			<main className={styles.content}>
				<Pagination className={styles.pagination} totalPages={PAGES_TOTAL_COUNT} />
			</main>
		</div>
	);
};