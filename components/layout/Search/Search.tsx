'use client';
import styles from './Search.module.scss';
import { FC, FormEvent, useCallback, useEffect, useRef } from 'react';
import { SearchProps } from './types';
import cn from 'classnames';
import { ROUTES } from '@/config/routes';
import { MagnifierIcon } from '../Icon/Icon';

export const Search: FC<SearchProps> = ({
	disableTabIndex = false,
	value,
	setValue,
	isOpened,
	className,
	...props
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isOpened) {
			inputRef.current?.focus();
		} else {
			inputRef.current?.blur();
		}
	}, [isOpened])

	const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
		if (setValue) {
			setValue(event.currentTarget.value);
		}
	}, [setValue])

	return (
		<form
			className={cn(styles.form, className)}
			action={ROUTES.PRODUCTS}
			role='search'
			{...props}
		>
			<label
				className={styles.label}
			>
				<input
					className={styles.input}
					type='search'
					placeholder='Поиск'
					name='q'
					required
					ref={inputRef}
					tabIndex={disableTabIndex ? -1 : 0}
					onInput={onInput}
					value={value}
				/>
			</label>
			<button
				aria-label='Искать'
				className={styles.submit}
				type='submit'
				tabIndex={disableTabIndex ? -1 : 0}
			>
				<MagnifierIcon />
			</button>
		</form>
	);
};