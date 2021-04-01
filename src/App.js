import React from 'react';
import './App.css';
import Homepage from './pages/homepage.component';
import {Switch ,  Route} from 'react-router-dom';
const HatsPage =() => (
  <div>
   <h1> HATS PAGE</h1> 
  </div>
)

function App() {
  return (
  <div>

    <Switch>
    <Route exact path = '/' component={Homepage}></Route>
    <Route  path = '/hats' component={HatsPage}></Route>
      
    </Switch>
    </div>
  
);
  
}

export default App;
 