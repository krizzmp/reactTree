var data = require('./data.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var TodoStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return data;
    },
    toggleCollapsed(entry){
        entry.toggleCollapsed();
        TodoStore.emitChange();
    },
    select(entry,one){
        if(one){
            data.deselectAll();
        }
        entry.select();
        TodoStore.emitChange();
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});
module.exports = TodoStore;