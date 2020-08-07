import React, { Component } from 'react';
import styles from './WishlistCard.module.scss';
import { connect } from 'react-redux';
import { removeFromWishlist } from './../../../../../../redux/actions/authUserActions';

class WishlistCard extends Component {
    render () {
        let { name, images, price, prodCode} = this.props.product
        return (
            <div className={styles['container']}>
                <div className={styles['icon']} onClick={()=>this.props.removeFromWishlist(prodCode)}>
                </div>
                <img src={images.img1} alt={name}/>
                <h4>{name}</h4>
                <div className={styles['price']}>{price+'.00 $'}</div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromWishlist: (prodCode) => dispatch(removeFromWishlist(prodCode))
    }
}

export default connect(null, mapDispatchToProps)(WishlistCard);