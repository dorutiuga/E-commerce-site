import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch ,  Route , Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import CheckoutPage from './pages/checkout/checkout.component';
import {useEffect} from 'react';
import { connect} from'react-redux';
import { checkUserSession} from './redux/user/user.actions';
import { selectUtilizatorCurent } from './redux/user/user.selectors';
import { createStructuredSelector} from 'reselect';


const  App =({checkUserSession, utilizatorCurent})=> {

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);
    return (
      <div>
      
      <Header  />
    
        <Switch>
        <Route exact path = '/' component={Homepage}></Route>
        <Route  path = '/shop' component={ShopPage}></Route>
        <Route exact path ='/signin'  render= {()=> utilizatorCurent ? (<Redirect to= '/' />) : (<SignInSignUpPage />)}  />
        <Route exact path = '/checkout' component = {CheckoutPage}></Route>
        </Switch>
       
        </div>
    );
    }
 
  const mapStateToProps = createStructuredSelector({
    utilizatorCurent: selectUtilizatorCurent

  });
 const mapDispatchToProps = dispatch =>({
   checkUserSession: ()=> dispatch(checkUserSession())
 })
export default connect(mapStateToProps,mapDispatchToProps)(App);