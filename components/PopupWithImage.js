import Popup from './Popup.js';

class PopupWithImage extends Popup {
    open ({link, name}) {
        this._popupElement.querySelector(".popup__preview-name").textcontent = name;
        const image =  this._popupElement.querySelector(".popup__preview-image");
        image.src = link;
        image.alt = `Photo of ${name}`;
        super.open();
    }
}

export default PopupWithImage;