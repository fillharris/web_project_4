class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleTrashButton,
    currentUserId,
    handleLikeClick
  ) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._likes = cardData.likes;
    this._currentUserId = currentUserId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButton;
    this._handleLikeClick = handleLikeClick;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getCardId() {
    return this._cardId;
  }
  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    this._likeCount.textContent = this._likes.length;
    if (this._isLiked()) {
      this._heartButton.classList.add("card__like_active");
    } else {
      this._heartButton.classList.remove("card__like_active");
    }
  }
  _isLiked() {
    return this._likes.some((user) => {
      return user._id === this._currentUserId;
    });
  }
  _setEventListeners() {
    this._heartButton.addEventListener("mouseup", () => {
      if (this._heartButton.classList.contains("card__like_active")) {
        this._handleLikeClick(this._cardId, "remove", this);
      } else {
        this._handleLikeClick(this._cardId, "add", this);
      }
    });

    if (this._trashButton) {
      this._trashButton.addEventListener("mouseup", () => {
        this._handleTrashButton(this);
      });
    }

    this._cardImage.addEventListener("mouseup", (evt) => {
      this._handleCardClick(evt.target);
    });
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    this._likeCount = this._cardElement.querySelector(".card__likes");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._heartButton = this._cardElement.querySelector(".card__like-button");

    this._cardImage.alt = this._text;
    this._cardImage.src = this._imageLink;
    cardTitle.textContent = this._text;

    if (this._ownerId !== this._currentUserId) {
      this._trashButton.remove();
      this._trashButton = null;
    }
    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }
}

export default Card;
