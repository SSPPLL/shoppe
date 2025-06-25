import { Metadata } from 'next';
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';
import { LoginPageComponent } from '@/views';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Вход"
});

export default function LoginPage(): ReactElement {
	return <LoginPageComponent />
}
