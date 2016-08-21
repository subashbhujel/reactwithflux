"use strict";

var React = require('react');
var Router= require('react-router');
var routes = require('./routes');

// To set up initial data from the api
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

// Router.HistoryLocation:
// 		Removes the # based url. Hashes are ugly. This makes your URL lot cleaner.
// 		Maintains history ie pushes into browser history stack so you can go back to it.
Router.run(routes, Router.HistoryLocation, function(Handler){
	React.render(<Handler />, document.getElementById('app'));
});