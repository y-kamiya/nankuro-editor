import EventEmitter from 'events'
import AppActions from '../actions/AppActions'
import AppDispatcher from '../dispatcher/AppDispatcher'

let instance = null;

class Store extends EventEmitter {
    get CREATE_FIELD() { return 'create_field' };

    get STATE_INITIAL() { return 0 };
    get STATE_FIELD_CREATED() { return 1 };

    get NO_CELL() { return -1 };

    constructor() {
        if (instance) {
            return instance;
        }
        super();

        this.fieldSize = {
            rowNum: 5,
            colNum: 5,
        };
        this.loadCells();
        this.appState = this.STATE_INITIAL;
        AppDispatcher.register(this.onAction.bind(this));
        this.setMaxListeners(1000);

        instance = this;
    }

    getFieldSize() {
        return this.fieldSize;
    }

    getAppState() {
        return this.appState;
    }

    emitNewAppState() {
        this.emit(this.CREATE_FIELD);
    }

    addEventListener(event, callback) {
        this.on(event, callback);
    }

    onAction(payload) {
        switch (payload.actionType) {
            case AppActions.CREATE_FIELD_ACTION:
                // this.loadCells();
                this.appState = this.STATE_FIELD_CREATED;
                this.emitNewAppState();
                break;
        }
    }

    loadCells() {
        let data = require('./test.json');
        this.cells = data.data;
        this.fieldSize.rowNum = this.cells.length;
        this.fieldSize.colNum = this.cells[0].length;
    }

    getCellTag(row, col) {
        return this.cells[row][col];
    }
}

module.exports = new Store();
