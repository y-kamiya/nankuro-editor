import AppDispatcher from '../dispatcher/AppDispatcher'

class AppActions {
    get CREATE_FIELD_ACTION() { return 'create_field_action' };
    get INPUT_ANSWER_ACTION() { return 'input_answer_action' };
    get FOCUS_TAG_ACTION() { return 'focus_tag_action' };

    createField() {
        AppDispatcher.dispatch({
            actionType: this.CREATE_FIELD_ACTION,
        });
    }

    inputAnswer(tag, value) {
        AppDispatcher.dispatch({
            actionType: this.INPUT_ANSWER_ACTION,
            tag: tag,
            value: value
        });
    }

    focusTag(tag) {
        AppDispatcher.dispatch({
            actionType: this.FOCUS_TAG_ACTION,
            tag: tag
        });
    }
}

module.exports = new AppActions();
