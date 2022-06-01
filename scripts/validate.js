const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(settings.inputErrorClass); 
    errorElement.classList.add(settings.errorClass); 
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(settings.inputErrorClass); 
    errorElement.classList.remove(settings.errorClass); 
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = ( buttonElement, settings, inputList) => {
    if (inputList && !hasInvalidInput(inputList)) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    } else {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
      
    }
  };
  
  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );

    toggleButtonState(buttonElement, settings, inputList, );
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, settings); 
        toggleButtonState( buttonElement, settings, inputList); 
      });
    });
  };
  
  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((form) => {
      setEventListeners(form, settings);
    });
  };
  
 
  enableValidation(settings);

