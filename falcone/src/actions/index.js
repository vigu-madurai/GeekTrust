import axios from "axios";
export const setLoading = isLoading => dispatch => {
  dispatch({
    type: "SET_LOADING",
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
          type: "SET_PLANETS",
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log("Planets API fails -> ", err);
      dispatch({
        type: "SET_PLANETS",
        payload: []
      });
      // window.location.href = '/404';
    });
};

const setVehicles = () => dispatch => {
  axios
    .get(`https://findfalcone.herokuapp.com/vehicles`)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: "SET_VEHICLES",
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log("Vehicles API fails -> ", err);
      dispatch({
        type: "SET_VEHICLES",
        payload: []
      });
    });
};

const setToken = () => dispatch => {
  axios
    .post(
      `https://findfalcone.herokuapp.com/token`,
      {},
      { headers: { Accept: "application/json" } }
    )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: "SET_TOKEN",
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log("Token API fails -> ", err);
      dispatch({
        type: "SET_TOKEN",
        payload: null
      });
    });
};

export const setCurrentDestination = () => (dispatch, getState) => {
  const { currentDestination } = getState();
  dispatch({
    type: "SET_CURRENT_DESTINATION",
    payload: currentDestination + 1
  });
};

export const setSelectedVehicles = vehicle => (dispatch, getState) => {
  let { vehicles } = getState();
  vehicles.push(vehicle);
  dispatch({
    type: "SET_SELECTED_VEHICLES",
    payload: vehicles
  });
};

export const setSelectedPlanets = planet => (dispatch, getState) => {
  let { selectedPlanets, currentDestination } = getState();
  selectedPlanets[currentDestination] = planet;
  dispatch({
    type: "SET_SELECTED_PLANETS",
    payload: selectedPlanets
  });
};

export const setTimeTaken = () => (dispatch, getState) => {
  let { planets, vehicles } = getState();
  let time = 0;
  dispatch({
    type: "SET_TIME_TAKEN",
    payload: time
  });
};

export const resetVlaues = () => dispatch => {
  dispatch({
    type: "RESET",
    payload: {}
  });
};
