
import './MyApp.css';

function App() {
  return (
		<>
		<div className="page-wrapper" style={{backgroundColor: "#f1f1f1"}}>
			<div className="row">
				<div className="column-side2" style={{backgroundColor: "#aaa", height: '80%'}}>
					logo
				</div>
				<div className="header">
					<h2>Header</h2>
				</div>	
			</div>		
			<div className="row">
				<div className="column-side" style={{backgroundColor: "#aaa", height: '80%'}}>
					nav
				</div>
				<div className="column-middle" >
					content
				</div>
			</div>
			<div className="footer">
				<p>Footer</p>
			</div>
		</div>
		</>
	);
}

export default App;
