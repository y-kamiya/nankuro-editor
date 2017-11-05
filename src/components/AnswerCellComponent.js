import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class AnswerCellComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        let tag = this.props.tag;
        AppActions.inputAnswer(tag);
    }

    render() {
        return <input type="text" onClick={this.onClick.bind(this)} />
    }
}






