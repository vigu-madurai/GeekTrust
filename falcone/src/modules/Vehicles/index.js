import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { vehicleImgConstant } from "../../constants/image-constants";
import timer from "../../assets/timer.png";
import "./index.css";

const Vehicles = props => {
  const {
    currentPlanet,
    planets,
    timeValue,
    selectedVehicles,
    currentVehicle
  } = props;
  const [activeVehicle, setActiveVehicle] = useState(currentVehicle);
  let v = null;
  // filter out the active planet value to know the distance
  let activePlanet = planets.filter(el => {
    return el.name === currentPlanet;
  });
  activePlanet = activePlanet[0];

  // an object of vehicles with extra added properties
  const isVehiceCapable = () => {
    let vehicles = props.vehicles.map(el => {
      return {
        name: el.name,
        capable: activePlanet // check whether it can fly or not
          ? el.max_distance >= activePlanet.distance
          : false,
        // check the available number of ships
        availableNo:
          el.total_no -
          selectedVehicles.filter(data => {
            return el.name === data;
          }).length,
        speed: el.speed
      };
    });
    return vehicles;
  };

  // onclick of a vehicle
  const selectVehicle = el => {
    // if the vehicle can be selected
    if (el.availableNo && el.capable) {
      setActiveVehicle(el.name);
      v = el;
      props.setTimeTaken(activePlanet.distance / el.speed);
      props.setCurrentVehicle(el.name);
    }
    // if there is no available ships
    else if (!el.availableNo) {
      window.alert(`Forgive me King Shahn! There are no ${el.name}s left!`);
    }
    // if user select a uncapable ship
    else {
      window.alert(
        `King Shahn! ${el.name} is not capable to fly to ${activePlanet.name}`
      );
    }
  };

  useEffect(() => {
    if (!props.currentVehicle && activeVehicle) {
      setActiveVehicle(null);
    }
  }, [props.currentVehicle]);

  return (
    <div className="available-vehicles-container">
      <div className="vehicle-wrapper">
        {isVehiceCapable().map(el => {
          return (
            <div
              onClick={() => selectVehicle(el)}
              className={`vehicle ${el.capable ? "" : "not-capable"}`}
            >
              <img src={vehicleImgConstant[el.name]} />

              <div
                className={`vehicle-name ${
                  activeVehicle && activeVehicle === el.name
                    ? "selected-vehicle"
                    : ""
                }`}
              >
                {el.name}
              </div>
              <div
                className={`available-number ${
                  el.availableNo ? "" : "not-available-ships"
                }`}
              >
                +{el.availableNo}
              </div>
            </div>
          );
        })}
      </div>

      {/* {activeVehicle && (
        <div className="time-taken">
          <img src={timer} alt="timer" />
          {timeValue + activePlanet.distance / activeVehicle.speed}
        </div>
      )} */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles,
    selectedVehicles: state.selectedVehicles,
    planets: state.planets,
    timeTaken: state.timeTaken
  };
};

export default connect(
  mapStateToProps,
  null
)(Vehicles);
