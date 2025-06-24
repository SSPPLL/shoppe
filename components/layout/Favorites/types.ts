import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FavoritesProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	count?: number
};