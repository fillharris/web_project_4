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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJdEssYUFBYSxHQUFHLElBQXBCO0FBQ0E2SSxHQUFHLENBQ0FyTCxVQURILEdBRUdhLElBRkgsQ0FFUSxRQUFtQjtFQUFBLElBQWxCLENBQUMyRCxJQUFELEVBQU91SSxLQUFQLENBQWtCO0VBQ3ZCdkssYUFBYSxHQUFHZ0MsSUFBSSxDQUFDdkIsR0FBckI7RUFDQTRJLFdBQVcsR0FBRyxJQUFJM0MsMkRBQUosQ0FDWjtJQUNFRSxLQUFLLEVBQUUyRCxLQURUO0lBRUUxRCxRQUFRLEVBQUVzQztFQUZaLENBRFksRUFLWmxCLGlFQUxZLENBQWQ7RUFPQW9CLFdBQVcsQ0FBQ3BDLFdBQVo7RUFFQTJDLFFBQVEsQ0FBQy9CLFdBQVQsQ0FBcUI3RixJQUFyQjtBQUNELENBZEgsRUFlR2lILEtBZkgsQ0FlVTNLLEdBQUQsSUFBUztFQUNkNEssS0FBSyxDQUFDNUssR0FBRCxDQUFMO0FBQ0QsQ0FqQkgsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0VXNlckluZm8oKSwgdGhpcy5nZXRJbml0aWFsQ2FyZHMoKV0pO1xuICB9XG4gIF9oYW5kbGVGZXRjaFJlc3BvbnNlKHBhdGgsIG1ldGhvZFVzZWQgPSBcIkdFVFwiLCBib2R5Q29udGVudCA9IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfSR7cGF0aH1gLCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZFVzZWQsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogYm9keUNvbnRlbnQsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiKTtcbiAgfVxuICBlZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBhYm91dDogaW5wdXRWYWx1ZXMuYWJvdXQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgYWRkTmV3Q2FyZChpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGxpbms6IGlucHV0VmFsdWVzLmxpbmssXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIiwgXCJQT1NUXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBnZXRDYXJkTGlrZUluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZGVsZXRlQ2FyZChjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG5cbiAgYWRkTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiUFVUXCIpO1xuICB9XG4gIHJlbW92ZUxpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuICBlZGl0UHJvZmlsZVBpYyhhdmF0YXJMaW5rKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBhdmF0YXI6IGF2YXRhckxpbmsuYXZhdGFyLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lL2F2YXRhclwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxufTtcbiIsImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICkge1xuICAgIHRoaXMuX2ltYWdlTGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5fdGV4dCA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGlrZXMgPSBjYXJkRGF0YS5saWtlcztcbiAgICB0aGlzLl9jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICB0aGlzLl9vd25lcklkID0gY2FyZERhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX2NhcmRJZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uID0gaGFuZGxlVHJhc2hCdXR0b247XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICB9XG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBnZXRDYXJkSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRJZDtcbiAgfVxuICB1cGRhdGVMaWtlcyhsaWtlcykge1xuICAgIHRoaXMuX2xpa2VzID0gbGlrZXM7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcbiAgfVxuXG4gIF9yZW5kZXJMaWtlcygpIHtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfVxuICB9XG4gIF9pc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9saWtlcy5zb21lKCh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlci5faWQgPT09IHRoaXMuX2N1cnJlbnRVc2VySWQ7XG4gICAgfSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlX2FjdGl2ZVwiKSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcInJlbW92ZVwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwiYWRkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX3RyYXNoQnV0dG9uKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQudGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG4gIGNyZWF0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2VzXCIpO1xuICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl90ZXh0O1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9pbWFnZUxpbms7XG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fdGV4dDtcblxuICAgIGlmICh0aGlzLl9vd25lcklkICE9PSB0aGlzLl9jdXJyZW50VXNlcklkKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmQ7O1xuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWwpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWwpID0+ICFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIC8vIGNoYW5nZSB0ZWggaW5wdXQgc3R5bGUgdXBvbiBlcnJvclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIC8vIGVycm9yIG1lc3NhZ2UgY29udGVudFxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgLy8gYWNjZXNzIHRoZSBpbnB1dCBpZCB3aGljaCBpcyBzb21ldGhpbmcgbGlrZSBwb3B1cC1kZXNjcmlwdGlvblxuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIC8vIHRoZSBpZCBvZiB0aGUgc3BhbiBzbG90IGlzIHRoZSB0ZW1wbGF0ZSBsaXRlcmFsXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgLy8gcHJldmVudCBhbGwgZm9ybXMgZnJvbSByZWZyZXNoaW5nIHRoZSBwYWdlIHVwb24gc3VibWl0XG4gICAgdGhpcy5fZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBmb3IgYWxsIGZvcm1zLCB3ZSBuZWVkIHRvIHNldCBldmVudCBsaXN0ZW5lcnNcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlID0gdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UgPSB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlQnV0dG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIF9oYW5kbGVPdmVybGF5Q2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBUaHJlZSB3YXlzIHRvIGNsb3NlIHRoZSBwb3B1cDpcbiAgICAvLyAxKSBoaXQgRVNDIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgLy8gMikgbW91c2V1cCBvbiB0aGUgY2xvc2UgYnV0dG9uXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIC8vIDMpIG1vdXNldXAgb24gdGhlIG92ZXJsYXlcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG59IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXQoaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIC8vd2FpdCB0byBiZSBwYXNzZWQgaW4gaW4gaW5kZXguanNcbiAgfVxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcsIGJ1dHRvblRleHQpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0O1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuIiwiXG5cbmltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybUxpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fZm9ybVwiKV07XG4gICAgdGhpcy5fZm9ybUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cbiAgLy8gY3JlYXRlIGFuZCByZXR1cm4gYW4gb2JqZWN0IGZyb20gYWxsIHRoZSBpbnB1dCBib3hlcycgYW5zd2Vyc1xuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2lucHV0XCIpXTtcbiAgICBjb25zdCBpbnB1dENvbnRlbnQgPSB7fTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRDb250ZW50W2lucHV0RWwubmFtZV0gPSBpbnB1dEVsLnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dENvbnRlbnQ7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2Zvcm1MaXN0LmZvckVhY2goKGZvcm1FbCkgPT4ge1xuICAgICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbiAgX2hhbmRsZVN1Ym1pdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICAvL3dhaXQgdG8gYmUgcGFzc2VkIGluIGluIGluZGV4LmpzXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdChpbnB1dFZhbHVlcywgdGhpcy5fYnV0dG9uKTtcbiAgfTtcbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9mb3JtRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gIH1cbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcsIGJ1dHRvblRleHQpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0O1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gIH1cbiAgb3BlbihpbWFnZSkge1xuICAgIGNvbnN0IGltYWdlRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgIGltYWdlRWwuc3JjID0gaW1hZ2Uuc3JjO1xuICAgIGltYWdlRWwuYWx0ID0gaW1hZ2UuYWx0O1xuICAgIGNvbnN0IGNhcHRpb24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgY2FwdGlvbi50ZXh0Q29udGVudCA9IGltYWdlLmFsdDtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheS5mb3JFYWNoKChhcnJFbCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoYXJyRWwpO1xuICAgIH0pO1xuICB9XG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gICAgdGhpcy5fYXZhdGFyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXZhdGFyU2VsZWN0b3IpO1xuICB9XG4gIC8vIHRvIHBvcHVsYXRlIGZvcm0gZmllbGRzIGFmdGVyIHBvcHVwIG9wZW5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhdmF0YXI6IHRoaXMuX2F2YXRhclNsb3Quc3JjLFxuICAgIH07XG4gIH1cbiAgLy8gdXBvbiBmb3JtIHN1Ym1pc3Npb25cbiAgc2V0VXNlckluZm8oZGF0YSkge1xuICAgIHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuICAgIHRoaXMuX2F2YXRhclNsb3QuYWx0ID0gYCR7ZGF0YS5uYW1lfWA7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxuICBzZXRVc2VyQXZhdGFyKGRhdGEpIHtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcInBvcHVwX19zYXZlLWJ1dHRvbl9kaXNhYmxlZFwiLFxuICAvLyBpbnB1dCBsaW5lIGVycm9yIHN0eWxlXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9faW5wdXQtdHlwZV9lcnJvclwiLFxuICAvLyBlcnJvciBtZXNzYWdlIGNsYXNzXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbn07XG5leHBvcnQgY29uc3QgY2FyZHNDb250YWluZXIgPSBcIi5waG90by1ncmlkX19jYXJkc1wiO1xuZXhwb3J0IGNvbnN0IGNhcmRTZWxlY3RvciA9IFwiI2NhcmQtdGVtcGxhdGVcIjtcblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuLy8gLy9JbXBvcnQgY2xhc3Nlc1xuXG5cbi8vIC8vIEJ1dHRvbnMgYW5kIG90aGVyIERPTSBlbGVtZW50c1xuXG4vLyBjb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fZWRpdC1idXR0b25cIik7XG4vLyBjb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuLy8gY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuLy8gY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbi8vIGNvbnN0IGFkZENhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuLy8gY29uc3QgYWRkQ2FyZEZvcm0gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbi8vIGNvbnN0IGVkaXRBdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXBvcHVwXCIpO1xuLy8gY29uc3QgZWRpdEF2YXRhckZvcm0gPSBlZGl0QXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbi8vIGNvbnN0IGVkaXRBdmF0YXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2F2YXRhci1idXR0b25cIik7XG4vLyBjb25zdCBhdmF0YXJJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcblxuLy8gLy8gRm9ybSBkYXRhXG4vLyBjb25zdCBuYW1lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbi8vIGNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG4vLyBjb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJyk7XG4vLyBjb25zdCB0aXRsZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiZGVzY3JpcHRpb25cIl0nKTtcbi8vIGNvbnN0IGltYWdlTmFtZUlucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJwbGFjZS1uYW1lXCJdJyk7XG4vLyBjb25zdCBpbWFnZUxpbmtJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibGlua1wiXScpO1xuXG5cbi8vIC8vVG9rZW4gYW5kIElEIGluZm9cbi8vIC8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy8gLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuXG5cbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCB7IGNhcmRzQ29udGFpbmVyLCBjYXJkU2VsZWN0b3IsIHNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcblxuLy8gcHJvZmlsZSBpY29uc1xuY29uc3QgZWRpdFByb2ZpbGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGFkZFBpY3R1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuLy8gYXV0aG9yLCBhZGQgcGljdHVyZSBmb3Jtc1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgYWRkUGljdHVyZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdmF0YXItcG9wdXBcIik7XG4vLyBmb3JtIGZpZWxkcyBmb3IgdGhlIGF1dGhvciBmb3JtIGFuZCB0aGUgYWRkIHBpY3R1cmUgZm9ybVxuY29uc3QgZm9ybUZpZWxkQXV0aG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbmNvbnN0IGZvcm1GaWVsZFBpY3R1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wbGFjZS1mb3JtXCIpO1xuLy8gaW5wdXQgZmllbGRzIGZvciBwcm9maWxlIGZvcm0gcG9wdXBcbmNvbnN0IGlucHV0UHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlXCIpO1xuLy8gcHJvZmlsZSBzZWN0aW9uIG9uIHRoZSBwYWdlXG5jb25zdCBwcm9maWxlUGljSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci11cmxcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ljb25cIik7XG5cbi8vIGluc3RhbnRpYXRlIEFQSSBjbGFzc1xuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG4vLyBoYW5kbGUgTGlrZSBDbGljayBmdW5jdGlvbiBwYXNzZWQgaW4gYXMgY2FsbGJhY2sgdG8gQ2FyZC5qc1xuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmRJZCwgYWN0aW9uLCBjYXJkKSB7XG4gIGlmIChhY3Rpb24gPT09IFwicmVtb3ZlXCIpIHtcbiAgICBhcGlcbiAgICAgIC5yZW1vdmVMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcGlcbiAgICAgIC5hZGRMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG4vLyBhZGQgcGljdHVyZSBmb3JtIGZ1bmN0aW9uc1xuZnVuY3Rpb24gcmVuZGVyQ2FyZChpbnB1dFZhbHVlcykge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgaW5wdXRWYWx1ZXMsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApO1xuICBjb25zdCBjYXJkRWwgPSBjYXJkLmNyZWF0ZUNhcmQoKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkRWwpO1xufVxuXG4vLyBhZGQgcGljdHVyZSBmb3JtIHN1Ym1pdFxuY29uc3QgcGxhY2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiLmNyZWF0ZS1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuYWRkTmV3Q2FyZChpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpO1xuICAgICAgcGxhY2VQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmZ1bmN0aW9uIGhhbmRsZUNhcmRDbGljayhpbWFnZSkge1xuICBpbWFnZVBvcHVwLm9wZW4oaW1hZ2UpO1xufVxuXG5jb25zdCBkZWxldGVDYXJkQ29uZmlybWF0aW9uID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXCIuZGVsZXRlLXBvcHVwXCIpO1xuXG4vLyB0byBpbnRlcmFjdCB3aXRoIHRoZSBDYXJkIGNsYXNzLCBvcGVuIHBvcHVwLCB0aGVuIHdhaXQgZm9yIGRlbGV0ZSB0byBjb21wbGV0ZVxuZnVuY3Rpb24gaGFuZGxlVHJhc2hCdXR0b24oY2FyZCkge1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnNldFN1Ym1pdCgoKSA9PiB7XG4gICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZC5nZXRDYXJkSWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZC5kZWxldGVDYXJkKCk7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5vcGVuKCk7XG59XG5cbi8vIGluaXRpYWxpemUgY2FyZCBTZWN0aW9uIGNsYXNzIHZhcmlhYmxlIHRvIHRha2UgYXBpIGNhbGwgcmVzdWx0IGFuZCBpbnRlcmFjdCB3aXRoIFNlY3Rpb24uanNcbmxldCBjYXJkU2VjdGlvbiA9IG51bGw7XG5cbi8vIHByb2ZpbGUgZm9ybSBmdW5jdGlvbnNcbmZ1bmN0aW9uIGZpbGxQcm9maWxlRm9ybSgpIHtcbiAgY29uc3QgcmVzdWx0ID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgaW5wdXRQcm9maWxlTmFtZS52YWx1ZSA9IHJlc3VsdC5uYW1lO1xuICBpbnB1dFByb2ZpbGVUaXRsZS52YWx1ZSA9IHJlc3VsdC5hYm91dDtcbn1cbmZ1bmN0aW9uIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSgpIHtcbiAgZm9ybUZpZWxkQXV0aG9yLnJlc2V0KCk7XG4gIGZpbGxQcm9maWxlRm9ybSgpO1xuICBhZGRQcm9maWxlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcbn1cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgam9iU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgYXZhdGFyU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5jb25zdCBwcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LXBvcHVwXCIsIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xuICAgICAgcHJvZmlsZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBwcm9maWxlUGljUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIuYXZhdGFyLXBvcHVwXCIsXG4gIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZWRpdFByb2ZpbGVQaWMoaW5wdXRWYWx1ZXMpXG4gICAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcihpbnB1dFZhbHVlcyk7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuLy8gdmFsaWRhdG9yc1xuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgZWRpdFByb2ZpbGVGb3JtKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkUGljdHVyZUZvcm0pO1xuYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgc2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlUGljRm9ybVxuKTtcbmVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcblxuZnVuY3Rpb24gaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKCkge1xuICBmb3JtRmllbGRQaWN0dXJlLnJlc2V0KCk7XG5cbiAgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHBsYWNlUG9wdXAub3BlbigpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKCkge1xuICBwcm9maWxlUGljSW5wdXQudmFsdWUgPSB1c2VySW5mby5nZXRVc2VySW5mbygpLmF2YXRhcjtcbiAgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUGljUG9wdXAub3BlbigpO1xufVxuYWRkUGljdHVyZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKTtcbmVkaXRQcm9maWxlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuUHJvZmlsZUZvcm0pO1xuZWRpdFByb2ZpbGVQaWNJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0pO1xuXG5sZXQgY3VycmVudFVzZXJJZCA9IG51bGw7XG5hcGlcbiAgLmluaXRpYWxpemUoKVxuICAudGhlbigoW3VzZXIsIGNhcmRzXSkgPT4ge1xuICAgIGN1cnJlbnRVc2VySWQgPSB1c2VyLl9pZDtcbiAgICBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICAgICAge1xuICAgICAgICBpdGVtczogY2FyZHMsXG4gICAgICAgIHJlbmRlcmVyOiByZW5kZXJDYXJkLFxuICAgICAgfSxcbiAgICAgIGNhcmRzQ29udGFpbmVyXG4gICAgKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xuXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlcik7XG4gIH0pXG4gIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgYWxlcnQocmVzKTtcbiAgfSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsImFsbCIsImdldFVzZXJJbmZvIiwiZ2V0SW5pdGlhbENhcmRzIiwiX2hhbmRsZUZldGNoUmVzcG9uc2UiLCJwYXRoIiwibWV0aG9kVXNlZCIsImJvZHlDb250ZW50IiwidW5kZWZpbmVkIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsImVkaXRVc2VyUHJvZmlsZSIsImlucHV0VmFsdWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJhYm91dCIsImFkZE5ld0NhcmQiLCJsaW5rIiwiZ2V0Q2FyZExpa2VJbmZvIiwiZGVsZXRlQ2FyZCIsImNhcmRJZCIsImFkZExpa2UiLCJyZW1vdmVMaWtlIiwiZWRpdFByb2ZpbGVQaWMiLCJhdmF0YXJMaW5rIiwiYXZhdGFyIiwiQ2FyZCIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlVHJhc2hCdXR0b24iLCJjdXJyZW50VXNlcklkIiwiaGFuZGxlTGlrZUNsaWNrIiwiX2ltYWdlTGluayIsIl90ZXh0IiwiX2xpa2VzIiwibGlrZXMiLCJfY3VycmVudFVzZXJJZCIsIl9vd25lcklkIiwib3duZXIiLCJfaWQiLCJfY2FyZElkIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlVHJhc2hCdXR0b24iLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2dldFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNsb25lTm9kZSIsImdldENhcmRJZCIsInVwZGF0ZUxpa2VzIiwiX3JlbmRlckxpa2VzIiwiX2xpa2VDb3VudCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwiX2lzTGlrZWQiLCJfaGVhcnRCdXR0b24iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzb21lIiwidXNlciIsIl9zZXRFdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWlucyIsIl90cmFzaEJ1dHRvbiIsIl9jYXJkSW1hZ2UiLCJldnQiLCJ0YXJnZXQiLCJfY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiY2FyZFRpdGxlIiwiYWx0Iiwic3JjIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsIiwiaW5wdXRMaXN0IiwiaW5wdXRFbCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsIiwiYnV0dG9uRWxlbWVudCIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpbnB1dElkIiwiaWQiLCJlcnJvckVsIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJfaGFuZGxlQnV0dG9uQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsb3NlIiwiX2Nsb3NlQnV0dG9uIiwiX2Zvcm1MaXN0Iiwia2V5IiwiY2xvc2UiLCJvcGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBvcHVwV2l0aENvbmZpcm0iLCJfYnV0dG9uIiwiX2J1dHRvbk9yaWdpbmFsVGV4dCIsInNldFN1Ym1pdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b25UZXh0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0Q29udGVudCIsInZhbHVlIiwiX2hhbmRsZVN1Ym1pdENsaWNrIiwiUG9wdXBXaXRoSW1hZ2UiLCJpbWFnZSIsImltYWdlRWwiLCJjYXB0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pbml0aWFsQXJyYXkiLCJfY29udGFpbmVyIiwiX3JlbmRlcmVyIiwicmVuZGVySXRlbXMiLCJhcnJFbCIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJhdmF0YXJTZWxlY3RvciIsIl9uYW1lU2xvdCIsIl9qb2JTbG90IiwiX2F2YXRhclNsb3QiLCJzZXRVc2VySW5mbyIsImRhdGEiLCJzZXRVc2VyQXZhdGFyIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImNhcmRzQ29udGFpbmVyIiwiZWRpdFByb2ZpbGVJY29uIiwiYWRkUGljdHVyZUljb24iLCJlZGl0UHJvZmlsZUZvcm0iLCJhZGRQaWN0dXJlRm9ybSIsImVkaXRQcm9maWxlUGljRm9ybSIsImZvcm1GaWVsZEF1dGhvciIsImZvcm1GaWVsZFBpY3R1cmUiLCJpbnB1dFByb2ZpbGVOYW1lIiwiaW5wdXRQcm9maWxlVGl0bGUiLCJwcm9maWxlUGljSW5wdXQiLCJlZGl0UHJvZmlsZVBpY0ljb24iLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiYWN0aW9uIiwiY2FyZCIsImNhdGNoIiwiYWxlcnQiLCJyZW5kZXJDYXJkIiwiY2FyZEVsIiwiY2FyZFNlY3Rpb24iLCJwbGFjZVBvcHVwIiwiZmluYWxseSIsImltYWdlUG9wdXAiLCJkZWxldGVDYXJkQ29uZmlybWF0aW9uIiwiZmlsbFByb2ZpbGVGb3JtIiwicmVzdWx0IiwidXNlckluZm8iLCJoYW5kbGVPcGVuUHJvZmlsZUZvcm0iLCJyZXNldCIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwicHJvZmlsZVBvcHVwIiwiYnV0dG9uIiwicHJvZmlsZVBpY1BvcHVwIiwiYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IiLCJlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IiLCJoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0iLCJoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtIiwiY2FyZHMiXSwic291cmNlUm9vdCI6IiJ9