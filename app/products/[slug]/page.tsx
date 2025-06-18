import styles from "./page.module.scss";
import { ReactElement } from "react";
import { notFound } from 'next/navigation';
import { ProductPageParams } from './types';

export default async function ProductPage({ params }: {
	params: Promise<ProductPageParams>
}): Promise<ReactElement> {
	const { slug } = await params;

	if (!slug) {
		notFound();
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Товар {slug}</h1>
		</div>
	);
}
