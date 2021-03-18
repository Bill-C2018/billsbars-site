import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './MyApp.css';
import Login from './components/Login';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';






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


	if (role === "ADMIN") {
		return <AdminLayout token = {token}
						setToken = {setToken}/>

	} else {
		return <UserLayout token = {token}
						setToken = {setToken}/>
	}
	
}

export default App;
