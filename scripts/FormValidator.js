
class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = Array.from(
      this._formElement.querySelector(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    console.log(inputElement);
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";

  }

  _checkInptValidity(inputElement) {
    if (!inputElement.validity.valid) {
      _showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage,
      );
    } else {
      _hideInputError(this._formElement, inputElement);
    }
  }

  _hasValidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

  }

  _toggleButtonState() {
    if (this._inputList && !this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }

  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleButtonState(true);
    });

    this._setEventListeners();
  }
}

export default FormValidator;