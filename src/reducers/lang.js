const initialState = [];

const userLang = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_LANG":
            return {
                ...state,
                lang: action.payload
            }
        default: return state;
    }
}

export default userLang;