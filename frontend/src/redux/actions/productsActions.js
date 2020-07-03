import axios from 'axios';
const action = {}

action.getProducts = (path) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URI}/products${path}`)
        .then(res => {
            dispatch({type:'GET_PRODUCTS', payload: res.data})
        })
        .catch(err => {
            dispatch({type: 'FETCH_ERROR', payload: err.message})
        })
    }
}

action.getFilters = (path) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URI}/getFilters${path}`)
        .then(res => {
            dispatch({type:'GET_FILTERS', payload: res.data})
        })
        .catch(err => {
            dispatch({type: 'FETCH_ERROR', payload: err.message})
        })
    }
}

action.setSelectedFilters = (data) => {
    return (dispatch) => dispatch({type: 'SET_SELECTEDFILTERS', payload: data})
} 

action.filterProducts = (path, data) => {
    let { category, size, material, color} = data || {category:'',size:'',material:'',color:''}
    let url = `${process.env.REACT_APP_API_URI}/getFilteredProducts${path}?category=${category}&material=${material}&size=${size}&color=${color}`
    return (dispatch) => {
        axios.get(url)
        .then(res => {
            dispatch({type:'GET_PRODUCTS', payload: res.data})
        })
        .catch(err => {
            dispatch({type: 'FETCH_ERROR', payload: err.message})
        })
    }
}

action.setIsProducts = () => {
    return (dispatch) => {
        dispatch({type: 'SET_ISPRODUCTS'})
    }
}

action.setIsFilterSelected = () => {
    return (dispatch) => {
        dispatch({type: 'SET_ISFILTERSELECTED'})
    }
}

export const { 
    getProducts, getFilters, filterProducts, setIsProducts, setSelectedFilters, setIsFilterSelected} = action;