var data = require('./data.js');
var test = require('./rectangle.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var n = 1;
var selected = [];
var TodoStore = assign({}, EventEmitter.prototype, {

    getAll() {
        return data;
    },
    getSelected(){
        return selected;
    },
    createRect(){
        var thingToInsert = new test("new rectangle"+n++);
        data.insertUnder(thingToInsert);
        thingToInsert.setParent(data);
        TodoStore.emitChange();

    },
    toggleCollapsed(entry) {
        entry.toggleCollapsed();
        TodoStore.emitChange();
    },
    select(entry, one) {
        if (one) {
            data.deselectAll();
            selected = [];
        }
        entry.select();
        selected.push(entry);
        TodoStore.emitChange();
    },
    insertAfter(thingToInsert, thingToInsertAfter) {
        thingToInsert.parent.remove(thingToInsert);
        thingToInsertAfter.parent.insertAfter(thingToInsert, thingToInsertAfter);
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
    removeSelected() {
        var s = this.getSelected();
        s.forEach((thing)=>{thing.parent.remove(thing);});

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