"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var toastr = require('toastr');

// Need a reference to an api for saving the author
// Disabling this to make use of Actions/Dispatcher/Stores = Flux!!
// var AuthorApi = require('../../api/authorApi');

// FLUX - YEAH!!
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');

var ManageAuthorPage = React.createClass({
	// Mixins are usually an array. That's it.
	mixins:[
		Router.Navigation // Progamatically routing the page
	],

	statics: {
		willTransitionFrom : function (transition, component) {
			if(component.state.dirty && !confirm('Leave without saving?')){
				transition.abort();
			}
		}
	},

	getInitialState: function () {
		return {
			author: {id:'', firstName:'',lastName:''},
			errors: {},
			dirty: false
		};
	},
	setAuthorState: function (event) {
		// Form field is touched. Set it to dirty.
		this.setState({dirty: true});

		var field = event.target.name; // eg input type name, like first name input
		var value = event.target.value; // the value that's just typed in input field

		// Update State. This is a common pattern.
		this.state.author[field] = value; // update the author value for that specific type
		return this.setState({author: this.state.author}); // update the author
	},

	authorFormValid: function () {
		var formIsValid = true;
		this.state.errors= {}; // Clear any previous errors.

		if(this.state.author.firstName.length < 1){
			this.state.errors.firstName = "First Name cannot be null of size<1.";
			formIsValid=false;
		}
		if(this.state.author.lastName.length < 1){
			this.state.errors.lastName = "Last Name cannot be null of size<1.";
			formIsValid=false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	componentWillMount: function() {
		var authorId = this.props.params.id; //from the path '/author:id'

		if (authorId) {
			// Commenting below line to make use of FLUX Store!
			// this.setState({author: AuthorApi.getAuthorById(authorId) });
			this.setState({author: AuthorStore.getAuthorById(authorId) });
		}
	},

	// Save user Data when user hits 'save' button in AuthorForm component
	saveAuthor: function (event) {
		// NO default browser behavior. May cause the button to actually submit the page. 
		// We don't want that. We want to capture that and work in the Javascript!
		event.preventDefault(); 

		// Form Validation
		if(!this.authorFormValid()){
			return;
		}

		// Update the author if it already has an ID. Create otherwise.
		if(this.state.author.id){
			AuthorActions.updateAuthor(this.state.author);
		}
		else{
			// call apo and save the date
			// Commenting the line below to make use of FLUX Actions!
			// AuthorApi.saveAuthor(this.state.author);
			AuthorActions.createAuthor(this.state.author);
		}
		// Showing a dialog box that author is saved.
		toastr.success('Toaster msg - Author saved.');

		// Form is clean again since it's saved. Set dirty -> false
		this.setState({dirty: false});

		//Saving done. Reroute to authors.
		this.transitionTo("authors");
	},

	render: function(){
		return (
			<AuthorForm author={this.state.author}
						onChange={this.setAuthorState}
						onSave={this.saveAuthor}
						errors= {this.state.errors}/>
		)
	}
});

module.exports = ManageAuthorPage;