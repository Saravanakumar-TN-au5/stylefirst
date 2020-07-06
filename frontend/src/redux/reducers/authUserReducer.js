let initialState = {
    isWishlistLoaded: false,
    isBagLoaded: false,
    addWishlistError: false,
    addBagError: false,
    authActionError: false
}

const reducer = (state=initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case 'SET_WISHLIST_LOADED':
            stateCopy.isWishlistLoaded = true
            return stateCopy;
        case 'SET_BAG_LOADED':
            stateCopy.isBagLoaded = true
            return stateCopy;
        case 'SET_ADDWISHLIST_ERROR':
            stateCopy.addWishlistError = true
            return stateCopy;
        case 'SET_ADDBAG_ERROR':
            stateCopy.addBagError = true
            return stateCopy;
        case 'AUTH_ACTION_ERROR':
            stateCopy.authActionError = true
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;