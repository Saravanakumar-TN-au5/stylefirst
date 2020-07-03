import React, { Component } from 'react';
import Header from './../../components/Header';
import ProductNav from './components/ProductNav';
import styles from './Home.module.scss';
import wBag from './images/women-bag.webp';
import wWear from './images/women-wear.webp';
import wShoe from './images/women-shoe.webp';
import mBag from './images/men-bag.webp';
import mWear from './images/men-wear.webp';
import mShoe from './images/men-shoe.webp';

class Home extends Component {
    state = {
        tab: 'Women',
        prodNav: {
            wear: wWear,
            bag: wBag,
            shoe: wShoe,
            wearLink: '/products/women/ready_to_wear',
            bagLink: '/products/women/bag',
            shoeLink: '/products/women/shoe'
        }
    }

    toggleTab(e) {
        let wom = {wear: wWear, bag: wBag, shoe: wShoe, wearLink: '/products/women/ready_to_wear', bagLink: '/products/women/bag', shoeLink: '/products/women/shoe'}
        let men = {wear: mWear, bag: mBag, shoe: mShoe, wearLink: '/products/men/ready_to_wear', bagLink: '/products/men/bag', shoeLink: '/products/men/shoe'}
        e.target.classList.add(styles['btn--focus'])
        if (e.target.textContent === 'Women'){
            e.target.nextSibling.classList.remove(styles['btn--focus'])
            this.setState({prodNav: wom})
        } else {
            e.target.previousSibling.classList.remove(styles['btn--focus'])
            this.setState({prodNav: men})
        }
    }

    render() {
        return (
            <section className={styles['mainContent']} style={{position:'relative',top:'80px'}}>
                <div className={styles['mainContent__nav']}>
                    <button type='button' onClick={(e) => this.toggleTab(e)} className={styles['btn--focus']}>Women</button>
                    <button type='button' onClick={(e) => this.toggleTab(e)}>Men</button>
                </div>
                <ProductNav {...this.state.prodNav}/>
            </section>
        )
    }
}

export default Home;