import React from 'react';
import { NavLink as Link, Route, Routes, Navigate } from "react-router-dom";
import {
	Container,
	Button,
	Form
} from 'react-bootstrap';
import './CompleteProfile.css';
import { connect } from 'react-redux';
import { addProfile } from "../actions";
import space from '../utils/canvas';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode, FilePondPluginFileValidateType);


class CompleteProfile extends React.Component
{	
	constructor(props) {
    super(props);

    this.state = {
    	redirect: false,
    	isValidated: false,
    	socials: [
    			{ platform_name: "Twitter", placeholder: "twitter.com/", platform_value: "" },
    			{ platform_name: "Discord", placeholder: "AAA#0000", platform_value: "" },
    			{ platform_name: "Telegram", placeholder: "@username", platform_value: "" },
    			{ platform_name: "Github", placeholder: "username", platform_value: "" },
    			{ platform_name: "Email", placeholder: "name@email.xyz", platform_value: "" },
    		],
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [],
      user: {
      	displayName: '',
      	userName: '',
      	userBio: ''
      }
    };

    this.handleAddSocial = this.handleAddSocial.bind(this);
    this.handleRemoveSocial = this.handleRemoveSocial.bind(this);
    this.handleSocialChange = this.handleSocialChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
  	space(window.innerHeight, window.innerWidth,
      [window.innerHeight, window.innerWidth])
  }


  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }
  
  handleAddSocial = () => {
  	this.setState(prevState => ({
      socials: [...prevState.socials, {
                platform_name : "",
                placeholder: "",
                platform_value: "",
            }]
    }));
  }

  handleRemoveSocial = (social) => {
        this.setState({
          socials: this.state.socials.filter((previousTag, index) => index !== social)
        });
  }

  handleSocialChange = (e, index) => {
	    const { name, value } = e.target;
	    const { socials } = this.state;
	    const list = [...socials];
	    list[index][name] = value;
	    this.setState({
	        socials: list
	    });
	};

	handleChange(event) {
		const { name, value } = event.target;
    const { user } = this.state;
		this.setState({
        user: {
            ...user,
            [name]: value
        }
    });
	}
	 
	handleSubmit = (event) => {
  		event.preventDefault();
  		event.stopPropagation();
  		const form = event.currentTarget;
  		// console.log(this.pond.element.querySelectorAll('input[type="hidden"]'));
  		if (form.checkValidity() !== false) {
  			console.log("valid");
  			let obj = this.state.user;
  			Object.assign(obj, {socials: this.state.socials});
  			this.props.setUserProfile(this.state.user);
    		// Get the existing data
				var existing = localStorage.getItem('gtwUserState');

				// If no existing data, create an array
				// Otherwise, convert the localStorage string to an array
				existing = existing ? JSON.parse(existing) : {};
				// Add new data to localStorage Array
				Object.assign(existing, { profile: obj } );
				// Save back to localStorage
				localStorage.setItem('gtwUserState', JSON.stringify(existing));
				this.setState({ redirect: true });
  		}
  		this.setState({ isValidated: true });
  }

	render()
  	{
  		if(this.state.redirect) {
	    	return <Navigate to="/" />
	    }
  		const { displayName, userName, userBio } = this.state.user;
  		const { socials } = this.state;
  		console.log(socials);
    	return (
    		<div className="main-about-section">
				<canvas id="space-canvas"></canvas>
				<Container>
    				<div className="back-link">
    					<Link to="/">
    						<div className="arrow-back"><img src="/left-arrow-icon.svg" alt="" /></div>
    						<p>Back to Profile</p>
    					</Link>
    				</div>
    			</Container>
					<div className="gt-about-section gt-complete-profile">
	    			<Container>
	    				<h1>Complete Profile</h1>
						<Form method="post" className="completeprofile" noValidate  onSubmit={this.handleSubmit}>
							<div className="mb-3 row">
						   <Form.Group className="col" controlId="formBasic">
							  <Form.Label>Display name</Form.Label>
							  <Form.Control
							  required
							  name="displayName"
							  size="lg" type="text"
							  placeholder=""
							  onChange={(e) => {
				      		this.handleChange(e)
				      	}}
							  value={displayName}
							  />
						   </Form.Group>
						   </div>
						   <div className="mb-3 row">
						   <Form.Group className="col" controlId="formBasic">
							  <Form.Label>Username</Form.Label>
							  <Form.Control
							  required
							  name="userName"
							  size="lg" 
							  type="text" placeholder="mygateway.xyz/username"
							  onChange={(e) => {
				      		this.handleChange(e)
				      	}}
							  value={userName}
							  />
						   </Form.Group>
						   </div>
						   <div className="mb-3 row">
						   <Form.Group className="col" controlId="formBasic">
							  <Form.Label>AVATAR</Form.Label>
						   		<FilePond
					          ref={ref => (this.pond = ref)}
					          files={this.state.files}
					          allowMultiple={false}
					          allowReorder={true}
					          maxFiles={1}
					          name="files"
					          allowFileEncode="true"
					          acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
					          labelIdle="<img src='completeprofile/Vector.svg' /><span class='avatar-upload-action'>Upload</span> or drag your avatar here."
					          oninit={() => this.handleInit()}
					          onupdatefiles={fileItems => {
					          	// console.log(fileItems);
					          	// console.log(this.pond.element.querySelectorAll('input[type="hidden"]'));
					            // Set currently active file objects to this.state
					            this.setState({
					              files: fileItems.map(fileItem => fileItem.file)
					            });
					          }}
					        />
							</Form.Group>
							</div>
							<div className="mb-3 row">
							<Form.Group className="col" controlId="formBasic">
							  <Form.Label>BIO</Form.Label>
							  <Form.Control
							  required
							  name="userBio"
							  as="textarea"
							  value={userBio}
							  onChange={(e) => {
				      		this.handleChange(e)
				      	}}
							  rows={5}
							  />
						   </Form.Group>
						   </div>
						   <Form.Group className="col" controlId="formBasic">
							  <Form.Label>SOCIALS</Form.Label>
							  <div className="gway-socialurl-add">
								  {
								  	socials.map((x, i) => {
								  		return (
								  		<div className="gway-socialurl-row" key={i}>
											  <div className="gway-socialurl-col-left">
											  	{/* <Link to='#'>{x.name}</Link> */}
											  	<Form.Control
											  	name="platform_name"
											  	size="sm"
											  	type="text"
											  	value={x.platform_name}
											  	onChange={e => this.handleSocialChange(e, i)}
											  	/>
											  </div>
											  <div className="gway-socialurl-col-center">
											  	<Form.Control
											  	name="platform_value"
											  	size="lg"
											  	type="text"
											  	value={x.platform_value}
											  	onChange={e => this.handleSocialChange(e, i)}
											  	placeholder={x.placeholder}
											  	/>
											  </div>
											  <div className="gway-socialurl-col-right">
											    <a onClick={() => this.handleRemoveSocial(i)}><img src="completeprofile/trash.svg" /></a>
											  </div>
										  </div>
										  )
								  	})
									}
								  <div className="add-social-row">
								  	<a onClick={this.handleAddSocial}><img src="completeprofile/plus-btn.svg" /></a>
								  </div>
							  </div>
						   </Form.Group>
						  	<Button variant="primary" type="submit">
    							SAVE
  							</Button>
						</Form>
				    </Container>
					</div>
				</div>
    	)
    }
}

function mapStateToProps(state){
  return {
    userProfile: state.user
  }
}

function mapDispatchToProps(dispatch){
  return {
    setUserProfile: (userProfile) => {
      dispatch({type: "SET_USER_PROFILE", payload: userProfile})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile);