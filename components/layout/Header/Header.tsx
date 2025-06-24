'use client';
import { FC, Fragment, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { HeaderProps } from './types';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/config/routes';
import { usePathname } from 'next/navigation';
import { Search } from '../Search/Search';
import { Burger } from '../Burger/Burger';
import { LogoutIcon, MagnifierIcon, UserIcon } from '../Icon/Icon';
import { Cart } from '../Cart/Cart';
import { Favorites } from '../Favorites/Favorites';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { RemoveScroll } from 'react-remove-scroll';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import styles from './Header.module.scss';

const navLinks = [
	{ href: ROUTES.HOME, label: 'Главная', mobile: true },
	{ href: ROUTES.PRODUCTS, label: 'Магазин' },
	{ href: ROUTES.ABOUT, label: 'О нас' }
];

const toggleVariants = {
	opened: {
		opacity: 1,
	},
	closed: {
		opacity: 0,
	}
};

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
	const pathname = usePathname();
	const isMaxLg = useMediaQuery('max', 'lg');
	const searchWrapperRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLDivElement>(null);
	const linkRefs = useRef(new Map<HTMLAnchorElement, string>());
	const [burger, setBurger] = useState<boolean>(false);
	const [search, setSearch] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [indicatorStyles, setIndicatorStyles] = useState<{ [key: string]: string }>({});
	const shouldReduceMotion = useReducedMotion();

	const addLinkToRef = useCallback((url: string) => (el: HTMLAnchorElement) => {
		if (el && !linkRefs.current.has(el)) {
			linkRefs.current.set(el, url);
		}
	}, []);

	const updateIndicator = useCallback(() => {
		if (!linkRefs.current.size || !navRef.current || !searchWrapperRef.current || isMaxLg) {
			return;
		}

		const activeItem = Array.from(linkRefs.current.entries()).find(([key, value]) => {
			if (!key || !value) return false;
			return value.split('/')[1] === pathname.split('/')[1];
		})

		if (!activeItem) {
			setIndicatorStyles({});
			return;
		}

		const width = activeItem[0].offsetWidth;
		const left = activeItem[0].offsetLeft;
		const right = navRef.current.offsetWidth - left - width;

		const isElementBeforeSearch = !!(
			searchWrapperRef.current.compareDocumentPosition(activeItem[0]) & Node.DOCUMENT_POSITION_PRECEDING
		);

		setIndicatorStyles(
			isElementBeforeSearch ? {
				left: `${left}px`,
				right: 'auto',
				opacity: '1',
				width: width + 'px',
			} : {
				right: `${right}px`,
				left: 'auto',
				opacity: '1',
				width: width + 'px',
			}
		);
	}, [isMaxLg, pathname]);

	useEffect(() => updateIndicator(), [updateIndicator]);

	const onBurgerClick = useCallback(async () => {
		setBurger(!burger);
	}, [burger]);

	const onSearchClick = useCallback(() => {
		setSearch(true);
	}, []);

	useClickOutside(searchWrapperRef as RefObject<HTMLElement>, async () => {
		setSearch(false);
	}, search)

	useEffect(() => setBurger(false), [pathname]);

	if (!isMaxLg && burger) {
		setBurger(false);
	}

	if (burger) {
		window.scrollTo(0, 0);
	}

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
				<nav className={styles.nav} role='navigation' ref={navRef}>
					<AnimatePresence>
						{Object.keys(indicatorStyles).length > 0 && !isMaxLg && <motion.span
							layout={!shouldReduceMotion}
							variants={toggleVariants}
							initial={'closed'}
							animate={'opened'}
							exit={'closed'}
							style={indicatorStyles}
							className={styles.indicator}
						></motion.span>}
					</AnimatePresence>
					<div className={styles['nav-list']}>
						{navLinks.map(({ href, label, mobile }) => {
							if (mobile) {
								return <Fragment key={href} />
							}

							return (
								<Link
									key={href}
									className={styles['nav-link']}
									href={href}
									ref={addLinkToRef(href)}
								>
									{label}
								</Link>
							)
						})}
					</div>
					<motion.div
						className={styles['search-wrapper']}
						ref={searchWrapperRef}
						initial={'closed'}
						variants={{
							opened: {
								width: 288,
							},
							closed: {
								width: 21
							},
						}}
						animate={search ? 'opened' : 'closed'}
						transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
					>
						<AnimatePresence>
							{search && <Search
								variants={toggleVariants}
								initial={'closed'}
								exit={'closed'}
								isOpened={search}
								className={styles.search}
								value={searchValue}
								transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
								setValue={setSearchValue}
							/>}
						</AnimatePresence>
						<button
							title='Открыть поиск'
							aria-label='Открыть поиск'
							className={cn(styles['search-button'], {
								[styles.active]: search,
								[styles['no-motion']]: shouldReduceMotion
							})}
							type='button'
							onClick={onSearchClick}
							tabIndex={search ? -1 : 0}
						>
							<MagnifierIcon />
						</button>
					</motion.div>
					<Link
						title='Корзина'
						className={cn(styles.cart, styles.item)}
						href={ROUTES.CART}
						ref={addLinkToRef(ROUTES.CART)}
					>
						<span className='visually-hidden'>Корзина</span>
						<Cart count={3} />
					</Link>
					<Link
						title='Избранное'
						className={cn(styles.favorites, styles.item)}
						href={ROUTES.FAVORITES}
						ref={addLinkToRef(ROUTES.FAVORITES)}
					>
						<span className='visually-hidden'>Избранное</span>
						<Favorites count={3} />
					</Link>
					<Link
						title='Мой аккаунт'
						className={cn(styles.user, styles.item)}
						href={ROUTES.AUTH.LOGIN}
						ref={addLinkToRef(ROUTES.AUTH.LOGIN)}
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
						isOpened={burger}
						onClick={onBurgerClick}
					/>
				</nav>
				<Search
					className={cn(styles['search-mobile'])}
					disableTabIndex={burger}
					setValue={setSearchValue}
					value={searchValue}
				/>
			</header>
			<AnimatePresence>
				{burger && <RemoveScroll>
					<motion.div
						className={styles.menu}
						variants={toggleVariants}
						initial={'closed'}
						animate={'opened'}
						exit={'closed'}
					>
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
					</motion.div>
				</RemoveScroll>}
			</AnimatePresence>
		</>
	);
};