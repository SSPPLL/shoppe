import { Metadata } from 'next';
import { ReactElement } from "react";
import { combineWithDefaultMetadata } from '@/config/metadata';
import { ResetPasswordPageComponent } from '@/views';

export const metadata: Metadata = combineWithDefaultMetadata({
	title: "Новый пароль"
});

export default function ResetPasswordPage(): ReactElement {
	return <ResetPasswordPageComponent />
}
