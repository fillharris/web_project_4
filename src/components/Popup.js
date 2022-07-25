export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleButtonClose() {
    this.close();
  }
  _handleOverlayClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }
  open() {
    this._setEventListeners();

    this._popup.classList.add("popup_open");
  }
  close() {
    this._popup.classList.remove("popup_open");

    document.removeEventListener("keyup", this._handleEscClose);
    this._closeButton.removeEventListener("mouseup", this._handleButtonClose);
    this._popup.removeEventListener("mouseup", this._handleOverlayClose);
  }

  _setEventListeners() {
    // Three ways to close the popup:
    // 1) hit ESC key
    document.addEventListener("keyup", this._handleEscClose);
    // 2) mouseup on the close button
    this._closeButton.addEventListener("mouseup", this._handleButtonClose);
    // 3) mouseup on the overlay
    this._popup.addEventListener("mouseup", this._handleOverlayClose);
  }
}
