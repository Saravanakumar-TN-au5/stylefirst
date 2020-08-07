let initialState = {
    products: [],
    filters: {},
    selectedFilters: {
        category: '',
        size: '',
        color: '',
        material: ''
    },
    fetchError: false,
    isProducts: false,
    isFilters: false,
    isFilterSelected: false
}

const reducer = (state=initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case 'GET_PRODUCTS':
            stateCopy.products = [...action.payload]
            stateCopy.isProducts = true
            console.log(stateCopy)
            return stateCopy
        case 'GET_FILTERS':
            stateCopy.filters = {...action.payload}
            stateCopy.isFilters = true
            console.log(stateCopy)
            return stateCopy
        case 'SET_ISPRODUCTS':
            stateCopy.isProducts = false
            return stateCopy
        case 'SET_SELECTEDFILTERS':
            stateCopy.selectedFilters = {...stateCopy.selectedFilters, ...action.payload}
            stateCopy.isFilterSelected = true
            return stateCopy
        case 'SET_ISFILTERSELECTED':
            stateCopy.isFilterSelected = false
            return stateCopy
        case 'FETCH_ERROR':
            stateCopy.fetchError = true
            console.log(stateCopy)
            return stateCopy
        default:
            return stateCopy;
    }
}

export default reducer;