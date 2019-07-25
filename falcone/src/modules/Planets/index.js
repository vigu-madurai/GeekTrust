import React, { useState } from 'react';
import { connect } from 'react-redux';

import { planetImgConstant } from '../../constants/image-constants';
import './index.css';

const Planets = props => {
	const { currentDestination, currentPlanet, planets, selectedPlanets } = props;
	const [activePlanet, setActivePlanet] = useState(currentPlanet); // to show the current selected planet

	// remove the launched planets
	let availablePlanets = planets;
	if (activePlanet) {
		availablePlanets = planets.filter(el => {
			return !selectedPlanets.includes(el.name);
		});
	}

	return (
		<div className='available-planets-container'>
			Select any four planets you want to search in...
			<div className='destination-info'>Destination {currentDestination + 1}</div>
			{/* Planet wrappers */}
			<div className='available-planets-wrapper inner-wrapper'>
				<div className='available-planets-sub-wrapper'>
					{availablePlanets &&
						availablePlanets.map(el => {
							return (
								<div
									onClick={() => {
										setActivePlanet(el.name);
										props.setCurrentPlanet(el.name);
									}}
									key={currentDestination + '-' + el.name}
									className='available-planet'
									ref={planet => {
										// scroolintoview for selected element
										if (el.name === activePlanet) {
											planet &&
												planet.scrollIntoView({
													behavior: 'smooth',
													inline: 'center'
												});
										}
									}}
								>
									{/* set image for the planets */}
									<img src={planetImgConstant[el.name]} />
									{/* highlight the last selected plant */}
									<div className={`${el.name === activePlanet ? 'selected-' : ''}planet-name`}>
										{el.name}
									</div>
								</div>
							);
						})}
				</div>
			</div>
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
