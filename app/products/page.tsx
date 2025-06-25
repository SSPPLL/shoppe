import { combineWithDefaultMetadata } from '@/config/metadata';
import { ProductsPageComponent } from '@/views';
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Каталог"
});

export default function ProductsPage(): ReactElement {
	return <ProductsPageComponent />
}