'use client';
import { FC, Fragment, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { HeaderProps } from './types';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/config/routes';
import { useSelectedLayoutSegments } from 'next/navigation';
import { match } from 'path-to-regexp';
import { Search } from '../Search/Search';
import { Burger } from '../Burger/Burger';
import styles from './Header.module.scss';
import { LogoutIcon, MagnifierIcon, UserIcon } from '../Icon/Icon';
import { Cart } from '../Cart/Cart';
import { Favorites } from '../Favorites/Favorites';
import { useToggle } from '@/lib/hooks/useToggle';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { RemoveScroll } from 'react-remove-scroll';

const navLinks = [
	{ href: ROUTES.HOME, label: 'Главная', mobile: true },
	{ href: ROUTES.PRODUCTS, label: 'Магазин' },
	{ href: ROUTES.ABOUT, label: 'О нас' },
];

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
	const layoutSegments = useSelectedLayoutSegments();
	const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
	const [burger, setBurger] = useState<boolean>(false);
	const [search, setSearch] = useState<boolean>(false);
	const searchWrapperRef = useRef<HTMLDivElement>(null);
	const [searchValue, setSearchValue] = useState<string>('');
	const {
		status: searchStatus,
		open: openSearch,
		close: closeSearch,
		isOpened: isSearchOpened
	} = useToggle();

	const {
		status: burgerStatus,
		open: openBurger,
		close: closeBurger,
		isOpened: isBurgerOpened,
		isOpening: isBurgerOpening,
		isInAction: isBurgerInAction
	} = useToggle();

	const onBurgerClick = useCallback(async () => {
		if (isBurgerInAction) return;

		if (burger) {
			await closeBurger();
			setBurger(!burger);
		} else {
			setBurger(!burger);
			await openBurger();
		}
	}, [burger, closeBurger, isBurgerInAction, openBurger]);

	const onSearchClick = useCallback(() => {
		setSearch(true);
		openSearch();
	}, [openSearch]);

	useClickOutside(searchWrapperRef as RefObject<HTMLElement>, async () => {
		await closeSearch();

		setSearch(false);
	}, isSearchOpened)

	useEffect(() => {
		if (burger) {
			window.scrollTo(0, 0);
		}
	}, [burger])

	return (
		<>
			<header {...props} className={cn(styles.header, className)}>
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
						aria-hidden={true}
					/>
				</Link>
				<nav className={styles.nav} role='navigation'>
					<div className={styles['nav-list']}>
						{navLinks.map(({ href, label, mobile }) => {

							if (mobile) {
								return <Fragment key={href} />
							}

							return (
								<Link
									key={href}
									className={cn(styles['nav-link'], {
										[styles.active]: match(href, { decode: decodeURIComponent })('/' + layoutSegments[0]),
									})}
									href={href}
									ref={el => {
										linksRef.current.push(el!)
									}}
								>
									{label}
								</Link>
							)
						})}
					</div>
					<div className={cn(styles['search-wrapper'], styles[searchStatus])} ref={searchWrapperRef}>
						{search && <Search
							isOpened={isSearchOpened}
							className={cn(styles.search, styles[searchStatus])}
							value={searchValue}
							setValue={setSearchValue}
						/>}
						<button
							title='Открыть поиск'
							aria-label='Открыть поиск'
							className={cn(styles['search-button'], styles[searchStatus])}
							type='button'
							onClick={onSearchClick}
							tabIndex={search ? -1 : 0}
						>
							<MagnifierIcon />
						</button>
					</div>
					<Link
						title='Корзина'
						className={cn(styles.cart, styles.item)}
						href={ROUTES.CART}
					>
						<span className='visually-hidden'>Корзина</span>
						<Cart count={3} />
					</Link>
					<Link
						title='Избранное'
						className={cn(styles.favorites, styles.item)}
						href={ROUTES.FAVORITES}
					>
						<span className='visually-hidden'>Избранное</span>
						<Favorites count={3} />
					</Link>
					<Link
						title='Мой аккаунт'
						className={cn(styles.user, styles.item)}
						href={ROUTES.AUTH.LOGIN}
					>
						<span className='visually-hidden'>Мой аккаунт</span>
						<UserIcon />
					</Link>
					<Link
						title='Выйти из аккаунта'
						className={cn(styles.logout, styles.item, styles.hidden)}
						href={ROUTES.AUTH.LOGOUT}
					>
						<span className='visually-hidden'>Выйти из аккаунта</span>
						<LogoutIcon />
					</Link>
					<Burger
						className={styles.burger}
						isOpened={isBurgerOpened || isBurgerOpening}
						onClick={onBurgerClick}
					/>
				</nav>
				<Search
					className={cn(styles['search-mobile'])}
					disableTabIndex={isBurgerOpened}
					setValue={setSearchValue}
					value={searchValue}
				/>
			</header>
			{burger && <RemoveScroll>
				<div className={cn(styles.menu, styles[burgerStatus])}>
					<Search className={cn(styles['menu-search'])} setValue={setSearchValue} value={searchValue} />
					<div className={styles['menu-outer']}>
						<div className={styles['menu-inner']}>
							<div className={styles['menu-list']}>
								{navLinks.map(({ href, label }) => (
									<Link
										key={label}
										className={styles['menu-link']}
										href={href}
									>
										{label}
									</Link>
								))}
							</div>
							<Link
								title='Мой аккаунт'
								className={cn(styles['menu-link'], styles['menu-link-icon'])}
								href={ROUTES.AUTH.LOGIN}
							>
								<UserIcon />
								<span>Мой аккаунт</span>
							</Link>
							<Link
								title='Избранное'
								className={cn(styles['menu-link'], styles['menu-link-icon'])}
								href={ROUTES.FAVORITES}
							>
								<Favorites count={3} />
								<span>Избранное</span>
							</Link>

							<Link
								title='Выйти из аккаунта'
								className={cn(styles['menu-link'], styles['menu-link-icon'])}
								href={ROUTES.AUTH.LOGOUT}
							>
								<LogoutIcon />
								<span>Выход <span className='visually-hidden'>из аккаунта</span></span>
							</Link>
						</div>
					</div>
				</div>
			</RemoveScroll>}
		</>
	);
};