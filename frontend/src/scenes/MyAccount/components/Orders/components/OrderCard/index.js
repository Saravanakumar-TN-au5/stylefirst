import React from 'react';
import styles from './OrderCard.module.scss';

function OrderCard(props) {
    return (
        <section className={styles['container']}>
            <div>Order id<span>{props.order._id.slice(0,8)}</span></div>
            <div>Total products<span>{props.order.totalQuantity}</span></div>
            <div>Total price<span>{props.order.totalPrice+'.00 $'}</span></div>
        </section>
    )
}

export default OrderCard;