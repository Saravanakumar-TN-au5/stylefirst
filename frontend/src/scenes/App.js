import React from 'react';
import Home from './Home/index';
import Register from './Sign/Register';
import Header from './../components/Header'
import ProductsDisplay from './Products/ProductsDisplay';
import ProductDetail from './ProductDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path='/register'><Register/></Route>
        <Route path='/products/:for/:type' render={(props)=> <ProductsDisplay {...props}/>}></Route>
        <Route path='/product/:for/:type/:category/:prodcode' render={
          (props) => <ProductDetail {...props}/>
        }></Route>
        <Route path='/'><Home/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;