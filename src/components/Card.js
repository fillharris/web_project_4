class Card {
  constructor(data, templateSelector, handleCardClick, currentUser) {
    this._handleCardClick = handleCardClick;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data.id;
    this._currentUser = currentUser;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".card");
    this._element;
    this._cardImage;
    

  }

  getId() {
    return this._id;
  }

  createCardElement() {
    this._element = this._getElement();

    this._setImageAndName();
    this._setEventListener();

    return this._element;
  }

  _getElement() {
    return this._cardTemplate.cloneNode(true);
  }
  _setEventListener() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");
    likeButton.addEventListener("click", this._like);
    deleteButton.addEventListener("click", this._delete);

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _like(evt) {
    const heart = evt.target;
    heart.classList.toggle("card__active-button");
  }

  _delete = () => {
    this._element.remove();
    this._element = null;
  };

  _setImageAndName() {
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.style = `background-image:url(${this._cardLink});`;
    this._element.querySelector(".card__title").textContent = this._cardName;
  }
}

export { Card };
