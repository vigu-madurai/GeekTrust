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
          payload: res.data.token
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

const getResults = () => (dispatch, getState) => {
  const { token, selectedPlanets, selectedVehicles } = getState();
  setTimeout(() => {
    axios
      .post(
        `https://findfalcone.herokuapp.com/find`,
        {
          token: token,
          planet_names: selectedPlanets,
          vehicle_names: selectedVehicles
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: "SET_RESULTS",
            payload: res.data
          });
        }
      })
      .catch(err => {
        console.log("Find API fails -> ", err);
        const failure = {
          status: "failure"
        };
        dispatch({
          type: "SET_RESULTS",
          payload: failure
        });
      });
  }, 3000);
};

export const setCurrentDestination = () => (dispatch, getState) => {
  const { currentDestination } = getState();
  dispatch({
    type: "SET_CURRENT_DESTINATION",
    payload: currentDestination + 1
  });
  if (currentDestination + 1 == 4) {
    dispatch(getResults());
  }
};

export const setSelectedVehicles = vehicle => (dispatch, getState) => {
  let { selectedVehicles, currentDestination } = getState();
  selectedVehicles[currentDestination] = vehicle;
  dispatch({
    type: "SET_SELECTED_VEHICLES",
    payload: selectedVehicles
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

export const setTimeTaken = time => dispatch => {
  dispatch({
    type: "SET_TIME_TAKEN",
    payload: time
  });
};
