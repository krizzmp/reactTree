var React = require('react');
var DataStore = require('./../datastore.js');
var {List} = require('immutable');
var $ = require('jquery');
var TreeHelper = require('./tree-helper.js');
var noDrop = "no-drop";
var dropAfter = "w-resize";
var dropUnder = "s-resize";

var TreeItem = React.createClass({
    getInitialState() {
        return {
            dragging: false,
            cursor: "inherit",
            canDrop: true
        }
    },
    onMouseUp(e) {
        this.setState({dragging: false, canDrop: true});
    },
    onDragStart(e) {
        this.setState({dragging: true});
    },
    componentDidMount(props, state) {
        $(document).on("dragStart", this.onDragStart);
        $(document).on("mouseup", this.onMouseUp);
        $(this.getDOMNode()).on("myDrop", (e, d)=> {
            e.preventDefault();
            e.stopPropagation();
            switch (this.state.cursor) {
                case(noDrop):
                    break;
                case(dropAfter):
                    DataStore.insertAfter(d.thing, this.props.name);
                    break;
                case(dropUnder):
                    DataStore.insertUnder(d.thing, this.props.name);
                    break;
            }
        });
    },
    componentWillUnmount() {
        $(document).off("dragStart", this.onDragStart);
        $(document).off("mouseup", this.onMouseUp);
        $(this.getDOMNode()).off("myDrop");
    },
    onMouseMove(e) {
        if (!this.state.dragging) return;

        if (!this.canDrop()) {
            this.setState({cursor: noDrop});
        } else if (e.nativeEvent.offsetY < 12) {
            this.setState({cursor: dropAfter});
        } else {
            this.setState({cursor: dropUnder});
        }
    },
    onMouseLeave(e) {
        this.setState({cursor: "inherit"});
    },
    onDragEnd(e) {
        this.setState({cursor: "inherit"});
        $(e.target).trigger("myDrop", {thing: this.props.name})
    },
    onMouseDown(e) {
        if (e.button !== 0) return;
        this.setState({canDrop: false});
        $(document).trigger("dragStart", this.props.name);
        $(document).one("mouseup", this.onDragEnd)
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
    canDrop() {
        return this.state.canDrop && this.props.canDrop
    },
    toggleCollapsed() {
        DataStore.toggleCollapsed(this.props.name);
    },
    renderTube(str){
        //(e == "⊟" ?
        //    <span className={'test collapsible'}
        //          onClick={this.toggleCollapsed}>{this.props.name.isCollapsed ? "⊞" : "⊟"}</span> :
        //    <span className={'test'}>{e}</span>)
        if(str=="⊟"){
            if(this.props.name.isCollapsed){
                return <img src={"img/tree-05-S.png"} onClick={this.toggleCollapsed}/>
            }else{
                return <img src={"img/tree-03-S.png"} onClick={this.toggleCollapsed}/>
            }
        }else if(str=="└"){
            return <img src={"img/tree-02-S.png"}/>
        }else if(str=="├"){
            return <img src={"img/tree-01-S.png"}/>
        }else if(str=="│"){
            return <img src={"img/tree-04-S.png"}/>
        }else if(str==" "){
            return <img src={"img/tree-07-S.png"}/>
        }else if(str=="─"){
            return <img src={"img/tree-06-S.png"}/>
        }

    },
    render() {
        var children = this.props.name.children;
        var lineStyle = {
            background: this.props.posi % 2 == 0 ? 'odd' : 'even'
        };
        var itemStyle = {
            cursor: this.state.cursor
        };
        var hej = this.props.name.selected ? 'sel' : 'unsel';
        var oldT = this.props.tubes;
        return (
            <div className={"hello "+lineStyle.background} style={this.props.style}>
                <span className={"line "+hej}>
                    <span>
                    {this.props.tubes.map(this.renderTube)}
                    </span>
                    <div style={itemStyle} className={"item "} onMouseMove={this.onMouseMove}
                         onMouseDown={this.onMouseDown} onMouseLeave={this.onMouseLeave} onClick={this.select}>
                        {this.props.name.name}
                    </div>
                </span>

                {this.props.name.isCollapsed || children.map((e, i, a) =>
                        <TreeItem name={e} key={e.id} posi={TreeHelper.calcPosition(i, a, this.props.posi)}
                                  tubes={TreeHelper.tubes(e, i, a, oldT)} canDrop={this.canDrop()}/>
                )}
            </div>
        );
    }
});
module.exports = TreeItem;