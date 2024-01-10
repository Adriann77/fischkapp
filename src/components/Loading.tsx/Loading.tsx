import React from 'react';
import styles from './Loading.module.scss';
import { Loader } from '../../../icons/Loader';

export const Loading = () => {
    return (
			<div className={styles.container}>
                <Loader/>
			</div>
		);
};
