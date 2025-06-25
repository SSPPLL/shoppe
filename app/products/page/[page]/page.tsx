import { combineWithDefaultMetadata } from '@/config/metadata';
import { ProductsPageComponent } from '@/views';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

export default async function ProductsPaginationPage({ params }: {
	params: Promise<PageParams>
}): Promise<ReactElement> {
	const { page } = await params;

	if (!page) {
		notFound();
	}

	return <ProductsPageComponent page={page} />
}
