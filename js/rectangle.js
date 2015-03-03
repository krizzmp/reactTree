var test = require('./test.js');
class Rectangle extends test{
    constructor(name) {
        super(name);
        this.width=100;
        this.height=100;
    }
}
module.exports = Rectangle;