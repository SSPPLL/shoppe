import { combineWithDefaultMetadata } from '@/config/metadata';
import { FavoritesPageComponent } from '@/views';
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Избранное"
});

export default function FavoritesPage(): ReactElement {
	return <FavoritesPageComponent />
}
