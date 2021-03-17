import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../MyApp.css';
import ScentRecipes from './ScentRecipes'

const AdminLayout = (props) => {

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
					<p><a style={{marginLeft: '10%'}} href="/customid">Add scent</a></p>
				</div>
				<div className="column-middle" >
					<BrowserRouter>
						<Switch>
							<Route path="/customid">
								<ScentRecipes setToken = {props.setToken} token = {props.token}/>
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
	)
	
	
}

export default AdminLayout