'use client';
import { FC, useEffect, useRef, useState, useTransition } from 'react';
import { ProductsPageComponentProps } from './types';
import { isPageNumberValid } from '@/lib/utils/is-page-number-valid';
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filters } from './widgets';
import { Pagination } from '@/components/ui';
import { PRODUCTS_PER_PAGE } from '@/config/products';
import { useFilters } from '@/lib/hooks/useFilters';
import { ProductsGrid } from '@/components/widgets';
import styles from './page.module.scss';
import { ROUTES } from '@/config/routes';
import { useBreakpoint } from '@/lib/hooks/useBreakpoint';

interface IMinMaxValues {
	minDefault: number
	maxDefault: number
	min: number | null
	max: number | null
}

const isMinMaxValuesValid = ({ minDefault, maxDefault, min, max }: IMinMaxValues): boolean => {
	const isMin = min !== null;
	const isMax = max !== null;

	if (isMin && (Number.isNaN(Number(min)) || Number(min) < minDefault)) return false;
	if (isMax && (Number.isNaN(Number(max)) || Number(max) > maxDefault)) return false;
	if (isMin && isMax && Number(min) > Number(max)) return false;

	return true;
}

const getTotalPages = (totalProducts: number): number => Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

export const ProductsPageComponent: FC<ProductsPageComponentProps> = ({ page, products, filters }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const prevSearchParamsRef = useRef<string>(searchParams.toString());
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isMaxLg = useBreakpoint('max', 'lg');
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { filterQueries } = useFilters();
	const { priceMin, priceMax, categoryId } = filterQueries;
	const [totalPages, setTotalPages] = useState<number>(products ? getTotalPages(products.totalProducts) : 1);

	useEffect(() => {
		if (prevSearchParamsRef.current !== searchParams.toString()) {
			startTransition(() => {
				if (pathname.includes('/page/')) {
					router.push(`${ROUTES.PRODUCTS}?${searchParams.toString()}`);

					return;
				}

				router.refresh();
			})
			prevSearchParamsRef.current = searchParams.toString();
		}
	}, [pathname, router, searchParams]);

	useEffect(() => {
		if (products) {
			setTotalPages(getTotalPages(products.totalProducts));
		}
	}, [products]);

	useEffect(() => {
		setIsLoading(false);
	}, [pathname])

	useEffect(() => {
		if (!isMaxLg && (isPending || isLoading)) {
			wrapperRef.current?.scrollIntoView();
		}
	}, [isPending, isLoading, isMaxLg]);

	if (page && !isPageNumberValid(page, totalPages)) {
		notFound();
	}

	if (filters) {
		if (!isMinMaxValuesValid({
			minDefault: filters.minPrice,
			maxDefault: filters.maxPrice,
			min: priceMin,
			max: priceMax,
		})) {
			notFound();
		}

		if (categoryId && !filters.categories.map(({ id }) => id).includes(categoryId)) {
			notFound();
		}
	}

	return (
		<div id='products' className={styles.wrapper} ref={wrapperRef}>
			<h1 className={styles.title}>Каталог товаров</h1>
			{filters && <Filters className={styles.filters} {...filters} />}
			<main className={styles.content}>
				{(isLoading || isPending) && <div className={styles.loading}>Загрузка...</div>}
				{!isLoading && !isPending && products && <ProductsGrid
					className={styles.grid}
					products={products.products}
				/>}
				{!isLoading && !isPending && products && <Pagination
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					className={styles.pagination}
					totalPages={totalPages}
				/>}
				{!isLoading && !isPending && !products && <div className={styles.empty}>Ничего не найдено</div>}
			</main>
		</div>
	);
};