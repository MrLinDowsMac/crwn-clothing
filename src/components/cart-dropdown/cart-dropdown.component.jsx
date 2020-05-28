import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { connect } from "react-redux";
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import './cart-dropdown.styles.scss';


const CartDropdown = ({ cartItems, history, dispatch }) => ( //need withRouter to use history parameter
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {  
                cartItems.length ? 
                cartItems.map(cartItem => (
                <CartItem key={ cartItem.id } item={cartItem}  /> 
                ))
                :
                (<span className='empty-message'>Your cart is empty</span>)
            }
        </div>
        {/* Added onClick to push history */}
        <CustomButton onClick={()=>{
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
})

//Added withRouter, because we wanted to get access to history
export default withRouter(connect(mapStateToProps)(CartDropdown));
//When you don't provide a second parameter, dispatch is sent into component