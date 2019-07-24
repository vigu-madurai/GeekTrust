import React, { PureComponent } from "react";
import { connect } from "react-redux";

import {
  setCurrentDestination,
  setSelectedPlanets,
  setSelectedVehicles,
  setTimeTaken
} from "../../actions";
import Planets from "../Planets";
import Results from "../Results";
import Vehicles from "../Vehicles";
import launchToPlanets from "../../assets/launchToPlanets.gif";
import loader from "../../assets/loader.gif";
import "./index.css";

class LaunchDestination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePlanet: null,
      activeVehicle: null,
      timeValue: props.timeTaken
    };
  }

  setCurrentPlanet = currentPlanet => {
    // add only the current selected planet for the current launch
    this.setState({ activePlanet: currentPlanet, activeVehicle: null });
  };

  setCurrentVehicle = currentVehicle => {
    this.setState({ activeVehicle: currentVehicle });
  };

  setTimeTaken = timeValue => {
    this.setState({ timeValue: timeValue });
  };
  render() {
    const {
      currentDestination,

      results,
      planets
    } = this.props;
    return (
      <>
        {!Object.keys(planets).length ? (
          <div className="loader-wrapper">
            <img src={loader} alt="loader" />
            Loading...
          </div>
        ) : (
          <div className="destination-container">
            {/* run the launch vehicles for 4 destinations */}
            {currentDestination < 4 ? (
              <div className="launch-wrapper">
                <div className="planet-wrapper">
                  {/* show the available planets */}
                  <Planets
                    setCurrentPlanet={this.setCurrentPlanet}
                    activePlanet={this.state.activePlanet}
                  />
                </div>
                {this.state.activePlanet && (
                  <Vehicles
                    currentPlanet={this.state.activePlanet}
                    setCurrentVehicle={this.setCurrentVehicle}
                    setTimeTaken={this.setTimeTaken}
                    timeValue={this.state.timeValue}
                  />
                )}
                {this.state.activePlanet && this.state.activeVehicle && (
                  <div className="btn-containers">
                    <button
                      onClick={() =>
                        this.setState({
                          activePlanet: null,
                          activeVehicle: null
                        })
                      }
                      className="reset-btn"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => {
                        this.props.setSelectedPlanets(this.state.activePlanet);
                        this.props.setSelectedVehicles(
                          this.state.activeVehicle
                        );
                        this.props.setCurrentDestination();
                        this.setState({
                          activePlanet: null,
                          activeVehicle: null
                        });
                      }}
                      className="launch-btn"
                    >
                      Launch
                    </button>
                  </div>
                )}
              </div>
            ) : // result goes here
            results ? (
              <Results />
            ) : (
              <div className="loader-wrapper">
                <img src={launchToPlanets} alt="loader" />
                Launching...
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  setCurrentDestination,
  setSelectedPlanets,
  setSelectedVehicles,
  setTimeTaken
};

const mapStateToProps = state => {
  return {
    planets: state.planets,
    currentDestination: state.currentDestination,
    selectedPlanets: state.selectedPlanets,
    selectedVehicles: state.selectedVehicles,
    results: state.results,
    timeTaken: state.timeTaken
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchDestination);
