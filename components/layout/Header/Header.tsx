'use client';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HeaderProps } from './types';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/config/routes';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { Counter } from '../Counter/Counter';
import HeartIcon from './icons/heart.svg';
import UserIcon from './icons/user.svg';
import LogoutIcon from './icons/logout.svg';
import CartIcon from './icons/cart.svg';
import { Search } from '../Search/Search';
import styles from './Header.module.scss';
import { TToggleStatus, useToggle } from '@/lib/hooks/useToggle';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useScrollY } from '@/lib/hooks/useScrollY';
import { declineWordByNumber } from '@/lib';

const navLinks = [
	{ href: ROUTES.HOME, label: 'Главная', hide: true },
	{ href: ROUTES.PRODUCTS, label: 'Магазин' },
	{ href: ROUTES.ABOUT, label: 'О нас' },
];

const itemWords: [string, string, string] = ['товар', 'товара', 'товаров'];

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
	const pathname = usePathname();
	const [searchStatus, setSearchStatus] = useState<TToggleStatus>('closed');
	const isMaxLg = useMediaQuery('max', 'lg');
	const { status, toggle, close, isOpened } = useToggle();
	const menuItemsTabIndex = useMemo(() => (isMaxLg && isOpened) || !isMaxLg ? 0 : -1, [isMaxLg, isOpened]);
	const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
	const [shadow, setShadow] = useState<boolean>(false);
	const scrolled = useRef<boolean>(false);
	const scrollY = useScrollY();
	const lastScrollY = useRef<number>(0);
	const [hidden, setHidden] = useState<boolean>(false);
	const [burgerClicked, setBurgerClicked] = useState<boolean>(false);

	useEffect(() => {
		if (!scrollY || !isMaxLg || isOpened) {
			return;
		}

		if (scrollY > 200) {
			setShadow(true);
		} else {
			setShadow(false);
		}

		if (!scrolled.current) {
			scrolled.current = true;
			return;
		}

		if (scrollY > 200 && lastScrollY.current < scrollY) {
			setHidden(true);
		} else {
			setHidden(false);
		}

		lastScrollY.current = scrollY;
	}, [isMaxLg, scrollY])

	useEffect(() => {
		if (!isMaxLg) {
			close();
		}
	}, [close, isMaxLg])

	useEffect(() => {
		if (isOpened) {
			close();
		}
	}, [pathname])

	useEffect(() => {
		if (isOpened) {
			linksRef.current[0]?.focus();
		}
	}, [isOpened])

	const onBurgerClick = useCallback(() => {
		toggle();

		setBurgerClicked(true);

	}, [toggle]);

	return (
		<header {...props} className={cn(styles.header, className, {
			[styles.shadow]: shadow,
			[styles.hidden]: hidden
		})}>
			<Link
				className={styles['logo-link']}
				href={ROUTES.HOME}
				aria-label='на главную'
			>
				<Image
					className={styles.logo}
					src={'/logo.svg'}
					alt='Shoppe - интернет-магазин'
					width={128}
					height={26}
					loading='eager'
				/>
			</Link>
			<nav className={styles.nav} role='navigation'>
				<div className={cn(styles['nav-wrapper'], styles[status])} >
					<div className={styles['nav-outer']}>
						<div className={styles['nav-list']}>
							{navLinks.map(({ href, label, hide }) => (
								<Link
									key={href}
									className={cn(styles['nav-link'], {
										[styles.active]: match(pathname)(href),
										[styles.hide]: hide,
									})}
									href={href}
									tabIndex={menuItemsTabIndex}
									ref={el => {
										linksRef.current.push(el!)
									}}
								>
									{label}
								</Link>
							))}
						</div>
						<Link
							title='Избранное'
							className={cn(styles.favorites, styles.item, styles[searchStatus])}
							href={ROUTES.FAVORITES}
							tabIndex={menuItemsTabIndex}
						>
							<span className={styles['favorites-icon']}>
								<HeartIcon />
								<Counter className={styles.counter} aria-hidden='true'>3</Counter>
							</span>
							<span className={styles.label}>
								Избранное
								<span className='visually-hidden'>3 {declineWordByNumber(3, itemWords)}</span>
							</span>
						</Link>
						<Link
							title='Мой аккаунт'
							className={cn(styles.user, styles.item)}
							href={ROUTES.AUTH.LOGIN}
							tabIndex={menuItemsTabIndex}
						>
							<UserIcon />
							<span className={styles.label}>Мой аккаунт</span>
						</Link>
						<Link
							title='Выйти из аккаунта'
							className={cn(styles.logout, styles.item, styles.hidden)}
							href={ROUTES.AUTH.LOGOUT}
							tabIndex={menuItemsTabIndex}
						>
							<LogoutIcon />
							<span className={styles.label}>Выход <span className='visually-hidden'>из аккаунта</span></span>
						</Link>
					</div>
				</div>
				<Search className={styles.search} setStatus={setSearchStatus} />
				<Link
					title='Корзина'
					className={styles.cart}
					href={ROUTES.CART}
				>
					<span className='visually-hidden'>Корзина, 3 {declineWordByNumber(3, itemWords)}</span>
					<CartIcon />
					<Counter
						className={cn(styles.counter, styles['cart-counter'])}
						aria-hidden='true'
					>
						3
					</Counter>
				</Link>
				{burgerClicked && <span
					className='visually-hidden'
					role='log'
				>
					{isOpened ? 'меню открыто' : 'меню закрыто'}
				</span>}
				<button
					className={cn(styles.burger, styles[status])}
					tabIndex={isMaxLg ? 0 : -1}
					aria-label={isOpened ? 'Закрыть меню' : 'Открыть меню'}
					onClick={onBurgerClick}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</nav>
		</header>
	);
};