"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
    createAuthor: function (author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        // Hey Dispatcher! Go tell all the stores that an author was created.
        Dispatcher.dispatch({
            actionType:ActionTypes.CREATE_AUTHOR,
            author:newAuthor
        });
    },

    updateAuthor: function (author) {
        var updatedAuthor = AuthorApi.saveAuthor(author);

        // Hey Dispatcher! Go tell all the stores that an author was updated.
        Dispatcher.dispatch({
            actionType:ActionTypes.UPDATE_AUTHOR,
            author:updatedAuthor
        });
    },

    deleteAuthor: function (id) {
        AuthorApi.deleteAuthor(id);

        // Hey Dispatcher! Go tell all the stores that an author was deleted.
        Dispatcher.dispatch({
            actionType:ActionTypes.DELETE_AUTHOR,
            id:id
        });
    }
};

module.exports = AuthorActions;