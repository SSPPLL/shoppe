import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	message: string,
	shadow?: boolean
}