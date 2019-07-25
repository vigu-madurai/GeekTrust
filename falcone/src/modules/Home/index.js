import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setInitialValues } from '../../actions';

import LaunchDestination from '../LaunchDestination';
import './index.css';
class Home extends PureComponent {
	componentDidMount() {
		this.props.setInitialValues(); // fetch planet, vehicle, token values
	}

	render() {
		return (
			<div className='home-container'>
				<LaunchDestination />
			</div>
		);
	}
}

const mapDispatchToProps = {
	setInitialValues
};

export default connect(
	null,
	mapDispatchToProps
)(Home);
