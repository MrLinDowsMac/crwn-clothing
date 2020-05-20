import { CartActionTypes }  from  './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN //this doesn't need playload
});