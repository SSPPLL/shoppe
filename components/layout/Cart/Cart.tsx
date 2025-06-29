import styles from './Cart.module.scss';
import { FC } from 'react';
import { CartProps } from './types';
import cn from 'classnames';
import { Counter } from '../Counter/Counter';
import { CartIcon } from '../../icon';
import { declineWordByNumber } from '@/lib/utils/decline-word-by-number';

export const Cart: FC<CartProps> = ({ className, count, ...props }) => {
	return (
		<span className={cn(styles.cart, className)} {...props}>
			{count && <span className='visually-hidden'>
				{'В корзине ' + count + ' ' + declineWordByNumber(count, ['товар', 'товара', 'товаров'])}
			</span>}
			<CartIcon className={styles.icon} />
			{count && <Counter className={styles.counter} aria-hidden={true}>{count}</Counter>}
		</span>
	);
};