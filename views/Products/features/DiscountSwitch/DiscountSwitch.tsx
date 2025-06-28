'use client';
import cn from 'classnames';
import { FC, useMemo, useState, ChangeEvent, useCallback } from 'react';
import { DiscountSwitchProps } from './types';
import { useQueryState } from 'nuqs';
import { debounce } from 'lodash';
import styles from './DiscountSwitch.module.scss';
import { Switch } from '@/components/ui';

export const DiscountSwitch: FC<DiscountSwitchProps> = ({ className, mainTabIndex = 0, ...props }) => {
	const [discountQuery, setDiscountQuery] = useQueryState('discounted');
	const [discount, setDiscount] = useState<string>(discountQuery ?? 'false');

	const setDiscountDebounced = useMemo(() => {
		return debounce((discount: string) => setDiscountQuery(discount), 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setDiscount(event.target.checked.toString());
	}, []);

	if ((discountQuery && discountQuery !== discount) || (!discountQuery && discount !== 'false')) {
		setDiscountDebounced(discount);
	}

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<span className={styles.name}>Со скидкой</span>
			<Switch
				aria-label='Фильтровать товары по скидкам'
				name='discount'
				checked={discount === 'true'}
				onChange={onChange}
				tabIndex={mainTabIndex}
			/>
		</div>
	);
};