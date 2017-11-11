import React from 'react'
import Store from '../stores/Store'
import AppActions from '../actions/AppActions'
import AnswerCellComponent from '../components/AnswerCellComponent'

export default class AnswerComponent extends React.Component {
    get PX_PER_COLUMN() { return 50 };
    get RATIO_ANSWER_TABLE_WIDTH() { return 2/3 };

    constructor(props) {
        super(props);
        this.state = {
            appState: Store.getAppState(),
            windowWidth: window.innerWidth,
        };
        this.resizeTimer = 0;
    }

    componentDidMount() {
        Store.addEventListener(Store.LOAD_DATA, () => {
            this.setState({
                appState: Store.getAppState(),
            });
        });
        window.onresize = this.onWindowResize.bind(this);
    }

    onWindowResize() {
        if (0 < this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(this.changeWindowWidth.bind(this), 500);
    }

    changeWindowWidth() {
        this.setState({windowWidth: window.innerWidth});
    }

    render() {
        return <table>{this.createTable()}</table>;
    }

    createTable() {
        if (this.state.appState == Store.STATE_INITIAL) {
            return <tbody></tbody>
        }
        
        let tagMax = Store.getTagMax();
        let tagList = Array.from(Array(tagMax), (_,i) => i+1);
        let groups = this.groupBy(tagList, this.calcTableColumnNum());

        var body = [];
        for (var group of groups) {
            var rowTh = [];
            var rowTd = [];
            for (var tag of group) {
                rowTh.push(<th key={"th" + tag}>{tag}</th>);
                rowTd.push(<td key={"td" + tag}><AnswerCellComponent tag={tag} /></td>);
            }
            body.push(<tr key={"trth" + tag}>{rowTh}</tr>);
            body.push(<tr key={"trtd" + tag}>{rowTd}</tr>);
        }

        return <tbody>{body}</tbody>;
    }
 
    groupBy(array, n) {
        let group = [];
        for (let i = 0; i < n; i++) {
            if (array.length === 0) {
                return [group];
            }
            group.push(array.shift());

        }
        return [group].concat(this.groupBy(array, n));
    }

    calcTableColumnNum() {
        let columnNumMax = this.state.windowWidth * this.RATIO_ANSWER_TABLE_WIDTH / this.PX_PER_COLUMN;
        let tagMax = Store.getTagMax();
        if (tagMax <= columnNumMax) {
            return columnNumMax;
        }
        if (columnNumMax < 10) {
            return 5;
        }
        return Math.floor(columnNumMax / 10) * 10;
    }
}





