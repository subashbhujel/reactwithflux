"use strict";

var React = require('react');
var Router= require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute; // For 404 - page not found for all invalid urls

// Redirects all bad urls to a new one. 
// App may have introduced a new route since last time it was written. 
// This is done so old routes are stil valid. 
// Can all be used to solve common typos in urls.
var Redirect = Router.Redirect; 

var routes = (
	<Route name="app" path="/" handler={require('./components/app')}>
		<DefaultRoute handler={require('./components/homePage')}/>
		
		<Route name="authors" handler={require('./components/author/authorPage')}/>
		<Route name="addAuthor" path="author" handler={require('./components/author/manageAuthorPage')}/>
		<Route name="manageAuthor" path="author/:id" handler={require('./components/author/manageAuthorPage')}/>

		<Route name="about" handler={require('./components/about/aboutPage')}/>		
		
		<NotFoundRoute handler={require('./components/notFoundPage')}/>
		
		<Redirect from="about-us" to="about"/> 
		<Redirect from="about/*" to="about"/> 

		<Redirect from="awthors" to="authors"/>  
	</Route>
);

module.exports = routes;