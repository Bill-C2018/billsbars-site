import React, { useState, useEffect } from 'react';
import DropDownSelect from './DropDownSelect';


const getBaseScents = async (uri) => {
	
	let encodedUri = encodeURI(uri);
	console.log("calling fetch with uri ", encodedUri);
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json'},
	};
	
	const response = await fetch(encodedUri,requestOptions);
	if(response.status !== 200) {
		console.log(response.status);
		const text = response.status;
		throw Error(text);
	}
	return response.json();
	
}

const postCall = async (data,uri,token,isJson) => {
/*
	let s2 = '';
	if( isJson) {
		s2 = JSON.stringify(data);
	} else {
		s2 = data;
	}
*/
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
						'Access-Token': token},
		body: data
	};
	const response = await fetch(uri, requestOptions);
	if(response.status !== 200) {
		throw Error(response.status);
	}
	return response.json();
}

const SetRecipes = (props) => {
	
	const [scentName, setScentName] = useState("");
	const [baseScent, setBaseScent] = useState(["NONE","NONE","NONE","NONE"]);
	const [baseScentProportion, setBaseScentProportion] = useState([100,0,0,0])
	const [data,setData] = useState(null);
	
	
	const doFetch =  async () => {
		let res = await getBaseScents("http://localhost:8081/basescents");
		const scentArray = res['baseScents'];
		console.log(scentArray);
		setData(scentArray);
		console.log(data);
		
	}
	
	useEffect ( () => {
		doFetch();
	},[]);


	
	const changeHandler = (event ) => {
		let target = event.target.name;
		console.log(target);
		console.log(event.target.value);
		let temp = baseScent;
		if(target==='basescents0') {
			temp[0] = event.target.value;
		}
		if(target==='basescents1') {
			temp[1] = event.target.value;
		}
		if(target==='basescents2') {
			temp[2] = event.target.value;

		}
		if(target==='basescents3') {
			temp[3] = event.target.value;
		}
		setBaseScent(temp);
		console.log(baseScent);
	}
	
	const changeProportionhandler = (event) => {
		let target = event.target.name;
		console.log(target);
		console.log(event.target.value);
		let temp = baseScentProportion;
		if(target==='basescents0') {
			temp[0] = event.target.value;
		}
		if(target==='basescents1') {
			temp[1] = event.target.value;
		}
		if(target==='basescents2') {
			temp[2] = event.target.value;

		}
		if(target==='basescents3') {
			temp[3] = event.target.value;
		}
		setBaseScentProportion(temp);
		console.log(baseScentProportion);
		
	}
	
	const changeNameHandler = (event) => {
		let target = event.target.name;
		console.log(target);
		console.log(event.target.value);
		setScentName(event.target.value);
		console.log(scentName);
		
	}
	
	const submitData = async () => {
		let i = 0;
		var scents = new Array();
		for(i = 0; i < baseScent.length; i++) {
			if(baseScent[i] != "NONE") {
				let basescent = {baseScent: baseScent[i],drops: baseScentProportion[i]};
				scents.push(basescent);
			}
		}
		
		let data = {
			name: scentName,
			baseScents: scents
		}
		
		let d = JSON.stringify(data);
		console.log(d);
		const res = await postCall(d,"http://localhost:8081/scentrecipe",props.token,false);
		console.log(res);
		
		
	}
	
	const submitHandler = (event) => {
		event.preventDefault();
		console.log(props.token);
		if (scentName.trim().length == 0 ) {
			console.log("invalid name");
			return;
		}
		var validBase = 0;
		var totalProportion = 0;
		var i;
		for(i = 0; i < baseScent.length; i++) {
			if (baseScent[i] != "NONE") {
				totalProportion += parseInt(baseScentProportion[i]);
				validBase = 1;
			}
		}
		
		if(validBase != 1 || totalProportion != 100) {
			console.log(validBase);
			console.log(totalProportion);
			console.log("Invalid base scents");
			return;
		}
		
		submitData();

		
		
		
		
	}
	
	if (data) {
		return (
			<div align="center">
			<form onSubmit={submitHandler}>
			<table><tbody>
			<tr>
				<label>Scent Name</label>
				<input type='text'
						placeholder='enter name'
						onChange={changeNameHandler}/>
			</tr><tr>
			<DropDownSelect data = {data}
							amnt = {baseScentProportion[0]}
							name = 'basescents0'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</tr><tr>
			<DropDownSelect data = {data}
							amnt = {baseScentProportion[1]}
							name = 'basescents1'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</tr><tr>
			<DropDownSelect data = {data}
							amnt = {baseScentProportion[2]}
							name = 'basescents2'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</tr><tr>
			<DropDownSelect data = {data}
							amnt = {baseScentProportion[3]}
							name = 'basescents3'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</tr><tr>
			<label>
				<input
					type='submit'
					value='Submit'/>
			</label>
			</tr>
			</tbody></table>
			</form>

			</div>
		)
	} else {
		return (
			<>
			goodbye
			</>
		)
	}
}

export default SetRecipes;

