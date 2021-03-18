import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../MyApp.css';
import ScentRecipes from './ScentRecipes'
import ColorRecipes from './ColorRecipes'

const AdminLayout = (props) => {
	
	const [headerText,setHeaderText] = useState("Hello")

	return ( 
		<>
		<div className="page-wrapper" style={{backgroundColor: "#f1f1f1"}}>
			<div className="row">
				<div className="column-side2" style={{backgroundColor: "#aaa", height: '80%'}}>
					logo
				</div>
				<div className="header">
					<h2>{headerText}</h2>
				</div>	
			</div>		
			<div className="row">
				<div className="column-side" style={{backgroundColor: "#aaa", height: '80%'}}>
					<p><a style={{marginLeft: '10%'}} href="/addscent">Add scent</a></p>
					<p><a style={{marginLeft: '10%'}} href="/addcolor">Add color</a></p>
				</div>

				<div className="column-middle" >
					<BrowserRouter>
						<Switch>
							<Route path="/addscent">
								<ScentRecipes setToken = {props.setToken}
											  token = {props.token}
											  setHeaderText = {setHeaderText}/>
							</Route>	
							<Route path="/addcolor">
								<ColorRecipes setToken = {props.setToken} 
											  token = {props.token}
											  setHeaderText = {setHeaderText}/>
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