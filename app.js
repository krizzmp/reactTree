var React = require('react');
var Tree = require("./js/tree.js");
var Toolbar = require("./js/toolbar.js");
var DataStore = require("./js/datastore.js");
var Rectangle = require('./js/rectangle.js');
var NumberInput = require('./js/numberinput.js');


var Attributes = React.createClass({
    getInitialState() {
        return {data: DataStore.getSelected()};
    },
    componentDidMount() {
        DataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        DataStore.removeChangeListener(this._onChange);
    },
    _onChange() {
        console.log("updating State");
        this.setState({data: DataStore.getSelected()});
    },
    render() {

        var t = (e)=> {
            if (e instanceof Rectangle) {
                var updateWidth = (n)=>{
                    console.log(n);
                    DataStore.updateWidth(e,n);
                };
                var updateHeight = (n)=>{
                    console.log(n);
                    DataStore.updateHeight(e,n);
                };
                return (
                    <div className="rectangle">
                        <p>Rectangle Object [{e.name}]</p>

                        <table>
                            <tr>
                                <td>Width:</td>
                                <td>
                                    <NumberInput onChange={updateWidth} val={e.width}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Height:</td>
                                <td>
                                    <NumberInput onChange={updateHeight} val={e.height}/>
                                </td>
                            </tr>
                        </table>
                    </div>
                )
            }

        };
        return (
            <div className="attributes">
            {this.state.data.map(e=>t(e))}
            </div>
        )
    }
});

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
                        <div className="group">
                            <div className="header">
                            Attributes
                            </div>

                            <Attributes/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
React.render(<App/>, document.getElementById("app"));
