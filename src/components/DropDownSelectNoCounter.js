
const DropDownSelectNoCounter = (props) => {
	

	const items = props.data;
	const listItems = items.map((item) => 
		<option key={item} value={item}>{item}
				</option> );
	
	return (
		<>
			<table style={{width: "100%", border: 'solid'}}><tbody>
			<tr>
				<td style={{width: '50%'}}>
				<label>{props.label}</label>
				</td><td >
					<select name={props.name}
						onChange={props.changeHandler}>
							{listItems}
					</select>
				</td>
			</tr>
			</tbody></table>
		</>
	)
}


export default DropDownSelectNoCounter;

