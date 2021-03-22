import { Alert } from 'react-st-modal';

export const showError = async (val) => {
	
	await Alert(val, 
		'Error');
		
	
	
}

export const postCall = async (data,uri,token) => {

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
						'Access-Token': token},
		body: data
	};
	const response = await fetch(uri, requestOptions);
	return response.json();
}

export const getCall = async (uri) => {
	
	let encodedUri = encodeURI(uri);
	console.log("calling fetch with uri ", encodedUri);
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json'},
	};
	
	const response = await fetch(encodedUri,requestOptions);
	if(response.status !== 200) {
		showError(response.status);
		return null;
	}
	return response.json();
	
}
