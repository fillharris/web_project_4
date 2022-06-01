
class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    }

    _showInputError(inputElement) {
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

    _hasValidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });

    }

    _toggleButtonState(buttonElement, inputList) {
        if (inputList && !hasInvalidInput(inputList)) {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._inactiveButtonClass);
          } else {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
          }

    }

    _setEventListeners() {
        const inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
          );
          const buttonElement = this._formElement.querySelector(
            this._submitButtonSelector
          );
          
          _toggleButtonState(buttonElement, inputList );
          inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", function () {
              _checkInputValidity(this._formElement, inputElement); 
              _toggleButtonState( buttonElement, inputList); 
            });
          });

    }

    enableValidation() {
        this._formElement.forEach((form) => {
            setEventListeners(form, settings);
          });
          console.log(this);
        // this._formElement.forEach("submit", (evt) => {
        //     evt.preventDefault()
        // });

        // _setEventListeners();
    }
}

export default FormValidator;