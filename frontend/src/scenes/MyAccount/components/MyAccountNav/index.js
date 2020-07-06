import React from 'react';
import {Link} from 'react-router-dom';
import styles from './MyAccountNav.module.scss';

function MyAccountNav(props) {
    return (
        <section className={styles['container']}>
            <Link to='/my-account/account-details'>
                <div>ACCOUNT DETAILS</div>
            </Link>
            <Link to='/my-account/wishlist'>
                <div>WISHLIST</div>
            </Link>
            <Link to='/my-account/bag'>
                <div>BAG</div>
            </Link>
            <Link to='/my-account/orders'>
                <div>ORDERS</div>
            </Link>
        </section>
    )
}

export default MyAccountNav;