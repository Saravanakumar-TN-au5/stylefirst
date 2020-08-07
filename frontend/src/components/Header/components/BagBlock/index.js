import React, { Component } from 'react';
import styles from './BagBlock.module.scss';
import { connect } from 'react-redux';
import BagCard from './components/BagCard';

class BagBlock extends Component {
    render() {
        return (
            <section className={styles['container']}>
                {this.props.bag.length ? 
                this.props.bag.map((prod,index) => {
                    return <BagCard key={index} product={prod}/>
                }): <div className={styles['noprods']}>No products in your Bag</div>}
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.userReducer
    return {
        bag: state.bag
    }
}

export default connect(mapStateToProps)(BagBlock);