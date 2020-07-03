import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductNav.module.scss';

const ProductNav = (props) => {
    return (
        <section className={styles['productNav']}>
            <div>
                <Link to={props.wearLink}>
                    <img src={props.wear} alt='wear'/>
                </Link>
                <h2>Ready to wear</h2>
            </div>
            <div>
                <Link to={props.bagLink}>
                    <img src={props.bag} alt='bag'/>
                </Link>
                <h2>Bags</h2>
            </div>
            <div>
                <Link to={props.shoeLink}>
                    <img src={props.shoe} alt='shoe'/>
                </Link>
                <h2>Shoes</h2>
            </div>
        </section>
    )
}

export default ProductNav;