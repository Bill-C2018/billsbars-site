import React, { useState, useEffect } from 'react';
import DropDownSelect from './DropDownSelect';
import {postCall, getCall} from './FetchHandlers';
import {BaseUrl, BasePort} from './Constants';


const ColorRecipes = (props) => {
	
	const [scentName, setScentName] = useState("");
	const [baseScent, setBaseScent] = useState(["NONE","NONE","NONE","NONE"]);
	const [baseScentProportion, setBaseScentProportion] = useState([1,0,0,0])
	const [data,setData] = useState(null);
	
	
	const doFetch =  async () => {
		let res = await getCall(BaseUrl+BasePort + "/basecolors");
		console.log(res);
		const scentArray = res['baseColors'];
		console.log(scentArray);
		setData(scentArray);
		
	}
	
	const setHeaderText = props.setHeaderText;
	useEffect ( () => {
		doFetch();
		setHeaderText("New Color");
// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);


	
	const changeHandler = (event ) => {
		let target = event.target.name;
		let temp = baseScent;
		if(target==='basescents0') {
			temp[0] = event.target.value;
		}
		if(target==='basescents1') {
			temp[1] = event.target.value;
		}
		if(target==='basescents2') {
			temp[2] = event.target.value;

		}
		if(target==='basescents3') {
			temp[3] = event.target.value;
		}
		setBaseScent(temp);

	}
	
	const changeProportionhandler = (event) => {
		let target = event.target.name;
		let temp = baseScentProportion;
		if(target==='basescents0') {
			temp[0] = event.target.value;
		}
		if(target==='basescents1') {
			temp[1] = event.target.value;
		}
		if(target==='basescents2') {
			temp[2] = event.target.value;

		}
		if(target==='basescents3') {
			temp[3] = event.target.value;
		}
		setBaseScentProportion(temp);

	}
	
	const changeNameHandler = (event) => {
		setScentName(event.target.value);
	}
	
	const submitData = async () => {
		let i = 0;
		var scents = [];
		for(i = 0; i < baseScent.length; i++) {
			if(baseScent[i] !== "NONE") {
				let basescent = {color: baseScent[i],numberDrops: baseScentProportion[i]};
				scents.push(basescent);
			}
		}
		
		let data = {
			finalColor: scentName,
			colors: scents
		}
		
		let d = JSON.stringify(data);

		console.log(d);
		const res = await postCall(d,BaseUrl+BasePort + "/colorrecipe",props.token);
		console.log(res);
		
		
	}
	
	const submitHandler = (event) => {
		event.preventDefault();
		console.log(props.token);
		if (scentName.trim().length === 0 ) {
			console.log("invalid name");
			return;
		}
		var validBase = 0;
		var i;
		for(i = 0; i < baseScent.length; i++) {
			if (baseScent[i] !== "NONE") {
				validBase = 1;
			}
		}
		
		if(validBase !== 1 ) {
			console.log(validBase);
			console.log("Invalid base scents");
			return;
		}
		
		submitData();
	}
	
	if (data) {
		return (
			<div align="center">
			<form onSubmit={submitHandler}>
			<table><tbody>
			<tr><td>
				<label>Color Name</label>
				<input type='text'
						placeholder='enter name'
						onChange={changeNameHandler}/>
			</td></tr><tr><td>
			<DropDownSelect data = {data}
							label = 'Base Color'
							label2 = '# of drops'
							amnt = {baseScentProportion[0]}
							name = 'basescents0'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</td></tr><tr><td>
			<DropDownSelect data = {data}
							label = 'Base Color'
							label2 = '# of drops'
							amnt = {baseScentProportion[1]}
							name = 'basescents1'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</td></tr><tr><td>
			<DropDownSelect data = {data}
							label = 'Base Color'
							label2 = '# of drops'
							amnt = {baseScentProportion[2]}
							name = 'basescents2'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</td></tr><tr><td>
			<DropDownSelect data = {data}
							label = 'Base Color'
							label2 = '# of drops'
							amnt = {baseScentProportion[3]}
							name = 'basescents3'
							changeProportion = {changeProportionhandler}
							changeHandler = {changeHandler}/>
			</td></tr><tr><td>
			<label>
				<input
					type='submit'
					value='Submit'/>
			</label>
			</td></tr>
			</tbody></table>
			</form>

			</div>
		)
	} else {
		return (
			<>
			</>
		)
	}
}

export default ColorRecipes;

