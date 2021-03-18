import React, { useState, useEffect } from 'react';

import DropDownSelect from './DropDownSelect';

const getSoapParts = async (uri) => {
	
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

const AddNewSoap = (props) => {

	const [data,setData] = useState(null);
		
	const fetchSoapParts = async () => {
		var res = await getSoapParts("http://localhost:8081/newsoap")
		console.log(res);
		setData(res['colorRecipeNames']);
	}
	
	const setHeaderText = props.setHeaderText;
	useEffect ( () => {
		fetchSoapParts();
		setHeaderText("New Soap");
// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);
	
	const changeHandler = (event) => {
		
	}
	
	const changeProportionhandler = (event) => {
		
	}

	if (data) {
		return (
			<>
			<DropDownSelect data = {data}
							label = 'Base Color'
							label2 = '# of drops'
							amnt = '1'
							name = 'basescents0'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</>
		);
	} else {
		return (
			<>
			</>
		);
	}
}

export default AddNewSoap;