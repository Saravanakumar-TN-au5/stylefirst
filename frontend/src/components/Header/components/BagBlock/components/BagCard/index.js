import React, { Component } from 'react';
import styles from './BagCard.module.scss';
import { connect } from 'react-redux';
import { removeGuestBag } from './../../../../../../redux/actions/userActions';
import { removeFromBag } from './../../../../../../redux/actions/authUserActions';

class BagCard extends Component {
    state = {
        product: this.props.product
    }
    removeBag() {
        this.props.isAuthenticated ? this.props.removeFromBag(this.props.product)
        :this.props.removeGuestBag(this.props.product)
    }
    render() {
        let {size,color,quantity,price} = this.props.product
        let {images,name,prodCode,material} = this.props.product.prod
        return (
            <div className={styles['container']}>
                <img src={images.img1} alt={name}/>
                <div className={styles['name']}>
                    <h6>{name}</h6>
                    <p>{prodCode}</p>
                </div>
                <div>
                    <h6>Material</h6>
                    <p>{material}</p>
                </div>
                <div>
                    <h6>Color</h6>
                    <p>{color}</p>
                </div>
                <div>
                    <h6>Size</h6>
                    <p>{size}</p>
                </div>
                <div>
                    <h6>Quantity</h6>
                    <p>{quantity}</p>
                </div>
                <div className={styles['price']}>
                    <h6>Price</h6>
                    <p>{price+'.00 $'}</p>
                </div>
                <span className={styles['close']}
                    onClick={() => this.removeBag()}>❌</span>
            </div>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.signReducer
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeGuestBag: (prod) => dispatch(removeGuestBag(prod)),
        removeFromBag: (prod) => dispatch(removeFromBag(prod))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BagCard);