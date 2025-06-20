import styles from './Counter.module.scss';
import { FC } from 'react';
import { CounterProps } from './types';
import cn from 'classnames';

export const Counter: FC<CounterProps> = ({ className, children, ...props }) => {
	return (
		<span className={cn(styles.counter, className)} {...props}>{children}</span>
	);
};