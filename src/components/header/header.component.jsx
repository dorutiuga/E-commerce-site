import  React from 'react'

import './header-component.scss';

import {Link } from 'react-router-dom';
import {auth } from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';

const Header =({utilizatorCurent}) => (
    <div className = 'header'>
        <Link className = 'logo-container' to ='/'>
            <Logo className = 'logo'></Logo>
         </Link>
         <div className= 'options'>
             <Link className = 'option' to = "/shop">SHOP</Link>
             <Link className = 'option' to = "/contact"> CONTACT </Link>
             {
                    utilizatorCurent ?
                        <div className="option" onClick ={()=> auth.signOut()}>
                            SIGN OUT
                        </div>
                    :
                <Link className="option" to='/signin'>SIGN IN</Link>

             }
         </div>
    </div>
)
export default Header;