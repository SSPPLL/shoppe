import { AlertProps } from './types';
import styles from './Alert.module.scss';
import cn from 'classnames';
import CheckIcon from './check.svg';

export const Alert = ({ message, shadow, ...props }: AlertProps) => {
	return (
		<span className={cn(styles.alert, { [styles.shadow]: shadow })} {...props}>
			<CheckIcon />
			<span>{message}</span>
		</span>
	)
};