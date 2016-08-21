// AppDispatcher:
//  A Sinleton that operates as the central hub for application updates.

var Dispatcher = require("flux").Dispatcher;

module.exports = new Dispatcher();