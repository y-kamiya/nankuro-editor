import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class FieldCellComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.getCellValue(),
            isFocused: false,
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

    isTag() {
        return Number.isInteger(this.state.value)
    }

    getClassName() {
        let classList = [];
        if (this.state.isFocused) {
            classList.push('bg-primary');
        }
        classList.push(this.getCellType());
        return classList.join(' ');
    }

    getCellType() {
        if (this.isBlack()) {
            return 'black';
        }
        if (this.isTag()) {
            return 'tag';
        }
        return 'character';
    }

    getCellValue() {
        let tag = this.props.tag;
        let value = Store.getAnswer(tag);
        return value === Store.NO_ANSWER ? tag : value;
    }

    updateCell() {
        this.setState({value: this.getCellValue()});
        this.setState({isFocused: false});
    }

    focusTag() {
        if (Store.getFocusTag() !== this.props.tag) {
            return;
        }
        this.setState({isFocused: true});
    }

    componentDidMount() {
        Store.addEventListener(Store.INPUT_ANSWER, this.updateCell.bind(this));
        Store.addEventListener(Store.FOCUS_TAG, this.focusTag.bind(this));
    }
}




