'use client';
import cn from 'classnames';
import { FC, KeyboardEvent, ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { SearchProps } from './types';
import styles from './Search.module.scss';
import { Input } from '@/components/ui';
import { MagnifierIcon } from '@/components/icon';
import { useQueryState } from 'nuqs';

let isInputChanged = false;

export const Search: FC<SearchProps> = ({ className, ...props }) => {
	const [searchValue, setSearchValue] = useQueryState('search');
	const [inputValue, setInputValue] = useState<string>(searchValue || '');
	const setValueToQuery = useCallback(() => {
		if (!isInputChanged) {
			return;
		}

		isInputChanged = false;
		setSearchValue(inputValue)
	}, [inputValue, setSearchValue]);

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			setValueToQuery();
		}
	}, [setValueToQuery]);

	const onBlur = useCallback(() => setValueToQuery(), [setValueToQuery]);

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		isInputChanged = true;
		setInputValue(event.target.value);
	}, []);

	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValueToQuery();
	}, [setValueToQuery]);

	return (
		<form className={cn(styles.search, className)} {...props} onSubmit={onSubmit} role='search'>
			<Input
				className={styles.label}
				inputClassName={styles.input}
				placeholder='Поиск...'
				name='search'
				type='search'
				aria-label='Поиск'
				value={inputValue}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
				onChange={onChange}
			/>
			<button
				className={styles.button}
				type='submit'
				aria-label='Искать'
			>
				<MagnifierIcon className={styles.icon} />
			</button>
		</form>
	);
};