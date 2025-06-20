import { ReactElement, ReactNode } from 'react';

export default function LoginLayout({
	children,
	heading
}: Readonly<{
	children: ReactNode;
	heading: ReactNode;
}>): ReactElement {
	return (
		<>
			{heading}
			{children}
		</>
	);
}