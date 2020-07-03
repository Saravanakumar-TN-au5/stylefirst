import React from 'react';
import styles from './PageLoader.module.scss';

function PageLoader() {
    return (
        <div className={styles['lds']}><div></div><div></div><div></div></div>
    )
}

export default PageLoader;