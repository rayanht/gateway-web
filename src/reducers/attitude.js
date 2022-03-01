const initialState = [];

const userAttitude = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_ATTITUDE":
            return {
                ...state,
                attitude: action.payload
            }
        default: return state;
    }
}

export default userAttitude;