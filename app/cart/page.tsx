import { combineWithDefaultMetadata } from '@/config/metadata';
import { ReactElement } from "react";
import { Metadata } from 'next';
import { CartPageComponent } from '@/views/Cart';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Корзина"
});

export default function CartPage(): ReactElement {
	return <CartPageComponent />
}
