var React = require('react');
var Tree = require("./js/tree/tree-container");
var Toolbar = require("./js/toolbar.js");

var App = React.createClass({
    render() {
        return (
            <div className="v-split">
                <Toolbar/>

                <div className="h-split">
                    <div className="sidebar">
                        <div className="group">
                            <Tree/>
                        </div>
                    </div>
                    <div className="content">
                        hello
                    </div>

                </div>
            </div>
        )
    }
});
React.render(<App/>, document.getElementById("app"));
