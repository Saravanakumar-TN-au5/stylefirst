import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Orders.module.scss';
import OrderCard from './components/OrderCard';

class Orders extends Component {
    render() {
        return (
            <section className={styles['container']}>
                {this.props.orders.length ? 
                this.props.orders.map(order => {
                    return <OrderCard order={order}/>
                }): <section className={styles['noorder']}>No order placed</section>}
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.userReducer
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps)(Orders);