//functions
const isValid = (inputElement) => inputElement.validity.valid;

function checkInputValidity(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!isValid(inputElement)) {
        // show the error message and add the error class
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.innerText = inputElement.validationMessage;
        errorElement.classList.add(settings.errorClass);
    } else {
        //hide the error message and remove the error class
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.innerText = " ";
        errorElement.classList.remove(settings.errorClass);
    }
}

toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    const allValid = inputElement.every(inputElement => isValid(inputElement));
    if (allValid) {
        //button should unlock
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        // button should lock
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }

    };


function setupEventListeners(formElement,
    { inputSelector, submitButtonSelector, ...otherSettings }) {
    // get the form elements
    const inputList = [...formElement.querySelectorAll(inputSelector)];
    const buttonElement = formElement.querySelector(submitButtonSelector);
    //setup listeners for the form elements
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (e) => {
            //check if input is valid
            checkInputValidity(formElement, inputElement, otherSettings);
            toggleButtonState(inputList, buttonElement, otherSettings);
        });
    });
}


// enabling validation by calling enableValidation()
// pass all the settings on call
const enableValidation = ({ formSelector, ...otherSettings }) => {
    //select all the forms
    const formList = [...document.querySelectorAll(formSelector)];
    //loop through forms and setup listeners
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        // setup event listeners for the form fields
        setupEventListeners(formElement, otherSettings);
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
});
