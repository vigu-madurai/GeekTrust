import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { setCurrentDestination, setSelectedPlanets } from "../../actions";
import Planets from "../Planets";
import "./index.css";

class LaunchDestination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setCurrentPlanet = currentPlanet => {
    // add only the current selected planet for the current launch
    this.props.setSelectedPlanets(currentPlanet);
  };

  filterPlanets = () => {
    // remove the launched planets
    const { planets, selectedPlanets } = this.props;
    return planets.filter(el => {
      return !selectedPlanets.includes(el.name);
    });
  };

  render() {
    const { currentDestination } = this.props;
    return (
      <>
        <div className="destination-container-heading inner-padding">
          Select Planets you want to search in...
        </div>
        <div className="destination-container">
          {/* run the launch vehicles for 4 destinations */}
          {currentDestination < 4 ? (
            <div className="launch-wrapper">
              <div className="planet-wrapper">
                {/* show the available planets */}
                <Planets
                  setCurrentPlanet={this.setCurrentPlanet}
                  availablePlanets={this.filterPlanets()}
                />
              </div>
              <div className="vehicles-wrapper">Vehicles</div>
              <button
                onClick={() => {
                  this.props.setCurrentDestination();
                }}
              >
                Launch Destination {currentDestination + 1}
              </button>
            </div>
          ) : (
            // result goes here
            "Here the result is"
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = { setCurrentDestination, setSelectedPlanets };

const mapStateToProps = state => {
  return {
    planets: state.planets,
    currentDestination: state.currentDestination,
    selectedPlanets: state.selectedPlanets
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchDestination);
