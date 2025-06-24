'use client';
import styles from './Footer.module.scss';
import { FC, useCallback, FormEvent, useRef } from 'react';
import { FooterProps } from './types';
import cn from 'classnames';
import { ROUTES } from '@/config/routes';
import Link from 'next/link';
import ArrowIcon from './icons/arrow.svg';
import FacebookIcon from './icons/facebook.svg';
import InstagramIcon from './icons/instagram.svg';
import LinkedinIcon from './icons/linkedin.svg';
import TwitterIcon from './icons/twitter.svg';
import { Input } from '@/components/ui';
import { addToast } from '@/store/toasts';
import { usePathname } from 'next/navigation';

const navLinks = [
	{ href: ROUTES.CONTACTS, label: 'Контакты' },
	{ href: ROUTES.TERMS_OF_PURCHASE, label: 'Условия покупки' },
	{ href: ROUTES.DELIVERY_AND_RETURN, label: 'Доставка и возврат' }
]

const socials = [
	{ href: '#', icon: LinkedinIcon, label: 'Linkedin' },
	{ href: '#', icon: FacebookIcon, label: 'Facebook' },
	{ href: '#', icon: InstagramIcon, label: 'Instagram' },
	{ href: '#', icon: TwitterIcon, label: 'Twitter' },
]

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
	const pathname = usePathname();
	const inputRef = useRef<HTMLInputElement>(null);
	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addToast({ message: 'Ваш email подписан на новости и уведомления' });

		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}, [])

	return (
		<footer className={cn(styles.footer, className)} {...props} onSubmit={onSubmit}>
			<div className={styles.wrapper}>
				<form className={styles.form}>
					<Input
						className={styles.label}
						inputClassName={styles.input}
						aria-label='Ваш email для акций и предложений'
						placeholder='Ваш email для акций и предложений'
						type='email'
						name='email'
						autoComplete='email'
						ref={inputRef}
						required
					/>
					<button className={styles.button} type='submit' aria-label='Отправить'>
						<ArrowIcon className={styles.icon} />
					</button>
				</form>
				<nav className={styles.nav}>
					{navLinks.map(({ href, label }) => (
						<Link key={href} href={href} className={cn(styles.link, {
							[styles.active]: pathname === href
						})}>{label}</Link>
					))}
				</nav>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.socials} aria-label='Социальные сети'>
					{socials.map(({ href, icon: Icon, label }) => (
						<Link key={label} href={href} className={styles.social}>
							<Icon className={styles.icon} />
							<span className='visually-hidden'>{label}</span>
						</Link>
					))}
				</div>
				<div className={styles.copyright}>
					© {new Date().getFullYear()} Shoppe
				</div>
			</div>
		</footer>
	);
};