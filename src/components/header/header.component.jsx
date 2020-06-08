import React from 'react';
//import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux'; //High Order Component modify our component to allow us use redux
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";
//import './header.styles.scss';


const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='shop' >
                SHOP
            </OptionLink>
            <OptionLink to='shop' >
                CONTACT
            </OptionLink>
            {
                currentUser ? 
                <OptionLink as='div' onClick={ () => auth.signOut() }>SIGN OUT</OptionLink> :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : <CartDropdown /> }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({ //replaced with this method instead using state =>
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header); //first arg is the state of reducer
//export default Header;