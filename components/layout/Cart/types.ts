import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CartProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	count?: number
};