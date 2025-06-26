import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SelectItem {
	label: string;
	value: string;
}

export interface SelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	ariaLabel?: string;
	clasName?: string;
	value: string;
	placeholder: string;
	setValue: (value: string) => void;
	options: SelectItem[];
}