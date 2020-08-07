import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './WishlistBlock.module.scss';
import WishlistCard from './components/WishlistCard';

class WishlistBlock extends Component {
    render() {
        return (
            <section className={styles['container']}>
                {this.props.wishlist.length ? this.props.wishlist.map((prod,index) => {
                    return <WishlistCard key={index} prod={prod}/>
                }): <div className={styles['noprods']}>No products in your Wishlist</div>}
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.userReducer;
    return {
        wishlist: state.wishlist
    }
}

export default connect(mapStateToProps)(WishlistBlock);