import axios from 'axios';
axios.defaults.withCredentials = true;
const action = {}

action.loadWishlistToDb = (products) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/addToWishlistBulk`, products)
        .then(res => {
            console.log(res,'load wishlist')
            if (res.status === 201) {
                dispatch({type: 'SET_WISHLIST_LOADED'})
            }
        })
        .catch(err => {
            dispatch({type: 'ERROR_LOADING'})
        })
    }
}

action.loadBagToDb = (products) => {
    return (dispatch) => {axios.post(`${process.env.REACT_APP_API_URI}/addToBagBulk`, products)
    .then(res => {
        if (res.status === 201) {
            dispatch({type: 'SET_BAG_LOADED'})
        }
    })
    .catch(err => {
        dispatch({type: 'ERROR_LOADING'})
    })}
}

action.addToWishlist = (product) => {
    return (dispatch) => {
        console.log('bd call')
        axios.post(`${process.env.REACT_APP_API_URI}/addToWishlist`, product)
        .then(res => {
            console.log(res,'db call res')
            if (res.status === 201) {
                dispatch({type: 'ADD_WISHLIST', payload: product})
            } else {
                dispatch({type: 'SET_ADDWISHLIST_ERROR'})
            }
        })
        .catch(err => {
            dispatch({type: 'AUTH_ACTION_ERROR'})
        })
    }
}

action.removeFromWishlist = (prodCode) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_URI}/removeFromWishlist`, {data: {prodCode}})
        .then(res => {
            if (res.status === 200) {
                dispatch({type: 'REMOVE_WISHLIST', payload: prodCode})
            }
        })
        .catch(err => {
            dispatch({type: 'AUTH_ACTION_ERROR'})
        })
    }
}

action.addToBag = (product) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/addToBag`, product)
        .then(res => {
            if (res.status === 201) {
                dispatch({type: 'ADD_BAG', payload: product})
            } else {
                dispatch({type: 'SET_ADDBAG_ERROR'})
            }
        })
        .catch(err => {
            dispatch({type: 'AUTH_ACTION_ERROR'})
        })
    }
}

action.removeFromBag = (product) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_URI}/removeFromBag`, {data: {product}})
        .then(res => {
            if (res.status === 200) {
                dispatch({type: 'REMOVE_BAG', payload: product})
            }
        })
        .catch(err => {
            dispatch({type: 'AUTH_ACTION_ERROR'})
        })
    }
}

action.decrementBag = (product) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/decrementBag`, product)
        .then(res => {
            if (res.status === 201) {
                dispatch({type: 'DECREMENT_BAG', payload: product})
            } else {
                dispatch({type: 'SET_ADDBAG_ERROR'})
            }
        })
        .catch(err => {
            dispatch({type: 'AUTH_ACTION_ERROR'})
        })
    }
}

action.placeOrder = (order) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/placeOrder`, order)
        .then(res => {
            let orderDoc = res.data;
            if (res.status === 201){
                axios.delete(`${process.env.REACT_APP_API_URI}/clearBag`)
                .then(() => {
                    dispatch({type: 'SET_ORDERS', payload: orderDoc})
                    dispatch({type: 'CLEAR_BAG'})
                })
            }
        })
        .catch(err => {
            dispatch({type: 'AUTH_ACTION_ERROR'})
        })
    }
}

export const { 
    loadWishlistToDb, loadBagToDb, addToWishlist, placeOrder,
    addToBag, removeFromBag, removeFromWishlist, decrementBag
} = action