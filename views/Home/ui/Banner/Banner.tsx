'use client';
import { Button, Carousel } from '@/components/ui';
import { FC, memo, ReactElement } from 'react';
import { BannerProps } from './types';
import styles from './Banner.module.scss';
import cn from 'classnames';
import { HOME_BANNER_DATA } from '@/constants/home-banner-data';
import Image from 'next/image';
import { ROUTES } from '@/config/routes';
import { useBreakpoint } from '@/lib/hooks/useBreakpoint';

export const BannerComponent: FC<BannerProps> = ({ className }): ReactElement => {
	const isMaxLg = useBreakpoint('max', 'lg');

	return (
		<Carousel
			isDots={true}
			emblaOptions={{
				loop: true,
				duration: 20
			}}
			fadeOptions={{
				active: !isMaxLg
			}}
			autoplayOptions={{
				delay: 5000
			}}
			className={cn(styles.main, className)}
			viewportClassName={styles.viewport}
			containerClassName={styles.container}
			dotsClassName={styles.dots}
			dotClassName={styles.dot}
			activeDotClassName={styles.active}
			slides={[...HOME_BANNER_DATA, ...HOME_BANNER_DATA].map(({ sku, name, price, image }, index) => {
				return (
					<div key={index} className={styles.slide}>
						<picture className={styles.picture}>
							<Image className={styles.image} src={image} alt={name} width={1248} height={646} />
						</picture>
						<div className={styles.content}>
							<h2 className={styles.title}>{name}</h2>
							<div className={styles.price}>
								<span className='visually-hidden'>цена</span> $ {price}
							</div>
							<Button
								as='a'
								appearance='secondary'
								color='light'
								rounded='md'
								href={ROUTES.PRODUCT(sku.toString())}
								className={styles.button}
							>
								Смотреть <span className='visually-hidden'>{name}</span>
							</Button>
						</div>
					</div>
				)
			})}
		/>
	);
}

export const Banner = memo(BannerComponent);