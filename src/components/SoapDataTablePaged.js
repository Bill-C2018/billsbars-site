import React, { useState, useEffect } from 'react';

import {BaseUrl, BasePort} from './Constants';



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
					<th style={{textAlign: "left"}}>Mold </th>
					<th style={{textAlign: "left"}}>Base </th>
					<th style={{textAlign: "left"}}>Count </th>
				</tr>
			</thead>
			<tbody>
				{props.data.map(soap => {
					return (
						<tr key = {soap.id}>
						<td style={{display: "none"}}>{soap.id}</td>
						<td>{soap.soapName}</td>
						<td>{soap.moldStyle}</td>
						<td>{soap.baseType}</td>
						<td>{soap.count}</td>
						</tr>
					)
				})}
			</tbody>
			</table>
			</>
		)
	}
	 
}


export default SoapDataTablePaged;
