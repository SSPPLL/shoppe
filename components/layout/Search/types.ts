import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export type SearchStatus = 'opened' | 'opening' | 'closing' | 'closed';

export interface SearchProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	setStatus?: (status: SearchStatus) => void
};