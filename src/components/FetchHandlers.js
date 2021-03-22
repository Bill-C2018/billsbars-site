import { Alert } from 'react-st-modal';

const showError = async (val) => {
	
	const result = await Alert(val, 
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
	if(response.status !== 200) {
		showError(response.status);
		return null;
	}
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
		const text = response.status;
		throw Error(text);
	}
	return response.json();
	
}
