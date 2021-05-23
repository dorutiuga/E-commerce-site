import  React from 'react'
import {connect} from 'react-redux';
import {auth } from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectUtilizatorCurent } from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer, LogoContainer, OptionsContainer,OptionLink } from './header.styles';

const Header = ({ utilizatorCurent, hidden }) => (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink> 
        <OptionLink to='/shop'>CONTACT</OptionLink>
        {utilizatorCurent ? (
          <OptionLink as='div' onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
const mapStateToProps = createStructuredSelector({
    utilizatorCurent: selectUtilizatorCurent ,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);