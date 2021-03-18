import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../MyApp.css';


const UserLayout = (props) => {

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
					<p><a style={{marginLeft: '10%'}} href="/customid">users search for scent</a></p>
				</div>
				<div className="column-middle" >
					<BrowserRouter>
						<Switch>
						</Switch>
					</BrowserRouter>
				</div>
			</div>
			<div className="footer">
				<p>Footer</p>
			</div>
		</div>
		</>
	)
	
	
}

export default UserLayout