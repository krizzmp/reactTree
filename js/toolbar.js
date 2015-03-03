var React = require('react');
var DataStore = require('./datastore.js');
var createRect=()=>{
    DataStore.createRect();
};
var Toolbar = React.createClass({

    render() {
        return (
            <div className="toolbar">
                <button onClick={createRect}>rect</button>
                <button>rect</button>
            </div>
        );
    }
});

module.exports = Toolbar;