import axios from 'axios';
export const setLoading = isLoading => dispatch => {
	dispatch({
		type: 'SET_LOADING',
		payload: isLoading
	});
};

export const setInitialValues = () => dispatch => {
	dispatch(setPlanets());
	dispatch(setVehicles());
	dispatch(setToken());
	dispatch(setLoading(false));
};

const setPlanets = () => dispatch => {
	axios
		.get(`https://findfalcone.herokuapp.com/planets`)
		.then(res => {
			if (res.status === 200) {
				dispatch({
					type: 'SET_PLANETS',
					payload: res.data
				});
			}
		})
		.catch(err => {
			console.log('Planets API fails -> ', err);
			dispatch({
				type: 'SET_PLANETS',
				payload: []
			});
		});
};

const setVehicles = () => dispatch => {
	axios
		.get(`https://findfalcone.herokuapp.com/vehicles`)
		.then(res => {
			if (res.status === 200) {
				dispatch({
					type: 'SET_VEHICLES',
					payload: res.data
				});
			}
		})
		.catch(err => {
			console.log('Vehicles API fails -> ', err);
			dispatch({
				type: 'SET_VEHICLES',
				payload: []
			});
		});
};

const setToken = () => dispatch => {
	axios
		.post(`https://findfalcone.herokuapp.com/token`, {}, { headers: { Accept: 'application/json' } })
		.then(res => {
			if (res.status === 200) {
				dispatch({
					type: 'SET_TOKEN',
					payload: res.data
				});
			}
		})
		.catch(err => {
			console.log('Token API fails -> ', err);
			dispatch({
				type: 'SET_TOKEN',
				payload: null
			});
		});
};
