import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'
import AnswerCellComponent from '../components/AnswerCellComponent'

export default class AnswerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <table>{this.createTable()}</table>;
    }

    createTable() {
        let tagMax = Store.getTagMax();
        var rowTh = [];
        var rowTd = [];
        for (let tag = 1; tag <= tagMax; tag++) {
            rowTh.push(<th key={tag}>{tag}</th>);
            rowTd.push(<td key={tag}><AnswerCellComponent key={tag} tag={tag} /></td>);
        }
        return (
            <tbody>
                <tr>{rowTh}</tr><tr>{rowTd}</tr>
            </tbody>
        );
    }

}





