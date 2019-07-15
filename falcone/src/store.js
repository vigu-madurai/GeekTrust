import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
export default function configureStore(
	initialState = {
		vehicles: [],
		planets: [],
		loading: true,
		token: null
	}
) {
	return createStore(reducers, initialState, applyMiddleware(thunk));
}
