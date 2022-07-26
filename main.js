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
  // formFieldPicture.reset();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OUYsZUFBNUI7O0FBRUEsU0FBUytGLHdCQUFULEdBQW9DO0VBQ2xDO0VBRUFGLHVCQUF1QixDQUFDeEYsZUFBeEI7RUFDQTRFLFVBQVUsQ0FBQ2hFLElBQVg7QUFDRDs7QUFFRCxTQUFTK0UsNEJBQVQsR0FBd0M7RUFDdEMxQixlQUFlLENBQUN2QyxLQUFoQixHQUF3QndELFFBQVEsQ0FBQ2hNLFdBQVQsR0FBdUIrQixNQUEvQztFQUNBd0ssMkJBQTJCLENBQUN6RixlQUE1QjtFQUNBdUYsZUFBZSxDQUFDM0UsSUFBaEI7QUFDRDs7QUFDRDZDLGNBQWMsQ0FBQ2hHLGdCQUFmLENBQWdDLFNBQWhDLEVBQTJDaUksd0JBQTNDO0FBQ0FsQyxlQUFlLENBQUMvRixnQkFBaEIsQ0FBaUMsU0FBakMsRUFBNEMwSCxxQkFBNUM7QUFDQWpCLGtCQUFrQixDQUFDekcsZ0JBQW5CLENBQW9DLFNBQXBDLEVBQStDa0ksNEJBQS9DO0FBRUEsSUFBSXBLLGFBQWEsR0FBRyxJQUFwQjtBQUNBNEksR0FBRyxDQUNBcEwsVUFESCxHQUVHYSxJQUZILENBRVEsUUFBbUI7RUFBQSxJQUFsQixDQUFDMkQsSUFBRCxFQUFPcUksS0FBUCxDQUFrQjtFQUN2QnJLLGFBQWEsR0FBR2dDLElBQUksQ0FBQ3ZCLEdBQXJCO0VBQ0EySSxXQUFXLEdBQUcsSUFBSTFDLDJEQUFKLENBQ1o7SUFDRUUsS0FBSyxFQUFFeUQsS0FEVDtJQUVFeEQsUUFBUSxFQUFFcUM7RUFGWixDQURZLEVBS1psQixpRUFMWSxDQUFkO0VBT0FvQixXQUFXLENBQUNuQyxXQUFaO0VBRUEwQyxRQUFRLENBQUM5QixXQUFULENBQXFCN0YsSUFBckI7QUFDRCxDQWRILEVBZUdnSCxLQWZILENBZVUxSyxHQUFELElBQVM7RUFDZDJLLEtBQUssQ0FBQzNLLEdBQUQsQ0FBTDtBQUNELENBakJILEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0VXNlckluZm8oKSwgdGhpcy5nZXRJbml0aWFsQ2FyZHMoKV0pO1xuICB9XG4gIF9oYW5kbGVGZXRjaFJlc3BvbnNlKHBhdGgsIG1ldGhvZFVzZWQgPSBcIkdFVFwiLCBib2R5Q29udGVudCA9IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfSR7cGF0aH1gLCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZFVzZWQsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogYm9keUNvbnRlbnQsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiKTtcbiAgfVxuICBlZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBhYm91dDogaW5wdXRWYWx1ZXMuYWJvdXQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgYWRkTmV3Q2FyZChpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGxpbms6IGlucHV0VmFsdWVzLmxpbmssXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIiwgXCJQT1NUXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBnZXRDYXJkTGlrZUluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZGVsZXRlQ2FyZChjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG5cbiAgYWRkTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiUFVUXCIpO1xuICB9XG4gIHJlbW92ZUxpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuICBlZGl0UHJvZmlsZVBpYyhhdmF0YXJMaW5rKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBhdmF0YXI6IGF2YXRhckxpbmsuYXZhdGFyLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lL2F2YXRhclwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxufVxuIiwiY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcmREYXRhLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlVHJhc2hCdXR0b24sXG4gICAgY3VycmVudFVzZXJJZCxcbiAgICBoYW5kbGVMaWtlQ2xpY2tcbiAgKSB7XG4gICAgdGhpcy5faW1hZ2VMaW5rID0gY2FyZERhdGEubGluaztcbiAgICB0aGlzLl90ZXh0ID0gY2FyZERhdGEubmFtZTtcbiAgICB0aGlzLl9saWtlcyA9IGNhcmREYXRhLmxpa2VzO1xuICAgIHRoaXMuX2N1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xuICAgIHRoaXMuX293bmVySWQgPSBjYXJkRGF0YS5vd25lci5faWQ7XG4gICAgdGhpcy5fY2FyZElkID0gY2FyZERhdGEuX2lkO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlVHJhc2hCdXR0b24gPSBoYW5kbGVUcmFzaEJ1dHRvbjtcbiAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sgPSBoYW5kbGVMaWtlQ2xpY2s7XG4gIH1cbiAgX2dldFRlbXBsYXRlKCkge1xuICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIGdldENhcmRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZElkO1xuICB9XG4gIHVwZGF0ZUxpa2VzKGxpa2VzKSB7XG4gICAgdGhpcy5fbGlrZXMgPSBsaWtlcztcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuICB9XG5cbiAgX3JlbmRlckxpa2VzKCkge1xuICAgIHRoaXMuX2xpa2VDb3VudC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faXNMaWtlZCgpKSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cbiAgX2lzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpa2VzLnNvbWUoKHVzZXIpID0+IHtcbiAgICAgIHJldHVybiB1c2VyLl9pZCA9PT0gdGhpcy5fY3VycmVudFVzZXJJZDtcbiAgICB9KTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5faGVhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgLy8gaWYgKHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2VfYWN0aXZlXCIpKSB7XG4gICAgICBpZiAodGhpcy5faXNMaWtlZCgpKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwicmVtb3ZlXCIsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJhZGRcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fdHJhc2hCdXR0b24pIHtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlVHJhc2hCdXR0b24odGhpcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKGV2dC50YXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cbiAgY3JlYXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICBjb25zdCBjYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xuICAgIHRoaXMuX2xpa2VDb3VudCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZXNcIik7XG4gICAgdGhpcy5fdHJhc2hCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5faGVhcnRCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX3RleHQ7XG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2ltYWdlTGluaztcbiAgICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLl90ZXh0O1xuXG4gICAgaWYgKHRoaXMuX293bmVySWQgIT09IHRoaXMuX2N1cnJlbnRVc2VySWQpIHtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcbiIsIlxuY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWwpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWwpID0+ICFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxuICByZXNldFZhbGlkYXRpb24oKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH0pO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbn1cbi8vIGNoZWNrXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSA9IHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlID0gdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fY2xvc2VCdXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gICAgdGhpcy5fZm9ybUxpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fZm9ybVwiKV07XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgX2hhbmRsZUJ1dHRvbkNsb3NlKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuICBfaGFuZGxlT3ZlcmxheUNsb3NlKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0ID09PSB0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwicG9wdXBfb3BlblwiKTtcbiAgfVxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXBfb3BlblwiKTtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgdGhpcy5fY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIHRoaXMuX3BvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gVGhyZWUgd2F5cyB0byBjbG9zZSB0aGUgcG9wdXA6XG4gICAgLy8gMSkgaGl0IEVTQyBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIC8vIDIpIG1vdXNldXAgb24gdGhlIGNsb3NlIGJ1dHRvblxuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICAvLyAzKSBtb3VzZXVwIG9uIHRoZSBvdmVybGF5XG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19idXR0b25cIik7XG4gICAgdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0ID0gdGhpcy5fYnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0U3VibWl0KGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgfVxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcsIGJ1dHRvblRleHQpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0O1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cbiAgXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBfaGFuZGxlU3VibWl0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB0aGlzLl9nZXRJbnB1dFZhbHVlcygpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQoaW5wdXRWYWx1ZXMsIHRoaXMuX2J1dHRvbik7XG4gIH07XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIHRoaXMuX2Zvcm1FbC5yZXNldCgpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICB9XG4gIG9wZW4oaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICBpbWFnZUVsLnNyYyA9IGltYWdlLnNyYztcbiAgICBpbWFnZUVsLmFsdCA9IGltYWdlLmFsdDtcbiAgICBjb25zdCBjYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGNhcHRpb24udGV4dENvbnRlbnQgPSBpbWFnZS5hbHQ7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheS5mb3JFYWNoKChhcnJFbCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoYXJyRWwpO1xuICAgIH0pO1xuICB9XG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgbmFtZVNlbGVjdG9yLCBqb2JTZWxlY3RvciwgYXZhdGFyU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX25hbWVTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xuICAgIHRoaXMuX2pvYlNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcbiAgICB0aGlzLl9hdmF0YXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXJTZWxlY3Rvcik7XG4gIH1cbiAgLy8gdG8gcG9wdWxhdGUgZm9ybSBmaWVsZHMgYWZ0ZXIgcG9wdXAgb3BlblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCxcbiAgICAgIGF2YXRhcjogdGhpcy5fYXZhdGFyU2xvdC5zcmMsXG4gICAgfTtcbiAgfVxuICAvLyB1cG9uIGZvcm0gc3VibWlzc2lvblxuICBzZXRVc2VySW5mbyhkYXRhKSB7XG4gICAgdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgLy8gdGhpcy5fYXZhdGFyU2xvdC5hbHQgPSBgJHtkYXRhLm5hbWV9YDtcbiAgICAvLyB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG4gIHNldFVzZXJBdmF0YXIoZGF0YSkge1xuICAgIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fYnV0dG9uXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbmV4cG9ydCBjb25zdCBjYXJkc0NvbnRhaW5lciA9IFwiLnBob3RvLWdyaWRfX2NhcmRzXCI7XG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vLyBJbXBvcnRlZCBDbGFzc2VzXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQge1xuICBjYXJkc0NvbnRhaW5lcixcbiAgY2FyZFNlbGVjdG9yLFxuICBzZXR0aW5ncyxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcblxuXG5jb25zdCBlZGl0UHJvZmlsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2luZm8tZWRpdC1idXR0b25cIik7XG5jb25zdCBhZGRQaWN0dXJlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF2YXRhci1wb3B1cFwiKTtcbmNvbnN0IGZvcm1GaWVsZEF1dGhvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG5jb25zdCBmb3JtRmllbGRQaWN0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcGxhY2UtZm9ybVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlXCIpO1xuY29uc3QgcHJvZmlsZVBpY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItdXJsXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pY29uXCIpO1xuXG4vLyAvL1Rva2VuIGFuZCBJRCBpbmZvXG4vLyAvL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vIC8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbi8vIEFQSSBjbGFzc1xuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2VDbGljayhjYXJkSWQsIGFjdGlvbiwgY2FyZCkge1xuICBpZiAoYWN0aW9uID09PSBcInJlbW92ZVwiKSB7XG4gICAgYXBpXG4gICAgICAucmVtb3ZlTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQudXBkYXRlTGlrZXMocmVzLmxpa2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXBpXG4gICAgICAuYWRkTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQudXBkYXRlTGlrZXMocmVzLmxpa2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpbnB1dFZhbHVlcykge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgaW5wdXRWYWx1ZXMsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApO1xuICBjb25zdCBjYXJkRWwgPSBjYXJkLmNyZWF0ZUNhcmQoKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkRWwpO1xufVxuXG5jb25zdCBwbGFjZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY3JlYXRlLXBvcHVwXCIsIChpbnB1dFZhbHVlcykgPT4ge1xuICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5hZGROZXdDYXJkKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChpbnB1dFZhbHVlcyk7XG4gICAgICBwbGFjZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgaW1hZ2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuZnVuY3Rpb24gaGFuZGxlQ2FyZENsaWNrKGltYWdlKSB7XG4gIGltYWdlUG9wdXAub3BlbihpbWFnZSk7XG59XG5cbmNvbnN0IGRlbGV0ZUNhcmRDb25maXJtYXRpb24gPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcIi5kZWxldGUtcG9wdXBcIik7XG5cbmZ1bmN0aW9uIGhhbmRsZVRyYXNoQnV0dG9uKGNhcmQpIHtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5zZXRTdWJtaXQoKCkgPT4ge1xuICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmQuZ2V0Q2FyZElkKCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcmQuZGVsZXRlQ2FyZCgpO1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfSk7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ub3BlbigpO1xufVxuXG5sZXQgY2FyZFNlY3Rpb24gPSBudWxsO1xuXG5mdW5jdGlvbiBmaWxsUHJvZmlsZUZvcm0oKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIGlucHV0UHJvZmlsZU5hbWUudmFsdWUgPSByZXN1bHQubmFtZTtcbiAgaW5wdXRQcm9maWxlVGl0bGUudmFsdWUgPSByZXN1bHQuYWJvdXQ7XG59XG5mdW5jdGlvbiBoYW5kbGVPcGVuUHJvZmlsZUZvcm0oKSB7XG4gIC8vIGZvcm1GaWVsZEF1dGhvci5yZXNldCgpO1xuICBmaWxsUHJvZmlsZUZvcm0oKTtcbiAgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQb3B1cC5vcGVuKCk7XG59XG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIG5hbWVTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby1uYW1lXCIsXG4gIGpvYlNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLXRpdGxlXCIsXG4gIGF2YXRhclNlbGVjdG9yOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn0pO1xuY29uc3QgcHJvZmlsZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjZWRpdC1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMsIGJ1dHRvbikgPT4ge1xuICBwcm9maWxlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGlucHV0VmFsdWVzKTtcbiAgICAgIHByb2ZpbGVQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgcHJvZmlsZVBpY1BvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiLmF2YXRhci1wb3B1cFwiLFxuICAoaW5wdXRWYWx1ZXMsIGJ1dHRvbikgPT4ge1xuICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmVkaXRQcm9maWxlUGljKGlucHV0VmFsdWVzKVxuICAgICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICAgIHVzZXJJbmZvLnNldFVzZXJBdmF0YXIoaW5wdXRWYWx1ZXMpO1xuICAgICAgICBwcm9maWxlUGljUG9wdXAuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cbmNvbnN0IGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIGVkaXRQcm9maWxlRm9ybSk7XG5hZGRQcm9maWxlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIGFkZFBpY3R1cmVGb3JtKTtcbmFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIHNldHRpbmdzLFxuICBlZGl0UHJvZmlsZVBpY0Zvcm1cbik7XG5lZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSgpIHtcbiAgLy8gZm9ybUZpZWxkUGljdHVyZS5yZXNldCgpO1xuXG4gIGFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwbGFjZVBvcHVwLm9wZW4oKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSgpIHtcbiAgcHJvZmlsZVBpY0lucHV0LnZhbHVlID0gdXNlckluZm8uZ2V0VXNlckluZm8oKS5hdmF0YXI7XG4gIGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBpY1BvcHVwLm9wZW4oKTtcbn1cbmFkZFBpY3R1cmVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSk7XG5lZGl0UHJvZmlsZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlblByb2ZpbGVGb3JtKTtcbmVkaXRQcm9maWxlUGljSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKTtcblxubGV0IGN1cnJlbnRVc2VySWQgPSBudWxsO1xuYXBpXG4gIC5pbml0aWFsaXplKClcbiAgLnRoZW4oKFt1c2VyLCBjYXJkc10pID0+IHtcbiAgICBjdXJyZW50VXNlcklkID0gdXNlci5faWQ7XG4gICAgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAgICAgIHtcbiAgICAgICAgaXRlbXM6IGNhcmRzLFxuICAgICAgICByZW5kZXJlcjogcmVuZGVyQ2FyZCxcbiAgICAgIH0sXG4gICAgICBjYXJkc0NvbnRhaW5lclxuICAgICk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcblxuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHVzZXIpO1xuICB9KVxuICAuY2F0Y2goKHJlcykgPT4ge1xuICAgIGFsZXJ0KHJlcyk7XG4gIH0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwiYmFzZVVybCIsImhlYWRlcnMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJhbGwiLCJnZXRVc2VySW5mbyIsImdldEluaXRpYWxDYXJkcyIsIl9oYW5kbGVGZXRjaFJlc3BvbnNlIiwicGF0aCIsIm1ldGhvZFVzZWQiLCJib2R5Q29udGVudCIsInVuZGVmaW5lZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJlZGl0VXNlclByb2ZpbGUiLCJpbnB1dFZhbHVlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYW1lIiwiYWJvdXQiLCJhZGROZXdDYXJkIiwibGluayIsImdldENhcmRMaWtlSW5mbyIsImRlbGV0ZUNhcmQiLCJjYXJkSWQiLCJhZGRMaWtlIiwicmVtb3ZlTGlrZSIsImVkaXRQcm9maWxlUGljIiwiYXZhdGFyTGluayIsImF2YXRhciIsIkNhcmQiLCJjYXJkRGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZVRyYXNoQnV0dG9uIiwiY3VycmVudFVzZXJJZCIsImhhbmRsZUxpa2VDbGljayIsIl9pbWFnZUxpbmsiLCJfdGV4dCIsIl9saWtlcyIsImxpa2VzIiwiX2N1cnJlbnRVc2VySWQiLCJfb3duZXJJZCIsIm93bmVyIiwiX2lkIiwiX2NhcmRJZCIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZVRyYXNoQnV0dG9uIiwiX2hhbmRsZUxpa2VDbGljayIsIl9nZXRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJnZXRDYXJkSWQiLCJ1cGRhdGVMaWtlcyIsIl9yZW5kZXJMaWtlcyIsIl9saWtlQ291bnQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsIl9pc0xpa2VkIiwiX2hlYXJ0QnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwic29tZSIsInVzZXIiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZSIsImV2dCIsInRhcmdldCIsIl9jYXJkRWxlbWVudCIsImNyZWF0ZUNhcmQiLCJjYXJkVGl0bGUiLCJhbHQiLCJzcmMiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWwiLCJpbnB1dExpc3QiLCJpbnB1dEVsIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zZXR0aW5ncyIsIl9mb3JtRWwiLCJidXR0b25FbGVtZW50IiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZWQiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvck1lc3NhZ2UiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImlucHV0SWQiLCJpZCIsImVycm9yRWwiLCJlcnJvckNsYXNzIiwiZW5hYmxlVmFsaWRhdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwiX3BvcHVwIiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIl9oYW5kbGVCdXR0b25DbG9zZSIsIl9oYW5kbGVPdmVybGF5Q2xvc2UiLCJfY2xvc2VCdXR0b24iLCJfZm9ybUxpc3QiLCJrZXkiLCJjbG9zZSIsIm9wZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9idXR0b24iLCJfYnV0dG9uT3JpZ2luYWxUZXh0Iiwic2V0U3VibWl0IiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImJ1dHRvblRleHQiLCJQb3B1cFdpdGhGb3JtIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRDb250ZW50IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0Q2xpY2siLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiaW1hZ2UiLCJpbWFnZUVsIiwiY2FwdGlvbiIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaW5pdGlhbEFycmF5IiwiX2NvbnRhaW5lciIsIl9yZW5kZXJlciIsInJlbmRlckl0ZW1zIiwiYXJyRWwiLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsIm5hbWVTZWxlY3RvciIsImpvYlNlbGVjdG9yIiwiYXZhdGFyU2VsZWN0b3IiLCJfbmFtZVNsb3QiLCJfam9iU2xvdCIsIl9hdmF0YXJTbG90Iiwic2V0VXNlckluZm8iLCJkYXRhIiwic2V0VXNlckF2YXRhciIsImNhcmRzQ29udGFpbmVyIiwiZWRpdFByb2ZpbGVJY29uIiwiYWRkUGljdHVyZUljb24iLCJlZGl0UHJvZmlsZUZvcm0iLCJhZGRQaWN0dXJlRm9ybSIsImVkaXRQcm9maWxlUGljRm9ybSIsImZvcm1GaWVsZEF1dGhvciIsImZvcm1GaWVsZFBpY3R1cmUiLCJpbnB1dFByb2ZpbGVOYW1lIiwiaW5wdXRQcm9maWxlVGl0bGUiLCJwcm9maWxlUGljSW5wdXQiLCJlZGl0UHJvZmlsZVBpY0ljb24iLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiYWN0aW9uIiwiY2FyZCIsImNhdGNoIiwiYWxlcnQiLCJyZW5kZXJDYXJkIiwiY2FyZEVsIiwiY2FyZFNlY3Rpb24iLCJwbGFjZVBvcHVwIiwiZmluYWxseSIsImltYWdlUG9wdXAiLCJkZWxldGVDYXJkQ29uZmlybWF0aW9uIiwiZmlsbFByb2ZpbGVGb3JtIiwicmVzdWx0IiwidXNlckluZm8iLCJoYW5kbGVPcGVuUHJvZmlsZUZvcm0iLCJhZGRQcm9maWxlRm9ybVZhbGlkYXRvciIsInByb2ZpbGVQb3B1cCIsImJ1dHRvbiIsInByb2ZpbGVQaWNQb3B1cCIsImFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yIiwiZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yIiwiaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtIiwiaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSIsImNhcmRzIl0sInNvdXJjZVJvb3QiOiIifQ==