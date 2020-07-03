let initialState = {
    userData : {},
    isAuthenticated : false,
    signError: null
}

const reducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case 'LOGIN':
            stateCopy.userData = {...action.payload};
            stateCopy.isAuthenticated = true;
            console.log(stateCopy)
            return stateCopy;
        case 'SIGN_ERROR':
            stateCopy.signError = action.payload;
            console.log(stateCopy)
            return stateCopy;
        case 'LOGOUT' :
            stateCopy.isAuthenticated = false;
            stateCopy.userData = {};
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;