import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class FileComponent extends React.Component {
    constructor() {
        super();
        this.reader = new FileReader();
        this.reader.addEventListener('load', this.onLoad.bind(this));
        this.state = {
            blobUrl: "",
            blobUrlPrevious: "",
            filename: "", 
        };
    }

    componentDidMount() {
        Store.addEventListener(Store.INPUT_ANSWER, this.updateBlobUrl.bind(this));
    }
    render() {
        return (
            <div id="input">
                <input type="file" onChange={this.onChange.bind(this)} />
                <a href={this.state.blobUrl} download={this.state.filename}>save</a>
            </div>
        );
    }

    onChange(event) {
        let file = event.target.files[0];
        this.reader.readAsText(file);
        this.setState({filename: file.name});
    }

    onLoad(event) {
        AppActions.loadData(this.reader.result);
        this.updateBlobUrl();
    }

    updateBlobUrl() {
        let data = Store.getDataSaved();
        let blob = new Blob([data], {type: 'text/plain;charset=UTF-8'});
        let blobUrl = URL.createObjectURL(blob);
        URL.revokeObjectURL(this.state.blobUrlPrevious);
        this.setState({
            blobUrl: blobUrl,
            blobUrlPrevious: this.state.blobUrl
        });
    }

}



