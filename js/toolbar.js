var React = require('react');
var DataStore = require('./datastore.js');
var createRect=()=>{
    DataStore.createRect();
};
var removeRect=()=>{
    DataStore.removeSelected();
};
var Toolbar = React.createClass({

    render() {
        return (
            <div className="toolbar">
                <button onClick={createRect}>
                    <span className="typcn typcn-document-add"></span>
                </button>

                <button onClick={removeRect}>
                    <span className="typcn typcn-document-delete"></span>
                </button>
            </div>
        );
    }
});

module.exports = Toolbar;