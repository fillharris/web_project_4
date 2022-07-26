import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
    this._formEl = this._popup.querySelector(".popup__form");
    this._button = this._formEl.querySelector(".popup__button");
    this._buttonOriginalText = this._button.textContent;
  }
  
  _getInputValues() {
    const inputList = [...this._popup.querySelectorAll(".popup__input")];
    const inputContent = {};
    inputList.forEach((inputEl) => {
      inputContent[inputEl.name] = inputEl.value;
    });
    return inputContent;
  }
  _setEventListeners() {
    this._formList.forEach((formEl) => {
      formEl.addEventListener("submit", this._handleSubmitClick);
    });

    super._setEventListeners();
  }
  _handleSubmitClick = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues, this._button);
  };
  close() {
    super.close();
    this._formEl.removeEventListener("submit", this._handleSubmitClick);
  }
  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._button.disabled = true;
      this._button.textContent = buttonText;
    } else {
      this._button.textContent = this._buttonOriginalText;
      this._button.disabled = false;
    }
  }
}
