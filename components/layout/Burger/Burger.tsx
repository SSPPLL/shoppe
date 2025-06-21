'use client';
import styles from './Burger.module.scss';
import { FC, useEffect, useState } from 'react';
import { BurgerProps } from './types';
import cn from 'classnames';

export const Burger: FC<BurgerProps> = ({ className, isOpened, ...props }) => {
	const [burgerTrgiggered, setBurgerTriggered] = useState<boolean>(false);

	useEffect(() => {
		if (isOpened && !burgerTrgiggered) {
			setBurgerTriggered(true);
		}
	}, [burgerTrgiggered, isOpened]);

	return (
		<>
			{burgerTrgiggered && <span
				className='visually-hidden'
				role='log'
			>
				{isOpened ? 'меню открыто' : 'меню закрыто'}
			</span>}
			<button
				className={cn(styles.burger, className, {
					[styles.opened]: isOpened
				})}
				aria-label={isOpened ? 'Закрыть меню' : 'Открыть меню'}
				{...props}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</>
	);
};