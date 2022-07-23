class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _setEventListeners(inputList, buttonElement) {
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
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
    inputList.some((inputElement) => !inputElement.validity.valid);

  _showInputError(inputElement) {
    inputElement.classList.add(this._settings.inputErrorClass);

    const inputId = inputElement.id;

    const errorMessage = inputElement.validationMessage;

    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    const inputId = inputElement.id;
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }
  enableValidator() {
    const inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(inputList, buttonElement);
  }
  resetValidation() {
    const inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList, buttonElement);
  }
}

export default FormValidator;
