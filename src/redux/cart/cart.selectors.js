import { createSelector } from 'reselect';

const selectCart = state => state.cart; //

export const selectCartItems = createSelector(
    [selectCart], //Se escriben los selectores en el arreglo en el orden que se declaran arriba (si hay varios)
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
    cartItems.reduce(
        (accumlatedQuantity, cartItem) => 
            accumlatedQuantity + cartItem.quantity, 
            0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
    cartItems.reduce(
        (accumlatedQuantity, cartItem) => 
            accumlatedQuantity + cartItem.quantity * cartItem.price, 
            0
        )
)