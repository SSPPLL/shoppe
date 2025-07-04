import { combineWithDefaultMetadata } from '@/config/metadata';
import { AboutPageComponent } from '@/views';
import { Metadata } from 'next';
import { ReactElement } from "react";

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "О нас"
});

export default function AboutPage(): ReactElement {
	return <AboutPageComponent />
}
