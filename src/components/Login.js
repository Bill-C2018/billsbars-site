import React, {useState} from 'react';

import './login.css';
import {postCall } from './FetchHandlers';
import {BaseUrl, BasePort} from './Constants';

const Login = (props) => {
	
	const [userName, setUserName] = useState('');
	const [userPword, setUserPword] = useState('');
	const [emailAddy, setUserEmail] = useState('');
	const [createAcct, setCreateAcct] = useState();
	const [currentError, setErrorMessage] = useState('');

	
    const loginHandler = async (event) => {
		event.preventDefault();
        let s = {
            "userName": userName,
            "userPword": userPword,
			"emailAddy": "not needed",
        };	

		try {
			
			const token = await postCall(s,BaseUrl+BasePort + '/login',' ','TRUE');
			console.log(token);
			console.log("token == " + token['token']);
			props.setToken(token['token']);
			props.setRole(token['role']);
			
		} catch (error) {
			
			console.log(error);
			if (error.message === "404") {
				setErrorMessage("Not Found");
			} else {
				setErrorMessage(error.message);
			}

		}
	}
	
	const createAcctHandler = async (event) => {
		event.preventDefault();
        let s = {
            "userName": userName,
            "userPword": userPword,
			"emailAddy": emailAddy,
        };	

		console.log(s);
		try {
			const token = await postCall(s,'http://localhost:8081/customer',' ','TRUE');
			console.log(token);
			loginHandler(event);
			
		} catch (error) {
			console.log(error);
		}
	
	}
	
	const handleClick = () => {
		setCreateAcct("true");
	}
	
	if (createAcct) {
		return (
			<div className="login-wrapper">
				<p> create account </p>
			    <form onSubmit = {createAcctHandler}>
			      <label>
			        <p>Username</p>
			        <input type="text" onChange={e => setUserName(e.target.value)} />
			      </label>
			      <label>
			        <p>Password</p>
			        <input type="password" onChange={e => setUserPword(e.target.value)} />
			      </label>
			      <label>
			        <p>Email</p>
			        <input type="text" onChange={e => setUserEmail(e.target.value)} />
			      </label>

			      <div>
			        <button type="submit">Submit</button>
			      </div>
			    </form>
				
			</div>
		)
	}
	
	
	return (
		<div className="login-wrapper">
			<p> Please login or create new account </p>
		    <form onSubmit = {loginHandler}>
		      <label>
		        <p>Username</p>
		        <input type="text" onChange={e => setUserName(e.target.value)} />
		      </label>
		      <label>
		        <p>Password</p>
		        <input type="password" onChange={e => setUserPword(e.target.value)} />
		      </label>
		      <div>
		        <button type="submit">Submit</button>
		      </div>
		    </form>
			<div > <h1> { currentError } </h1> </div>
			<div >
				<label>
					<p> Need to create an account?</p>
					<button onClick={handleClick}>Create Account</button>
				</label>
			</div>
		</div>
	)
}

export default Login;