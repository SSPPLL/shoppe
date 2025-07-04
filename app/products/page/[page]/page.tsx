import { combineWithDefaultMetadata } from '@/config/metadata';
import { loadProductsData } from '@/lib/api/loadProductsData';
import { loadProductsFiltersSearchParams } from '@/lib/loaders/productsFilters';
import { ProductsPageComponent } from '@/views';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { ReactElement } from "react";

interface PageParams {
	page: string
}

export const generateMetadata = async ({ params }: {
	params: Promise<PageParams>
}): Promise<Metadata> => {
	const { page } = await params;

	return combineWithDefaultMetadata({
		title: `Каталог | Страница ${page}`
	});
}

export default async function ProductsPaginationPage({ params, searchParams }: {
	params: Promise<PageParams>,
	searchParams: Promise<SearchParams>
}): Promise<ReactElement> {
	const { page } = await params;
	const [filters, products] = await loadProductsData({
		page: Number(page),
		...loadProductsFiltersSearchParams(await searchParams)
	})

	if (!page) {
		notFound();
	}

	return <ProductsPageComponent page={page} products={products} filters={filters} />
}
