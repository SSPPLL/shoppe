import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PriceRangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	max: number;
	min: number;
	mainTabIndex?: number
}