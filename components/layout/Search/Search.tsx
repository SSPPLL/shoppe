import styles from './Search.module.scss';
import { FC, RefObject, useCallback, useEffect, useRef } from 'react';
import { SearchProps } from './types';
import cn from 'classnames';
import { ROUTES } from '@/config/routes';
import { useToggle } from '@/lib/hooks/useToggle';
import MagnifierIcon from './magnifier.svg';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export const Search: FC<SearchProps> = ({
	setStatus,
	className,
	...props
}) => {
	const formRef = useRef<HTMLFormElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const submitRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { status, open, close, isClosed, isOpened } = useToggle('closed', 300);
	const isMaxMd = useMediaQuery('max', 'md');

	useEffect(() => {
		if (setStatus) {
			setStatus(status);
		}
	}, [setStatus, status])

	useEffect(() => {
		if (isOpened) {
			inputRef.current?.focus();
		}
	}, [isOpened])

	useEffect(() => {
		if (isClosed) {
			inputRef.current?.blur();
			submitRef.current?.blur();
		}
	}, [isClosed])

	useClickOutside(formRef as RefObject<HTMLElement>, close, isOpened);

	const onButtonClick = useCallback(() => {
		open();
	}, [open])

	return (
		<form
			className={cn(styles.form, className)}
			action={ROUTES.PRODUCTS}
			ref={formRef}
			{...props}
		>
			<label
				className={cn(styles.label, styles[status])}
			>
				<input
					className={styles.input}
					type='search'
					placeholder='Поиск'
					name='q'
					tabIndex={isClosed && !isMaxMd ? -1 : 0}
					required
					ref={inputRef}
				/>
			</label>
			<button
				aria-label='Искать'
				className={cn(styles.submit, styles[status])}
				type='submit'
				tabIndex={isClosed && !isMaxMd ? -1 : 0}
				ref={submitRef}
			>
				<MagnifierIcon />
			</button>
			{!isOpened && <button
				className={cn(styles.button, styles[status])}
				onClick={onButtonClick}
				tabIndex={isClosed && !isMaxMd ? 0 : -1}
				aria-label='открыть поиск'
				ref={buttonRef}
				type='button'
			>
			</button>}
		</form>
	);
};