const INITIAL_STATE ={
    utilizatorCurent :null
}

const userReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_UTILIZATOR_CURENT' :
            return {
                ...state, 
                utilizatorCurent: action.payload
            }

        default:
        return state;
    }
}

export default userReducer;