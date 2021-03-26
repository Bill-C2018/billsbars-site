import React, { useState, useEffect } from 'react';

import { doPutCall, doGetCall} from './FetchHandlers';
import SoapDataTablePaged from './SoapDataTablePaged';
import {BaseUrl, BasePort} from './Constants';
import ModalUpdateDialog from './UpdateBarCount';


const AdminListSoaps = (props) => {
	
	const [soapList,setSoapList] = useState([]);
	const [currentPage,setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState();
	const [newUri,setNewUri] = useState(BaseUrl + BasePort + "/soaps2?info=0:10");
	const [numberOfRows,setNumberOfRows] = useState(10)
	const [isModalOpen, setModalOpen] = useState(false);
	const [soapData, setSoapData] = useState([]);
	
	const handlePreviousClick = () => {
		console.log("prev clicked");
		if(currentPage > 0) {
			setCurrentPage(currentPage-1);
			let newPage = parseInt(currentPage) - 1;
			let newURI = BaseUrl + BasePort + "/soaps2?info="
			newURI += newPage + ":" +  numberOfRows;
			
			setNewUri(newURI);
			fetchSoapList2(newURI);

		}
	}
	
	const handleNextClick = async (searchString) => {
		console.log("next clicked");
		if(currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			let newPage = parseInt(currentPage) + 1;
			let newURI = BaseUrl + BasePort + "/soaps2?info="
			newURI += newPage + ":" +  numberOfRows;
			console.log(newURI);
			setNewUri(newURI);
			fetchSoapList2(newURI);

		}
	}
	
	const handleUpdateCount = async (soapId,newCount,soapName) => {
		console.log(soapId + "  " + newCount + "  " + soapName);
		let updateCount = {
			barId: soapId,
			soapName: soapName,
			count: newCount
		}
		
		let d = JSON.stringify(updateCount);

		console.log(d);
		doPutCall(d,BaseUrl+BasePort + "/soaps/update",props.token,true);		
		fetchSoapList2(newUri);
	}
	const editHandler = async(soapId,soapName) => {
		
		console.log(soapId + "  " + soapName);
		let a = [soapId,soapName];
		setSoapData(a);
		doSetModalOpen(true);		
	}

	const fetchSoapList2 = async (uri) => {
		console.log(uri);
		var res = await doGetCall(uri);
		if(res != null) {
		console.log(res['listOfSoaps']);
		setSoapList(res['listOfSoaps']);
		setCurrentPage(res['currentPage']);
		setTotalPages(res['totalPages']);
		
		}
	}
	
	const fetchSoapList = async () => {
		console.log(newUri);
		var res = await doGetCall(newUri);
		if(res != null) {
		console.log(res['listOfSoaps']);
		setSoapList(res['listOfSoaps']);
		setCurrentPage(res['currentPage']);
		setTotalPages(res['totalPages']);
		
		}
	}
	
	const doSetModalOpen = (value) => {
		setModalOpen(value);
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
			<ModalUpdateDialog 	token = {props.token}
   							   	setModalOpen = {doSetModalOpen}
							    isModalOpen = {isModalOpen}
								soapData = {soapData}
								title = "Update inventory"
								handleUpdate = {handleUpdateCount}/>
			<SoapDataTablePaged data = {soapList}
								token = {props.token}
								handlePrev = {handlePreviousClick}
								handleNext = {handleNextClick}
								currentPage = {currentPage}
								totalPages = {totalPages}
								editHandler = {editHandler}
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