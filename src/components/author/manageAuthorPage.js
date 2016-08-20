"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');

// Need a reference to an api for saving the author
var AuthorApi = require('../../api/authorApi');

var ManageAuthorPage = React.createClass({
	// Mixins are usually an array. That's it.
	mixins:[
		Router.Navigation // Progamatically routing the page
	],
	getInitialState: function () {
		return {
			author: {id:'', firstName:'',lastName:''}
		};
	},
	setAuthorState: function (event) {
		var field = event.target.name; // eg input type name, like first name input
		var value = event.target.value; // the value that's just typed in input field

		// Update State. This is a common pattern.
		this.state.author[field] = value; // update the author value for that specific type
		return this.setState({author: this.state.author}); // update the author
	},

	// Save user Data when user hits 'save' button in AuthorForm component
	saveAuthor: function (event) {
		// NO default browser behavior. May cause the button to actually submit the page. 
		// We don't want that. We want to capture that and work in the Javascript!
		event.preventDefault(); 

		// call apo and save the date
		AuthorApi.saveAuthor(this.state.author);

		//Saving done. Reroute to authors.
		this.transitionTo("authors");
	},

	render: function(){
		return (
			<AuthorForm author={this.state.author}
						onChange={this.setAuthorState}
						onSave={this.saveAuthor}/>
		)
	}
});

module.exports = ManageAuthorPage;