"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors=[];

// take a new object, which is empty, and mix in with EventEmitter.prototype and create a nwe one. Basically.
var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllAuthors: function() {
		return _authors;
	},

	getAuthorById: function(id) {
		return _.find(_authors, {id: id});
	}
});

Dispatcher.register(function(action){
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;
        case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
        case ActionTypes.UPDATE_AUTHOR:
			// find the author
            // find the author index
            // replace the author
            var existingAuthor = _.find(_authors, {id: action.author.id});
            var existingAuthorIdex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIdex, 1, action.author);

			AuthorStore.emitChange();
			break;
        case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author) {
				return action.id === author.id;
			});
			AuthorStore.emitChange();
			break;
        default:
            break;
    }
});

module.exports = AuthorStore;