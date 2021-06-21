import React,{Component} from 'react';

class Fichier extends Component {
	state = {
	// Initially, no file is selected
	fichier: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	// Update the state
	this.setState({ fichier: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	// formData.append(
	// 	"myFile",
	// 	this.state.fichier,
	// 	this.state.fichier.name
	// );
	formData.append('fichier', this.state.fichier);
	// Details of the uploaded file
	console.log(this.state.fichier);
	
	// Request made to the backend api
	// Send formData object
	fetch(
		'http://localhost:8080/api/file',
		{
			method: 'POST',
			body: formData,
		}
	)
		// .then((response) => response.json())
		.then((result) => {
			console.log('Success:', result);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	// axios({
	// 	method: "post",
	// 	url: "http://localhost:8080/api/file",
	// 	data: formData,
	// 	headers: { "Content-Type": "multipart/form-data" },
	//   })
	//   .then(function (response) {
	// 	//handle success
	// 	console.log(response);
	//   })
	//   .catch(function (response) {
	// 	//handle error
	// 	console.log(response);
	//   });
	// axios.post("http://localhost:8080/api/file", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.fichier) {
		
		return (
		<div>
			<h2>Informations sur le fichier:</h2>
			
<p>Nom du fichier: {this.state.fichier.name}</p>

			
<p>Type du fichier: {this.state.fichier.type}</p>

			
<p>
			Dernière modification:{" "}
			{this.state.fichier.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Prière de choisir un fichier !!</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<h3>
			Veuillez ajouter un fichier!
			</h3>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Enregistrer
				</button>
			</div>
		 {this.fileData()}
		</div>
	);
	}
}

export default Fichier;
