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
    this._formEl.forEach(formEl => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE0RCx1QkFBdUIsQ0FBQ3hGLGVBQXhCO0VBQ0E0RSxVQUFVLENBQUNoRSxJQUFYO0FBQ0Q7O0FBRUQsU0FBUytFLDRCQUFULEdBQXdDO0VBQ3RDMUIsZUFBZSxDQUFDdkMsS0FBaEIsR0FBd0J3RCxRQUFRLENBQUNoTSxXQUFULEdBQXVCK0IsTUFBL0M7RUFDQXdLLDJCQUEyQixDQUFDekYsZUFBNUI7RUFDQXVGLGVBQWUsQ0FBQzNFLElBQWhCO0FBQ0Q7O0FBQ0Q2QyxjQUFjLENBQUNoRyxnQkFBZixDQUFnQyxTQUFoQyxFQUEyQ2lJLHdCQUEzQztBQUNBbEMsZUFBZSxDQUFDL0YsZ0JBQWhCLENBQWlDLFNBQWpDLEVBQTRDMEgscUJBQTVDO0FBQ0FqQixrQkFBa0IsQ0FBQ3pHLGdCQUFuQixDQUFvQyxTQUFwQyxFQUErQ2tJLDRCQUEvQztBQUVBLElBQUlwSyxhQUFhLEdBQUcsSUFBcEI7QUFDQTRJLEdBQUcsQ0FDQXBMLFVBREgsR0FFR2EsSUFGSCxDQUVRLFFBQW1CO0VBQUEsSUFBbEIsQ0FBQzJELElBQUQsRUFBT3FJLEtBQVAsQ0FBa0I7RUFDdkJySyxhQUFhLEdBQUdnQyxJQUFJLENBQUN2QixHQUFyQjtFQUNBMkksV0FBVyxHQUFHLElBQUkxQywyREFBSixDQUNaO0lBQ0VFLEtBQUssRUFBRXlELEtBRFQ7SUFFRXhELFFBQVEsRUFBRXFDO0VBRlosQ0FEWSxFQUtabEIsaUVBTFksQ0FBZDtFQU9Bb0IsV0FBVyxDQUFDbkMsV0FBWjtFQUVBMEMsUUFBUSxDQUFDOUIsV0FBVCxDQUFxQjdGLElBQXJCO0FBQ0QsQ0FkSCxFQWVHZ0gsS0FmSCxDQWVVMUssR0FBRCxJQUFTO0VBQ2QySyxLQUFLLENBQUMzSyxHQUFELENBQUw7QUFDRCxDQWpCSCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG4gIGluaXRpYWxpemUoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuICBfaGFuZGxlRmV0Y2hSZXNwb25zZShwYXRoLCBtZXRob2RVc2VkID0gXCJHRVRcIiwgYm9keUNvbnRlbnQgPSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0ke3BhdGh9YCwge1xuICAgICAgbWV0aG9kOiBtZXRob2RVc2VkLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IGJvZHlDb250ZW50LFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIik7XG4gIH1cbiAgZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgYWJvdXQ6IGlucHV0VmFsdWVzLmFib3V0LFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBsaW5rOiBpbnB1dFZhbHVlcy5saW5rLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIsIFwiUE9TVFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgZ2V0Q2FyZExpa2VJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuXG4gIGFkZExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIlBVVFwiKTtcbiAgfVxuICByZW1vdmVMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cbiAgZWRpdFByb2ZpbGVQaWMoYXZhdGFyTGluaykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYXZhdGFyOiBhdmF0YXJMaW5rLmF2YXRhcixcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZS9hdmF0YXJcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbn1cbiIsImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICkge1xuICAgIHRoaXMuX2ltYWdlTGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5fdGV4dCA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGlrZXMgPSBjYXJkRGF0YS5saWtlcztcbiAgICB0aGlzLl9jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICB0aGlzLl9vd25lcklkID0gY2FyZERhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX2NhcmRJZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uID0gaGFuZGxlVHJhc2hCdXR0b247XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICB9XG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBnZXRDYXJkSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRJZDtcbiAgfVxuICB1cGRhdGVMaWtlcyhsaWtlcykge1xuICAgIHRoaXMuX2xpa2VzID0gbGlrZXM7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcbiAgfVxuXG4gIF9yZW5kZXJMaWtlcygpIHtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfVxuICB9XG4gIF9pc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9saWtlcy5zb21lKCh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlci5faWQgPT09IHRoaXMuX2N1cnJlbnRVc2VySWQ7XG4gICAgfSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgIC8vIGlmICh0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlX2FjdGl2ZVwiKSkge1xuICAgICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcInJlbW92ZVwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwiYWRkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX3RyYXNoQnV0dG9uKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQudGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG4gIGNyZWF0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2VzXCIpO1xuICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl90ZXh0O1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9pbWFnZUxpbms7XG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fdGV4dDtcblxuICAgIGlmICh0aGlzLl9vd25lcklkICE9PSB0aGlzLl9jdXJyZW50VXNlcklkKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmQ7XG4iLCJcbmNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICB9XG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIF9oYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PlxuICAgIGlucHV0TGlzdC5zb21lKChpbnB1dEVsKSA9PiAhaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdG9yKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG4vLyBjaGVja1xuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UgPSB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSA9IHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIildO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIF9oYW5kbGVCdXR0b25DbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgX2hhbmRsZU92ZXJsYXlDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRocmVlIHdheXMgdG8gY2xvc2UgdGhlIHBvcHVwOlxuICAgIC8vIDEpIGhpdCBFU0Mga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICAvLyAyKSBtb3VzZXVwIG9uIHRoZSBjbG9zZSBidXR0b25cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgLy8gMykgbW91c2V1cCBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldFN1Ym1pdChoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cbiAgXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUVsLmZvckVhY2goKGZvcm1FbCkgPT4ge1xuICAgICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbiAgX2hhbmRsZVN1Ym1pdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzLCB0aGlzLl9idXR0b24pO1xuICB9O1xuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm1FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBvcGVuKGltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VFbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgaW1hZ2VFbC5zcmMgPSBpbWFnZS5zcmM7XG4gICAgaW1hZ2VFbC5hbHQgPSBpbWFnZS5hbHQ7XG4gICAgY29uc3QgY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBjYXB0aW9uLnRleHRDb250ZW50ID0gaW1hZ2UuYWx0O1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgfVxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkuZm9yRWFjaCgoYXJyRWwpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGFyckVsKTtcbiAgICB9KTtcbiAgfVxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gICAgdGhpcy5fYXZhdGFyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXZhdGFyU2VsZWN0b3IpO1xuICB9XG4gIC8vIHRvIHBvcHVsYXRlIGZvcm0gZmllbGRzIGFmdGVyIHBvcHVwIG9wZW5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhdmF0YXI6IHRoaXMuX2F2YXRhclNsb3Quc3JjLFxuICAgIH07XG4gIH1cbiAgLy8gdXBvbiBmb3JtIHN1Ym1pc3Npb25cbiAgc2V0VXNlckluZm8oZGF0YSkge1xuICAgIHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuICAgIC8vIHRoaXMuX2F2YXRhclNsb3QuYWx0ID0gYCR7ZGF0YS5uYW1lfWA7XG4gICAgLy8gdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxuICBzZXRVc2VyQXZhdGFyKGRhdGEpIHtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J1dHRvblwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbn07XG5leHBvcnQgY29uc3QgY2FyZHNDb250YWluZXIgPSBcIi5waG90by1ncmlkX19jYXJkc1wiO1xuZXhwb3J0IGNvbnN0IGNhcmRTZWxlY3RvciA9IFwiI2NhcmQtdGVtcGxhdGVcIjtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy8gSW1wb3J0ZWQgQ2xhc3Nlc1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IHtcbiAgY2FyZHNDb250YWluZXIsXG4gIGNhcmRTZWxlY3RvcixcbiAgc2V0dGluZ3MsXG59IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpXCI7XG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtXCI7XG5cblxuY29uc3QgZWRpdFByb2ZpbGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbmZvLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgYWRkUGljdHVyZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBhZGRQaWN0dXJlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdmF0YXItcG9wdXBcIik7XG5jb25zdCBmb3JtRmllbGRBdXRob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuY29uc3QgZm9ybUZpZWxkUGljdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBsYWNlLWZvcm1cIik7XG5jb25zdCBpbnB1dFByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW5hbWVcIik7XG5jb25zdCBpbnB1dFByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVQaWNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXVybFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faWNvblwiKTtcblxuLy8gLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy8gLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vLyAvL0dyb3VwIElEOiBncm91cC0xMlxuXG4vLyBBUEkgY2xhc3NcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2xpY2soY2FyZElkLCBhY3Rpb24sIGNhcmQpIHtcbiAgaWYgKGFjdGlvbiA9PT0gXCJyZW1vdmVcIikge1xuICAgIGFwaVxuICAgICAgLnJlbW92ZUxpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGFwaVxuICAgICAgLmFkZExpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKFxuICAgIGlucHV0VmFsdWVzLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlVHJhc2hCdXR0b24sXG4gICAgY3VycmVudFVzZXJJZCxcbiAgICBoYW5kbGVMaWtlQ2xpY2tcbiAgKTtcbiAgY29uc3QgY2FyZEVsID0gY2FyZC5jcmVhdGVDYXJkKCk7XG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZEVsKTtcbn1cblxuY29uc3QgcGxhY2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuYWRkTmV3Q2FyZChpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpO1xuICAgICAgcGxhY2VQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmZ1bmN0aW9uIGhhbmRsZUNhcmRDbGljayhpbWFnZSkge1xuICBpbWFnZVBvcHVwLm9wZW4oaW1hZ2UpO1xufVxuXG5jb25zdCBkZWxldGVDYXJkQ29uZmlybWF0aW9uID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXCIuZGVsZXRlLXBvcHVwXCIpO1xuXG5mdW5jdGlvbiBoYW5kbGVUcmFzaEJ1dHRvbihjYXJkKSB7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uc2V0U3VibWl0KCgpID0+IHtcbiAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkLmdldENhcmRJZCgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJkLmRlbGV0ZUNhcmQoKTtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0pO1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLm9wZW4oKTtcbn1cblxubGV0IGNhcmRTZWN0aW9uID0gbnVsbDtcblxuZnVuY3Rpb24gZmlsbFByb2ZpbGVGb3JtKCkge1xuICBjb25zdCByZXN1bHQgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBpbnB1dFByb2ZpbGVOYW1lLnZhbHVlID0gcmVzdWx0Lm5hbWU7XG4gIGlucHV0UHJvZmlsZVRpdGxlLnZhbHVlID0gcmVzdWx0LmFib3V0O1xufVxuZnVuY3Rpb24gaGFuZGxlT3BlblByb2ZpbGVGb3JtKCkge1xuICAvLyBmb3JtRmllbGRBdXRob3IucmVzZXQoKTtcbiAgZmlsbFByb2ZpbGVGb3JtKCk7XG4gIGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUG9wdXAub3BlbigpO1xufVxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBuYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICBqb2JTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby10aXRsZVwiLFxuICBhdmF0YXJTZWxlY3RvcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcbmNvbnN0IHByb2ZpbGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbnB1dFZhbHVlcyk7XG4gICAgICBwcm9maWxlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IHByb2ZpbGVQaWNQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIi5hdmF0YXItcG9wdXBcIixcbiAgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5lZGl0UHJvZmlsZVBpYyhpbnB1dFZhbHVlcylcbiAgICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VyQXZhdGFyKGlucHV0VmFsdWVzKTtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBlZGl0UHJvZmlsZUZvcm0pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBhZGRQaWN0dXJlRm9ybSk7XG5hZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBzZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVQaWNGb3JtXG4pO1xuZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5mdW5jdGlvbiBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0oKSB7XG4gIGZvcm1GaWVsZFBpY3R1cmUucmVzZXQoKTtcblxuICBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcGxhY2VQb3B1cC5vcGVuKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0oKSB7XG4gIHByb2ZpbGVQaWNJbnB1dC52YWx1ZSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCkuYXZhdGFyO1xuICBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQaWNQb3B1cC5vcGVuKCk7XG59XG5hZGRQaWN0dXJlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0pO1xuZWRpdFByb2ZpbGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSk7XG5lZGl0UHJvZmlsZVBpY0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSk7XG5cbmxldCBjdXJyZW50VXNlcklkID0gbnVsbDtcbmFwaVxuICAuaW5pdGlhbGl6ZSgpXG4gIC50aGVuKChbdXNlciwgY2FyZHNdKSA9PiB7XG4gICAgY3VycmVudFVzZXJJZCA9IHVzZXIuX2lkO1xuICAgIGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGl0ZW1zOiBjYXJkcyxcbiAgICAgICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXG4gICAgICB9LFxuICAgICAgY2FyZHNDb250YWluZXJcbiAgICApO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XG5cbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyKTtcbiAgfSlcbiAgLmNhdGNoKChyZXMpID0+IHtcbiAgICBhbGVydChyZXMpO1xuICB9KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImluaXRpYWxpemUiLCJQcm9taXNlIiwiYWxsIiwiZ2V0VXNlckluZm8iLCJnZXRJbml0aWFsQ2FyZHMiLCJfaGFuZGxlRmV0Y2hSZXNwb25zZSIsInBhdGgiLCJtZXRob2RVc2VkIiwiYm9keUNvbnRlbnQiLCJ1bmRlZmluZWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwiZWRpdFVzZXJQcm9maWxlIiwiaW5wdXRWYWx1ZXMiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZSIsImFib3V0IiwiYWRkTmV3Q2FyZCIsImxpbmsiLCJnZXRDYXJkTGlrZUluZm8iLCJkZWxldGVDYXJkIiwiY2FyZElkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJlZGl0UHJvZmlsZVBpYyIsImF2YXRhckxpbmsiLCJhdmF0YXIiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVUcmFzaEJ1dHRvbiIsImN1cnJlbnRVc2VySWQiLCJoYW5kbGVMaWtlQ2xpY2siLCJfaW1hZ2VMaW5rIiwiX3RleHQiLCJfbGlrZXMiLCJsaWtlcyIsIl9jdXJyZW50VXNlcklkIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl9jYXJkSWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVUcmFzaEJ1dHRvbiIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiZ2V0Q2FyZElkIiwidXBkYXRlTGlrZXMiLCJfcmVuZGVyTGlrZXMiLCJfbGlrZUNvdW50IiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJfaXNMaWtlZCIsIl9oZWFydEJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNvbWUiLCJ1c2VyIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl90cmFzaEJ1dHRvbiIsIl9jYXJkSW1hZ2UiLCJldnQiLCJ0YXJnZXQiLCJfY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiY2FyZFRpdGxlIiwiYWx0Iiwic3JjIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsIiwiaW5wdXRMaXN0IiwiaW5wdXRFbCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsIiwiYnV0dG9uRWxlbWVudCIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpbnB1dElkIiwiaWQiLCJlcnJvckVsIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJfaGFuZGxlQnV0dG9uQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsb3NlIiwiX2Nsb3NlQnV0dG9uIiwiX2Zvcm1MaXN0Iiwia2V5IiwiY2xvc2UiLCJvcGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBvcHVwV2l0aENvbmZpcm0iLCJfYnV0dG9uIiwiX2J1dHRvbk9yaWdpbmFsVGV4dCIsInNldFN1Ym1pdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b25UZXh0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0Q29udGVudCIsInZhbHVlIiwiX2hhbmRsZVN1Ym1pdENsaWNrIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsImltYWdlIiwiaW1hZ2VFbCIsImNhcHRpb24iLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2luaXRpYWxBcnJheSIsIl9jb250YWluZXIiLCJfcmVuZGVyZXIiLCJyZW5kZXJJdGVtcyIsImFyckVsIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsImF2YXRhclNlbGVjdG9yIiwiX25hbWVTbG90IiwiX2pvYlNsb3QiLCJfYXZhdGFyU2xvdCIsInNldFVzZXJJbmZvIiwiZGF0YSIsInNldFVzZXJBdmF0YXIiLCJjYXJkc0NvbnRhaW5lciIsImVkaXRQcm9maWxlSWNvbiIsImFkZFBpY3R1cmVJY29uIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkUGljdHVyZUZvcm0iLCJlZGl0UHJvZmlsZVBpY0Zvcm0iLCJmb3JtRmllbGRBdXRob3IiLCJmb3JtRmllbGRQaWN0dXJlIiwiaW5wdXRQcm9maWxlTmFtZSIsImlucHV0UHJvZmlsZVRpdGxlIiwicHJvZmlsZVBpY0lucHV0IiwiZWRpdFByb2ZpbGVQaWNJY29uIiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsImFjdGlvbiIsImNhcmQiLCJjYXRjaCIsImFsZXJ0IiwicmVuZGVyQ2FyZCIsImNhcmRFbCIsImNhcmRTZWN0aW9uIiwicGxhY2VQb3B1cCIsImZpbmFsbHkiLCJpbWFnZVBvcHVwIiwiZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiIsImZpbGxQcm9maWxlRm9ybSIsInJlc3VsdCIsInVzZXJJbmZvIiwiaGFuZGxlT3BlblByb2ZpbGVGb3JtIiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlUG9wdXAiLCJidXR0b24iLCJwcm9maWxlUGljUG9wdXAiLCJhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciIsImVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciIsImhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSIsImhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0iLCJjYXJkcyJdLCJzb3VyY2VSb290IjoiIn0=