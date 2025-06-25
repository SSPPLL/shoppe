import { Metadata } from 'next';
import { ReactElement } from "react";
import { notFound } from 'next/navigation';
import { combineWithDefaultMetadata } from '@/config/metadata';
import { OrderPageComponent } from '@/views';

interface PageParams {
	id: string
}

export const generateMetadata = async ({ params }: {
	params: Promise<PageParams>
}): Promise<Metadata> => {
	const { id } = await params;

	return combineWithDefaultMetadata({
		title: `Информация о заказе №${id}`
	});
}

export default async function OrderPage({ params }: {
	params: Promise<PageParams>
}): Promise<ReactElement> {
	const { id } = await params;

	if (!id) {
		notFound();
	}

	return <OrderPageComponent id={id} />
}
