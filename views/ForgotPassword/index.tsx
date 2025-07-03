import { FC, memo, ReactElement } from 'react';
import styles from './page.module.scss';

export const ForgotPasswordPageComponent: FC = memo(function Component(): ReactElement {
	return <h1 className={styles.title}>Забыли пароль?</h1>;
});