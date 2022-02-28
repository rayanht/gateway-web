const initialState = "";

const userAbout = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_ABOUT":
            return {
                ...state,
                about: action.payload
            }
        default: return state;
    }
}

export default userAbout;