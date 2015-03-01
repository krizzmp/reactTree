var {List,Map} = require('immutable');
class Counter {
    constructor() {
        this.count = 1;
    }

    getCount() {
        return this.count++;
    }
}
var counter = new Counter();
class test {
    constructor(name, ...g) {
        this.id = counter.getCount();
        this.children = List(g);
        this.children.forEach((c)=>c.setParent(this));
        this.name = name;
        this.isCollapsed = false;
        this.selected = false;
    }

    insertAfter(thingToInsert, thingToInsertAfter) {
        var index = this.children.indexOf(thingToInsertAfter);
        console.log(index);
        this.children = this.children.splice(index + 1, 0, thingToInsert);
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
        if (this.isCollapsed) {
            return 0;
        }
        return this.children.toSeq().reduce((prev, curr)=>  prev + curr.totalChildren(), 0) + this.children.size;
    }
}
var t1 = new test(
    'rectangle', new test(
        'circle', new test(
            'null', new test(
                'house', new test(
                    'roof', new test(
                        'base'
                    )
                )
            )
        ),
        new test(
            '1.2', new test(
                '1.1.1', new test(
                    '1', new test(
                        '1.1', new test(
                            '1.1.1'
                        )
                    ), new test(
                        '1.1.1', new test(
                            '1', new test(
                                '1.1', new test(
                                    '1.1.1'
                                )
                            )
                        )
                    )
                )
            )
        )
    )
);
module.exports = t1;