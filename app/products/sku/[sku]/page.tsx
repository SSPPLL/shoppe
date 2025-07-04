import { ReactElement } from "react";
import { notFound } from 'next/navigation';
import { combineWithDefaultMetadata } from '@/config/metadata';
import { Metadata } from 'next';
import { ProductPageComponent } from '@/views';

export interface PageParams {
	sku: string
}

export const generateMetadata = async ({ params }: {
	params: Promise<PageParams>
}): Promise<Metadata> => {
	const { sku } = await params;

	return combineWithDefaultMetadata({
		title: `Товар | ${sku}`
	});
}

export default async function ProductPage({ params }: {
	params: Promise<PageParams>
}): Promise<ReactElement> {
	const { sku } = await params;

	if (!sku) {
		notFound();
	}

	return <ProductPageComponent sku={sku} />
}