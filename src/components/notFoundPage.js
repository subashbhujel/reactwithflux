"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Page NOT found.</h1>
				<p>Whoops! Sorry, there is nothing to see here.</p>
                <Link to='app'>Back to Home</Link>    
            </div>
		)
	}
});

module.exports = NotFoundPage;