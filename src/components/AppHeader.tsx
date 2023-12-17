import styles from './AppHeader.module.css';
import { Logo } from './icons/Logo';
import { PlusIcon } from './icons/plusIcon';

export const AppHeader = () => (
	<>
		<header className={styles.header}>
			<p className={styles.logo}>
			<Logo />
				Cards:<span>1</span>
			</p>
			<button className={styles.buttonIcon}>
				<p className={styles.plusIcon}>
					<PlusIcon />
				</p>
			</button>
		</header>
	</>
);
