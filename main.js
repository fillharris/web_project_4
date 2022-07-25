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
;

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
;

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
;

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
;

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
;

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
;

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

const editProfileIcon = document.querySelector(".profile__edit-button");
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


const placePopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"](".popup_picture", inputValues => {
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
const imagePopup = new _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_7__["default"]("#picture-popup");

function handleCardClick(image) {
  imagePopup.open(image);
}

const deleteCardConfirmation = new _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__["default"](".popup_delete"); // to interact with the Card class, open popup, then wait for delete to complete

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
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
  avatarSelector: ".profile__pic"
});
const profilePopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]("#popup", (inputValues, button) => {
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
const profilePicPopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"](".popup_profile-pic", (inputValues, button) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUl0SyxhQUFhLEdBQUcsSUFBcEI7QUFDQTZJLEdBQUcsQ0FDQXJMLFVBREgsR0FFR2EsSUFGSCxDQUVRLFFBQW1CO0VBQUEsSUFBbEIsQ0FBQzJELElBQUQsRUFBT3VJLEtBQVAsQ0FBa0I7RUFDdkJ2SyxhQUFhLEdBQUdnQyxJQUFJLENBQUN2QixHQUFyQjtFQUNBNEksV0FBVyxHQUFHLElBQUkzQywyREFBSixDQUNaO0lBQ0VFLEtBQUssRUFBRTJELEtBRFQ7SUFFRTFELFFBQVEsRUFBRXNDO0VBRlosQ0FEWSxFQUtabEIsaUVBTFksQ0FBZDtFQU9Bb0IsV0FBVyxDQUFDcEMsV0FBWjtFQUVBMkMsUUFBUSxDQUFDL0IsV0FBVCxDQUFxQjdGLElBQXJCO0FBQ0QsQ0FkSCxFQWVHaUgsS0FmSCxDQWVVM0ssR0FBRCxJQUFTO0VBQ2Q0SyxLQUFLLENBQUM1SyxHQUFELENBQUw7QUFDRCxDQWpCSCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuICBpbml0aWFsaXplKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cbiAgX2hhbmRsZUZldGNoUmVzcG9uc2UocGF0aCwgbWV0aG9kVXNlZCA9IFwiR0VUXCIsIGJvZHlDb250ZW50ID0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kVXNlZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIpO1xuICB9XG4gIGVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGFib3V0OiBpbnB1dFZhbHVlcy5hYm91dCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBhZGROZXdDYXJkKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgbGluazogaW5wdXRWYWx1ZXMubGluayxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiLCBcIlBPU1RcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGdldENhcmRMaWtlSW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBkZWxldGVDYXJkKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cblxuICBhZGRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJQVVRcIik7XG4gIH1cbiAgcmVtb3ZlTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG4gIGVkaXRQcm9maWxlUGljKGF2YXRhckxpbmspIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGF2YXRhcjogYXZhdGFyTGluay5hdmF0YXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWUvYXZhdGFyXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG59O1xuIiwiY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcmREYXRhLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlVHJhc2hCdXR0b24sXG4gICAgY3VycmVudFVzZXJJZCxcbiAgICBoYW5kbGVMaWtlQ2xpY2tcbiAgKSB7XG4gICAgdGhpcy5faW1hZ2VMaW5rID0gY2FyZERhdGEubGluaztcbiAgICB0aGlzLl90ZXh0ID0gY2FyZERhdGEubmFtZTtcbiAgICB0aGlzLl9saWtlcyA9IGNhcmREYXRhLmxpa2VzO1xuICAgIHRoaXMuX2N1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xuICAgIHRoaXMuX293bmVySWQgPSBjYXJkRGF0YS5vd25lci5faWQ7XG4gICAgdGhpcy5fY2FyZElkID0gY2FyZERhdGEuX2lkO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlVHJhc2hCdXR0b24gPSBoYW5kbGVUcmFzaEJ1dHRvbjtcbiAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sgPSBoYW5kbGVMaWtlQ2xpY2s7XG4gIH1cbiAgX2dldFRlbXBsYXRlKCkge1xuICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIGdldENhcmRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZElkO1xuICB9XG4gIHVwZGF0ZUxpa2VzKGxpa2VzKSB7XG4gICAgdGhpcy5fbGlrZXMgPSBsaWtlcztcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuICB9XG5cbiAgX3JlbmRlckxpa2VzKCkge1xuICAgIHRoaXMuX2xpa2VDb3VudC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faXNMaWtlZCgpKSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cbiAgX2lzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpa2VzLnNvbWUoKHVzZXIpID0+IHtcbiAgICAgIHJldHVybiB1c2VyLl9pZCA9PT0gdGhpcy5fY3VycmVudFVzZXJJZDtcbiAgICB9KTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5faGVhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2VfYWN0aXZlXCIpKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwicmVtb3ZlXCIsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJhZGRcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fdHJhc2hCdXR0b24pIHtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlVHJhc2hCdXR0b24odGhpcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKGV2dC50YXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cbiAgY3JlYXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICBjb25zdCBjYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xuICAgIHRoaXMuX2xpa2VDb3VudCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZXNcIik7XG4gICAgdGhpcy5fdHJhc2hCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5faGVhcnRCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX3RleHQ7XG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2ltYWdlTGluaztcbiAgICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLl90ZXh0O1xuXG4gICAgaWYgKHRoaXMuX293bmVySWQgIT09IHRoaXMuX2N1cnJlbnRVc2VySWQpIHtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyZDs7XG4iLCJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBfaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT5cbiAgICBpbnB1dExpc3Quc29tZSgoaW5wdXRFbCkgPT4gIWlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgLy8gY2hhbmdlIHRlaCBpbnB1dCBzdHlsZSB1cG9uIGVycm9yXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgLy8gZXJyb3IgbWVzc2FnZSBjb250ZW50XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICAvLyBhY2Nlc3MgdGhlIGlucHV0IGlkIHdoaWNoIGlzIHNvbWV0aGluZyBsaWtlIHBvcHVwLWRlc2NyaXB0aW9uXG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgLy8gdGhlIGlkIG9mIHRoZSBzcGFuIHNsb3QgaXMgdGhlIHRlbXBsYXRlIGxpdGVyYWxcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRvcigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICAvLyBwcmV2ZW50IGFsbCBmb3JtcyBmcm9tIHJlZnJlc2hpbmcgdGhlIHBhZ2UgdXBvbiBzdWJtaXRcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGZvciBhbGwgZm9ybXMsIHdlIG5lZWQgdG8gc2V0IGV2ZW50IGxpc3RlbmVyc1xuICAgIH0pO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UgPSB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSA9IHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIildO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIF9oYW5kbGVCdXR0b25DbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgX2hhbmRsZU92ZXJsYXlDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRocmVlIHdheXMgdG8gY2xvc2UgdGhlIHBvcHVwOlxuICAgIC8vIDEpIGhpdCBFU0Mga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICAvLyAyKSBtb3VzZXVwIG9uIHRoZSBjbG9zZSBidXR0b25cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgLy8gMykgbW91c2V1cCBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cbn0iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldFN1Ym1pdChoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgLy93YWl0IHRvIGJlIHBhc3NlZCBpbiBpbiBpbmRleC5qc1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG4iLCJcblxuaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuICAvLyBjcmVhdGUgYW5kIHJldHVybiBhbiBvYmplY3QgZnJvbSBhbGwgdGhlIGlucHV0IGJveGVzJyBhbnN3ZXJzXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBfaGFuZGxlU3VibWl0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB0aGlzLl9nZXRJbnB1dFZhbHVlcygpO1xuICAgIC8vd2FpdCB0byBiZSBwYXNzZWQgaW4gaW4gaW5kZXguanNcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzLCB0aGlzLl9idXR0b24pO1xuICB9O1xuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm1FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBvcGVuKGltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VFbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgaW1hZ2VFbC5zcmMgPSBpbWFnZS5zcmM7XG4gICAgaW1hZ2VFbC5hbHQgPSBpbWFnZS5hbHQ7XG4gICAgY29uc3QgY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBjYXB0aW9uLnRleHRDb250ZW50ID0gaW1hZ2UuYWx0O1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gIH1cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5LmZvckVhY2goKGFyckVsKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihhcnJFbCk7XG4gICAgfSk7XG4gIH1cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgbmFtZVNlbGVjdG9yLCBqb2JTZWxlY3RvciwgYXZhdGFyU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX25hbWVTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xuICAgIHRoaXMuX2pvYlNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcbiAgICB0aGlzLl9hdmF0YXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXJTZWxlY3Rvcik7XG4gIH1cbiAgLy8gdG8gcG9wdWxhdGUgZm9ybSBmaWVsZHMgYWZ0ZXIgcG9wdXAgb3BlblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCxcbiAgICAgIGF2YXRhcjogdGhpcy5fYXZhdGFyU2xvdC5zcmMsXG4gICAgfTtcbiAgfVxuICAvLyB1cG9uIGZvcm0gc3VibWlzc2lvblxuICBzZXRVc2VySW5mbyhkYXRhKSB7XG4gICAgdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5hbHQgPSBgJHtkYXRhLm5hbWV9YDtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG4gIHNldFVzZXJBdmF0YXIoZGF0YSkge1xuICAgIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbn07XG4iLCJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX3NhdmUtYnV0dG9uX2Rpc2FibGVkXCIsXG4gIC8vIGlucHV0IGxpbmUgZXJyb3Igc3R5bGVcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19pbnB1dC10eXBlX2Vycm9yXCIsXG4gIC8vIGVycm9yIG1lc3NhZ2UgY2xhc3NcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbmV4cG9ydCBjb25zdCBjYXJkc0NvbnRhaW5lciA9IFwiLnBob3RvLWdyaWRfX2NhcmRzXCI7XG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vLyAvL0ltcG9ydCBjbGFzc2VzXG5cblxuLy8gLy8gQnV0dG9ucyBhbmQgb3RoZXIgRE9NIGVsZW1lbnRzXG5cbi8vIGNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcbi8vIGNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG4vLyBjb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4vLyBjb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuLy8gY29uc3QgYWRkQ2FyZFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG4vLyBjb25zdCBhZGRDYXJkRm9ybSA9IGFkZENhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuLy8gY29uc3QgZWRpdEF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItcG9wdXBcIik7XG4vLyBjb25zdCBlZGl0QXZhdGFyRm9ybSA9IGVkaXRBdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuLy8gY29uc3QgZWRpdEF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYXZhdGFyLWJ1dHRvblwiKTtcbi8vIGNvbnN0IGF2YXRhckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpO1xuXG4vLyAvLyBGb3JtIGRhdGFcbi8vIGNvbnN0IG5hbWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuLy8gY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcbi8vIGNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVcIl0nKTtcbi8vIGNvbnN0IHRpdGxlSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJkZXNjcmlwdGlvblwiXScpO1xuLy8gY29uc3QgaW1hZ2VOYW1lSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInBsYWNlLW5hbWVcIl0nKTtcbi8vIGNvbnN0IGltYWdlTGlua0lucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsaW5rXCJdJyk7XG5cblxuLy8gLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy8gLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vLyAvL0dyb3VwIElEOiBncm91cC0xMlxuXG5cblxuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IHsgY2FyZHNDb250YWluZXIsIGNhcmRTZWxlY3Rvciwgc2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHNcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuXG4vLyBwcm9maWxlIGljb25zXG5jb25zdCBlZGl0UHJvZmlsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgYWRkUGljdHVyZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIik7XG4vLyBhdXRob3IsIGFkZCBwaWN0dXJlIGZvcm1zXG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBhZGRQaWN0dXJlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF2YXRhci1wb3B1cFwiKTtcbi8vIGZvcm0gZmllbGRzIGZvciB0aGUgYXV0aG9yIGZvcm0gYW5kIHRoZSBhZGQgcGljdHVyZSBmb3JtXG5jb25zdCBmb3JtRmllbGRBdXRob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuY29uc3QgZm9ybUZpZWxkUGljdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBsYWNlLWZvcm1cIik7XG4vLyBpbnB1dCBmaWVsZHMgZm9yIHByb2ZpbGUgZm9ybSBwb3B1cFxuY29uc3QgaW5wdXRQcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGVcIik7XG4vLyBwcm9maWxlIHNlY3Rpb24gb24gdGhlIHBhZ2VcbmNvbnN0IHByb2ZpbGVQaWNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXVybFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faWNvblwiKTtcblxuLy8gaW5zdGFudGlhdGUgQVBJIGNsYXNzXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbi8vIGhhbmRsZSBMaWtlIENsaWNrIGZ1bmN0aW9uIHBhc3NlZCBpbiBhcyBjYWxsYmFjayB0byBDYXJkLmpzXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2xpY2soY2FyZElkLCBhY3Rpb24sIGNhcmQpIHtcbiAgaWYgKGFjdGlvbiA9PT0gXCJyZW1vdmVcIikge1xuICAgIGFwaVxuICAgICAgLnJlbW92ZUxpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGFwaVxuICAgICAgLmFkZExpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vIGFkZCBwaWN0dXJlIGZvcm0gZnVuY3Rpb25zXG5mdW5jdGlvbiByZW5kZXJDYXJkKGlucHV0VmFsdWVzKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBpbnB1dFZhbHVlcyxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICk7XG4gIGNvbnN0IGNhcmRFbCA9IGNhcmQuY3JlYXRlQ2FyZCgpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbCk7XG59XG5cbi8vIGFkZCBwaWN0dXJlIGZvcm0gc3VibWl0XG5jb25zdCBwbGFjZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIucG9wdXBfcGljdHVyZVwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuYWRkTmV3Q2FyZChpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpO1xuICAgICAgcGxhY2VQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcGljdHVyZS1wb3B1cFwiKTtcbmZ1bmN0aW9uIGhhbmRsZUNhcmRDbGljayhpbWFnZSkge1xuICBpbWFnZVBvcHVwLm9wZW4oaW1hZ2UpO1xufVxuXG5jb25zdCBkZWxldGVDYXJkQ29uZmlybWF0aW9uID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXCIucG9wdXBfZGVsZXRlXCIpO1xuXG4vLyB0byBpbnRlcmFjdCB3aXRoIHRoZSBDYXJkIGNsYXNzLCBvcGVuIHBvcHVwLCB0aGVuIHdhaXQgZm9yIGRlbGV0ZSB0byBjb21wbGV0ZVxuZnVuY3Rpb24gaGFuZGxlVHJhc2hCdXR0b24oY2FyZCkge1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnNldFN1Ym1pdCgoKSA9PiB7XG4gICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZC5nZXRDYXJkSWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZC5kZWxldGVDYXJkKCk7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5vcGVuKCk7XG59XG5cbi8vIGluaXRpYWxpemUgY2FyZCBTZWN0aW9uIGNsYXNzIHZhcmlhYmxlIHRvIHRha2UgYXBpIGNhbGwgcmVzdWx0IGFuZCBpbnRlcmFjdCB3aXRoIFNlY3Rpb24uanNcbmxldCBjYXJkU2VjdGlvbiA9IG51bGw7XG5cbi8vIHByb2ZpbGUgZm9ybSBmdW5jdGlvbnNcbmZ1bmN0aW9uIGZpbGxQcm9maWxlRm9ybSgpIHtcbiAgY29uc3QgcmVzdWx0ID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgaW5wdXRQcm9maWxlTmFtZS52YWx1ZSA9IHJlc3VsdC5uYW1lO1xuICBpbnB1dFByb2ZpbGVUaXRsZS52YWx1ZSA9IHJlc3VsdC5hYm91dDtcbn1cbmZ1bmN0aW9uIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSgpIHtcbiAgZm9ybUZpZWxkQXV0aG9yLnJlc2V0KCk7XG4gIGZpbGxQcm9maWxlRm9ybSgpO1xuICBhZGRQcm9maWxlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcbn1cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX19uYW1lXCIsXG4gIGpvYlNlbGVjdG9yOiBcIi5wcm9maWxlX190aXRsZVwiLFxuICBhdmF0YXJTZWxlY3RvcjogXCIucHJvZmlsZV9fcGljXCIsXG59KTtcbmNvbnN0IHByb2ZpbGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3BvcHVwXCIsIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xuICAgICAgcHJvZmlsZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBwcm9maWxlUGljUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIucG9wdXBfcHJvZmlsZS1waWNcIixcbiAgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5lZGl0UHJvZmlsZVBpYyhpbnB1dFZhbHVlcylcbiAgICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VyQXZhdGFyKGlucHV0VmFsdWVzKTtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG4vLyB2YWxpZGF0b3JzXG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBlZGl0UHJvZmlsZUZvcm0pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBhZGRQaWN0dXJlRm9ybSk7XG5hZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBzZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVQaWNGb3JtXG4pO1xuZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5mdW5jdGlvbiBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0oKSB7XG4gIGZvcm1GaWVsZFBpY3R1cmUucmVzZXQoKTtcblxuICBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcGxhY2VQb3B1cC5vcGVuKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0oKSB7XG4gIHByb2ZpbGVQaWNJbnB1dC52YWx1ZSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCkuYXZhdGFyO1xuICBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQaWNQb3B1cC5vcGVuKCk7XG59XG5hZGRQaWN0dXJlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0pO1xuZWRpdFByb2ZpbGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSk7XG5lZGl0UHJvZmlsZVBpY0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSk7XG5cbmxldCBjdXJyZW50VXNlcklkID0gbnVsbDtcbmFwaVxuICAuaW5pdGlhbGl6ZSgpXG4gIC50aGVuKChbdXNlciwgY2FyZHNdKSA9PiB7XG4gICAgY3VycmVudFVzZXJJZCA9IHVzZXIuX2lkO1xuICAgIGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGl0ZW1zOiBjYXJkcyxcbiAgICAgICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXG4gICAgICB9LFxuICAgICAgY2FyZHNDb250YWluZXJcbiAgICApO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XG5cbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyKTtcbiAgfSlcbiAgLmNhdGNoKChyZXMpID0+IHtcbiAgICBhbGVydChyZXMpO1xuICB9KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImluaXRpYWxpemUiLCJQcm9taXNlIiwiYWxsIiwiZ2V0VXNlckluZm8iLCJnZXRJbml0aWFsQ2FyZHMiLCJfaGFuZGxlRmV0Y2hSZXNwb25zZSIsInBhdGgiLCJtZXRob2RVc2VkIiwiYm9keUNvbnRlbnQiLCJ1bmRlZmluZWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwiZWRpdFVzZXJQcm9maWxlIiwiaW5wdXRWYWx1ZXMiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZSIsImFib3V0IiwiYWRkTmV3Q2FyZCIsImxpbmsiLCJnZXRDYXJkTGlrZUluZm8iLCJkZWxldGVDYXJkIiwiY2FyZElkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJlZGl0UHJvZmlsZVBpYyIsImF2YXRhckxpbmsiLCJhdmF0YXIiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVUcmFzaEJ1dHRvbiIsImN1cnJlbnRVc2VySWQiLCJoYW5kbGVMaWtlQ2xpY2siLCJfaW1hZ2VMaW5rIiwiX3RleHQiLCJfbGlrZXMiLCJsaWtlcyIsIl9jdXJyZW50VXNlcklkIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl9jYXJkSWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVUcmFzaEJ1dHRvbiIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiZ2V0Q2FyZElkIiwidXBkYXRlTGlrZXMiLCJfcmVuZGVyTGlrZXMiLCJfbGlrZUNvdW50IiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJfaXNMaWtlZCIsIl9oZWFydEJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNvbWUiLCJ1c2VyIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5zIiwiX3RyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZSIsImV2dCIsInRhcmdldCIsIl9jYXJkRWxlbWVudCIsImNyZWF0ZUNhcmQiLCJjYXJkVGl0bGUiLCJhbHQiLCJzcmMiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWwiLCJpbnB1dExpc3QiLCJpbnB1dEVsIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zZXR0aW5ncyIsIl9mb3JtRWwiLCJidXR0b25FbGVtZW50IiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZWQiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvck1lc3NhZ2UiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImlucHV0SWQiLCJpZCIsImVycm9yRWwiLCJlcnJvckNsYXNzIiwiZW5hYmxlVmFsaWRhdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwiX3BvcHVwIiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIl9oYW5kbGVCdXR0b25DbG9zZSIsIl9oYW5kbGVPdmVybGF5Q2xvc2UiLCJfY2xvc2VCdXR0b24iLCJfZm9ybUxpc3QiLCJrZXkiLCJjbG9zZSIsIm9wZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9idXR0b24iLCJfYnV0dG9uT3JpZ2luYWxUZXh0Iiwic2V0U3VibWl0IiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImJ1dHRvblRleHQiLCJQb3B1cFdpdGhGb3JtIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRDb250ZW50IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0Q2xpY2siLCJQb3B1cFdpdGhJbWFnZSIsImltYWdlIiwiaW1hZ2VFbCIsImNhcHRpb24iLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2luaXRpYWxBcnJheSIsIl9jb250YWluZXIiLCJfcmVuZGVyZXIiLCJyZW5kZXJJdGVtcyIsImFyckVsIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsImF2YXRhclNlbGVjdG9yIiwiX25hbWVTbG90IiwiX2pvYlNsb3QiLCJfYXZhdGFyU2xvdCIsInNldFVzZXJJbmZvIiwiZGF0YSIsInNldFVzZXJBdmF0YXIiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsInJlc2V0IiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlUG9wdXAiLCJidXR0b24iLCJwcm9maWxlUGljUG9wdXAiLCJhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciIsImVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciIsImhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSIsImhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0iLCJjYXJkcyJdLCJzb3VyY2VSb290IjoiIn0=