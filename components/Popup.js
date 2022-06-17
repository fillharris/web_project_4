
class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(`.${popupSelector}`);
        this._handleEsc =  this._handleEsc.bind(this);
    }

    _handleEsc(evt) {
        if (evt.key === "Escape") {
            const popup = document.querySelector(".popup_open");
            close(popup);
          }
    }

    setEventListeners() {

    }

    open() {
        popup.classList.add("popup_open");
        document.addEventListener("keydown", this._handleEsc);
    }

    close() {
        popup.classList.remove("popup_open");
        document.removeEventListener("keydown", this._handleEsc);
    }
}

export default Popup;