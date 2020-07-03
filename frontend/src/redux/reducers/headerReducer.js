let initialState = {
    topDrawerVisible: false
}

const reducer = (state=initialState, action)=> {
    let stateCopy = {...state};
    switch (action.type) {
        case 'TOGGLE_TOPDRAWER':
            stateCopy.topDrawerVisible =stateCopy.topDrawerVisible ?  false : true;
            return stateCopy;
    
        default:
            return stateCopy;
    }
}

export default reducer;