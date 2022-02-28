const initialState = {
	userAbout: "",
};

function reducer(state=initialState, action){
    switch(action.type){
        case "SET_USER_ABOUT": 
        // debugger
        return {
            ...state,
            userAbout: action.payload
        }
        case "SET_USER_SKILL": 
        // debugger
        return {
            ...state,
            userSkill: action.payload
        }
        case "SET_USER_LANG": 
        // debugger
        return {
            ...state,
            userLang: action.payload
        }
        case "SET_USER_PROFILE": 
        // debugger
        return {
            ...state,
            userProfile: action.payload
        }
        default: return state
    }
}

export default reducer