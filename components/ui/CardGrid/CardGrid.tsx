import { CardGridProps } from './types';
import { FC } from 'react';
import styles from './CardGrid.module.scss';
import cn from 'classnames';

export const CardGrid: FC<CardGridProps> = ({ className, size = 'md', children, ...props }) => {
	return (
		<ul className={cn(styles.grid, className, styles[size])} {...props}>
			{children}
		</ul>
	)
};