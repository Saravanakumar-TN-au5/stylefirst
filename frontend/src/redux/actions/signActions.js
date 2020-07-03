import axios from 'axios';
const action = {}

action.register = (userData) => {
    return (dispatch) => {
            axios.post(`${process.env.REACT_APP_API_URI}/register`, userData, {withCredentials:true})
            .then((res) => {
                dispatch({type: 'LOGIN', payload: res.data});
            })
            .catch((err) => {
                dispatch({type: 'SIGN_ERROR', payload: err.response.data.message});
            });
        }
}

action.login = (userCreds) => {
    return async (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/login`, userCreds, {withCredentials:true})
            .then((res) => {
                dispatch({type: 'LOGIN', payload: res.data})
                dispatch({type: 'TOGGLE_TOPDRAWER'})

            })
            .catch((err) => {
                dispatch({type: 'SIGN_ERROR', payload: err.response.data.message});
            });
    }
}

action.logout = () => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URI}/logout`,{}, {withCredentials:true});
            dispatch({type: 'LOGOUT'});
            dispatch({type: 'TOGGLE_TOPDRAWER'})
        } catch (err) {
            dispatch({type: 'SIGN_ERROR', payload: err.response.data.message});
        }
    }
}

export const { register, login, logout} = action;