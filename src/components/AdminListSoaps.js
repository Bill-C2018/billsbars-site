import React, { useState, useEffect } from 'react';

import { doPostCall, doGetCall} from './FetchHandlers';
import SoapDataTablePaged from './SoapDataTablePaged';
import {BaseUrl, BasePort} from './Constants';



const AdminListSoaps = (props) => {
	
	const [soapList,setSoapList] = useState([]);
	const [currentPage,setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState();
	const [newUri,setNewUri] = useState(BaseUrl + BasePort + "/soaps2?info=0:10");
	
	const handlePreviousClick = () => {
		if(currentPage > 0) {
			setCurrentPage(currentPage-1);
			let newPage = parseInt(currentPage) - 1;
			let newURI = BaseUrl + BasePort + "/soaps2?info=0:10"
			
			setNewUri(newURI);

		}
	}
	
	const handleNextClick = async (searchString) => {

		if(currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			let newPage = parseInt(currentPage) + 1;
			let newURI = BaseUrl + BasePort + "/soaps2?info=0:10" 
			setNewUri(newURI);

		}
	}

	
	const fetchSoapList = async () => {
		var res = await doGetCall(newUri);
		if(res != null) {
		console.log(res['listOfSoaps']);
		setSoapList(res['listOfSoaps']);
		}
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
								token = {props.token}
								handlePrev = {handlePreviousClick}
								handleNext = {handleNextClick}
								pagedUri = {newUri}/>
			</>
		);
	} else {
		<>
		nop
		</>
	}
}


export default AdminListSoaps;