import {
    closeWithEsc,
    closePopup,
    openPopup
} from "../utils/utils.js";

 const previewImagePopup = document.querySelector(".preview-popup");
 const previewCardImage = document.querySelector(".popup__preview-image");
 const previewCardName = document.querySelector(".popup__preview-name");

class Card {

    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
      

    }
    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener("click", this._handleLike.bind(this));
        this._element.querySelector(".card__delete-button").addEventListener("click", this._handleDelete.bind(this));
        this._element.querySelector(".card__image").addEventListener("click", this._handleImagePreview.bind(this));
    }

    _handleCardClick() {
         this._imageElement.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

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