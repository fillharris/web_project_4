import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__save-button");
    this._buttonOriginalText = this._button.textContent;
  }

  setSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
    //wait to be passed in in index.js
  }
  close() {
    super.close();
    this._button.removeEventListener("mouseup", this._handleFormSubmit);
  }
  open() {
    super.open();
    this._button.addEventListener("mouseup", this._handleFormSubmit);
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
};
