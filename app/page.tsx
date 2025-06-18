import styles from "./page.module.scss";
import { ReactElement } from "react";

export default function HomePage(): ReactElement {
	return (
		<h1 className={styles.title}>Главная</h1>
	);
}
