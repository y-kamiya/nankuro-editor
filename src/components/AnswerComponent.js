import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'
import AnswerCellComponent from '../components/AnswerCellComponent'

export default class AnswerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appState : Store.getAppState(),
        };
    }

    componentDidMount() {
        Store.addEventListener(Store.LOAD_DATA, () => {
            this.setState({
                appState: Store.getAppState(),
            });
        });
    }

    render() {
        return <table>{this.createTable()}</table>;
    }

    createTable() {
        if (this.state.appState == Store.STATE_INITIAL) {
            return <tbody></tbody>
        }
        
        let tagMax = Store.getTagMax();
        var rowTh = [];
        var rowTd = [];
        for (let tag = 1; tag <= tagMax; tag++) {
            rowTh.push(<th key={tag}>{tag}</th>);
            rowTd.push(<td key={tag}><AnswerCellComponent tag={tag} /></td>);
        }
        return (
            <tbody>
                <tr>{rowTh}</tr><tr>{rowTd}</tr>
            </tbody>
        );
    }

}





