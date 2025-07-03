import { ErrorPageComponent } from '@/views/Error';
import { ReactElement } from 'react';

export default function NotFound(): ReactElement {
	return <ErrorPageComponent
		title='404 ошибка'
		description='Страница не найдена, попробуйте перейти на главную страницу'
	/>
}