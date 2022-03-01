import userAbout from "./about";
import userSkill from "./skill";
import userLang from "./lang";
import userProfile from "./profile";
import userKnowledge from "./profile";
import userAttitude from "./attitude";

import { combineReducers } from "redux";

const reducers = combineReducers({
    //   myNumber:changeTheNumber
        userAbout,
        userSkill,
        userLang,
        userProfile,
        userKnowledge,
        userAttitude
});

export default reducers;