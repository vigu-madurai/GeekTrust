import React from 'react';
import './App.css';
import Home from './modules/Home';

// Business-logic code flow starts here
function App() {
	return (
		<div className='falcone-container'>
			{/* Header */}
			<header className='header inner-padding'>
				<div className='header-title'>Finding Falcone!</div>
				<a href='/' className='header-btns'>
					Home
				</a>
			</header>
			{/* Body */}
			<div className='body-container inner-padding'>
				<Home />
			</div>
			{/* Footer */}
			<footer className='footer inner-padding'>Coding Problem | GeekTrust Challenge</footer>
		</div>
	);
}

export default App;
