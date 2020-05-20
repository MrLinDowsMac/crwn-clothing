const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE,action) => { //ES6 allows to set a default value parameter
    switch(action.type){
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
