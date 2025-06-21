import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export interface SearchProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	isOpened?: boolean,
	disableTabIndex?: boolean,
	value?: string
	setValue?: (value: string) => void
};