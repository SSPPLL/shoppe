import { FC } from 'react';
import { ProductsPageComponentProps } from './types';
import { isPageNumberValid } from '@/lib/utils/isPageNumberValid';
import { notFound } from 'next/navigation';
import { getFilters } from '@/services/filters';
import { Filters, Grid } from './widgets';
import styles from './page.module.scss';
import { Pagination } from '@/components/ui';

const PAGES_TOTAL_COUNT = 24;

export const ProductsPageComponent: FC<ProductsPageComponentProps> = async ({ page }) => {
	const filters = await getFilters();

	if (!filters) {
		notFound();
	}

	if (page && !isPageNumberValid(page, PAGES_TOTAL_COUNT)) {
		notFound();
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Каталог товаров</h1>
			<Filters className={styles.filters} {...filters} />
			<main className={styles.content}>
				<Grid className={styles.grid} />
				<Pagination className={styles.pagination} totalPages={PAGES_TOTAL_COUNT} />
			</main>
		</div>
	);
};