import React, { Component } from 'react';
import styles from './Header.module.scss';
import TopDrawer from './components/TopDrawer';
import SearchBlock from './components/SearchBlock';
import LoginBLock from './components/LoginBlock';
import ProfileBlock from './components/ProfileBlock';
import WishlistBlock from './components/WishlistBlock';
import BagBlock from './components/BagBlock';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    myRef = React.createRef()
    state = {
        topComponent : null
    }
    componentDidUpdate(prevsProps,prevsState){
        if (prevsProps.onBag !== this.props.onBag){
            this.myRef.current.classList.add(styles['animate']);
            setTimeout(()=> this.myRef.current.classList.remove(styles['animate']), 3000);
        }
    }
    renderTop(comp) {
        this.setState({topComponent: TopDrawer(comp)});
    }
    render() {
        const Top = this.state.topComponent;
        return (
            <header>
            <nav>
                <Link to='/' styles={{textDecoration: 'none'}}>
                    <h1 className={styles['nav__brand']}>Stylefirst</h1>
                </Link>
                <div className={styles['nav__link']}>
                    <div className={!this.props.isAuthenticated ? styles['guest']: styles['authuser']}
                    onClick={() => {this.props.isAuthenticated ? 
                        this.renderTop(ProfileBlock): this.renderTop(LoginBLock)}}></div>
                    <div className={this.props.isWishlist ? styles['heart--fill']:styles['heart']}
                    onClick={() => this.renderTop(WishlistBlock)}></div>
                    <div ref={this.myRef} className={this.props.isBag?styles['bag--fill']:styles['bag']}
                    onClick={() => this.renderTop(BagBlock)}></div>
                    <div className={styles['search']} onClick={() => this.renderTop(SearchBlock)}></div>
                </div>
                {Top ? <Top /> : null}
            </nav>
            </header>
        );
    }
}

const mapStateToProps = (reducState) => {
    let state = {...reducState.signReducer,...reducState.userReducer};
    return {
        isAuthenticated: state.isAuthenticated,
        isWishlist: state.wishlist.length,
        isBag: state.bag.length,
        bag: state.bag,
        onWishlist: state.onWishlist,
        onBag: state.onBag
    }
}

export default connect(mapStateToProps)(Header);