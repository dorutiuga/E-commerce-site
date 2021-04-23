import  React from 'react'
import {connect} from 'react-redux';
import './header-component.scss';
import {Link } from 'react-router-dom';
import {auth } from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header =({utilizatorCurent , hidden}) => (
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
             <CartIcon/>
         </div>
         { hidden  ? null : <CartDropdown />
            
         }
         
    </div>
)

const mapStateToProps = ({user: {utilizatorCurent}, cart: {hidden}}) =>({
    utilizatorCurent,
    hidden
})

export default connect(mapStateToProps)(Header);