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
		case 'SET_CURRENT_DESTINATION':
			return {
				...state,
				currentDestination: action.payload
			};

		case 'SET_SELECTED_VEHICLES':
			return {
				...state,
				selectedVehicles: action.payload
			};

		case 'SET_SELECTED_PLANETS':
			return {
				...state,
				selectedPlanets: action.payload
			};
		case 'SET_TIME_TAKEN':
			return {
				...state,
				timeTaken: action.payload
			};
		case 'SET_RESULTS':
			return {
				...state,
				results: action.payload
			};
		default:
			return state;
	}
};
