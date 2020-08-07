import axios from 'axios';
axios.defaults.withCredentials = true;
const action = {}

action.register = (userData) => {
    return (dispatch) => {
            console.log(userData)
            axios.post(`${process.env.REACT_APP_API_URI}/register`, userData)
            .then((res) => {
                console.log(res)
                dispatch({type: 'REGISTER', payload: res.data});
            })
            .catch((err) => {
                console.log(err)
                dispatch({type: 'REGISTER_ERROR', payload: err.response.data.message});
            });
        }
}

action.login = (userCreds) => {
    return async (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/login`, userCreds, {withCredentials:true})
            .then((res) => {
                axios.get(`${process.env.REACT_APP_API_URI}/getOrders`)
                .then((res) => {
                    dispatch({type: 'SET_ORDERS', payload: res.data})
                })
                dispatch({type: 'LOGIN', payload: res.data})
                dispatch({type: 'ADD_WISHLIST', payload: res.data.wishlist})
                dispatch({type: 'ADD_BAG', payload: res.data.bag})
                dispatch({type: 'TOGGLE_TOPDRAWER'})
            })
            .catch((err) => {
                dispatch({type: 'LOGIN_ERROR', payload: err.response.data.message});
            });
    }
}

action.logout = () => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URI}/logout`,{}, {withCredentials:true});
            dispatch({type: 'LOGOUT'});
            dispatch({type: 'TOGGLE_TOPDRAWER'});
            dispatch({type: 'CLEAR_WISHLIST_BAG'});
        } catch (err) {
            dispatch({type: 'LOGOUT_ERROR', payload: err.response.data.message});
        }
    }
}

export const { register, login, logout} = action;