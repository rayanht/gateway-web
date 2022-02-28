const initialState = [];

const userKnowledge = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_KNOWLEDGE":
            return {
                ...state,
                knowledge: action.payload
            }
        default: return state;
    }
}

export default userKnowledge;