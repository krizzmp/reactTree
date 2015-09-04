var React = require('react');
var DataStore = require('./../datastore.js');
var {List,Map} = require('immutable');
var TreeItem = require("./tree-item.js");
var TreeHelper = require('./tree-helper.js');

var Tree = React.createClass({
    render() {
        var oldT = List(["└"]);
        return(
        <div>
        {this.props.data.children.map((e, i, a) => {
            return <TreeItem name={e} key={e.id} posi={TreeHelper.calcPosition(i, a, 0)} tubes={TreeHelper.tubes(e, i, a, oldT).shift()} canDrop={true}/>
        })}</div>)
    }
});

module.exports = Tree;