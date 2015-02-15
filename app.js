var React = require('react');
var DataStore = require('./datastore.js');
var {List,Map} = require('immutable');
var $ = require('jquery');

var HelloMessage = React.createClass({
    getInitialState() {
        return {
            dragging: false,
            cursor: "inherit",
            canDrop: true
        }
    },
    componentDidMount(props, state) {
        document.addEventListener("dragStart", (e)=> {
            this.setState({dragging: true})
        });
        $(document).mouseup((e)=> {
            this.setState({dragging: false, canDrop: true});
        });
    },
    onMouseMove(e) {
        if (!this.state.dragging) return;
        if (e.nativeEvent.offsetY > 12) {
            this.setState({cursor: "w-resize"});
        } else {
            this.setState({cursor: "s-resize"});
        }
    },
    onMouseLeave(e) {
        this.setState({cursor: "inherit"});
    },
    onMouseDown(e) {
        if (e.button !== 0) return;
        this.setState({canDrop: false});
        var event = new CustomEvent("dragStart", {detail: {hello: "f"}});
        document.dispatchEvent(event);
    },
    select() {
        DataStore.select(this.props.name, true);
    },
    style: {
        paddingLeft: 4,
        cursor: this.props.canDrop ? this.state.cursor : "no-drop",
        color: this.props.name.selected ? '#EF9D29' : '#FFF',
        flex: 1
    },
    render() {
        var children = this.props.name.children;
        var style = {
            background: this.props.pos % 2 == 0 ? '#505050' : '#484848',
            display: 'flex' //,borderTop: '1px solid #606060', borderBottom: '1px solid #404040'
        };
        var test = ()=> {
            DataStore.toggleCollapsed(this.props.name);
        };

        var oldT = this.props.tubes;
        return (
            <div className="hello">
                <span style={style}>
                    <span>
                    {this.props.tubes.map(e=>(e == "⊟" ?
                        <span className={'test collapsible'} onClick={test}>{this.props.name.isCollapsed ? "⊞" : "⊟"}</span> :
                        <span className={'test'}>{e}</span>))}
                    </span>
                    <div style={this.style} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown} onMouseLeave={this.onMouseLeave} onClick={this.select}>
                        {this.props.name.name}
                    </div>
                </span>

                {this.props.name.isCollapsed || children.map((e, i, a) => {
                    var calcPosition = ()=> {
                        var n = a.take(i).reduce((p, c)=>p + c.totalChildren(), 1);
                        return this.props.pos + n + i;
                    };
                    var tubes = ()=> {
                        var isLastChild = i >= a.size - 1;
                        var hasChildren = e.children.size !== 0;
                        var expand = hasChildren ? "⊟" : "─";
                        var createTubes = ()=> {
                            if (oldT.contains("├")) {
                                return ["│", "└"];
                            } else if (isLastChild) {
                                return [" ", "└"];
                            } else if (oldT.contains("└")) {
                                return [" ", "├"];
                            }
                        };
                        return oldT.skipLast(2).concat(createTubes(), expand);
                    };
                    return <HelloMessage name={e} key={e.id} pos={calcPosition()} tubes={tubes()} canDrop={this.state.canDrop && this.props.canDrop}/>;
                })}
            </div>
        );
    }
});

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
        return <HelloMessage name={this.state.data} pos={1} tubes={List(["└", '⊟'])} canDrop={true}/>;
    }
});
React.render(<Testing/>, document.getElementById("app"));
