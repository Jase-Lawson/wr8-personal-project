import { createStore, combineReducers } from 'redux';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
  productReducer: productReducer
})

export default createStore(rootReducer)
