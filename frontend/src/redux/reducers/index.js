import { combineReducers } from 'redux';
import signReducer from './signReducer';
import productsReducer from './productsReducer';
import headerReducer from './headerReducer';
import userReducer from './userReducer';
import authUserReducer from './authUserReducer';

export default combineReducers({
    signReducer, productsReducer, headerReducer, userReducer, authUserReducer
});