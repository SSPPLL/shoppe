import { FC, ReactElement } from 'react';
import styles from './page.module.scss';
import { ErrorPageComponentProps } from './types';
import { Button } from '@/components/ui';
import { ROUTES } from '@/config/routes';

export const ErrorPageComponent: FC<ErrorPageComponentProps> = ({ title, description }): ReactElement => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.description}>{description}</p>
			<Button
				as="a"
				href={ROUTES.HOME}
				className={styles.button}
				appearance='secondary'
				color='dark'
				adaptive={false}
			>
				Главная страница
			</Button>
		</div>
	)
};