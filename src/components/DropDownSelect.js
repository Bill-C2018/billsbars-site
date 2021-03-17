
export const DropDownSelect = (props) => {
	
	console.log(props.data);
	const items = props.data;
	const listItems = items.map((item) => 
		<option key={item} value={item}>{item}
				</option> );
	
	return (
		<div>
			<table><tbody>
			<tr>
				<td >
				<label>Base Scent</label>
					<select name={props.name}
						onChange={props.changeHandler}>
							{listItems}
					</select>
				</td>
				<td >
				<label> % of total</label>
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

