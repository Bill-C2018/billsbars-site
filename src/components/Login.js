import React, {useState} from 'react';

import './login.css';
import { doPostCall } from './FetchHandlers';
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

		let d = JSON.stringify(s);
		const token = await doPostCall(d,BaseUrl+BasePort + '/login',' ',false);
		props.setToken(token['token']);
		props.setRole(token['role']);
/*		
		try {
			
			const token = await postCall(d,BaseUrl+BasePort + '/login',' ');
			console.log(token['code']);
			if(token['code'] != '200') {
				showError(token['message']);
			}
			console.log(token);
			console.log("token == " + token['token']);
			props.setToken(token['token']);
			props.setRole(token['role']);
			
		} catch (error) {
			
			console.log(error);
			if (error.message === "404") {
				showError("Not Found");
			} else {
				showError(error.message);
			}

		}
*/
	}
	
	const createAcctHandler = async (event) => {
		event.preventDefault();
        let s = {
            "userName": userName,
            "userPword": userPword,
			"emailAddy": emailAddy,
        };	

		let d = JSON.stringify(s);
		const token = await doPostCall(d,BaseUrl+BasePort + '/customer',' ',false);
		if(token != null) {
			props.setToken(token['token']);
			props.setRole(token['role']);
			loginHandler(event);
		}

/*		
		try {
			const token = await postCall(d,'http://localhost:8081/customer',' ');
			console.log(token);
			if(token['code'] != '200') {
				showError(token['message']);
			}
			console.log("++++");
			console.log(token);
			loginHandler(event);
			
		} catch (error) {
			console.log(error);
		}
*/
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