import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class AnswerCellComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onBlur(event) {
        let tag = this.props.tag;
        let value = event.target.value;
        AppActions.inputAnswer(tag, value);
    }

    render() {
        return <input type="text" onBlur={this.onBlur.bind(this)} />
    }
}






