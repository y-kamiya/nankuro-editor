import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'

export default class FileComponent extends React.Component {
    constructor() {
        super();
        this.reader = new FileReader();
        this.reader.addEventListener('load', this.onLoad.bind(this));
        this.state = {
        };
    }

    render() {
        return (
            <div id="input">
                <input type="file" onChange={this.onChange.bind(this)} />
                <button>save</button>
            </div>
        );
    }

    onChange(event) {
        let file = event.target.files[0];
        this.reader.readAsText(file);
    }

    onLoad(event) {
        AppActions.loadData(this.reader.result);
    }

    componentDidMount() {
    }
}



