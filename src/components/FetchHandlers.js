import { Alert } from 'react-st-modal';

const showError = async (val) => {
	
	await Alert(val, 
		'Error');
}

const showSuccess = async (val) => {
	await Alert(val, 'Success')
}

export const doGetCall = async (uri,bShowSucc) => {
	
	let encodedUri = encodeURI(uri);
	console.log("calling fetch with uri ", encodedUri);

	try {
		const res = await getCall(encodedUri);
		console.log(res);

		if(res['code'] !== '200') {
			showError(res['message']);
			return null;
		}
		if (bShowSucc === true) {
			showSuccess(res['message']);
		}
		return res;
	} catch (error ) {
		showError(error.message);
		return null;
	}

	
} 

export const doPostCall = async (data,uri,token,bShowSucc) => {
	try {
		const res = await postCall(data,uri,token);
		console.log(res);
		if(res['code'] !== '200') {
			showError(res['message']);
			return null;
		}
		if (bShowSucc === true) {
			showSuccess(res['message']);
		}
		return res;
	} catch (error ) {
		showError(error.message);
		return null;
	}
	
	
}

const postCall = async (data,uri,token) => {

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

const getCall = async (uri) => {
	
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
