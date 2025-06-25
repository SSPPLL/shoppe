import { combineWithDefaultMetadata } from '@/config/metadata';
import { ContactsPageComponent } from '@/views';
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Контакты"
});

export default function ContactsPage(): ReactElement {
	return <ContactsPageComponent />
}
