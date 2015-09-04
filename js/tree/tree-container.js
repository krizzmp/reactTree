var React = require('react');
var DataStore = require('./../datastore.js');
var Tree = require('./tree');
var TreeContainer = React.createClass({
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
        return(<Tree data={this.state.data}></Tree>)
    }
});

module.exports = TreeContainer;
