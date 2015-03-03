var {List} = require('immutable');
class Counter {
    constructor() {
        this.count = 1;
    }

    getCount() {
        return this.count++;
    }
}
var counter = new Counter();
class TreeData {
    constructor( ...g) {
        this.id = counter.getCount();
        this.children = List(g);
        this.children.forEach((c)=>c.setParent(this));
        this.isCollapsed = false;
        this.selected = false;
    }

    insertAfter(thingToInsert, thingToInsertAfter) {
        var index = this.children.indexOf(thingToInsertAfter);
        this.children = this.children.splice(index, 0, thingToInsert);
    }

    insertUnder(thingToInsert) {
        this.children = this.children.unshift(thingToInsert);
    }

    remove(thing) {
        var index = this.children.indexOf(thing);
        this.children = this.children.delete(index);
    }

    setParent(parent) {
        this.parent = parent;
    }

    select() {
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }

    deselectAll() {
        this.deselect();
        this.children.forEach(e=>e.deselectAll());
    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }

    totalChildren() {
        return this.isCollapsed? 0 : this.children.toSeq().reduce((prev, curr)=>  prev + curr.totalChildren(), 0) + this.children.size;
    }
}
class Shape extends TreeData{
    constructor(name) {
        super();
        this.name = name;
        this.x = 0;
        this.y = 0;
    }
}
module.exports = Shape;