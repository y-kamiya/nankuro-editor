import AppDispatcher from '../dispatcher/AppDispatcher'

class AppActions {
    get CREATE_FIELD_ACTION() { return 'create_field_action' };

    createField() {
        AppDispatcher.dispatch({
            actionType: this.CREATE_FIELD_ACTION,
        });
    }
}

module.exports = new AppActions();
