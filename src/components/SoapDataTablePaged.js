import React, { useState, useEffect } from 'react';
import './datatable.css';


const SoapDataTablePaged = (props) => {
	

	
	if(props.data === null) {
		return (
			<>
			no data
			</>
		)
	} else {
		return (
			<>
			<table style={{width: "80%", marginLeft: "10%"}}>
			<thead>
				<tr>
					<th style={{display: "none"}}>Id</th>
					<th style={{textAlign: "left"}}>Name </th>
					<th style={{textAlign: "left"}}>Scent</th>
					<th style={{textAlign: "left"}}>Mold </th>
					<th style={{textAlign: "left"}}>Base </th>
					<th style={{textAlign: "left"}}>Count </th>
					<th style={{textAlign: "left"}}>Tools </th>
				</tr>
			</thead>
			<tbody>
				{props.data.map(soap => {
					return (
						<tr key = {soap.id}>
						<td style={{display: "none"}}>{soap.id}</td>
						<td>{soap.soapName}</td>
						<td>{soap.scent}</td>
						<td>{soap.moldStyle}</td>
						<td>{soap.baseType}</td>
						<td>{soap.count}</td>
						<td><button style={{width: "20", backgroundColor: 'lightgray'}}
							onClick={() => props.editHandler()}>Edit</button>
						</td>
						</tr>
					)
				})}
			</tbody>
			</table>
			<div className='buttonrow'>
			<div className = 'buttonlcol'></div>
			<div className='buttonothercol'>
			<button style = {{ backgroundColor: 'lightgray', display: props.currentPage == 0 ? 'none' : ''}}
				onClick = {() => { props.handlePrev()}}>
				prev
			</button>
			</div>
			<div className='buttonothercol'>
			<button style = {{backgroundColor: 'lightgray', display: props.currentPage == props.totalPages -1 ? 'none' : ''}}
			onClick = { () => { props.handleNext();}}>
			next</button>
			</div>

			</div>

			</>
		)
	}
	 
}


export default SoapDataTablePaged;
