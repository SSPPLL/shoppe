import { FC, memo, ReactElement } from 'react';
import styles from './page.module.scss';

export const ResetPasswordPageComponent: FC = memo(function Component(): ReactElement {
	return <h1 className={styles.title}>Сброс пароля</h1>;
});