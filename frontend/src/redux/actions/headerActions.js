const action = {};

action.toggleTopdrawer = () => {
    return (dispatch) => dispatch({type: 'TOGGLE_TOPDRAWER'})
}

export const { toggleTopdrawer } = action;