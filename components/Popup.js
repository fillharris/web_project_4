
class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(`.${popupSelector}`);
        this._handleEsc =  this._handleEsc.bind(this);
        this._popup =  document.querySelector(".popup_open");
    }

    _handleEsc(evt) {
        if (evt.key === "Escape") {
            close(this._popup);
          }
    }

    setEventListeners() {

    }

    open() {
       this._popup.classList.add("popup_open");
        document.addEventListener("keydown", this._handleEsc);
    }

    close() {
        this._popup.classList.remove("popup_open");
        document.removeEventListener("keydown", this._handleEsc);
    }
}

export default Popup;