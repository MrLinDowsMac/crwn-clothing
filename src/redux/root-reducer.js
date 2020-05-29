import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";//localstorage

import  userReducer  from "./user/user.reducer";
import  cartReducer  from "./cart/cart.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //reducer that we want to store
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);