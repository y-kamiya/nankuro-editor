import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class FileComponent extends React.Component {
    constructor() {
        super();
        this.reader = new FileReader();
        this.reader.addEventListener('load', this.onLoad.bind(this));
        this.state = {
            appState: Store.getAppState(),
            blobUrl: "",
            blobUrlPrevious: "",
            filename: "", 
        };
    }

    componentDidMount() {
        Store.addEventListener(Store.INPUT_ANSWER, this.onInputAnswer.bind(this));
        Store.addEventListener(Store.LOAD_DATA, () => {
            this.setState({ appState: Store.getAppState() });
        });
        // for debug
        // AppActions.loadData(JSON.stringify(require('./test.json')));
    }

    render() {
        return (
            <div className="input-group choose-file">
                <label className="input-group-btn">{this.createButton()}</label>
                <input type="text" className="form-control" value={this.state.filename} readOnly />
            </div>
        );
    }

    createButton() {
        if (this.state.appState == Store.STATE_INITIAL) {
            return (
                <span className="btn btn-primary">
                    Choose file
                    <input type="file" onChange={this.onChange.bind(this)} />
                </span>
            );
        }
        return (
            <span>
                <a className="btn btn-success" href={this.state.blobUrl} download={this.state.filename}>Save file</a>
            </span>
        );
    }

    onChange(event) {
        let file = event.target.files[0];
        this.reader.readAsText(file);
        this.setState({filename: file.name});
    }

    onLoad(event) {
        AppActions.loadData(this.reader.result);
    }

    onInputAnswer() {
        let data = Store.getDataSaved();
        let blob = new Blob([data], {type: 'text/plain;charset=UTF-8'});
        let blobUrl = URL.createObjectURL(blob);
        URL.revokeObjectURL(this.state.blobUrlPrevious);
        this.setState({
            appState: Store.getAppState(),
            blobUrl: blobUrl,
            blobUrlPrevious: this.state.blobUrl
        });
    }

}



