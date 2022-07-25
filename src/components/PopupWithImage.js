import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(image) {
    const imageEl = this._popup.querySelector(".popup__preview-image");
    imageEl.src = image.src;
    imageEl.alt = image.alt;
    const caption = this._popup.querySelector(".popup__preview-name");
    caption.textContent = image.alt;
    super.open();
  }
}
