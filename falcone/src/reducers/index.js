export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload
			};
		case 'SET_PLANETS':
			return {
				...state,
				planets: action.payload
			};
		case 'SET_VEHICLES':
			return {
				...state,
				vehicles: action.payload
			};
		case 'SET_TOKEN':
			return {
				...state,
				token: action.payload
			};
		default:
			return state;
	}
};
