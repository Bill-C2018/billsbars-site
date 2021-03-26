import React, {useState} from 'react';
import { StaticDialog,ModalContent, ModalFooter, ModalButton, useDialog } from 'react-st-modal';


//==============================================================
export const ModalDialogContent = (props) => {
	
	const [count,setCount] = useState(1);
	
	const dialog = useDialog();

	const genOutput = () => {
		props.handleUpdate(props.data[0],count,props.data[1]);
	}
	
	const onChange = (event) => {
		setCount(event.target.value);
	}
	
	return (
		<div>
			<ModalContent>
				<div>{props.data[1]}</div>
				<label>Update Count by: </label>
				<input 	type="text"
						name = 'countUpdate'
						placeholder = {count}
						onChange = {onChange}/>
				
			</ModalContent>
			<ModalFooter>
				<ModalButton
					onClick={() => {
						dialog.close([]);
					}}
				>
					Cancel
				</ModalButton>

				<ModalButton
					onClick={() => {
						genOutput();
						dialog.close();
					}}
				>
					Update
			</ModalButton>
		</ModalFooter>
	</div>
	);
}
//=============================================================
const ModalUpdateDialog = (props) => {


  return (
    <div>
      <StaticDialog
        isOpen={props.isModalOpen}
        title={props.title}
        onAfterClose={(result) => {
          props.setModalOpen(false);
          // do something with dialog result
			console.log(result);
        }}
		onAfterOpen={() => {
			console.log("dialog opended with ", props.soapData);
		}}
    >

          <ModalDialogContent data = {props.soapData}
							  handleUpdate = {props.handleUpdate}/>
      </StaticDialog>
    </div>
    );
}

export default ModalUpdateDialog
