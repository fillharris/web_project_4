
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

    }

    close() {

    }
}

export default Popup;