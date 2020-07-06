import React, { Component } from 'react';
import Home from './Home/index';
import Register from './Sign/Register';
import Header from './../components/Header'
import ProductsDisplay from './Products/ProductsDisplay';
import ProductDetail from './ProductDetail';
import MyAccount from './MyAccount';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadWishlist, loadBag} from './../redux/actions/userActions';
import { loadWishlistToDb, loadBagToDb} from './../redux/actions/authUserActions';

class App extends Component {
  componentDidMount() {
    this.props.loadWishlist();
    this.props.loadBag();
  }
  componentDidUpdate(prevsProps,prevsState) {
    if (prevsProps.isRegistered !== this.props.isRegistered && this.props.isRegistered === true){
      this.props.loadWishlistToDb(this.props.wishlist);
      this.props.loadBagToDb(this.props.bag);
      localStorage.clear()
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/register'><Register /></Route>
          <Route path='/products/:for/:type' render={(props) => <ProductsDisplay {...props} />}></Route>
          <Route path='/product/:for/:type/:category/:prodcode' render={
            (props) => <ProductDetail {...props} />
          }></Route>
          <Route path='/my-account/:tab' render={
            (props) => <MyAccount {...props} />
          }></Route>
          <Route path='/'><Home /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (reducState) => {
  let state = {...reducState.signReducer, ...reducState.userReducer}
  return {
    isAuthenticated: state.isAuthenticated,
    isRegistered: state.isRegistered,
    wishlist: state.wishlist,
    bag: state.bag
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    loadWishlist: () => dispatch(loadWishlist()),
    loadBag: () => dispatch(loadBag()),
    loadWishlistToDb: (wishlist) => dispatch(loadWishlistToDb(wishlist)),
    loadBagToDb: (bag) => dispatch(loadBagToDb(bag))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);