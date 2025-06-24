import styles from "./page.module.scss";
import { ReactElement } from "react";
import { notFound } from 'next/navigation';
import { ProductPageParams } from './types';

export default async function ProductPage({ params }: {
	params: Promise<ProductPageParams>
}): Promise<ReactElement> {
	const { sku } = await params;

	if (!sku) {
		notFound();
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Товар {sku}</h1>
		</div>
	);
}
