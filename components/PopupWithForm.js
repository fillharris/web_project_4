import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor ({ popupSelector, handleFormSubmit }) {
        super(popupSelector);

        this._popupForm = this._popupContainer.querySelector(".popup__form");
        this._handleFormSubmit  = handleFormSubmit;
        this._inputList = this._popupContainer.querySelector(".popup__input")
        this.submitButton = this._popupContainer.querySelector(".popup__save-button")
    }


    _getInputValues() {
        this.inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
          });
          return this._inputValues;
        }

    setEventListeners() {
        super.setEventListeners();
        this._popupContainer.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
          });
    }

    close() {
        super.close();
        this._form.reset();
        
      }
}

export default PopupWithForm;