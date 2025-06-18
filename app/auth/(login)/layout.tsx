import { ReactElement, ReactNode } from 'react';

export default async function LoginLayout({
	children,
	heading
}: Readonly<{
	children: ReactNode;
	heading: ReactNode;
}>): Promise<ReactElement> {
	return (
		<>
			{heading}
			{children}
		</>
	);
}