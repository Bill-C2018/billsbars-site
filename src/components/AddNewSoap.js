import React, { useState, useEffect } from 'react';

import DropDownSelectNoCounter from './DropDownSelectNoCounter';

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
	const [scents,setScents] = useState(null);
	const [moldStyles,setMoldStyles] = useState(null);
	const [barTypes,setBarTypes] = useState(null);
	const [soapName,setSoapName] = useState("new soap");
		
	const fetchSoapParts = async () => {
		var res = await getSoapParts("http://localhost:8081/newsoap")
		console.log(res);
		setData(res['colorRecipeNames']);
		setScents(res['scentRecipeNames']);
		setMoldStyles(res['moldStyles']);
		setBarTypes(res['barTypes']);
	}
	
	const setHeaderText = props.setHeaderText;
	useEffect ( () => {
		fetchSoapParts();
		setHeaderText("New Soap");
// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);
	
	const changeHandler = (event) => {
		
	}
	
	const nameChangeHandler = (event) => {
		
	}
	const submitHandler = (event) => {
		event.preventDefault();
		
	}
	


	if (data && scents && moldStyles && barTypes) {
		return (
			
			<div align="center">
			<form onSubmit={submitHandler}>
			<table style={{border: 'solid', width: '60%'}}><tbody>
			<tr>
				<td style={{width: '50%'}}>
					<label>Soap Name</label>
					<input style={{width: '80%'}}
							type = 'text'
							name = 'Soap Name'
							placeholder = {soapName}
							onChange = {nameChangeHandler}/>
				</td><td>
					<label># Bars</label>
					<input style={{width: '100%'}}
							type = 'text'
							name = 'Soap Count'
							placeholder = '1'
							onChange = {nameChangeHandler}/>
				</td>
			</tr>
			<tr><td colspan='2'>
				<DropDownSelectNoCounter data = {data}
								label = 'Color'
								name = 'basescents0'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colspan='2'>
				<DropDownSelectNoCounter data = {scents}
								label = 'Scent'
								name = 'basescents0'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colspan='2'>
				<DropDownSelectNoCounter data = {moldStyles}
								label = 'Style'
								name = 'basescents0'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colspan='2'>
				<DropDownSelectNoCounter data = {barTypes}
								label = 'Type'
								name = 'basescents0'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colspan='2'>
				<label>
					<input
						type='submit'
						value='Submit'/>
				</label>
			</td></tr>
			</tbody></table>
			</form>
			</div>
		);
	} else {
		return (
			<>
			</>
		);
	}
}

export default AddNewSoap;