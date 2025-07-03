import { combineWithDefaultMetadata } from '@/config/metadata';
import { Metadata } from 'next';
import { ReactElement } from "react";
import { AccountPageComponent } from '@/views';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Личный кабинет"
});

export default function AccountPage(): ReactElement {
	return <AccountPageComponent />
}
