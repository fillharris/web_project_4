/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
class Api {
  constructor(_ref) {
    let {
      baseUrl,
      headers
    } = _ref;
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  initialize() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  _handleFetchResponse(path) {
    let methodUsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
    let bodyContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    return fetch("".concat(this._baseUrl).concat(path), {
      method: methodUsed,
      headers: this._headers,
      body: bodyContent
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error: ".concat(res.status));
      }
    });
  }

  getInitialCards() {
    return this._handleFetchResponse("/cards");
  }

  getUserInfo() {
    return this._handleFetchResponse("/users/me");
  }

  editUserProfile(inputValues) {
    const bodyContent = JSON.stringify({
      name: inputValues.name,
      about: inputValues.about
    });
    return this._handleFetchResponse("/users/me", "PATCH", bodyContent);
  }

  addNewCard(inputValues) {
    const bodyContent = JSON.stringify({
      name: inputValues.name,
      link: inputValues.link
    });
    return this._handleFetchResponse("/cards", "POST", bodyContent);
  }

  getCardLikeInfo() {
    return this._handleFetchResponse("/cards");
  }

  deleteCard(cardId) {
    return this._handleFetchResponse("/cards/".concat(cardId), "DELETE");
  }

  addLike(cardId) {
    return this._handleFetchResponse("/cards/likes/".concat(cardId), "PUT");
  }

  removeLike(cardId) {
    return this._handleFetchResponse("/cards/likes/".concat(cardId), "DELETE");
  }

  editProfilePic(avatarLink) {
    const bodyContent = JSON.stringify({
      avatar: avatarLink.avatar
    });
    return this._handleFetchResponse("/users/me/avatar", "PATCH", bodyContent);
  }

}

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Card {
  constructor(cardData, cardSelector, handleCardClick, handleTrashButton, currentUserId, handleLikeClick) {
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
    return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
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
    return this._likes.some(user => {
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

    this._cardImage.addEventListener("mouseup", evt => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FormValidator {
  constructor(settings, formEl) {
    _defineProperty(this, "_hasInvalidInput", inputList => inputList.some(inputEl => !inputEl.validity.valid));

    this._settings = settings;
    this._formEl = formEl;
  }

  _setEventListeners(inputList, buttonElement) {
    inputList.forEach(inputEl => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);

        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  _showInputError(inputEl) {
    // change teh input style upon error
    inputEl.classList.add(this._settings.inputErrorClass); // error message content

    const errorMessage = inputEl.validationMessage; // access the input id which is something like popup-description

    const inputId = inputEl.id; // the id of the span slot is the template literal

    const errorEl = this._formEl.querySelector("#".concat(inputId, "-error"));

    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    inputEl.classList.remove(this._settings.inputErrorClass);
    const inputId = inputEl.id;

    const errorEl = this._formEl.querySelector("#".concat(inputId, "-error"));

    errorEl.textContent = "";
    errorEl.classList.remove(this._settings.errorClass);
  }

  enableValidator() {
    const inputList = [...this._formEl.querySelectorAll(this._settings.inputSelector)];

    const buttonElement = this._formEl.querySelector(this._settings.submitButtonSelector); // prevent all forms from refreshing the page upon submit


    this._formEl.addEventListener("submit", evt => {
      evt.preventDefault(); // for all forms, we need to set event listeners
    });

    this._setEventListeners(inputList, buttonElement);
  }

  resetValidation() {
    const inputList = [...this._formEl.querySelectorAll(this._settings.inputSelector)];

    const buttonElement = this._formEl.querySelector(this._settings.submitButtonSelector);

    inputList.forEach(inputEl => {
      this._hideInputError(inputEl);
    });

    this._toggleButtonState(inputList, buttonElement);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormValidator);

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleButtonClose() {
    this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  open() {
    this._setEventListeners();

    this._popup.classList.add("popup_open");
  }

  close() {
    this._popup.classList.remove("popup_open");

    document.removeEventListener("keyup", this._handleEscClose);

    this._closeButton.removeEventListener("mouseup", this._handleButtonClose);

    this._popup.removeEventListener("mouseup", this._handleOverlayClose);
  }

  _setEventListeners() {
    // Three ways to close the popup:
    // 1) hit ESC key
    document.addEventListener("keyup", this._handleEscClose); // 2) mouseup on the close button

    this._closeButton.addEventListener("mouseup", this._handleButtonClose); // 3) mouseup on the overlay


    this._popup.addEventListener("mouseup", this._handleOverlayClose);
  }

}

/***/ }),

/***/ "./src/components/PopupWithConfirm.js":
/*!********************************************!*\
  !*** ./src/components/PopupWithConfirm.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithConfirm)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");

class PopupWithConfirm extends _Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__save-button");
    this._buttonOriginalText = this._button.textContent;
  }

  setSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit; //wait to be passed in in index.js
  }

  close() {
    super.close();

    this._button.removeEventListener("mouseup", this._handleFormSubmit);
  }

  open() {
    super.open();

    this._button.addEventListener("mouseup", this._handleFormSubmit);
  }

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._button.disabled = true;
      this._button.textContent = buttonText;
    } else {
      this._button.textContent = this._buttonOriginalText;
      this._button.disabled = false;
    }
  }

}

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class PopupWithForm extends _Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    _defineProperty(this, "_handleSubmitClick", () => {
      const inputValues = this._getInputValues(); //wait to be passed in in index.js


      this._handleFormSubmit(inputValues, this._button);
    });

    this._handleFormSubmit = handleFormSubmit;
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
    this._formEl = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__save-button");
    this._buttonOriginalText = this._button.textContent;
  } // create and return an object from all the input boxes' answers


  _getInputValues() {
    const inputList = [...this._popup.querySelectorAll(".popup__input")];
    const inputContent = {};
    inputList.forEach(inputEl => {
      inputContent[inputEl.name] = inputEl.value;
    });
    return inputContent;
  }

  _setEventListeners() {
    this._formList.forEach(formEl => {
      formEl.addEventListener("submit", this._handleSubmitClick);
    });

    super._setEventListeners();
  }

  close() {
    super.close();

    this._formEl.removeEventListener("submit", this._handleSubmitClick);
  }

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._button.disabled = true;
      this._button.textContent = buttonText;
    } else {
      this._button.textContent = this._buttonOriginalText;
      this._button.disabled = false;
    }
  }

}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");

class PopupWithImage extends _Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image) {
    const imageEl = this._popup.querySelector(".popup__preview-image");

    imageEl.src = image.src;
    imageEl.alt = image.alt;

    const caption = this._popup.querySelector(".popup__preview-name");

    caption.textContent = image.alt;
    super.open();
  }

}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });
class Section {
  constructor(_ref, containerSelector) {
    let {
      items,
      renderer
    } = _ref;
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._initialArray.forEach(arrEl => {
      this._renderer(arrEl);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInfo)
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      nameSelector,
      jobSelector,
      avatarSelector
    } = _ref;
    this._nameSlot = document.querySelector(nameSelector);
    this._jobSlot = document.querySelector(jobSelector);
    this._avatarSlot = document.querySelector(avatarSelector);
  } // to populate form fields after popup open


  getUserInfo() {
    return {
      name: this._nameSlot.textContent,
      about: this._jobSlot.textContent,
      avatar: this._avatarSlot.src
    };
  } // upon form submission


  setUserInfo(data) {
    this._nameSlot.textContent = data.name;
    this._jobSlot.textContent = data.about;
    this._avatarSlot.alt = "".concat(data.name);
    this._avatarSlot.src = data.avatar;
  }

  setUserAvatar(data) {
    this._avatarSlot.src = data.avatar;
  }

}

/***/ }),

/***/ "./src/components/constants.js":
/*!*************************************!*\
  !*** ./src/components/constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardSelector": () => (/* binding */ cardSelector),
/* harmony export */   "cardsContainer": () => (/* binding */ cardsContainer),
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  // input line error style
  inputErrorClass: "popup__input-type_error",
  // error message class
  errorClass: "popup__error_visible"
};
const cardsContainer = ".photo-grid__cards";
const cardSelector = "#card-template";

/***/ }),

/***/ "./src/page/index.css":
/*!****************************!*\
  !*** ./src/page/index.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/page/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/page/index.css");
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card */ "./src/components/Card.js");
/* harmony import */ var _components_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/constants */ "./src/components/constants.js");
/* harmony import */ var _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FormValidator */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Section */ "./src/components/Section.js");
/* harmony import */ var _components_UserInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PopupWithImage */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Api */ "./src/components/Api.js");
/* harmony import */ var _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithConfirm */ "./src/components/PopupWithConfirm.js");
 // //Import classes
// // Buttons and other DOM elements
// const editProfileButton = document.querySelector("#profile__edit-button");
// const editProfileModal = document.querySelector("#edit-popup");
// const editProfileForm = editProfileModal.querySelector(".popup__form");
// const addCardButton = document.querySelector("#profile__add-button");
// const addCardPopup = document.querySelector("#create-popup");
// const addCardForm = addCardPopup.querySelector(".popup__form");
// const editAvatarModal = document.querySelector("#avatar-popup");
// const editAvatarForm = editAvatarModal.querySelector(".popup__form");
// const editAvatarButton = document.querySelector("#profile__avatar-button");
// const avatarImg = document.querySelector(".profile__avatar");
// // Form data
// const nameText = document.querySelector(".profile__name");
// const titleText = document.querySelector(".profile__title");
// const nameInput = editProfileForm.querySelector('[name="name"]');
// const titleInput = editProfileForm.querySelector('[name="description"]');
// const imageNameInput = addCardForm.querySelector('[name="place-name"]');
// const imageLinkInput = addCardForm.querySelector('[name="link"]');
// //Token and ID info
// //Token: b1411637-441a-4d25-9227-6de5bf8bcf24
// //Group ID: group-12









 // profile icons

const editProfileIcon = document.querySelector(".profile__info-edit-button");
const addPictureIcon = document.querySelector(".profile__add-button"); // author, add picture forms

const editProfileForm = document.querySelector("#edit-popup");
const addPictureForm = document.querySelector(".popup__preview-image");
const editProfilePicForm = document.querySelector(".avatar-popup"); // form fields for the author form and the add picture form

const formFieldAuthor = document.querySelector("#edit-profile-form");
const formFieldPicture = document.querySelector("#create-place-form"); // input fields for profile form popup

const inputProfileName = document.querySelector("#profile-name");
const inputProfileTitle = document.querySelector("#profile-title"); // profile section on the page

const profilePicInput = document.querySelector("#avatar-url");
const editProfilePicIcon = document.querySelector(".profile__icon"); // instantiate API class

const api = new _components_Api__WEBPACK_IMPORTED_MODULE_8__["default"]({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json"
  }
}); // handle Like Click function passed in as callback to Card.js

function handleLikeClick(cardId, action, card) {
  if (action === "remove") {
    api.removeLike(cardId).then(res => {
      card.updateLikes(res.likes);
    }).catch(res => {
      alert(res);
    });
  } else {
    api.addLike(cardId).then(res => {
      card.updateLikes(res.likes);
    }).catch(res => {
      alert(res);
    });
  }
} // add picture form functions


function renderCard(inputValues) {
  const card = new _components_Card__WEBPACK_IMPORTED_MODULE_1__["default"](inputValues, _components_constants__WEBPACK_IMPORTED_MODULE_2__.cardSelector, handleCardClick, handleTrashButton, currentUserId, handleLikeClick);
  const cardEl = card.createCard();
  cardSection.addItem(cardEl);
} // add picture form submit


const placePopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"](".create-popup", inputValues => {
  placePopup.renderLoading(true, "Saving...");
  api.addNewCard(inputValues).then(inputValues => {
    renderCard(inputValues);
    placePopup.close();
  }).catch(res => {
    alert(res);
  }).finally(() => {
    placePopup.renderLoading(false, "Saving...");
  });
});
const imagePopup = new _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_7__["default"]("#preview-popup");

function handleCardClick(image) {
  imagePopup.open(image);
}

const deleteCardConfirmation = new _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__["default"](".delete-popup"); // to interact with the Card class, open popup, then wait for delete to complete

function handleTrashButton(card) {
  deleteCardConfirmation.setSubmit(() => {
    deleteCardConfirmation.renderLoading(true, "Saving...");
    api.deleteCard(card.getCardId()).then(() => {
      card.deleteCard();
      deleteCardConfirmation.close();
    }).catch(res => {
      alert(res);
    }).finally(() => {
      deleteCardConfirmation.renderLoading(false, "Saving...");
    });
  });
  deleteCardConfirmation.open();
} // initialize card Section class variable to take api call result and interact with Section.js


let cardSection = null; // profile form functions

function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.name;
  inputProfileTitle.value = result.about;
}

function handleOpenProfileForm() {
  formFieldAuthor.reset();
  fillProfileForm();
  addProfileFormValidator.resetValidation();
  profilePopup.open();
}

const userInfo = new _components_UserInfo__WEBPACK_IMPORTED_MODULE_5__["default"]({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-title",
  avatarSelector: ".profile__avatar"
});
const profilePopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]("#edit-popup", (inputValues, button) => {
  profilePopup.renderLoading(true, "Saving...");
  api.editUserProfile(inputValues).then(inputValues => {
    userInfo.setUserInfo(inputValues);
    profilePopup.close();
  }).catch(res => {
    alert(res);
  }).finally(() => {
    profilePopup.renderLoading(false, "Saving...");
  });
});
const profilePicPopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"](".avatar-popup", (inputValues, button) => {
  profilePicPopup.renderLoading(true, "Saving...");
  api.editProfilePic(inputValues).then(inputValues => {
    userInfo.setUserAvatar(inputValues);
    profilePicPopup.close();
  }).catch(res => {
    alert(res);
  }).finally(() => {
    profilePicPopup.renderLoading(false, "Saving...");
  });
}); // validators

const addProfileFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"](_components_constants__WEBPACK_IMPORTED_MODULE_2__.settings, editProfileForm);
addProfileFormValidator.enableValidator();
const addPictureFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"](_components_constants__WEBPACK_IMPORTED_MODULE_2__.settings, addPictureForm);
addPictureFormValidator.enableValidator();
const editProfilePicFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"](_components_constants__WEBPACK_IMPORTED_MODULE_2__.settings, editProfilePicForm);
editProfilePicFormValidator.enableValidator();

function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  addPictureFormValidator.resetValidation();
  placePopup.open();
}

function handleOpenEditProfilePicForm() {
  profilePicInput.value = userInfo.getUserInfo().avatar;
  editProfilePicFormValidator.resetValidation();
  profilePicPopup.open();
}

addPictureIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editProfileIcon.addEventListener("mouseup", handleOpenProfileForm);
editProfilePicIcon.addEventListener("mouseup", handleOpenEditProfilePicForm);
let currentUserId = null;
api.initialize().then(_ref => {
  let [user, cards] = _ref;
  currentUserId = user._id;
  cardSection = new _components_Section__WEBPACK_IMPORTED_MODULE_4__["default"]({
    items: cards,
    renderer: renderCard
  }, _components_constants__WEBPACK_IMPORTED_MODULE_2__.cardsContainer);
  cardSection.renderItems();
  userInfo.setUserInfo(user);
}).catch(res => {
  alert(res);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxVQURILEdBRUdhLElBRkgsQ0FFUSxRQUFtQjtFQUFBLElBQWxCLENBQUMyRCxJQUFELEVBQU91SSxLQUFQLENBQWtCO0VBQ3ZCdkssYUFBYSxHQUFHZ0MsSUFBSSxDQUFDdkIsR0FBckI7RUFDQTRJLFdBQVcsR0FBRyxJQUFJM0MsMkRBQUosQ0FDWjtJQUNFRSxLQUFLLEVBQUUyRCxLQURUO0lBRUUxRCxRQUFRLEVBQUVzQztFQUZaLENBRFksRUFLWmxCLGlFQUxZLENBQWQ7RUFPQW9CLFdBQVcsQ0FBQ3BDLFdBQVo7RUFFQTJDLFFBQVEsQ0FBQy9CLFdBQVQsQ0FBcUI3RixJQUFyQjtBQUNELENBZEgsRUFlR2lILEtBZkgsQ0FlVTNLLEdBQUQsSUFBUztFQUNkNEssS0FBSyxDQUFDNUssR0FBRCxDQUFMO0FBQ0QsQ0FqQkgsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuICBpbml0aWFsaXplKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cbiAgX2hhbmRsZUZldGNoUmVzcG9uc2UocGF0aCwgbWV0aG9kVXNlZCA9IFwiR0VUXCIsIGJvZHlDb250ZW50ID0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kVXNlZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIpO1xuICB9XG4gIGVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGFib3V0OiBpbnB1dFZhbHVlcy5hYm91dCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBhZGROZXdDYXJkKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgbGluazogaW5wdXRWYWx1ZXMubGluayxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiLCBcIlBPU1RcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGdldENhcmRMaWtlSW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBkZWxldGVDYXJkKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cblxuICBhZGRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJQVVRcIik7XG4gIH1cbiAgcmVtb3ZlTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG4gIGVkaXRQcm9maWxlUGljKGF2YXRhckxpbmspIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGF2YXRhcjogYXZhdGFyTGluay5hdmF0YXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWUvYXZhdGFyXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG59XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApIHtcbiAgICB0aGlzLl9pbWFnZUxpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX3RleHQgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpa2VzID0gY2FyZERhdGEubGlrZXM7XG4gICAgdGhpcy5fY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgdGhpcy5fb3duZXJJZCA9IGNhcmREYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl9jYXJkSWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbiA9IGhhbmRsZVRyYXNoQnV0dG9uO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgfVxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgZ2V0Q2FyZElkKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkSWQ7XG4gIH1cbiAgdXBkYXRlTGlrZXMobGlrZXMpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG4gIH1cblxuICBfcmVuZGVyTGlrZXMoKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuICBfaXNMaWtlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlrZXMuc29tZSgodXNlcikgPT4ge1xuICAgICAgcmV0dXJuIHVzZXIuX2lkID09PSB0aGlzLl9jdXJyZW50VXNlcklkO1xuICAgIH0pO1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZV9hY3RpdmVcIikpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJyZW1vdmVcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcImFkZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl90cmFzaEJ1dHRvbikge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbih0aGlzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soZXZ0LnRhcmdldCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcbiAgfVxuICBjcmVhdGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gICAgdGhpcy5fbGlrZUNvdW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcbiAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fdGV4dDtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5faW1hZ2VMaW5rO1xuICAgIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX3RleHQ7XG5cbiAgICBpZiAodGhpcy5fb3duZXJJZCAhPT0gdGhpcy5fY3VycmVudFVzZXJJZCkge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcblxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWwpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWwpID0+ICFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIC8vIGNoYW5nZSB0ZWggaW5wdXQgc3R5bGUgdXBvbiBlcnJvclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIC8vIGVycm9yIG1lc3NhZ2UgY29udGVudFxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgLy8gYWNjZXNzIHRoZSBpbnB1dCBpZCB3aGljaCBpcyBzb21ldGhpbmcgbGlrZSBwb3B1cC1kZXNjcmlwdGlvblxuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIC8vIHRoZSBpZCBvZiB0aGUgc3BhbiBzbG90IGlzIHRoZSB0ZW1wbGF0ZSBsaXRlcmFsXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgLy8gcHJldmVudCBhbGwgZm9ybXMgZnJvbSByZWZyZXNoaW5nIHRoZSBwYWdlIHVwb24gc3VibWl0XG4gICAgdGhpcy5fZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBmb3IgYWxsIGZvcm1zLCB3ZSBuZWVkIHRvIHNldCBldmVudCBsaXN0ZW5lcnNcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UgPSB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSA9IHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIildO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIF9oYW5kbGVCdXR0b25DbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgX2hhbmRsZU92ZXJsYXlDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRocmVlIHdheXMgdG8gY2xvc2UgdGhlIHBvcHVwOlxuICAgIC8vIDEpIGhpdCBFU0Mga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICAvLyAyKSBtb3VzZXVwIG9uIHRoZSBjbG9zZSBidXR0b25cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgLy8gMykgbW91c2V1cCBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fc2F2ZS1idXR0b25cIik7XG4gICAgdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0ID0gdGhpcy5fYnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0U3VibWl0KGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICAvL3dhaXQgdG8gYmUgcGFzc2VkIGluIGluIGluZGV4LmpzXG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuICAvLyBjcmVhdGUgYW5kIHJldHVybiBhbiBvYmplY3QgZnJvbSBhbGwgdGhlIGlucHV0IGJveGVzJyBhbnN3ZXJzXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBfaGFuZGxlU3VibWl0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB0aGlzLl9nZXRJbnB1dFZhbHVlcygpO1xuICAgIC8vd2FpdCB0byBiZSBwYXNzZWQgaW4gaW4gaW5kZXguanNcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzLCB0aGlzLl9idXR0b24pO1xuICB9O1xuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm1FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBvcGVuKGltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VFbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgaW1hZ2VFbC5zcmMgPSBpbWFnZS5zcmM7XG4gICAgaW1hZ2VFbC5hbHQgPSBpbWFnZS5hbHQ7XG4gICAgY29uc3QgY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBjYXB0aW9uLnRleHRDb250ZW50ID0gaW1hZ2UuYWx0O1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgfVxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkuZm9yRWFjaCgoYXJyRWwpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGFyckVsKTtcbiAgICB9KTtcbiAgfVxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gICAgdGhpcy5fYXZhdGFyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXZhdGFyU2VsZWN0b3IpO1xuICB9XG4gIC8vIHRvIHBvcHVsYXRlIGZvcm0gZmllbGRzIGFmdGVyIHBvcHVwIG9wZW5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhdmF0YXI6IHRoaXMuX2F2YXRhclNsb3Quc3JjLFxuICAgIH07XG4gIH1cbiAgLy8gdXBvbiBmb3JtIHN1Ym1pc3Npb25cbiAgc2V0VXNlckluZm8oZGF0YSkge1xuICAgIHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuICAgIHRoaXMuX2F2YXRhclNsb3QuYWx0ID0gYCR7ZGF0YS5uYW1lfWA7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxuICBzZXRVc2VyQXZhdGFyKGRhdGEpIHtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX3NhdmUtYnV0dG9uX2Rpc2FibGVkXCIsXG4gIC8vIGlucHV0IGxpbmUgZXJyb3Igc3R5bGVcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19pbnB1dC10eXBlX2Vycm9yXCIsXG4gIC8vIGVycm9yIG1lc3NhZ2UgY2xhc3NcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbmV4cG9ydCBjb25zdCBjYXJkc0NvbnRhaW5lciA9IFwiLnBob3RvLWdyaWRfX2NhcmRzXCI7XG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuLy8gLy9JbXBvcnQgY2xhc3Nlc1xuXG4vLyAvLyBCdXR0b25zIGFuZCBvdGhlciBET00gZWxlbWVudHNcblxuLy8gY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuLy8gY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbi8vIGNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbi8vIGNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XG4vLyBjb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbi8vIGNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4vLyBjb25zdCBlZGl0QXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1wb3B1cFwiKTtcbi8vIGNvbnN0IGVkaXRBdmF0YXJGb3JtID0gZWRpdEF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4vLyBjb25zdCBlZGl0QXZhdGFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hdmF0YXItYnV0dG9uXCIpO1xuLy8gY29uc3QgYXZhdGFySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5cbi8vIC8vIEZvcm0gZGF0YVxuLy8gY29uc3QgbmFtZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG4vLyBjb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpO1xuLy8gY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpO1xuLy8gY29uc3QgdGl0bGVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XG4vLyBjb25zdCBpbWFnZU5hbWVJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGxhY2UtbmFtZVwiXScpO1xuLy8gY29uc3QgaW1hZ2VMaW5rSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImxpbmtcIl0nKTtcblxuLy8gLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy8gLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vLyAvL0dyb3VwIElEOiBncm91cC0xMlxuXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQge1xuICBjYXJkc0NvbnRhaW5lcixcbiAgY2FyZFNlbGVjdG9yLFxuICBzZXR0aW5ncyxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcblxuLy8gcHJvZmlsZSBpY29uc1xuY29uc3QgZWRpdFByb2ZpbGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbmZvLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgYWRkUGljdHVyZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIik7XG4vLyBhdXRob3IsIGFkZCBwaWN0dXJlIGZvcm1zXG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBhZGRQaWN0dXJlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF2YXRhci1wb3B1cFwiKTtcbi8vIGZvcm0gZmllbGRzIGZvciB0aGUgYXV0aG9yIGZvcm0gYW5kIHRoZSBhZGQgcGljdHVyZSBmb3JtXG5jb25zdCBmb3JtRmllbGRBdXRob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuY29uc3QgZm9ybUZpZWxkUGljdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBsYWNlLWZvcm1cIik7XG4vLyBpbnB1dCBmaWVsZHMgZm9yIHByb2ZpbGUgZm9ybSBwb3B1cFxuY29uc3QgaW5wdXRQcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGVcIik7XG4vLyBwcm9maWxlIHNlY3Rpb24gb24gdGhlIHBhZ2VcbmNvbnN0IHByb2ZpbGVQaWNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXVybFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faWNvblwiKTtcblxuLy8gaW5zdGFudGlhdGUgQVBJIGNsYXNzXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbi8vIGhhbmRsZSBMaWtlIENsaWNrIGZ1bmN0aW9uIHBhc3NlZCBpbiBhcyBjYWxsYmFjayB0byBDYXJkLmpzXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2xpY2soY2FyZElkLCBhY3Rpb24sIGNhcmQpIHtcbiAgaWYgKGFjdGlvbiA9PT0gXCJyZW1vdmVcIikge1xuICAgIGFwaVxuICAgICAgLnJlbW92ZUxpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGFwaVxuICAgICAgLmFkZExpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vIGFkZCBwaWN0dXJlIGZvcm0gZnVuY3Rpb25zXG5mdW5jdGlvbiByZW5kZXJDYXJkKGlucHV0VmFsdWVzKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBpbnB1dFZhbHVlcyxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICk7XG4gIGNvbnN0IGNhcmRFbCA9IGNhcmQuY3JlYXRlQ2FyZCgpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbCk7XG59XG5cbi8vIGFkZCBwaWN0dXJlIGZvcm0gc3VibWl0XG5jb25zdCBwbGFjZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIuY3JlYXRlLXBvcHVwXCIsIChpbnB1dFZhbHVlcykgPT4ge1xuICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5hZGROZXdDYXJkKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChpbnB1dFZhbHVlcyk7XG4gICAgICBwbGFjZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgaW1hZ2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuZnVuY3Rpb24gaGFuZGxlQ2FyZENsaWNrKGltYWdlKSB7XG4gIGltYWdlUG9wdXAub3BlbihpbWFnZSk7XG59XG5cbmNvbnN0IGRlbGV0ZUNhcmRDb25maXJtYXRpb24gPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcIi5kZWxldGUtcG9wdXBcIik7XG5cbi8vIHRvIGludGVyYWN0IHdpdGggdGhlIENhcmQgY2xhc3MsIG9wZW4gcG9wdXAsIHRoZW4gd2FpdCBmb3IgZGVsZXRlIHRvIGNvbXBsZXRlXG5mdW5jdGlvbiBoYW5kbGVUcmFzaEJ1dHRvbihjYXJkKSB7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uc2V0U3VibWl0KCgpID0+IHtcbiAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkLmdldENhcmRJZCgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJkLmRlbGV0ZUNhcmQoKTtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0pO1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLm9wZW4oKTtcbn1cblxuLy8gaW5pdGlhbGl6ZSBjYXJkIFNlY3Rpb24gY2xhc3MgdmFyaWFibGUgdG8gdGFrZSBhcGkgY2FsbCByZXN1bHQgYW5kIGludGVyYWN0IHdpdGggU2VjdGlvbi5qc1xubGV0IGNhcmRTZWN0aW9uID0gbnVsbDtcblxuLy8gcHJvZmlsZSBmb3JtIGZ1bmN0aW9uc1xuZnVuY3Rpb24gZmlsbFByb2ZpbGVGb3JtKCkge1xuICBjb25zdCByZXN1bHQgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBpbnB1dFByb2ZpbGVOYW1lLnZhbHVlID0gcmVzdWx0Lm5hbWU7XG4gIGlucHV0UHJvZmlsZVRpdGxlLnZhbHVlID0gcmVzdWx0LmFib3V0O1xufVxuZnVuY3Rpb24gaGFuZGxlT3BlblByb2ZpbGVGb3JtKCkge1xuICBmb3JtRmllbGRBdXRob3IucmVzZXQoKTtcbiAgZmlsbFByb2ZpbGVGb3JtKCk7XG4gIGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUG9wdXAub3BlbigpO1xufVxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBuYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICBqb2JTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby10aXRsZVwiLFxuICBhdmF0YXJTZWxlY3RvcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcbmNvbnN0IHByb2ZpbGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbnB1dFZhbHVlcyk7XG4gICAgICBwcm9maWxlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IHByb2ZpbGVQaWNQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIi5hdmF0YXItcG9wdXBcIixcbiAgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5lZGl0UHJvZmlsZVBpYyhpbnB1dFZhbHVlcylcbiAgICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VyQXZhdGFyKGlucHV0VmFsdWVzKTtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG4vLyB2YWxpZGF0b3JzXG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBlZGl0UHJvZmlsZUZvcm0pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBhZGRQaWN0dXJlRm9ybSk7XG5hZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBzZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVQaWNGb3JtXG4pO1xuZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5mdW5jdGlvbiBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0oKSB7XG4gIGZvcm1GaWVsZFBpY3R1cmUucmVzZXQoKTtcblxuICBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcGxhY2VQb3B1cC5vcGVuKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0oKSB7XG4gIHByb2ZpbGVQaWNJbnB1dC52YWx1ZSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCkuYXZhdGFyO1xuICBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQaWNQb3B1cC5vcGVuKCk7XG59XG5hZGRQaWN0dXJlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0pO1xuZWRpdFByb2ZpbGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSk7XG5lZGl0UHJvZmlsZVBpY0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSk7XG5cbmxldCBjdXJyZW50VXNlcklkID0gbnVsbDtcbmFwaVxuICAuaW5pdGlhbGl6ZSgpXG4gIC50aGVuKChbdXNlciwgY2FyZHNdKSA9PiB7XG4gICAgY3VycmVudFVzZXJJZCA9IHVzZXIuX2lkO1xuICAgIGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGl0ZW1zOiBjYXJkcyxcbiAgICAgICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXG4gICAgICB9LFxuICAgICAgY2FyZHNDb250YWluZXJcbiAgICApO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XG5cbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyKTtcbiAgfSlcbiAgLmNhdGNoKChyZXMpID0+IHtcbiAgICBhbGVydChyZXMpO1xuICB9KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImluaXRpYWxpemUiLCJQcm9taXNlIiwiYWxsIiwiZ2V0VXNlckluZm8iLCJnZXRJbml0aWFsQ2FyZHMiLCJfaGFuZGxlRmV0Y2hSZXNwb25zZSIsInBhdGgiLCJtZXRob2RVc2VkIiwiYm9keUNvbnRlbnQiLCJ1bmRlZmluZWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwiZWRpdFVzZXJQcm9maWxlIiwiaW5wdXRWYWx1ZXMiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZSIsImFib3V0IiwiYWRkTmV3Q2FyZCIsImxpbmsiLCJnZXRDYXJkTGlrZUluZm8iLCJkZWxldGVDYXJkIiwiY2FyZElkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJlZGl0UHJvZmlsZVBpYyIsImF2YXRhckxpbmsiLCJhdmF0YXIiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVUcmFzaEJ1dHRvbiIsImN1cnJlbnRVc2VySWQiLCJoYW5kbGVMaWtlQ2xpY2siLCJfaW1hZ2VMaW5rIiwiX3RleHQiLCJfbGlrZXMiLCJsaWtlcyIsIl9jdXJyZW50VXNlcklkIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl9jYXJkSWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVUcmFzaEJ1dHRvbiIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiZ2V0Q2FyZElkIiwidXBkYXRlTGlrZXMiLCJfcmVuZGVyTGlrZXMiLCJfbGlrZUNvdW50IiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJfaXNMaWtlZCIsIl9oZWFydEJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNvbWUiLCJ1c2VyIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5zIiwiX3RyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZSIsImV2dCIsInRhcmdldCIsIl9jYXJkRWxlbWVudCIsImNyZWF0ZUNhcmQiLCJjYXJkVGl0bGUiLCJhbHQiLCJzcmMiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWwiLCJpbnB1dExpc3QiLCJpbnB1dEVsIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zZXR0aW5ncyIsIl9mb3JtRWwiLCJidXR0b25FbGVtZW50IiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZWQiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvck1lc3NhZ2UiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImlucHV0SWQiLCJpZCIsImVycm9yRWwiLCJlcnJvckNsYXNzIiwiZW5hYmxlVmFsaWRhdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwiX3BvcHVwIiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIl9oYW5kbGVCdXR0b25DbG9zZSIsIl9oYW5kbGVPdmVybGF5Q2xvc2UiLCJfY2xvc2VCdXR0b24iLCJfZm9ybUxpc3QiLCJrZXkiLCJjbG9zZSIsIm9wZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9idXR0b24iLCJfYnV0dG9uT3JpZ2luYWxUZXh0Iiwic2V0U3VibWl0IiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImJ1dHRvblRleHQiLCJQb3B1cFdpdGhGb3JtIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRDb250ZW50IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0Q2xpY2siLCJQb3B1cFdpdGhJbWFnZSIsImltYWdlIiwiaW1hZ2VFbCIsImNhcHRpb24iLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2luaXRpYWxBcnJheSIsIl9jb250YWluZXIiLCJfcmVuZGVyZXIiLCJyZW5kZXJJdGVtcyIsImFyckVsIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsImF2YXRhclNlbGVjdG9yIiwiX25hbWVTbG90IiwiX2pvYlNsb3QiLCJfYXZhdGFyU2xvdCIsInNldFVzZXJJbmZvIiwiZGF0YSIsInNldFVzZXJBdmF0YXIiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsInJlc2V0IiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlUG9wdXAiLCJidXR0b24iLCJwcm9maWxlUGljUG9wdXAiLCJhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciIsImVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciIsImhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSIsImhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0iLCJjYXJkcyJdLCJzb3VyY2VSb290IjoiIn0=