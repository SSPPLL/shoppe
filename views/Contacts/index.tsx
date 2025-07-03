import { FC, ReactElement } from 'react';
import styles from './page.module.scss';

export const ContactsPageComponent: FC = (): ReactElement => {
	return <h1 className={styles.title}>Контакты</h1>;
};