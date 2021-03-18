
export const DropDownSelect = (props) => {
	

	const items = props.data;
	const listItems = items.map((item) => 
		<option key={item} value={item}>{item}
				</option> );
	
	return (
		<div>
			<table><tbody>
			<tr>
				<td >
				<label>{props.label}</label>
					<select name={props.name}
						onChange={props.changeHandler}>
							{listItems}
					</select>
				</td>
				<td >
				<label> {props.label2}</label>
					<input name={props.name}
							type='text'
							placeholder = {props.amnt}
							onChange ={props.changeProportion}/>
				</td>
			</tr>
			</tbody></table>
		</div>
	)
}


export default DropDownSelect;

