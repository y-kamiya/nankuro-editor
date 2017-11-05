import AppDispatcher from '../dispatcher/AppDispatcher'

class AppActions {
    get CREATE_FIELD_ACTION() { return 'create_field_action' };
    get INPUT_ANSWER_ACTION() { return 'input_answer_action' };

    createField() {
        AppDispatcher.dispatch({
            actionType: this.CREATE_FIELD_ACTION,
        });
    }

    inputAnswer(tag) {
        AppDispatcher.dispatch({
            actionType: this.CREATE_FIELD_ACTION,
            value: tag
        });
    }
}

module.exports = new AppActions();
