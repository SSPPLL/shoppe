import "@/app/reset.scss";
import "@/app/globals.scss";
import styles from "./layout.module.scss";
import { DM_Sans } from "next/font/google";
import { ReactElement, ReactNode } from 'react';
import { Footer, Header, Toasts, YandexMetrika } from '@/components/layout';
import { Metadata } from 'next';
import { combineWithDefaultMetadata } from '@/config/metadata';
import { NuqsAdapter } from 'nuqs/adapters/next';

const DMSans = DM_Sans({
	variable: "--font-family",
	subsets: ["latin"],
	weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = combineWithDefaultMetadata();

export default async function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>): Promise<ReactElement> {
	return (
		<html lang="ru">
			<head>
				<link rel='preconnect' href='https://mc.yandex.ru' />
			</head>
			<body className={`${DMSans.variable}`}>
				<div className={styles.wrapper}>
					<NuqsAdapter>
						<Header />
						{children}
						<Toasts />
						<Footer />
					</NuqsAdapter>
				</div>
				<YandexMetrika counterId={12345678} />
			</body>
		</html>
	);
}
