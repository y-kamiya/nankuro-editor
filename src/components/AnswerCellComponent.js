import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class AnswerCellComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    getInitialValue() {
        return Store.getAnswer(this.props.tag);
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
        return <input type="text" defaultValue={this.getInitialValue()} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
    }
}






