'use client'
import { ErrorPageComponent } from '@/views/Error';
import { ReactElement } from 'react';

export default function Error(): ReactElement {
	return <ErrorPageComponent
		title='Ошибка 500'
		description='Что-то пошло не так, попробуйте перезагрузить страницу'
	/>
}