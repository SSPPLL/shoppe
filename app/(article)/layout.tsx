import styles from "./layout.module.scss";
import { ReactElement, ReactNode } from 'react';

export default async function ArticleLayout({
	children
}: Readonly<{
	children: ReactNode;
}>): Promise<ReactElement> {
	return (
		<main className={styles.wrapper}>
			<article className={styles.article}>
				{children}
			</article>
		</main>
	);
}