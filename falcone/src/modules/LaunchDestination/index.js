import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setCurrentDestination, setSelectedPlanets, setSelectedVehicles, setTimeTaken } from '../../actions';

import Planets from '../Planets';
import Results from '../Results';
import Vehicles from '../Vehicles';

import loader from '../../assets/loader.gif';
import timer from '../../assets/timer.png';
import './index.css';

class LaunchDestination extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activePlanet: null, // actively selected planet to launch
			activeVehicle: null, // actively selected vahicle to launch
			timeValue: props.timeTaken // timetaken for selected panets
		};
	}

	// add only the current selected planet for the current launch
	setCurrentPlanet = currentPlanet => {
		this.setState({ activePlanet: currentPlanet, activeVehicle: null });
	};

	// add the vehicle selected wrt to selected plant
	setCurrentVehicle = currentVehicle => {
		this.setState({ activeVehicle: currentVehicle });
	};

	// add the time value wrt to a selected planet & vehicle
	setTimeTaken = timeValueOfActiveVehicle => {
		this.setState({
			timeValue: this.props.timeTaken + timeValueOfActiveVehicle
		});
	};

	// set the planet & vehicle as null
	resetPlanetVehicles = () => {
		return this.setState({
			activePlanet: null,
			activeVehicle: null
		});
	};

	// reset button
	reset = () => {
		this.resetPlanetVehicles();
		this.setState({
			timeValue: this.props.timeTaken // set the timer to latest launched vehicles timer value
		});
	};

	// launch to planet
	launchPlanet = () => {
		const { activePlanet, activeVehicle, timeValue } = this.state;
		this.props.setSelectedPlanets(activePlanet); // set planet
		this.props.setSelectedVehicles(activeVehicle); // set vehicle
		this.props.setTimeTaken(timeValue); // set time taken
		this.props.setCurrentDestination(); // increase the destination by 1
		this.resetPlanetVehicles(); // reset active planet and vehicle
	};

	render() {
		const { currentDestination, planets } = this.props;
		return (
			<>
				{// Show Loader until the API receives data
				!Object.keys(planets).length ? (
					<div className='loader-wrapper'>
						<img src={loader} alt='loader' />
						Loading...
					</div>
				) : (
					// Initial APIs received
					<div className='destination-container'>
						{/* run the launch vehicles for 4 destinations */}
						{currentDestination < 4 ? (
							<div className='launch-wrapper'>
								<div className='planet-wrapper'>
									{/* show the available planets */}
									<Planets
										setCurrentPlanet={this.setCurrentPlanet}
										currentPlanet={this.state.activePlanet}
									/>
								</div>

								{/* timer for selected vehicle wrt to the selected plant */}
								<div className='timer-wrapper'>
									<img src={timer} alt={'timer'} />: {this.state.timeValue}
								</div>

								{// show the vehicles
								this.state.activePlanet && (
									<Vehicles
										currentPlanet={this.state.activePlanet}
										currentVehicle={this.state.activeVehicle}
										setCurrentVehicle={this.setCurrentVehicle}
										setTimeTaken={this.setTimeTaken}
										timeValue={this.state.timeValue}
									/>
								)}

								{// show the launch & reset buttons only if planet & vehicle selected
								this.state.activePlanet && this.state.activeVehicle && (
									<div className='btn-containers'>
										<button onClick={this.reset} className='reset-btn'>
											Reset
										</button>
										<button onClick={this.launchPlanet} className='launch-btn'>
											Launch
										</button>
									</div>
								)}
							</div>
						) : (
							<Results /> // result goes here
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
		currentDestination: state.currentDestination,
		planets: state.planets,
		selectedPlanets: state.selectedPlanets,
		selectedVehicles: state.selectedVehicles,
		timeTaken: state.timeTaken
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LaunchDestination);
