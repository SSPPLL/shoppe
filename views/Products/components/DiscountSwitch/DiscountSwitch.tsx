'use client';
import cn from 'classnames';
import { FC, useEffect, useMemo, useState, ChangeEvent, useCallback } from 'react';
import { DiscountSwitchProps } from './types';
import { useQueryState } from 'nuqs';
import { debounce } from 'lodash';
import styles from './DiscountSwitch.module.scss';

export const DiscountSwitch: FC<DiscountSwitchProps> = ({ className, ...props }) => {
	const [discountQuery, setDiscountQuery] = useQueryState('discount');
	const [discount, setDiscount] = useState<string>(discountQuery ?? 'false');

	const setDiscountDebounced = useMemo(() => {
		return debounce((discount: string) => setDiscountQuery(discount), 500);
	}, []);

	useEffect(() => {
		if (discount === 'false' && !discountQuery) {
			return;
		}

		setDiscountDebounced(discount);
	}, [discount]);

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setDiscount(event.target.checked.toString());
	}, []);

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<span className={styles.name}>Со скидкой</span>
			<label className={styles.switcher}>
				<input
					aria-label='Фильтровать товары по скидкам'
					className={styles.input}
					type='checkbox'
					name='discount'
					checked={discount === 'true'}
					onChange={onChange}
				/>
				<span></span>
			</label>
		</div>
	);
};