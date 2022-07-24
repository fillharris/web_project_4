class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    currentUser
  ) {
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._currentUser = currentUser;
    this._cardTemplate = document
      .querySelector(templateSelector)
      .content.querySelector(".card");
    this._element;
    this._cardImage;

    this._likeButton;
    this._deleteButton;
    this._deleteButtonImage;
    this._numLikesText;
    this._isLikedByCurrentUser;
  }

  getId() {
    return this._id;
  }

  createCardElement(userData) {
    this._element = this._getElement();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._deleteButtonImage = this._element.querySelector(
      ".card__delete-image"
    );
    this._heart = this._element.querySelector(".card__like-image");

    this._numLikesText = this._element.querySelector(".card__likes");

    this._cardImage = this._element.querySelector(".card__image");

    if (userData.getUserInfo().name === this._owner.name) {
    } else {
      this._deleteButton.remove();
    }
    this._setImageAndName();
    this._loadLikes();

    this._setEventListener();

    this._isLikedByCurrentUser = false;
    this._likes.forEach((like) => {
      if (like._id === userData.getUserInfo().id) {
        this._isLikedByCurrentUser = true;
      }
    });

    if (this._isLikedByCurrentUser) {
      this._toggleLikesImage();
    }
    return this._element;
  }

  getIsLikedByCurrentUser() {
    return this._isLikedByCurrentUser;
  }
  _getElement() {
    return this._cardTemplate.cloneNode(true);
  }
  _setEventListener() {
    this._likeButton.addEventListener("click", (evt) => this._like(evt));
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _toggleIsLiked() {
    console.log(this._isLikedByCurrentUser);
    if (this._isLikedByCurrentUser == false) {
      this._isLikedByCurrentUser = true;
    } else {
      this._isLikedByCurrentUser = false;
    }
    console.log(this._isLikedByCurrentUser);
  }

  _toggleLikesImage() {
    this._heart.classList.toggle("card__like_active");
  }
  _like(evt) {
    this._toggleLikesImage();
    this._handleLikeClick();
    this._toggleIsLiked();
    this._numLikesText.textContent = this._likes.length;
  }

  setLikes(likesArray) {
    this._likes = likesArray;
    this._numLikesText.textContent = this._likes.length;
  }

  deleteFromPage = () => {
    this._element.remove();
    this._element = null;
  };

  _loadLikes() {
    if (this._likes != null) {
      this._numLikesText.textContent = this._likes.length;
    } else {
      this._numLikesText.textContent = 0;
    }
  }
  _setImageAndName() {
    this._cardImage.style = `background-image:url(${this._cardLink});`;
    this._element.querySelector(".card__title").textContent = this._cardName;
  }
}

export { Card };
