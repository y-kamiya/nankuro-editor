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
        let className = this.getClassName();
        let value = this.isBlack() ? "" : this.state.value;
        return <td className={className}>{value}</td>;
    }

    isBlack() {
        return this.state.value <= 0;
    }

    getClassName() {
        if (this.isBlack()) {
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




