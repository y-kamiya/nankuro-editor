import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'
import AnswerComponent from '../components/AnswerComponent'
import FieldComponent from '../components/FieldComponent'
import FileComponent from '../components/FileComponent'

export default class Component extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentiWillUnmount() {
    }

    render() {
        return (
            <div>
                <FileComponent />
                <AnswerComponent />
                <FieldComponent />
            </div>
        );
    }
}
