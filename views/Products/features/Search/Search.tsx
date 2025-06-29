'use client';
import cn from 'classnames';
import { FC, KeyboardEvent, ChangeEvent, FormEvent, useCallback, useState, useEffect } from 'react';
import { SearchProps } from './types';
import styles from './Search.module.scss';
import { Input } from '@/components/ui';
import { MagnifierIcon } from '@/components/icon';
import { useFilters } from '@/lib/hooks/useFilters';

let isInputChanged = false;

export const Search: FC<SearchProps> = ({ className, mainTabIndex = 0, ...props }) => {
	const { filterQueries, setFilterQueries } = useFilters();
	const { name } = filterQueries;
	const [inputValue, setInputValue] = useState<string>(name || '');
	const setValueToQuery = useCallback(() => {
		if (!isInputChanged) {
			return;
		}

		isInputChanged = false;
		setFilterQueries({ name: inputValue === '' ? null : inputValue.trim() });
	}, [inputValue, setFilterQueries]);

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

	useEffect(() => {
		setInputValue(name || '');
	}, [name])

	return (
		<form className={cn(styles.search, className)} {...props} onSubmit={onSubmit} role='search'>
			<Input
				className={styles.label}
				inputClassName={styles.input}
				placeholder='Поиск...'
				name='name'
				type='search'
				aria-label='Поиск'
				value={inputValue}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
				onChange={onChange}
				tabIndex={mainTabIndex}
			/>
			<button
				className={styles.button}
				type='submit'
				aria-label='Искать'
				tabIndex={mainTabIndex}
			>
				<MagnifierIcon className={styles.icon} />
			</button>
		</form>
	);
};