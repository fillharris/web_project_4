import { customSettings } from "./constants.js";
class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _setEventListeners(inputList, buttonElement) {
    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }
  _hasInvalidInput = (inputList) =>
    inputList.some((inputEl) => !inputEl.validity.valid);

  _showInputError(inputEl) {
    // change teh input style upon error
    inputEl.classList.add(this._settings.inputErrorClass);
    // error message content
    const errorMessage = inputEl.validationMessage;
    // access the input id which is something like popup-description
    const inputId = inputEl.id;
    // the id of the span slot is the template literal
    const errorEl = this._formEl.querySelector(`.${inputElement.id}-error`);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputEl) {
    inputEl.classList.remove(this._settings.inputErrorClass);
    const inputId = inputEl.id;
    const errorEl = this._formEl.querySelector(`.${inputElement.id}-error`);
    errorEl.textContent = "";
    errorEl.classList.remove(this._settings.errorClass);
  }
  enableValidator() {
    const inputList = [
      ...this._formEl.querySelectorAll(this._settings.inputSelector),
    ];
    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );
    // prevent all forms from refreshing the page upon submit
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // for all forms, we need to set event listeners
    });
    this._setEventListeners(inputList, buttonElement);
  }
  resetValidation() {
    const inputList = [
      ...this._formEl.querySelectorAll(this._settings.inputSelector),
    ];
    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );
    inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState(inputList, buttonElement);
  }
}
export default FormValidator;
