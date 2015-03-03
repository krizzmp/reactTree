var React = require('react');
var NumberInput = React.createClass({
    getInitialState() {
        return {value: this.props.val};
    },
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.val})
    },
    onChange(e){
        this.setState({value: e.target.value});
    },
    valid(value){
        return !isNaN(value);
    },
    onBlur(e){
        var number = parseFloat(e.target.value);
        if(this.valid(number)){
            this.props.onChange(number);
        }else{
            this.setState({value: this.props.val});
        }
    },
    render() {
        return (
            <div className="number-input">
                <input onChange={this.onChange} onBlur={this.onBlur} value={this.state.value}/>
                <input type="range" defaultValue={this.props.val} onChange={this.onBlur}/>
            </div>
        )
    }
});

module.exports = NumberInput;