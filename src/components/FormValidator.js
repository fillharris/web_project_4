import {customSettings} from "./constants.js";
class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(this.settings.inputErrorClass); 
    errorElement.classList.add(this.settings.errorClass); 
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.add(this.settings.inputErrorClass); 
    errorElement.classList.remove(this.settings.errorClass); 
    errorElement.textContent = "";
  }
  clearAllErrors()
  {
    const inputList = Array.from(
      this.formElement.querySelectorAll(
        customSettings.inputSelector
      )
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this.settings.inactiveButtonClass);
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this.settings.inactiveButtonClass);
  }

  setButtonInactive() { 
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );
    this._disableButton(buttonElement);
  }
  enableValidation() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement); 
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); 
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}

export { FormValidator};