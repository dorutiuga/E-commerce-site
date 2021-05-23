import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch ,  Route , Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import CheckoutPage from './pages/checkout/checkout.component';
import {auth , dateUtilizator} from './firebase/firebase.utils';
import { connect} from'react-redux';
import {setUtilizatorCurent} from './redux/user/user.actions'
import { selectUtilizatorCurent } from './redux/user/user.selectors';
import { createStructuredSelector} from 'reselect';


class  App extends React.Component {

// prin metoda de mai jos aplicatia face rerender in momentul in care auth 
//state ul se schimba. adica un user se logeaza sau delogheaza
unsubscribeFromAuth = null;
componentDidMount() {
  const {setUtilizatorCurent} = this.props;

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await dateUtilizator(userAuth);

      userRef.onSnapshot(snapShot => {
        setUtilizatorCurent({
            id: snapShot.id,
            ...snapShot.data()
        });
      });
    }
else {
  setUtilizatorCurent(userAuth);
  
}
  });
}
componentWillUnmount(){
  this.unsubscribeFromAuth();
}
  render(){
    return (
      <div>
      <Header  />
        <Switch>
        <Route exact path = '/' component={Homepage}></Route>
        <Route  path = '/shop' component={ShopPage}></Route>
        <Route exact path ='/signin'  render= {()=> this.props.utilizatorCurent ? (<Redirect to= '/' />) : (<SignInSignUpPage />)}  />
        <Route exact path = '/checkout' component = {CheckoutPage}></Route>
        </Switch>
        </div>
    );
    }
  }
  const mapStateToProps = createStructuredSelector({
    utilizatorCurent: selectUtilizatorCurent
  });
  const mapDispatchToProps = dispatch =>({
    setUtilizatorCurent: user => dispatch(setUtilizatorCurent(user))
  });

export default connect(mapStateToProps,mapDispatchToProps )(App);