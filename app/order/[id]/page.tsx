import styles from "./page.module.scss";
import { Metadata } from 'next';
import { ReactElement } from "react";
import { notFound } from 'next/navigation';
import { combineWithDefaultMetadata } from '@/config/metadata';

interface PageParams {
	id: string
}

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Информация о заказе"
});

export default async function OrderPage({ params }: {
	params: Promise<PageParams>
}): Promise<ReactElement> {
	const { id } = await params;

	if (!id) {
		notFound();
	}

	return (
		<main className={styles.wrapper}>
			<h1 className={styles.title}>Мы получили ваш заказ</h1>
			<div className={styles.content}>
				{id}
			</div>
		</main>
	);
}
