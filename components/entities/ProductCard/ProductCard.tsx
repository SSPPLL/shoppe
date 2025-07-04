'use client';
import { ProductCardProps } from './types';
import { FC, memo, ReactElement } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import cn from 'classnames';
import { CartIcon, EyeIcon, HeartIcon } from '@/components/icon';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';

const ProductCardComponent: FC<ProductCardProps> = ({
	className,
	name,
	nameAs = 'h2',
	imageSrc,
	price,
	discount,
	liked,
	setLiked,
	addedToCart,
	href,
	setAddedToCart,
	...props
}): ReactElement => {
	const TitleTag = nameAs;
	const shouldReduceMotion = useReducedMotion();

	return (
		<li className={cn(styles.main, className)} {...props} tabIndex={0} aria-label={name}>
			<div className={styles['image-wrapper']}>
				<Link
					className={styles.link} href={href}
					aria-label='Перейти на страницу товара'
				/>
				{discount && <span className={styles.discount}>- {discount / price * 100}%</span>}
				<Image className={styles.image} src={imageSrc} alt={name} width={380} height={380} />
				<button
					className={cn(styles['liked-button'], {
						[styles.liked]: liked,
						[styles['no-transition']]: shouldReduceMotion
					})}
					onClick={() => setLiked(false)}
					aria-label='Убрать из избранного'
					title='Убрать из избранного'
					tabIndex={liked ? 0 : -1}
				>
					<HeartIcon />
				</button>
				<div className={styles.actions}>
					<div className={cn(styles['actions-wrapper'], {
						[styles.liked]: liked,
						[styles['no-transition']]: shouldReduceMotion
					})}>
						<button
							className={cn(styles.action, styles['cart-button'])}
							aria-label={addedToCart ? 'Убрать из корзины' : 'Добавить в корзину'}
							title={addedToCart ? 'Убрать из корзины' : 'Добавить в корзину'}
							onClick={() => setAddedToCart(!addedToCart)}
						>
							<CartIcon />
						</button>
						<Link
							className={cn(styles.action, styles['look-button'])}
							href={href}
							aria-hidden
							title='Посмотреть товар'
						>
							<EyeIcon />
						</Link>
					</div>
					<button
						className={cn(styles.action, styles['like-button'], {
							[styles.liked]: liked,
							[styles['no-transition']]: shouldReduceMotion
						})}
						onClick={() => setLiked(!liked)}
						aria-label='Добавить в избранное'
						title='Добавить в избранное'
						tabIndex={liked ? -1 : 0}
					>
						<HeartIcon />
					</button>
				</div>
			</div>
			<TitleTag className={styles.name}>{name}</TitleTag>
			{discount && <span className={styles['old-price']}>
				<span className='visually-hidden'>старая цена</span>
				$ {price + discount}
			</span>}
			<span className={styles.price}>
				<span className='visually-hidden'>цена</span>
				$ {price}
			</span>
		</li>
	)
};

export const ProductCard = memo(ProductCardComponent);