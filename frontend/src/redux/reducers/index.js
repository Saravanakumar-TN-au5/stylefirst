import { combineReducers } from 'redux';
import signReducer from './signReducer';
import productsReducer from './productsReducer';
import headerReducer from './headerReducer';

export default combineReducers({
    signReducer, productsReducer, headerReducer
});