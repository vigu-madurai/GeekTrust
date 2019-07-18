import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(
  initialState = {
    vehicles: [],
    planets: [],
    loading: true,
    token: null,
    selectedPlanets: [],
    selectedVehicles: [],
    currentDestination: 0,
    timeTaken: 0,
    isResultAvailable: null
  }
) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
