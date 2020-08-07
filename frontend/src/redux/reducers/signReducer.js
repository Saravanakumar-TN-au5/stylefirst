let initialState = {
    userData : {},
    isAuthenticated : false,
    registerError: null,
    loginError: null,
    logoutError: null,
    isRegistered: false
}

const reducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case 'REGISTER':
            stateCopy.userData = {...action.payload};
            stateCopy.isRegistered = true;
            stateCopy.isAuthenticated = true;
            console.log(stateCopy)
            return stateCopy
        case 'LOGIN':
            stateCopy.userData = {...action.payload};
            stateCopy.isAuthenticated = true;
            console.log(stateCopy)
            return stateCopy;
        case 'REGISTER_ERROR':
            stateCopy.registerError = action.payload;
            console.log(stateCopy)
            return stateCopy;
        case 'LOGIN_ERROR':
            stateCopy.loginError = action.payload;
            console.log(stateCopy)
            return stateCopy;
        case 'LOGOUT_ERROR':
            stateCopy.logoutError = action.payload;
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