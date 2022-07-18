import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", () => {
      this._handleFormSubmit(this._cardId, this._card);
    });
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }
}