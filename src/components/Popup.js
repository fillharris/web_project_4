class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._button = this._popup.querySelector(".popup__close-button");
  }
  open() {
    /* The visible class overrides the previous class because its farther down the page. see modal.css.*/
    this._popup.classList.add(
      "popup_open"
    ); /*activate a class that makes it visible*/

    document.addEventListener("keydown", this._handleEscClose); //close on esc
  }

  close() {
    this._popup.classList.remove(
      "popup_open"
    ); /*deactivate a class that makes it visible*/
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    //this is an arrow function
    //that way, we do not have to create an arrow function when setting the event listener
    //also because we do not create a new arrow function when setting event listener, we can remove this event listener
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //close when X is clicked
    this._button.addEventListener("click", () => this.close());

    this._popup.addEventListener("mousedown", (evt) => {
      //use mousedown so that if user clicks on box and drags outside, this event does not trigger
      //only triggers if they click outside modal box

      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}

export default Popup;
