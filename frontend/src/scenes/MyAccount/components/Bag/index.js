import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Bag.module.scss';
import BagCard from './components/BagCard';
import Button from './../../../../components/Button';
import { placeOrder } from './../../../../redux/actions/authUserActions';

class Bag extends Component {
    state = {
        totalQuantity: 0,
        totalPrice: 0
    }
    componentDidMount() {
        let quantity = this.props.bag.reduce((accum, curr) => {
            return accum + curr.quantity
        }, 0);
        let price = this.props.bag.reduce((accum, curr) => {
            return accum + (curr.quantity * curr.price)
        }, 0)
        this.setState({ totalQuantity: quantity, totalPrice: price })
    }
    componentDidUpdate(prevsProps, prevsState) {
        if (prevsProps.bag !== this.props.bag) {
            let quantity = this.props.bag.reduce((accum, curr) => {
                return accum + curr.quantity
            }, 0);
            let price = this.props.bag.reduce((accum, curr) => {
                return accum + (curr.quantity * curr.price)
            }, 0)
            this.setState({ totalQuantity: quantity, totalPrice: price })
        }
    }
    placeOrder() {
        let order = {
            userId: this.props.userId, products: this.props.bag,
            totalPrice: this.state.totalPrice, totalQuantity: this.state.totalQuantity
        }
        this.props.placeOrder(order)
    }
    render() {
        return (
            <section className={styles['container']}>
                <section>
                    {this.props.bag.map((product, index) => {
                        return <BagCard key={index} product={product} />
                    })}
                </section>
                <section className={styles['total']}>
                    <div className={styles['flex--btw']}>
                        <span>{`Subtotal (x${this.state.totalQuantity})`}</span>
                        <span>{this.state.totalPrice+'.00 $'}</span>
                    </div>
                    <div className={styles['flex--btw']}>
                        <span>Shipping</span>
                        <span>0.00 $</span>
                    </div>
                    <div className={styles['flex--btw']}>
                        <span>Total</span>
                        <span>{this.state.totalPrice+'.00 $'}</span>
                    </div>
                    <Button type='button' isDisabled={this.props.bag.length ? false:true}
                    name='Proceed with payment' color='btn--dark' 
                    event={() => this.placeOrder()}/>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = {...reducState.userReducer,...reducState.signReducer}
    return {
        bag: state.bag,
        userId: state.userData.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: (order) => dispatch(placeOrder(order))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Bag);