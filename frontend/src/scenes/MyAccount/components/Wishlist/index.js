import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Wishlist.module.scss';
import WishlistCard from './components/WishlistCard';

class Wishlist extends Component {
    render() {
        return (
            <section className={styles['container']}>
                {this.props.wishlist.map(product => {
                    return <WishlistCard product={product}/>
                })}
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.userReducer
    return {
        wishlist: state.wishlist
    }
}

export default connect(mapStateToProps)(Wishlist);