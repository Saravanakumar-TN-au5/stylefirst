import React, { Component } from 'react';
import styles from './WishlistCard.module.scss';
import { connect } from 'react-redux';
import { removeGuestWishlist } from './../../../../../../redux/actions/userActions';

class WishlistCard extends Component {
    render() {
        let {_id,path,prodCode,category} = this.props.prod
        return (
            <div className={styles['container']}>
                <img src={this.props.prod.images.img1} alt={this.props.prod.name}/>
                <div className={styles['name']}>
                    <h6>{this.props.prod.name}</h6>
                    <p>{this.props.prod.prodCode}</p>
                </div>
                <div className={styles['price']}>
                    <h6>PRICE</h6>
                    <p>{this.props.prod.price+'.00 $'}</p>
                </div>
                <div className={styles['close']}
                    onClick={() => this.props.removeGuestWishlist(this.props.prod.prodCode)}>❌</div>
            </div>
        )  
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
        removeGuestWishlist: (prodCode) => dispatch(removeGuestWishlist(prodCode))
    }
}

export default (connect(null, mapDispatchToProps)(WishlistCard));