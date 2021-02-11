import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Shopping/auth/Auth';
import Cart from './components/Shopping/cart/Cart';
import Checkout from './components/Shopping/checkout/Checkout';
import ProductList from './components/Shopping/productList/ProductList';
import Product from './components/Shopping/productPage/ProductPage';
import Search from './components/Shopping/search/Search';
import Landing from './components/Shopping/landing/Landing'
import Account from './components/Shopping/account/Account';
import AddProduct from './components/Admin/addProduct/addProduct';
import returns from './components/Info/returns/returns';
import Shipping from './components/Info/shipping/Shipping';
import Contact from './components/Info/contact/Contact';
import Wholesale from './components/Info/wholesale/Wholesale';
import About from './components/Info/about/About'
import Ambassadors from './components/Info/ambassadors/Ambassadors';


export default (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/Account/Login' component={Auth} />
    <Route path='/Cart' component={Cart} />
    <Route path='/Checkout' component={Checkout} />
    <Route path='/Collections' component={ProductList} />
    <Route path='/Product/:product_id' component={Product} />
    <Route path='/Search' component={Search} />
    <Route path='/Admin/Products' component={AddProduct} />
    <Route path='/Account' component={Account} />
    <Route path='/Returns' component={returns} />
    <Route path='/Shipping' component={Shipping} />
    <Route path='/Contact' component={Contact} />
    <Route path='/Wholesale' component={Wholesale} />
    <Route path='/About' component={About} />
    <Route path='/Ambassadors' component={Ambassadors} />
  </Switch>
)