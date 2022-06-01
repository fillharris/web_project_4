
class FormValidator {
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._formElement = formElement;
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        console.log(inputElement.validationMessage);
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
        inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
          );
          buttonElement = this._formElement.querySelector(
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
         this._formElement.addEventListener("submit", (evt) => {
             evt.preventDefault()
         });
         _setEventListeners(settings, this._formElement);
    }
}

export default FormValidator;