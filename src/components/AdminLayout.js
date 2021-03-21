import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../MyApp.css';
import ScentRecipes from './ScentRecipes'
import ColorRecipes from './ColorRecipes'
import AddNewSoap from './AddNewSoap'
import AdminListSoaps from './AdminListSoaps'

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
					<p><a style={{marginLeft: '10%'}} href="/addsoap">Add Soap</a></p>
					<p><a style={{marginLeft: '10%'}} href="/listsoap">List / update Soaps</a></p>
			
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
							<Route path="/addsoap">
								<AddNewSoap setToken = {props.setToken} 
											  token = {props.token}
											  setHeaderText = {setHeaderText}/>
							</Route>	
							<Route path="/listsoap">
								<AdminListSoaps setToken = {props.setToken} 
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