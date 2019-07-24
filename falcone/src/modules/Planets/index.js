import React, { useState } from "react";
import { connect } from "react-redux";
import { planetImgConstant } from "../../constants/image-constants";
import "./index.css";

const Planets = props => {
  const { currentDestination, activePlanet, planets, selectedPlanets } = props;
  const [currentPlanet, addCurrentPlanet] = useState(activePlanet); // to show the current selected planet

  // remove the launched planets
  let availablePlanets = planets;
  if (currentPlanet) {
    availablePlanets = planets.filter(el => {
      return !selectedPlanets.includes(el.name);
    });
  }

  return (
    <div className="available-planets-container">
      Select any four planets you want to search in...
      <div className="destination-info">
        Destination {currentDestination + 1}
      </div>
      <div className="available-planets-wrapper inner-wrapper">
        <div className="available-planets-sub-wrapper">
          {availablePlanets &&
            availablePlanets.map(el => {
              return (
                <div
                  onClick={() => {
                    addCurrentPlanet(el.name);
                    props.setCurrentPlanet(el.name);
                  }}
                  key={currentDestination + "-" + el.name}
                  className="available-planet"
                  ref={planet => {
                    // scroolintoview for selected element
                    if (el.name === currentPlanet) {
                      planet &&
                        planet.scrollIntoView({
                          behavior: "smooth",
                          inline: "center"
                        });
                    }
                  }}
                >
                  <img src={planetImgConstant[el.name]} />
                  <div
                    className={`${
                      el.name === currentPlanet ? "selected-" : ""
                    }planet-name`}
                  >
                    {el.name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="vehicles-wrapper">
        <Vehicles currentPlanet={currentPlanet} />
      </div> */}
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    currentDestination: state.currentDestination,
    planets: state.planets,
    selectedPlanets: state.selectedPlanets
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planets);
