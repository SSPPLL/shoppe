import { FiltersModel } from '@/model/filters';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type FiltersProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>, HTMLDivElement
> & FiltersModel;