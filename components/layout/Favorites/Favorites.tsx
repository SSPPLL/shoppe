import styles from './Favorites.module.scss';
import { FC, ReactElement } from 'react';
import { FavoritesProps } from './types';
import cn from 'classnames';
import { Counter } from '../Counter/Counter';
import { HeartIcon } from '../../icon';
import { declineWordByNumber } from '@/lib/utils/decline-word-by-number';

export const Favorites: FC<FavoritesProps> = ({ className, count, ...props }): ReactElement => {
	return (
		<span className={cn(styles.favorites, className)} {...props}>
			{count && <span className='visually-hidden'>
				{'В избранном ' + count + ' ' + declineWordByNumber(count, ['товар', 'товара', 'товаров'])}
			</span>}
			<HeartIcon className={styles.icon} />
			{count && <Counter className={styles.counter} aria-hidden={true}>{count}</Counter>}
		</span>
	);
};