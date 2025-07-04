import { combineWithDefaultMetadata } from '@/config/metadata';
import { TermsOfPurchasePageComponent } from '@/views';
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Условия покупки"
});

export default function TermsOfPurchasePage(): ReactElement {
	return <TermsOfPurchasePageComponent />
}
