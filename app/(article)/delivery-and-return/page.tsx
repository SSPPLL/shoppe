import { combineWithDefaultMetadata } from '@/config/metadata';
import { DeliveryAndReturnPageComponent } from '@/views';
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Доставка и возврат"
});

export default function DeliveryAndReturnPage(): ReactElement {
	return <DeliveryAndReturnPageComponent />
}
