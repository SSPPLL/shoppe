import { FilterCategory } from '@/model/filters';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CategorySelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	options: FilterCategory[]
}