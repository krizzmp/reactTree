var React = require('react');
var DataStore = require('./datastore.js');
var $ = require('jquery');
module.exports = React.createClass({

    onMouseDown(e) {
        if (e.button !== 0) return;
        var event = new CustomEvent("dragStart",{detail:{hello:"f"}});
        document.dispatchEvent(event);
    },
    select() {
        DataStore.select(this.props.name, true);
    },
    style() {
        return {
            paddingLeft: 4,
            cursor: this.state.cursor,
            color: this.props.name.selected ? '#EF9D29' : '#FFF',
            flex: 1
        }
    },
    render() {
        return (
            <div style={this.style()}
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.onMouseLeave}
                onClick={this.select}>
                {this.props.name.name}
            </div>
        )
    }
});
