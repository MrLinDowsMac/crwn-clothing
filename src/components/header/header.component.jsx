import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux'; //High Order Component modify our component to allow us use redux

import { ReactComponent as Logo } from "../../assets/original.svg";

import './header.styles.scss';

const Header = ({ currentUser }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='shop' >
                SHOP
            </Link>
            <Link className='option' to='shop' >
                CONTACT
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={ () => auth.signOut() }>SIGN OUT</div> :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
);

const mapStateToProps = state => ({ //state is root reducer
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header); //first arg is the state of reducer
//export default Header;