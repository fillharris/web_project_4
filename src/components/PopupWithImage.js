import Popup from "./Popup.js"

class PopupWithImage extends Popup{
    constructor(popupSelector)
    {
        super(popupSelector);
        
    }
    _setDataImagePopup() {
        const imagePopupPic = this._popup.querySelector(".popup__preview-image");
        const imagePopupText = this._popup.querySelector(".popup__preview-name");
        imagePopupPic.src = this.link;
        imagePopupText.textContent = this.name;
        imagePopupPic.alt = this.name;
      }
    open(data)//data contains name and link. sent here and not in the constructor
    {
        this.name = data.name;
        this.link = data.link;
        this._setDataImagePopup();
        super.open();
    }
    
}

export default PopupWithImage;;