import React, { PureComponent } from 'react';
import axios from 'axios';

import { Dropdown } from '../DropDown';

export default class Home extends PureComponent {
	renderDestination = () => {
		return (
			<>
				<div className='destination'>Destination 1</div>
				<div>
					<Dropdown />
				</div>
			</>
		);
	};

	componentDidMount() {
		axios.get(`https://findfalcone.herokuapp.com/planets`).then(res => {
			const planets = res.data;
			this.setState({ planets });
		});
		axios.get(`https://findfalcone.herokuapp.com/vehicles`).then(res => {
			const vehicles = res.data;
			this.setState({ vehicles });
		});
		axios
			.post(`https://findfalcone.herokuapp.com/token`, {}, { headers: { Accept: 'application/json' } })
			.then(res => {
				console.log(res);
				this.setState({ token: res.data });
			});
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
