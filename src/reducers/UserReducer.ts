const userStorakeKey = "user";

interface Action {
	type: string;
	data: any;
}

const setUserToLocalStorage = (user: any) => {
	window.localStorage.setItem(userStorakeKey, JSON.stringify({ ...user }));
};

const getUserFromLocalStorage = () => {
	const userString = window.localStorage.getItem(userStorakeKey)
	if (userString === null) {
		return null
	}
	return JSON.parse(userString);
};

const removeUserFromLocalStorage = () => {
	return window.localStorage.removeItem(userStorakeKey);
};

const userReducer = (state = getUserFromLocalStorage(), action: Action) => {
	const user = action.data
	switch (action.type) {
		case 'SET_USER':
			setUserToLocalStorage({ ...user })
			return { ...user }
		case 'REMOVE_USER':
			removeUserFromLocalStorage();
			return null
		default:
			return state
	}
}

export const setUser = (user: any) => {
	return {
		type: 'SET_USER',
		data: user
	}
}

export const removeUser = () => {
	return {
		type: 'REMOVE_USER'
	}
}

export default userReducer
