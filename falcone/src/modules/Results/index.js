import React from 'react';
import { connect } from 'react-redux';

import { planetImgConstant, resultsImgConstant } from '../../constants/image-constants';
import launchToPlanets from '../../assets/launchToPlanets.gif';
import timer from '../../assets/timer.png';
import './index.css';

const Results = props => {
	const { results, timeTaken } = props;

	const renderResultData = () => {
		const { status, planet_name } = results;
		if (status === 'success') {
			return {
				title1: 'Hurray King Shan!',
				title2: `Its a great success, we found the Queen Al Falcone at ${planet_name}`,
				timeTaken: timeTaken,
				img: planetImgConstant[planet_name],
				status: 'success'
			};
		} else if (status === 'false') {
			return {
				title1: 'All our efforts wasted in vain!',
				title2: 'King Shan! I am really sorry to say that we could not find the Queen Al Falcone',
				status: 'false',
				timeTaken: timeTaken
			};
		} else {
			return {
				title1: 'Err... Errr..',
				title2: 'Technical Fault! Mission Failure! Please try again later...',
				status: 'failure'
			};
		}
	};

	// load if the resut is loaded
	if (results && results.status) {
		return (
			<div className='result-container'>
				<ResultTemplate result={renderResultData()} />
				<a href='/' className='header-btns'>
					Restart
				</a>
			</div>
		);
	}
	// load if the result is not yet loaded
	return (
		<div className='loader-wrapper'>
			<img src={launchToPlanets} alt='loader' />
			Launching...
		</div>
	);
};

// presentation to display results
const ResultTemplate = result => {
	const { title1, title2, img, status, timeTaken } = result.result;
	return (
		<div className='result-wrapper'>
			<div className={`title1 ${status}`}>{title1}</div>
			<img src={resultsImgConstant[status]} className='status-img' />
			<div className='title2'>{title2}</div>
			{img && <img src={img} className='planet-img' />}
			{timeTaken && (
				<div className='timer-wrapper'>
					<img src={timer} className='timer-img' />: {timeTaken}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		results: state.results,
		timeTaken: state.timeTaken
	};
};

export default connect(
	mapStateToProps,
	null
)(Results);
