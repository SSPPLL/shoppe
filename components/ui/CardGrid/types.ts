import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CardGridProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	size?: 'lg' | 'md';
};