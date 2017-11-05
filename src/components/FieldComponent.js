import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'
import FieldCellComponent from '../components/FieldCellComponent'

export default class FieldComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            appState : Store.getAppState(),
            fieldSize: Store.getFieldSize(),
        };
    }

    render() {
        return (
            <div id="field"><table>{this.createTable()}</table></div>
        );
    }

    createTable() {
        let rowNum = this.state.fieldSize.rowNum;
        let colNum = this.state.fieldSize.colNum;

        var table = [];
        for (let i = 0; i < rowNum; i++) {
            let key = "row" + i;
            var row = [];
            for (let j = 0; j < colNum; j++) {
                row.push(<FieldCellComponent key={key+":cell"+j} tag={Store.getCellTag(i, j)} />);
            }
            table.push(<tr key={key}>{row}</tr>);
        }
        return <tbody>{table}</tbody>;
    }

    componentDidMount() {
        Store.addEventListener(Store.CREATE_FIELD, () => {
            this.setState({appState: Store.getAppState()});
        });
    }
}


