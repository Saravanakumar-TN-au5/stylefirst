import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToBag, removeFromBag, decrementBag} from './../../../../../../redux/actions/authUserActions';
import styles from './BagCard.module.scss';

class BagCard extends Component {
    render() {
        let { prod, size, color, price, quantity } = this.props.product
        return (
            <section className={styles['container']}>
                <img src={prod.images.img1} alt={prod.name}/>
                <div className={styles['content']}>
                    <div className={styles['name']}>
                        <div>{prod.name}</div>
                        <small>{prod.prodCode}</small>
                    </div>
                    <div className={styles['variant']}>
                        <div>
                            <div className={styles['subhead']}>PRIZE</div>
                            <div className={styles['price']}>{price+'.00 $'}</div>
                        </div>
                        <div>
                            <div className={styles['subhead']}>COLOR</div>
                            <div className={styles['fs']}>{color}</div>
                        </div>
                        <div>
                            <div className={styles['subhead']}>SIZE</div>
                            <div className={styles['fs']}>{size}</div>
                        </div>
                    </div>
                </div>
                <div className={styles['quantity']}>
                    <div className={styles['subhead']}>QUANTITY</div>
                    <div className={styles['quantity__btn']}>
                        <span>{quantity}</span>
                        <button type='button' 
                        onClick={() => this.props.decrementBag(this.props.product)}>-</button>
                        <button type='button'
                        onClick={() => this.props.incrementQuantity(this.props.product)}>+</button>
                    </div>
                </div>
                <div className={styles['icon']} onClick={()=>this.props.removeBagProduct(this.props.product)}>
                    </div>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementQuantity: (product) => dispatch(addToBag(product)),
        removeBagProduct: (product) => dispatch(removeFromBag(product)),
        decrementBag: (product) => dispatch(decrementBag(product))
    }
}

export default connect(null,mapDispatchToProps)(BagCard); 