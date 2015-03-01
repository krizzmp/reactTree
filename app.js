var React = require('react');
var DataStore = require('./datastore.js');
var {List,Map} = require('immutable');
var TreeItem = require("./tree-item.js")

var Testing = React.createClass({
    getInitialState() {
        return {data: DataStore.getAll()};
    },
    componentDidMount() {
        DataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        DataStore.removeChangeListener(this._onChange);
    },
    _onChange() {
        this.setState({data: DataStore.getAll()});
    },
    render() {
        return <TreeItem name={this.state.data} pos={1} tubes={List(["└", '⊟'])} canDrop={true}/>;
    }
});
React.render(<Testing/>, document.getElementById("app"));
