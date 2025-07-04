import { Metadata } from 'next';
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';
import { RegisterPageComponent } from '@/views';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Регистрация"
});

export default function RegisterPage(): ReactElement {
	return <RegisterPageComponent />
}
