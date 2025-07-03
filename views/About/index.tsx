import { FC, ReactElement } from 'react';
import styles from './page.module.scss';

export const AboutPageComponent: FC = (): ReactElement => {
	return <h1 className={styles.title}>О нас</h1>;
};