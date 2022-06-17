import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor ({ popupSelector, handleFormSubmit }) {
        super(popupSelector);

        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._handleFormSubmit  = handleFormSubmit;
    }

    _getInputValues() {

    }

    setEventListeners() {

    }

    close() {

    }
}

export default PopupWithForm;