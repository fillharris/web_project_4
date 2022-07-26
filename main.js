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
      // if (this._heartButton.classList.contains("card__like_active")) {
      if (this._isLiked()) {
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
    inputEl.classList.add(this._settings.inputErrorClass);
    const errorMessage = inputEl.validationMessage;
    const inputId = inputEl.id;

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

    const buttonElement = this._formEl.querySelector(this._settings.submitButtonSelector);

    this._formEl.addEventListener("submit", evt => {
      evt.preventDefault();
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

} // check


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
    this._button = this._popup.querySelector(".popup__button");
    this._buttonOriginalText = this._button.textContent;
  }

  setSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
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
      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues, this._button);
    });

    this._handleFormSubmit = handleFormSubmit;
    this._formList = this._popup.querySelectorAll(".popup__form");
    this._formEl = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__button");
    this._buttonOriginalText = this._button.textContent;
  }

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

    this._formEl.reset();
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
    this._jobSlot.textContent = data.about; // this._avatarSlot.alt = `${data.name}`;
    // this._avatarSlot.src = data.avatar;
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
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__error",
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
 // Imported Classes










const editProfileIcon = document.querySelector(".profile__info-edit-button");
const addPictureIcon = document.querySelector(".profile__add-button");
const editProfileForm = document.querySelector("#edit-popup");
const addPictureForm = document.querySelector("#create-popup");
const editProfilePicForm = document.querySelector(".avatar-popup");
const formFieldAuthor = document.querySelector("#edit-profile-form");
const formFieldPicture = document.querySelector("#create-place-form");
const inputProfileName = document.querySelector("#profile-name");
const inputProfileTitle = document.querySelector("#profile-title");
const profilePicInput = document.querySelector("#avatar-url");
const editProfilePicIcon = document.querySelector(".profile__icon"); // //Token and ID info
// //Token: b1411637-441a-4d25-9227-6de5bf8bcf24
// //Group ID: group-12
// API class

const api = new _components_Api__WEBPACK_IMPORTED_MODULE_8__["default"]({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json"
  }
});

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
}

function renderCard(inputValues) {
  const card = new _components_Card__WEBPACK_IMPORTED_MODULE_1__["default"](inputValues, _components_constants__WEBPACK_IMPORTED_MODULE_2__.cardSelector, handleCardClick, handleTrashButton, currentUserId, handleLikeClick);
  const cardEl = card.createCard();
  cardSection.addItem(cardEl);
}

const placePopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__["default"]("#create-popup", inputValues => {
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

const deleteCardConfirmation = new _components_PopupWithConfirm__WEBPACK_IMPORTED_MODULE_9__["default"](".delete-popup");

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
}

let cardSection = null;

function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.name;
  inputProfileTitle.value = result.about;
}

function handleOpenProfileForm() {
  // formFieldAuthor.reset();
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
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuICBpbml0aWFsaXplKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cbiAgX2hhbmRsZUZldGNoUmVzcG9uc2UocGF0aCwgbWV0aG9kVXNlZCA9IFwiR0VUXCIsIGJvZHlDb250ZW50ID0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kVXNlZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIpO1xuICB9XG4gIGVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGFib3V0OiBpbnB1dFZhbHVlcy5hYm91dCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBhZGROZXdDYXJkKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgbGluazogaW5wdXRWYWx1ZXMubGluayxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiLCBcIlBPU1RcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGdldENhcmRMaWtlSW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBkZWxldGVDYXJkKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cblxuICBhZGRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJQVVRcIik7XG4gIH1cbiAgcmVtb3ZlTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG4gIGVkaXRQcm9maWxlUGljKGF2YXRhckxpbmspIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGF2YXRhcjogYXZhdGFyTGluay5hdmF0YXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWUvYXZhdGFyXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG59XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApIHtcbiAgICB0aGlzLl9pbWFnZUxpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX3RleHQgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpa2VzID0gY2FyZERhdGEubGlrZXM7XG4gICAgdGhpcy5fY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgdGhpcy5fb3duZXJJZCA9IGNhcmREYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl9jYXJkSWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbiA9IGhhbmRsZVRyYXNoQnV0dG9uO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgfVxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgZ2V0Q2FyZElkKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkSWQ7XG4gIH1cbiAgdXBkYXRlTGlrZXMobGlrZXMpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG4gIH1cblxuICBfcmVuZGVyTGlrZXMoKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuICBfaXNMaWtlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlrZXMuc29tZSgodXNlcikgPT4ge1xuICAgICAgcmV0dXJuIHVzZXIuX2lkID09PSB0aGlzLl9jdXJyZW50VXNlcklkO1xuICAgIH0pO1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAvLyBpZiAodGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZV9hY3RpdmVcIikpIHtcbiAgICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJyZW1vdmVcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcImFkZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl90cmFzaEJ1dHRvbikge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbih0aGlzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soZXZ0LnRhcmdldCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcbiAgfVxuICBjcmVhdGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gICAgdGhpcy5fbGlrZUNvdW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcbiAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fdGV4dDtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5faW1hZ2VMaW5rO1xuICAgIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX3RleHQ7XG5cbiAgICBpZiAodGhpcy5fb3duZXJJZCAhPT0gdGhpcy5fY3VycmVudFVzZXJJZCkge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcblxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiXG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBfaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT5cbiAgICBpbnB1dExpc3Quc29tZSgoaW5wdXRFbCkgPT4gIWlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRvcigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuLy8gY2hlY2tcbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlID0gdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UgPSB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlQnV0dG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIF9oYW5kbGVPdmVybGF5Q2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBUaHJlZSB3YXlzIHRvIGNsb3NlIHRoZSBwb3B1cDpcbiAgICAvLyAxKSBoaXQgRVNDIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgLy8gMikgbW91c2V1cCBvbiB0aGUgY2xvc2UgYnV0dG9uXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIC8vIDMpIG1vdXNldXAgb24gdGhlIG92ZXJsYXlcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXQoaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybUxpc3QgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2Zvcm1FbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuICBcbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19pbnB1dFwiKV07XG4gICAgY29uc3QgaW5wdXRDb250ZW50ID0ge307XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0Q29udGVudFtpbnB1dEVsLm5hbWVdID0gaW5wdXRFbC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5wdXRDb250ZW50O1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9mb3JtTGlzdC5mb3JFYWNoKChmb3JtRWwpID0+IHtcbiAgICAgIGZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLl9zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG4gIF9oYW5kbGVTdWJtaXRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHRoaXMuX2dldElucHV0VmFsdWVzKCk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdChpbnB1dFZhbHVlcywgdGhpcy5fYnV0dG9uKTtcbiAgfTtcbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9mb3JtRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gICAgdGhpcy5fZm9ybUVsLnJlc2V0KCk7XG4gIH1cbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcsIGJ1dHRvblRleHQpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0O1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gIH1cbiAgb3BlbihpbWFnZSkge1xuICAgIGNvbnN0IGltYWdlRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgIGltYWdlRWwuc3JjID0gaW1hZ2Uuc3JjO1xuICAgIGltYWdlRWwuYWx0ID0gaW1hZ2UuYWx0O1xuICAgIGNvbnN0IGNhcHRpb24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgY2FwdGlvbi50ZXh0Q29udGVudCA9IGltYWdlLmFsdDtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gIH1cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5LmZvckVhY2goKGFyckVsKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihhcnJFbCk7XG4gICAgfSk7XG4gIH1cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yLCBhdmF0YXJTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fbmFtZVNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5hbWVTZWxlY3Rvcik7XG4gICAgdGhpcy5fam9iU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xuICAgIHRoaXMuX2F2YXRhclNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGF2YXRhclNlbGVjdG9yKTtcbiAgfVxuICAvLyB0byBwb3B1bGF0ZSBmb3JtIGZpZWxkcyBhZnRlciBwb3B1cCBvcGVuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLl9uYW1lU2xvdC50ZXh0Q29udGVudCxcbiAgICAgIGFib3V0OiB0aGlzLl9qb2JTbG90LnRleHRDb250ZW50LFxuICAgICAgYXZhdGFyOiB0aGlzLl9hdmF0YXJTbG90LnNyYyxcbiAgICB9O1xuICB9XG4gIC8vIHVwb24gZm9ybSBzdWJtaXNzaW9uXG4gIHNldFVzZXJJbmZvKGRhdGEpIHtcbiAgICB0aGlzLl9uYW1lU2xvdC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9qb2JTbG90LnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbiAgICAvLyB0aGlzLl9hdmF0YXJTbG90LmFsdCA9IGAke2RhdGEubmFtZX1gO1xuICAgIC8vIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbiAgc2V0VXNlckF2YXRhcihkYXRhKSB7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG59O1xuZXhwb3J0IGNvbnN0IGNhcmRzQ29udGFpbmVyID0gXCIucGhvdG8tZ3JpZF9fY2FyZHNcIjtcbmV4cG9ydCBjb25zdCBjYXJkU2VsZWN0b3IgPSBcIiNjYXJkLXRlbXBsYXRlXCI7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5cbi8vIEltcG9ydGVkIENsYXNzZXNcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCB7XG4gIGNhcmRzQ29udGFpbmVyLFxuICBjYXJkU2VsZWN0b3IsXG4gIHNldHRpbmdzLFxufSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHNcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuXG5cbmNvbnN0IGVkaXRQcm9maWxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faW5mby1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGFkZFBpY3R1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgYWRkUGljdHVyZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXZhdGFyLXBvcHVwXCIpO1xuY29uc3QgZm9ybUZpZWxkQXV0aG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbmNvbnN0IGZvcm1GaWVsZFBpY3R1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wbGFjZS1mb3JtXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGVcIik7XG5jb25zdCBwcm9maWxlUGljSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci11cmxcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ljb25cIik7XG5cbi8vIC8vVG9rZW4gYW5kIElEIGluZm9cbi8vIC8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy8gLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuLy8gQVBJIGNsYXNzXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cblxuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmRJZCwgYWN0aW9uLCBjYXJkKSB7XG4gIGlmIChhY3Rpb24gPT09IFwicmVtb3ZlXCIpIHtcbiAgICBhcGlcbiAgICAgIC5yZW1vdmVMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcGlcbiAgICAgIC5hZGRMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGlucHV0VmFsdWVzKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBpbnB1dFZhbHVlcyxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICk7XG4gIGNvbnN0IGNhcmRFbCA9IGNhcmQuY3JlYXRlQ2FyZCgpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbCk7XG59XG5cbmNvbnN0IHBsYWNlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKGlucHV0VmFsdWVzKSA9PiB7XG4gIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGlucHV0VmFsdWVzKTtcbiAgICAgIHBsYWNlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5mdW5jdGlvbiBoYW5kbGVDYXJkQ2xpY2soaW1hZ2UpIHtcbiAgaW1hZ2VQb3B1cC5vcGVuKGltYWdlKTtcbn1cblxuY29uc3QgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFwiLmRlbGV0ZS1wb3B1cFwiKTtcblxuZnVuY3Rpb24gaGFuZGxlVHJhc2hCdXR0b24oY2FyZCkge1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnNldFN1Ym1pdCgoKSA9PiB7XG4gICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZC5nZXRDYXJkSWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZC5kZWxldGVDYXJkKCk7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5vcGVuKCk7XG59XG5cbmxldCBjYXJkU2VjdGlvbiA9IG51bGw7XG5cbmZ1bmN0aW9uIGZpbGxQcm9maWxlRm9ybSgpIHtcbiAgY29uc3QgcmVzdWx0ID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgaW5wdXRQcm9maWxlTmFtZS52YWx1ZSA9IHJlc3VsdC5uYW1lO1xuICBpbnB1dFByb2ZpbGVUaXRsZS52YWx1ZSA9IHJlc3VsdC5hYm91dDtcbn1cbmZ1bmN0aW9uIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSgpIHtcbiAgLy8gZm9ybUZpZWxkQXV0aG9yLnJlc2V0KCk7XG4gIGZpbGxQcm9maWxlRm9ybSgpO1xuICBhZGRQcm9maWxlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcbn1cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgam9iU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgYXZhdGFyU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5jb25zdCBwcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LXBvcHVwXCIsIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xuICAgICAgcHJvZmlsZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBwcm9maWxlUGljUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIuYXZhdGFyLXBvcHVwXCIsXG4gIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZWRpdFByb2ZpbGVQaWMoaW5wdXRWYWx1ZXMpXG4gICAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcihpbnB1dFZhbHVlcyk7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgZWRpdFByb2ZpbGVGb3JtKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkUGljdHVyZUZvcm0pO1xuYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgc2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlUGljRm9ybVxuKTtcbmVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcblxuZnVuY3Rpb24gaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKCkge1xuICBmb3JtRmllbGRQaWN0dXJlLnJlc2V0KCk7XG5cbiAgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHBsYWNlUG9wdXAub3BlbigpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKCkge1xuICBwcm9maWxlUGljSW5wdXQudmFsdWUgPSB1c2VySW5mby5nZXRVc2VySW5mbygpLmF2YXRhcjtcbiAgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUGljUG9wdXAub3BlbigpO1xufVxuYWRkUGljdHVyZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKTtcbmVkaXRQcm9maWxlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuUHJvZmlsZUZvcm0pO1xuZWRpdFByb2ZpbGVQaWNJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0pO1xuXG5sZXQgY3VycmVudFVzZXJJZCA9IG51bGw7XG5hcGlcbiAgLmluaXRpYWxpemUoKVxuICAudGhlbigoW3VzZXIsIGNhcmRzXSkgPT4ge1xuICAgIGN1cnJlbnRVc2VySWQgPSB1c2VyLl9pZDtcbiAgICBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICAgICAge1xuICAgICAgICBpdGVtczogY2FyZHMsXG4gICAgICAgIHJlbmRlcmVyOiByZW5kZXJDYXJkLFxuICAgICAgfSxcbiAgICAgIGNhcmRzQ29udGFpbmVyXG4gICAgKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xuXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlcik7XG4gIH0pXG4gIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgYWxlcnQocmVzKTtcbiAgfSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsImFsbCIsImdldFVzZXJJbmZvIiwiZ2V0SW5pdGlhbENhcmRzIiwiX2hhbmRsZUZldGNoUmVzcG9uc2UiLCJwYXRoIiwibWV0aG9kVXNlZCIsImJvZHlDb250ZW50IiwidW5kZWZpbmVkIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsImVkaXRVc2VyUHJvZmlsZSIsImlucHV0VmFsdWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJhYm91dCIsImFkZE5ld0NhcmQiLCJsaW5rIiwiZ2V0Q2FyZExpa2VJbmZvIiwiZGVsZXRlQ2FyZCIsImNhcmRJZCIsImFkZExpa2UiLCJyZW1vdmVMaWtlIiwiZWRpdFByb2ZpbGVQaWMiLCJhdmF0YXJMaW5rIiwiYXZhdGFyIiwiQ2FyZCIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlVHJhc2hCdXR0b24iLCJjdXJyZW50VXNlcklkIiwiaGFuZGxlTGlrZUNsaWNrIiwiX2ltYWdlTGluayIsIl90ZXh0IiwiX2xpa2VzIiwibGlrZXMiLCJfY3VycmVudFVzZXJJZCIsIl9vd25lcklkIiwib3duZXIiLCJfaWQiLCJfY2FyZElkIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlVHJhc2hCdXR0b24iLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2dldFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNsb25lTm9kZSIsImdldENhcmRJZCIsInVwZGF0ZUxpa2VzIiwiX3JlbmRlckxpa2VzIiwiX2xpa2VDb3VudCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwiX2lzTGlrZWQiLCJfaGVhcnRCdXR0b24iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzb21lIiwidXNlciIsIl9zZXRFdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfdHJhc2hCdXR0b24iLCJfY2FyZEltYWdlIiwiZXZ0IiwidGFyZ2V0IiwiX2NhcmRFbGVtZW50IiwiY3JlYXRlQ2FyZCIsImNhcmRUaXRsZSIsImFsdCIsInNyYyIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbCIsImlucHV0TGlzdCIsImlucHV0RWwiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3NldHRpbmdzIiwiX2Zvcm1FbCIsImJ1dHRvbkVsZW1lbnQiLCJmb3JFYWNoIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yTWVzc2FnZSIsInZhbGlkYXRpb25NZXNzYWdlIiwiaW5wdXRJZCIsImlkIiwiZXJyb3JFbCIsImVycm9yQ2xhc3MiLCJlbmFibGVWYWxpZGF0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwicHJldmVudERlZmF1bHQiLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwiX2hhbmRsZUJ1dHRvbkNsb3NlIiwiX2hhbmRsZU92ZXJsYXlDbG9zZSIsIl9jbG9zZUJ1dHRvbiIsIl9mb3JtTGlzdCIsImtleSIsImNsb3NlIiwib3BlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJQb3B1cFdpdGhDb25maXJtIiwiX2J1dHRvbiIsIl9idXR0b25PcmlnaW5hbFRleHQiLCJzZXRTdWJtaXQiLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYnV0dG9uVGV4dCIsIlBvcHVwV2l0aEZvcm0iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dENvbnRlbnQiLCJ2YWx1ZSIsIl9oYW5kbGVTdWJtaXRDbGljayIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJpbWFnZSIsImltYWdlRWwiLCJjYXB0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pbml0aWFsQXJyYXkiLCJfY29udGFpbmVyIiwiX3JlbmRlcmVyIiwicmVuZGVySXRlbXMiLCJhcnJFbCIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJhdmF0YXJTZWxlY3RvciIsIl9uYW1lU2xvdCIsIl9qb2JTbG90IiwiX2F2YXRhclNsb3QiLCJzZXRVc2VySW5mbyIsImRhdGEiLCJzZXRVc2VyQXZhdGFyIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwicHJvZmlsZVBvcHVwIiwiYnV0dG9uIiwicHJvZmlsZVBpY1BvcHVwIiwiYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IiLCJlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IiLCJoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0iLCJoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtIiwiY2FyZHMiXSwic291cmNlUm9vdCI6IiJ9