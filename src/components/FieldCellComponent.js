import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class FieldCellComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'default';
        return <td className={className}>{this.props.tag}</td>;
    }

    getClassName() {
        if (this.props.tag < 0) {
            return 'black';
        }
        return 'default';
    }
}




