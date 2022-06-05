import {
    previewImagePopup,
    previewCardImage,
    previewCardName
} from "./utils.js";

const closeWithEsc = (evt) => {
    if (evt.key === "Escape") {
        const popup = document.querySelector(".popup_open");
        closePopup(popup);
    }
}

const openPopup = (popup) => {
    popup.classList.add("popup_open");
    document.addEventListener("keydown", closeWithEsc);
}

const closePopup = (popup) => {
    popup.classList.remove(
        "popup_open"
    );
    document.removeEventListener("keydown", closeWithEsc);
}

class Card {

    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;

    }
    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener("click", this._handleLike.bind(this));
        this._element.querySelector(".card__delete-button").addEventListener("click", this._handleDelete.bind(this));
        this._element.querySelector(".card__image").addEventListener("click", this._handleImagePreview.bind(this));
    }

    _handleDelete() {
        this._element.remove();
    }


    _handleLike() {
        this._element.querySelector(".card__like-button").classList.toggle("card__active-button");
    }



    _handleImagePreview() {
        previewCardImage.src = this._link;
        previewCardImage.alt = `'Photo of ${this._name}'`;
        previewCardName.textContent = this._name;
        openPopup(previewImagePopup);
    }


    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector(
            ".card__image"
        ).style.backgroundImage = `url('${this._link}')`;

        this._element.querySelector(".card__title").textContent = this._name;

        this._setEventListeners();

        return this._element;
    }


}

export default Card;