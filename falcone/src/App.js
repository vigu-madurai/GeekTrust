import React from 'react';
import './App.css';

// Business-logic code flow starts here
function App() {
	return (
		<div className='falcone-container'>
			{/* Header */}
			<header className='header inner-padding'>
				<div className='header-title'>Finding Falcone!</div>
				<div className='header-btns'>
					<div>Reset</div>
					<div>GeekTrust Home</div>
				</div>
			</header>
			{/* Body */}
			<div className='body-container inner-padding'>Body</div>
			{/* Footer */}
			<footer className='footer inner-padding'>Coding Problem | GeekTrust Challenge</footer>
		</div>
	);
}

export default App;
