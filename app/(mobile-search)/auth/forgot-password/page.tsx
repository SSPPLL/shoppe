import { Metadata } from 'next';
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';
import { ForgotPasswordPageComponent } from '@/views';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Сброс пароля"
});

export default function ForgotPasswordPage(): ReactElement {
	return <ForgotPasswordPageComponent />
}
