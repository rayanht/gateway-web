/*export const addAbout = (about) => ({
	type: 'SET_USER',
	payload: about,
});

export function addAbout(about) {
	type: 'SET_USER_ABOUT',
	payload: about,
}*/

export const addAbout = (about) => {
	return {
		type: 'SET_USER_ABOUT',
		payload: about
	}
}

export const addExp = (exp) => {
	return {
		type: 'SET_USER_EXP',
		payload: exp
	}
}

export const addSkill = (skill) => {
	return {
		type: 'SET_USER_SKILL',
		payload: skill
	}
}

export const addLang = (lang) => {
	return {
		type: 'SET_USER_LANG',
		payload: lang
	}
}

export const addProfile = (profile) => {
	return {
		type: 'SET_USER_PROFILE',
		payload: profile
	}
}

export const addKnowledge = (knowledge) => {
	return {
		type: 'SET_USER_KNOWLEDGE',
		payload: knowledge
	}
}

export const addAttitude = (attitude) => {
	return {
		type: 'SET_USER_ATTITUDE',
		payload: attitude
	}
}