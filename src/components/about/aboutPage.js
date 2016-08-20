"use strict";

var React = require('react');

var About = React.createClass({	
	statics: {
		// Triggered when users tries to come to this page.
		willTransitionTo: function (transition,params,query,callback) {
			if(!confirm('[TransitionTo] Are you sure you want to visit an About page?')){
				transition.about(); // Yes = go to this page 'about'
			}else{ // No = Stay on whatever page user was on.
				callback();
			}
		},
		// Triggered when users tries to GO AWAY from this page.
		willTransitionFrom: function (transition,component) {
			if(!confirm('[TransitionFrom] Sure? Don\'t navigate away from About page.')){
				transition.about(); // Yes = go to this page 'about'
			}
			// No need to call a callback
		}
	},
	render: function(){
		return (
			<div>
				<h1> About</h1>
				<p>
					This application uses the following:
					<ul>
						<li>React</li>
						<li>React Router</li>
					</ul>
				</p>
			</div>
		);
	}
});

module.exports = About;