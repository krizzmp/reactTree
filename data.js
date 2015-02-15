var {List,Map} = require('immutable');
class test {
    constructor(id, name, ...g) {
        this.id = id;
        this.children = List(g);
        this.name = name;
        this.isCollapsed = false;
        this.selected = false;
    }
    select(){
        this.selected = true;
    }
    deselect(){
        this.selected = false;
    }
    deselectAll(){
        this.deselect();
        this.children.forEach(e=>e.deselectAll());
    }
    toggleCollapsed(){
        this.isCollapsed=!this.isCollapsed;
    }
    totalChildren() {
        if(this.isCollapsed){
            return 0;
        }
        return this.children.toSeq().reduce((prev, curr)=>  prev + curr.totalChildren() ,0) + this.children.size;
    }
}
var t1 = new test(
    0, 'rectangle', new test(
        1, 'circle', new test(
            2, 'null', new test(
                4, 'house', new test(
                    5, 'roof', new test(
                        6, 'base'
                    )
                )
            )
        ),
        new test(
            3, '1.2', new test(
                2, '1.1.1', new test(
                    4, '1', new test(
                        5, '1.1', new test(
                            6, '1.1.1'
                        )
                    ), new test(
                        2, '1.1.1', new test(
                            4, '1', new test(
                                5, '1.1', new test(
                                    6, '1.1.1'
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