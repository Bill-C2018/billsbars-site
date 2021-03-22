import React, { useState, useEffect } from 'react';

import DropDownSelectNoCounter from './DropDownSelectNoCounter';
import {postCall, getCall} from './FetchHandlers';

import {BaseUrl, BasePort} from './Constants';



const AddNewSoap = (props) => {

	const [color,setColor] = useState(null);
	const [scents,setScents] = useState(null);
	const [moldStyles,setMoldStyles] = useState(null);
	const [barTypes,setBarTypes] = useState(null);
	const [soapName,setSoapName] = useState("new soap");
	const [barCount,setBarCount] = useState("1")
	const [selColor,setSelColor] = useState(null);
	const [selScent,setSelScent] = useState(null);
	const [selMold,setSelMold] = useState(null);
	const [selType,setSelType] = useState(null);
	const [soapType,setSoapType] = useState(null);
	const [selSoapType,setSelSoapType] = useState(null);
		
	const fetchSoapParts = async () => {
		var res = await getCall(BaseUrl + BasePort + "/newsoap");
		console.log(res);
		setColor(res['colorRecipeNames']);
		setScents(res['scentRecipeNames']);
		setMoldStyles(res['moldStyles']);
		setBarTypes(res['barTypes']);
		setSoapType(res['baseTypes']);
	}
	
	const setHeaderText = props.setHeaderText;
	useEffect ( () => {
		fetchSoapParts();
		setHeaderText("New Soap");
// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);
	
	const changeHandler = (event) => {
		let target = event.target.name;
		switch(target) {
			case "color":
				setSelColor(event.target.value);
				break;
			case "scent":
				setSelScent(event.target.value);
				break;
			case "moldtype":
				setSelMold(event.target.value);
				break;
			case "bartype":
				setSelType(event.target.value);
				break;
			case "soaptype":
				setSelSoapType(event.target.value);
				break;
		}
		
	}
	
	const nameChangeHandler = (event) => {
		let target = event.target.name;
		if (target  === "Soap Name") {
			setSoapName(event.target.value);
		} else if (target === "Soap Count") {
			setBarCount(event.target.value);
		}
		
	}
	const doSubmit = async () => {
		let data = {
			barType: selType,
			baseType: selSoapType,
			color: selColor,
			scent: selScent,
			count: barCount,
			moldStyle: selMold,
			soapName: soapName
		}
		
		let d = JSON.stringify(data);
		console.log(d);
		const res = await postCall(d,BaseUrl+BasePort + "/soaps",props.token);
		console.log(res);
		
	}
	
	const submitHandler = (event) => {
		event.preventDefault();
		
		if(soapName == null ||
			selColor == null ||
			selScent == null ||
			selType == null ||
			selMold == null ||
			selSoapType == null ||
			barCount === "0") {
				console.log("incomplete form")
				return;
			}
			
			doSubmit();
	}
	


	if (color && scents && moldStyles && barTypes && soapType) {
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
							placeholder = {barCount}
							onChange = {nameChangeHandler}/>
				</td>
			</tr>
			<tr><td colSpan='2'>
				<DropDownSelectNoCounter data = {color}
								label = 'Color'
								name = 'color'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colSpan='2'>
				<DropDownSelectNoCounter data = {scents}
								label = 'Scent'
								name = 'scent'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colSpan='2'>
				<DropDownSelectNoCounter data = {moldStyles}
								label = 'Style'
								name = 'moldtype'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colSpan='2'>
				<DropDownSelectNoCounter data = {barTypes}
								label = 'Type'
								name = 'bartype'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colSpan='2'>
				<DropDownSelectNoCounter data = {soapType}
								label = 'Soap Type'
								name = 'soaptype'
								changeHandler = {changeHandler}/>
			</td></tr>
			<tr><td colSpan='2'>
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