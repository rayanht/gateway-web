const initialState = [];

const userSkill = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_SKILL":
            return {
                ...state,
                skill: action.payload
            }
        default: return state;
    }
}

export default userSkill;