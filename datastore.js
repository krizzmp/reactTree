var data = require('./data.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var TodoStore = assign({}, EventEmitter.prototype, {

    getAll() {
        return data;
    },
    toggleCollapsed(entry) {
        entry.toggleCollapsed();
        TodoStore.emitChange();
    },
    select(entry, one) {
        if (one) {
            data.deselectAll();
        }
        entry.select();
        TodoStore.emitChange();
    },
    insertAfter(thingToInsert, thingToInsertAfter) {
        thingToInsertAfter.parent.insertAfter(thingToInsert, thingToInsertAfter);
        thingToInsert.parent.remove(thingToInsert);
        thingToInsert.setParent(thingToInsertAfter.parent);
        TodoStore.emitChange();
    },
    insertUnder(thingToInsert, thingToInsertUnder) {
        thingToInsertUnder.insertUnder(thingToInsert);
        thingToInsert.parent.remove(thingToInsert);
        thingToInsert.setParent(thingToInsertUnder);
        TodoStore.emitChange();
    },
    remove(thing) {
        thing.parent.remove(thing);
        TodoStore.emitChange();
    },
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
module.exports = TodoStore;