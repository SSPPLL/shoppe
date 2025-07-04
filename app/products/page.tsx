import { combineWithDefaultMetadata } from '@/config/metadata';
import { loadProductsData } from '@/lib/api/loadProductsData';
import { loadProductsFiltersSearchParams } from '@/lib/loaders/productsFilters';
import { ProductsPageComponent } from '@/views';
import { Metadata } from 'next';
import { SearchParams } from 'nuqs';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Каталог"
});

export default async function ProductsPage({ searchParams }: {
	searchParams: Promise<SearchParams>
}): Promise<ReactElement> {
	const [filters, products] = await loadProductsData({
		page: 1,
		...loadProductsFiltersSearchParams(await searchParams)
	})

	return <ProductsPageComponent products={products} filters={filters} />
}