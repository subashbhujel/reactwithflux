"use strict";

var React = require('react');
var Link = require('react-router').Link;
var AuthorList = require('./authorList');

// Disabling this to make use of Actions/Dispatcher/Stores = Flux!!
// var AuthorApi = require('../../api/authorApi');

// FLUX - YEAH!!
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');

var AuthorPage = React.createClass({	
		getInitialState: function(){
			return {				
				// Disabling this to make use of Actions/Dispatcher/Stores = Flux!!				
				//authors: []
				authors: AuthorStore.getAllAuthors()
			};
		},
		/*
		componentDidMount: function(){
			if(this.isMounted()){
				this.setState({authors:AuthorApi.getAllAuthors()});
			}
		},*/
		render:function(){	
			return (
				<div>
					<h1>Authors</h1>
					<Link to="addAuthor" className="btn btn-default">Add Author</Link>
					<AuthorList authors={this.state.authors}/>
				</div>
			);
	}
});

module.exports = AuthorPage;