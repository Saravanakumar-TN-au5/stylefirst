import React, { Component } from 'react';
import avatar from './images/avatar_32.png';
import heart from './images/heart_32.png';
import bag from './images/bag_32.png';
import search from './images/search_32.png';
import styles from './Header.module.scss';
import TopDrawer from './components/TopDrawer';
import SearchBlock from './components/SearchBlock';
import LoginBLock from './components/LoginBlock';
import ProfileBlock from './components/ProfileBlock';
import { connect } from 'react-redux';

class Header extends Component {
    state = {
        topComponent : null
    }
    renderTop(comp) {
        this.setState({topComponent: TopDrawer(comp)});
    }
    render() {
        const Top = this.state.topComponent;
        return (
            <header>
            <nav>
                <h1 className={styles['nav__brand']}>Search & Buy</h1>
                <div className={styles['nav__link']}>
                    <img src={avatar} width='20' height='20' alt='profile' 
                        onClick={() => {this.props.isAuthenticated ? 
                        this.renderTop(ProfileBlock): this.renderTop(LoginBLock)}}/>
                    <img src={heart} width='20' height='20' alt='wishlist' />
                    <img src={bag} width='20' height='20' alt='bag' />
                    <img src={search} width='20' height='20' alt='search'
                        onClick={() => this.renderTop(SearchBlock)} />
                </div>
                {Top ? <Top /> : null}
            </nav>
            </header>
        );
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.signReducer;
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(Header);