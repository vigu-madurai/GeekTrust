import React, { useState } from "react";
import { connect } from "react-redux";
import { planetImgConstant } from "../../constants/image-constants";
import "./index.css";

const Planets = props => {
  const { currentDestination, availablePlanets } = props;
  const [currentPlanet, addCurrentPlanet] = useState(""); // to show the current selected planet
  return (
    <div className="available-planets-container">
      Remaining planets where Al Falcone may hide
      <div className="available-planets-wrapper inner-wrapper">
        {availablePlanets &&
          availablePlanets.map(el => {
            return (
              <div
                onClick={() => {
                  addCurrentPlanet(el.name);
                  props.setCurrentPlanet(el.name);
                }}
                key={currentDestination + "-" + el.name}
                className={`available-planet ${
                  el.name === currentPlanet ? "selected-planet" : ""
                }`}
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
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    currentDestination: state.currentDestination
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planets);
