import React, { useState, useEffect } from 'react';

import SoapDataTablePaged from './SoapDataTablePaged';
import {BaseUrl, BasePort} from './Constants';

const getSoapList = async (uri) => {

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

const AdminListSoaps = (props) => {
	
	const [soapList,setSoapList] = useState([]);
	
	const fetchSoapList = async () => {
		var res = await getSoapList(BaseUrl + BasePort + "/soaps");
		console.log(res['listOfSoaps']);
		setSoapList(res['listOfSoaps']);
	}
	
	const setHeaderText = props.setHeaderText;
	useEffect ( () => {
		fetchSoapList();
		setHeaderText("List / Update soaps");
// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	if(soapList != null) {
		return (
			<>
			<SoapDataTablePaged data = {soapList}
								token = {props.token}/>
			</>
		);
	} else {
		<>
		nop
		</>
	}
}


export default AdminListSoaps;