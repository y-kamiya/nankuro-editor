import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class FieldCellComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.tag,
        }
    }

    render() {
        let className = 'default';
        return <td className={className}>{this.state.value}</td>;
    }

    getClassName() {
        if (this.props.tag < 0) {
            return 'black';
        }
        return 'default';
    }

    updateCell() {
        let tag = this.props.tag;
        let value = Store.getAnswer(tag);
        let updated = value === Store.NO_ANSWER ? tag : value;
        this.setState({value: updated});
    }

    componentDidMount() {
        Store.addEventListener(Store.INPUT_ANSWER, this.updateCell.bind(this));
    }
}




