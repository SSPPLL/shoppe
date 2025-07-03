'use client';
import styles from "./layout.module.scss";
import cn from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { setSearchValue, useSearchStore } from '@/store/search';
import { Search } from '@/components/layout';

export default function MobileSearchLayout({
	children
}: Readonly<{
	children: ReactNode;
}>): ReactElement {
	const value = useSearchStore((state) => state.value);
	return (
		<>
			<Search
				className={cn(styles['search-mobile'])}
				setValue={setSearchValue}
				value={value}
			/>
			{children}
		</>

	);
}