import React, { Component } from 'react';
import styles from './MyAccount.module.scss';
import MyAccountNav from './components/MyAccountNav';
import AccountDetails from './components/AccountDetails';
import Wishlist from './components/Wishlist';
import Bag from './components/Bag';
import Orders from './components/Orders';

class MyAccount extends Component {
    renderBlock() {
        switch (this.props.match.params.tab) {
            case 'account-details':
                return <AccountDetails/>
            case 'wishlist':
                return <Wishlist/>
            case 'bag':
                return <Bag/>
            case 'orders':
                return <Orders/>
            default:
                break;
        }
    }
    render() {
        return (
            <section className={styles['container']} style={{position:'relative',top:'80px'}}>
                <MyAccountNav/>
                {this.renderBlock()}
            </section>
        )
    }
}

export default MyAccount;