import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	defaultMin: number;
	defaultMax: number;
};