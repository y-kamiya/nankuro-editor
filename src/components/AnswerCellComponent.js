import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class AnswerCellComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onFocus(event) {
        AppActions.focusTag(this.props.tag);
    }

    onBlur(event) {
        let tag = this.props.tag;
        let value = event.target.value;
        AppActions.inputAnswer(tag, value);
    }

    render() {
        return <input type="text" onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
    }
}






