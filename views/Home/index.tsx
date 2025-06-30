import { FC } from 'react';
import styles from './page.module.scss';
import { ProductsGrid } from '@/components/widgets';
import { getProducts } from '@/services/products';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { Banner } from './ui';

export const HomePageComponent: FC = async () => {
	const products = await getProducts({
		limit: 6,
		offset: 0
	});

	return (
		<main className={styles.wrapper}>
			<h1 className='visually-hidden'>Shoppe - интернет магазин</h1>
			<Banner />
			{products && <div className={styles.info}>
				<h2 className={styles.subtitle}>Последние поступления</h2>
				<Link
					className={styles.more}
					href={ROUTES.PRODUCTS}
				>
					Все <span className='visually-hidden'>товары</span>
				</Link>
			</div>}
			{products && <ProductsGrid products={products.products} size='lg' nameAs='h3' />}
		</main>
	);
};