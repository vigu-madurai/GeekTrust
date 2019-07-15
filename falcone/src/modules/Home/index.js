import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from '../DropDown';
import { setInitialValues } from '../../actions';
class Home extends PureComponent {
	renderDestination = () => {
		return (
			<>
				<div className='destination'>Destination 1</div>
				<div>
					{JSON.stringify(this.props.planets[0])}
					<Dropdown />
				</div>
			</>
		);
	};

	componentDidMount() {
		this.props.setInitialValues();
	}
	render() {
		console.log(this.state);
		return (
			<div className='home-container'>
				Select Planets you want to serach in...
				<div className='destination-container'>{this.renderDestination()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = {
	setInitialValues
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
