class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEsc = this._handleEsc.bind(this);
    this._popup = document.querySelector(".popup");
    //this._popups = Array.from(document.querySelectorAll(".popup"));
  }

  _handleEsc(evt) {
    if (evt.key === "Escape") {
      close(this._popup);
    }
  }

  _handleClickOutsideToClose() {
       this._popup.addEventListener("mousedown", (evt) => {
        if (
          evt.target.classList.contains("popup") ||
          evt.target.classList.contains("popup__close-button")
        ) {
          close(this._popup);
        }
      });
  
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup_open")
      ) {
        this.close();
      }
    });
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
