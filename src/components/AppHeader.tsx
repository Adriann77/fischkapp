import React, { useState } from 'react';
import styles from './CssModule/AppHeader.module.css';
import { Logo } from './icons/Logo';
import { PlusIcon } from './icons/plusIcon';
import { NewCard } from './NewCard';

interface Props{
	createNewCard: any,
	num: number;

}

export const AppHeader = ({createNewCard, num } : Props) => {

	

	
	

	return (
		<header className={styles.header}>
			<p className={styles.logo}>
				<Logo />
				Cards:<span>{num}</span>
			</p>
			<button 
				onClick={createNewCard}
				className={styles.buttonIcon}>
				<PlusIcon />
			</button>

		</header>
	);
};
