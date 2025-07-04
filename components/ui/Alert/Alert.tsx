import { AlertProps } from './types';
import styles from './Alert.module.scss';
import cn from 'classnames';
import CheckIcon from './check.svg';
import { FC, ReactElement } from 'react';

export const Alert: FC<AlertProps> = ({ message, shadow, ...props }): ReactElement => {
	return (
		<span className={cn(styles.alert, { [styles.shadow]: shadow })} {...props}>
			<CheckIcon />
			<span>{message}</span>
		</span>
	)
};