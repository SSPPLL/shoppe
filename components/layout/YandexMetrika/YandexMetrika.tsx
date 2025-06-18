"use client";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";
import { YandexMetrikaProps } from './types';

export const YandexMetrika: FC<YandexMetrikaProps> = ({ counterId }): ReactNode => {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname) {
			ym("hit", pathname);
		}
	}, [pathname]);

	return (
		<YMInitializer
			accounts={[counterId]}
			options={{
				defer: true,
				webvisor: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
			}}
			version="2"
		/>
	);
};