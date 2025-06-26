import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CategorySelectItem {
	label: string;
	value: string;
}

export interface CategorySelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	options: CategorySelectItem[];
}