import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Switch ,  Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import {auth , dateUtilizator } from './firebase/firebase.utils';

class  App extends React.Component {

constructor(){
  super()
    this.state ={
      utilizatorCurent : null
    }
}
// prin metoda de mai jos aplicatia face rerender in momentul in care auth 
//state ul se schimba. adica un user se logeaza sau delogheaza
unsubscribeFromAuth = null;
componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await dateUtilizator(userAuth);

      userRef.onSnapshot(snapShot => {
        this.setState({
          utilizatorCurent: {
            id: snapShot.id,
          
            ...snapShot.data()
          }
        });
      });
    }
else {
  this.setState({ utilizatorCurent: userAuth });
}
    
  });
}

componentWillUnmount(){
  this.unsubscribeFromAuth();
}

  render(){
    return (
      <div>
    
      <Header utilizatorCurent = {this.state.utilizatorCurent} />
    
        <Switch>
        <Route exact path = '/' component={Homepage}></Route>
        <Route  path = '/shop' component={ShopPage}></Route>
        <Route path ='/signin' component ={SignInSignUpPage} />
          
        </Switch>
        </div>
      
    );
      
    }
  }
 

export default App;
 