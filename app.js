var React = require('react');
var Tree = require("./js/tree.js");
var Toolbar = require("./js/toolbar.js");

var App = React.createClass({
    render() {
        return (
            <div className="v-split">
                <Toolbar/>
                <div className="h-split">
                    <div className="content">
                    hello
                    </div>
                    <div className="sidebar">
                        <div className="group">
                            <div className="header">
                            Objects
                            </div>

                            <Tree/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
React.render(<App/>, document.getElementById("app"));
