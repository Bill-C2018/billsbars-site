import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './MyApp.css';
import Login from './components/Login';
import AddNewScents from './components/AddNewScents'

function App() {
	
	const [token, setToken] = useState(sessionStorage.getItem("localToken") || '');	
	const [role, setRole] = useState(sessionStorage.getItem("localRole") || '');


	
	useEffect ( () => {
		sessionStorage.setItem("localToken",token);
		sessionStorage.setItem("localRole",role);

	}, [token,role]);

	if (!token) {
		return <Login setToken = {setToken}
					setRole = {setRole}/>
	};


  return (
		<>
		<div className="page-wrapper" style={{backgroundColor: "#f1f1f1"}}>
			<div className="row">
				<div className="column-side2" style={{backgroundColor: "#aaa", height: '80%'}}>
					logo
				</div>
				<div className="header">
					<h2>Header</h2>
				</div>	
			</div>		
			<div className="row">
				<div className="column-side" style={{backgroundColor: "#aaa", height: '80%'}}>
					<p><a style={{marginLeft: '10%'}} href="/customid">Add New Scent</a></p>
				</div>
				<div className="column-middle" >
					<BrowserRouter>
						<Switch>
							<Route path="/customid">
								<AddNewScents setToken = {setToken} token = {token}/>
							</Route>	
						</Switch>
					</BrowserRouter>
				</div>
			</div>
			<div className="footer">
				<p>Footer</p>
			</div>
		</div>
		</>
	);
}

export default App;
