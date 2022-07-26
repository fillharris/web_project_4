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
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
    this._formEl = this._popup.querySelector(".popup__form");
    this._button = this._formEl.querySelector(".popup__button");
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
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input-type_error",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBZkgsQ0FlVTFLLEdBQUQsSUFBUztFQUNkMkssS0FBSyxDQUFDM0ssR0FBRCxDQUFMO0FBQ0QsQ0FqQkgsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuICBpbml0aWFsaXplKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cbiAgX2hhbmRsZUZldGNoUmVzcG9uc2UocGF0aCwgbWV0aG9kVXNlZCA9IFwiR0VUXCIsIGJvZHlDb250ZW50ID0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kVXNlZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIpO1xuICB9XG4gIGVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGFib3V0OiBpbnB1dFZhbHVlcy5hYm91dCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBhZGROZXdDYXJkKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgbGluazogaW5wdXRWYWx1ZXMubGluayxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiLCBcIlBPU1RcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGdldENhcmRMaWtlSW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBkZWxldGVDYXJkKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cblxuICBhZGRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJQVVRcIik7XG4gIH1cbiAgcmVtb3ZlTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG4gIGVkaXRQcm9maWxlUGljKGF2YXRhckxpbmspIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGF2YXRhcjogYXZhdGFyTGluay5hdmF0YXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWUvYXZhdGFyXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG59XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApIHtcbiAgICB0aGlzLl9pbWFnZUxpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX3RleHQgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpa2VzID0gY2FyZERhdGEubGlrZXM7XG4gICAgdGhpcy5fY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgdGhpcy5fb3duZXJJZCA9IGNhcmREYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl9jYXJkSWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbiA9IGhhbmRsZVRyYXNoQnV0dG9uO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgfVxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgZ2V0Q2FyZElkKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkSWQ7XG4gIH1cbiAgdXBkYXRlTGlrZXMobGlrZXMpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG4gIH1cblxuICBfcmVuZGVyTGlrZXMoKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuICBfaXNMaWtlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlrZXMuc29tZSgodXNlcikgPT4ge1xuICAgICAgcmV0dXJuIHVzZXIuX2lkID09PSB0aGlzLl9jdXJyZW50VXNlcklkO1xuICAgIH0pO1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZV9hY3RpdmVcIikpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJyZW1vdmVcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcImFkZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl90cmFzaEJ1dHRvbikge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbih0aGlzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soZXZ0LnRhcmdldCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcbiAgfVxuICBjcmVhdGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gICAgdGhpcy5fbGlrZUNvdW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcbiAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fdGV4dDtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5faW1hZ2VMaW5rO1xuICAgIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX3RleHQ7XG5cbiAgICBpZiAodGhpcy5fb3duZXJJZCAhPT0gdGhpcy5fY3VycmVudFVzZXJJZCkge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcblxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiXG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBfaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT5cbiAgICBpbnB1dExpc3Quc29tZSgoaW5wdXRFbCkgPT4gIWlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRvcigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuLy8gY2hlY2tcbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlID0gdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UgPSB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlQnV0dG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIF9oYW5kbGVPdmVybGF5Q2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBUaHJlZSB3YXlzIHRvIGNsb3NlIHRoZSBwb3B1cDpcbiAgICAvLyAxKSBoaXQgRVNDIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgLy8gMikgbW91c2V1cCBvbiB0aGUgY2xvc2UgYnV0dG9uXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIC8vIDMpIG1vdXNldXAgb24gdGhlIG92ZXJsYXlcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXQoaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybUxpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fZm9ybVwiKV07XG4gICAgdGhpcy5fZm9ybUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuICBcbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19pbnB1dFwiKV07XG4gICAgY29uc3QgaW5wdXRDb250ZW50ID0ge307XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0Q29udGVudFtpbnB1dEVsLm5hbWVdID0gaW5wdXRFbC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5wdXRDb250ZW50O1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9mb3JtTGlzdC5mb3JFYWNoKChmb3JtRWwpID0+IHtcbiAgICAgIGZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLl9zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG4gIF9oYW5kbGVTdWJtaXRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHRoaXMuX2dldElucHV0VmFsdWVzKCk7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdChpbnB1dFZhbHVlcywgdGhpcy5fYnV0dG9uKTtcbiAgfTtcbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9mb3JtRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gIH1cbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcsIGJ1dHRvblRleHQpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0O1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gIH1cbiAgb3BlbihpbWFnZSkge1xuICAgIGNvbnN0IGltYWdlRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgIGltYWdlRWwuc3JjID0gaW1hZ2Uuc3JjO1xuICAgIGltYWdlRWwuYWx0ID0gaW1hZ2UuYWx0O1xuICAgIGNvbnN0IGNhcHRpb24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgY2FwdGlvbi50ZXh0Q29udGVudCA9IGltYWdlLmFsdDtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gIH1cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5LmZvckVhY2goKGFyckVsKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihhcnJFbCk7XG4gICAgfSk7XG4gIH1cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yLCBhdmF0YXJTZWxlY3RvciB9KSB7XG4gICAgdGhpcy5fbmFtZVNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5hbWVTZWxlY3Rvcik7XG4gICAgdGhpcy5fam9iU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xuICAgIHRoaXMuX2F2YXRhclNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGF2YXRhclNlbGVjdG9yKTtcbiAgfVxuICAvLyB0byBwb3B1bGF0ZSBmb3JtIGZpZWxkcyBhZnRlciBwb3B1cCBvcGVuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLl9uYW1lU2xvdC50ZXh0Q29udGVudCxcbiAgICAgIGFib3V0OiB0aGlzLl9qb2JTbG90LnRleHRDb250ZW50LFxuICAgICAgYXZhdGFyOiB0aGlzLl9hdmF0YXJTbG90LnNyYyxcbiAgICB9O1xuICB9XG4gIC8vIHVwb24gZm9ybSBzdWJtaXNzaW9uXG4gIHNldFVzZXJJbmZvKGRhdGEpIHtcbiAgICB0aGlzLl9uYW1lU2xvdC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9qb2JTbG90LnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbiAgICB0aGlzLl9hdmF0YXJTbG90LmFsdCA9IGAke2RhdGEubmFtZX1gO1xuICAgIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbiAgc2V0VXNlckF2YXRhcihkYXRhKSB7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19pbnB1dC10eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbn07XG5leHBvcnQgY29uc3QgY2FyZHNDb250YWluZXIgPSBcIi5waG90by1ncmlkX19jYXJkc1wiO1xuZXhwb3J0IGNvbnN0IGNhcmRTZWxlY3RvciA9IFwiI2NhcmQtdGVtcGxhdGVcIjtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy8gSW1wb3J0ZWQgQ2xhc3Nlc1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IHtcbiAgY2FyZHNDb250YWluZXIsXG4gIGNhcmRTZWxlY3RvcixcbiAgc2V0dGluZ3MsXG59IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpXCI7XG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtXCI7XG5cblxuY29uc3QgZWRpdFByb2ZpbGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbmZvLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgYWRkUGljdHVyZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBhZGRQaWN0dXJlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdmF0YXItcG9wdXBcIik7XG5jb25zdCBmb3JtRmllbGRBdXRob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuY29uc3QgZm9ybUZpZWxkUGljdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBsYWNlLWZvcm1cIik7XG5jb25zdCBpbnB1dFByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW5hbWVcIik7XG5jb25zdCBpbnB1dFByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVQaWNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXVybFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faWNvblwiKTtcblxuLy8gLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy8gLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vLyAvL0dyb3VwIElEOiBncm91cC0xMlxuXG4vLyBBUEkgY2xhc3NcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2xpY2soY2FyZElkLCBhY3Rpb24sIGNhcmQpIHtcbiAgaWYgKGFjdGlvbiA9PT0gXCJyZW1vdmVcIikge1xuICAgIGFwaVxuICAgICAgLnJlbW92ZUxpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGFwaVxuICAgICAgLmFkZExpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKFxuICAgIGlucHV0VmFsdWVzLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlVHJhc2hCdXR0b24sXG4gICAgY3VycmVudFVzZXJJZCxcbiAgICBoYW5kbGVMaWtlQ2xpY2tcbiAgKTtcbiAgY29uc3QgY2FyZEVsID0gY2FyZC5jcmVhdGVDYXJkKCk7XG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZEVsKTtcbn1cblxuY29uc3QgcGxhY2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuYWRkTmV3Q2FyZChpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpO1xuICAgICAgcGxhY2VQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmZ1bmN0aW9uIGhhbmRsZUNhcmRDbGljayhpbWFnZSkge1xuICBpbWFnZVBvcHVwLm9wZW4oaW1hZ2UpO1xufVxuXG5jb25zdCBkZWxldGVDYXJkQ29uZmlybWF0aW9uID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXCIuZGVsZXRlLXBvcHVwXCIpO1xuXG5mdW5jdGlvbiBoYW5kbGVUcmFzaEJ1dHRvbihjYXJkKSB7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uc2V0U3VibWl0KCgpID0+IHtcbiAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkLmdldENhcmRJZCgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJkLmRlbGV0ZUNhcmQoKTtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0pO1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLm9wZW4oKTtcbn1cblxubGV0IGNhcmRTZWN0aW9uID0gbnVsbDtcblxuZnVuY3Rpb24gZmlsbFByb2ZpbGVGb3JtKCkge1xuICBjb25zdCByZXN1bHQgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBpbnB1dFByb2ZpbGVOYW1lLnZhbHVlID0gcmVzdWx0Lm5hbWU7XG4gIGlucHV0UHJvZmlsZVRpdGxlLnZhbHVlID0gcmVzdWx0LmFib3V0O1xufVxuZnVuY3Rpb24gaGFuZGxlT3BlblByb2ZpbGVGb3JtKCkge1xuICBmb3JtRmllbGRBdXRob3IucmVzZXQoKTtcbiAgZmlsbFByb2ZpbGVGb3JtKCk7XG4gIGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUG9wdXAub3BlbigpO1xufVxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBuYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICBqb2JTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby10aXRsZVwiLFxuICBhdmF0YXJTZWxlY3RvcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcbmNvbnN0IHByb2ZpbGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbnB1dFZhbHVlcyk7XG4gICAgICBwcm9maWxlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IHByb2ZpbGVQaWNQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIi5hdmF0YXItcG9wdXBcIixcbiAgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5lZGl0UHJvZmlsZVBpYyhpbnB1dFZhbHVlcylcbiAgICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VyQXZhdGFyKGlucHV0VmFsdWVzKTtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBlZGl0UHJvZmlsZUZvcm0pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBhZGRQaWN0dXJlRm9ybSk7XG5hZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBzZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVQaWNGb3JtXG4pO1xuZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5mdW5jdGlvbiBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0oKSB7XG4gIGZvcm1GaWVsZFBpY3R1cmUucmVzZXQoKTtcblxuICBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcGxhY2VQb3B1cC5vcGVuKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0oKSB7XG4gIHByb2ZpbGVQaWNJbnB1dC52YWx1ZSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCkuYXZhdGFyO1xuICBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQaWNQb3B1cC5vcGVuKCk7XG59XG5hZGRQaWN0dXJlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0pO1xuZWRpdFByb2ZpbGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSk7XG5lZGl0UHJvZmlsZVBpY0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSk7XG5cbmxldCBjdXJyZW50VXNlcklkID0gbnVsbDtcbmFwaVxuICAuaW5pdGlhbGl6ZSgpXG4gIC50aGVuKChbdXNlciwgY2FyZHNdKSA9PiB7XG4gICAgY3VycmVudFVzZXJJZCA9IHVzZXIuX2lkO1xuICAgIGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGl0ZW1zOiBjYXJkcyxcbiAgICAgICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXG4gICAgICB9LFxuICAgICAgY2FyZHNDb250YWluZXJcbiAgICApO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XG5cbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyKTtcbiAgfSlcbiAgLmNhdGNoKChyZXMpID0+IHtcbiAgICBhbGVydChyZXMpO1xuICB9KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImluaXRpYWxpemUiLCJQcm9taXNlIiwiYWxsIiwiZ2V0VXNlckluZm8iLCJnZXRJbml0aWFsQ2FyZHMiLCJfaGFuZGxlRmV0Y2hSZXNwb25zZSIsInBhdGgiLCJtZXRob2RVc2VkIiwiYm9keUNvbnRlbnQiLCJ1bmRlZmluZWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwiZWRpdFVzZXJQcm9maWxlIiwiaW5wdXRWYWx1ZXMiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZSIsImFib3V0IiwiYWRkTmV3Q2FyZCIsImxpbmsiLCJnZXRDYXJkTGlrZUluZm8iLCJkZWxldGVDYXJkIiwiY2FyZElkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJlZGl0UHJvZmlsZVBpYyIsImF2YXRhckxpbmsiLCJhdmF0YXIiLCJDYXJkIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVUcmFzaEJ1dHRvbiIsImN1cnJlbnRVc2VySWQiLCJoYW5kbGVMaWtlQ2xpY2siLCJfaW1hZ2VMaW5rIiwiX3RleHQiLCJfbGlrZXMiLCJsaWtlcyIsIl9jdXJyZW50VXNlcklkIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl9jYXJkSWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVUcmFzaEJ1dHRvbiIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiZ2V0Q2FyZElkIiwidXBkYXRlTGlrZXMiLCJfcmVuZGVyTGlrZXMiLCJfbGlrZUNvdW50IiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJfaXNMaWtlZCIsIl9oZWFydEJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNvbWUiLCJ1c2VyIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5zIiwiX3RyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZSIsImV2dCIsInRhcmdldCIsIl9jYXJkRWxlbWVudCIsImNyZWF0ZUNhcmQiLCJjYXJkVGl0bGUiLCJhbHQiLCJzcmMiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWwiLCJpbnB1dExpc3QiLCJpbnB1dEVsIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zZXR0aW5ncyIsIl9mb3JtRWwiLCJidXR0b25FbGVtZW50IiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZWQiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvck1lc3NhZ2UiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImlucHV0SWQiLCJpZCIsImVycm9yRWwiLCJlcnJvckNsYXNzIiwiZW5hYmxlVmFsaWRhdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwiX3BvcHVwIiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsIl9oYW5kbGVCdXR0b25DbG9zZSIsIl9oYW5kbGVPdmVybGF5Q2xvc2UiLCJfY2xvc2VCdXR0b24iLCJfZm9ybUxpc3QiLCJrZXkiLCJjbG9zZSIsIm9wZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiUG9wdXBXaXRoQ29uZmlybSIsIl9idXR0b24iLCJfYnV0dG9uT3JpZ2luYWxUZXh0Iiwic2V0U3VibWl0IiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwicmVuZGVyTG9hZGluZyIsImlzTG9hZGluZyIsImJ1dHRvblRleHQiLCJQb3B1cFdpdGhGb3JtIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRDb250ZW50IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0Q2xpY2siLCJQb3B1cFdpdGhJbWFnZSIsImltYWdlIiwiaW1hZ2VFbCIsImNhcHRpb24iLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2luaXRpYWxBcnJheSIsIl9jb250YWluZXIiLCJfcmVuZGVyZXIiLCJyZW5kZXJJdGVtcyIsImFyckVsIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsImF2YXRhclNlbGVjdG9yIiwiX25hbWVTbG90IiwiX2pvYlNsb3QiLCJfYXZhdGFyU2xvdCIsInNldFVzZXJJbmZvIiwiZGF0YSIsInNldFVzZXJBdmF0YXIiLCJjYXJkc0NvbnRhaW5lciIsImVkaXRQcm9maWxlSWNvbiIsImFkZFBpY3R1cmVJY29uIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkUGljdHVyZUZvcm0iLCJlZGl0UHJvZmlsZVBpY0Zvcm0iLCJmb3JtRmllbGRBdXRob3IiLCJmb3JtRmllbGRQaWN0dXJlIiwiaW5wdXRQcm9maWxlTmFtZSIsImlucHV0UHJvZmlsZVRpdGxlIiwicHJvZmlsZVBpY0lucHV0IiwiZWRpdFByb2ZpbGVQaWNJY29uIiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsImFjdGlvbiIsImNhcmQiLCJjYXRjaCIsImFsZXJ0IiwicmVuZGVyQ2FyZCIsImNhcmRFbCIsImNhcmRTZWN0aW9uIiwicGxhY2VQb3B1cCIsImZpbmFsbHkiLCJpbWFnZVBvcHVwIiwiZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiIsImZpbGxQcm9maWxlRm9ybSIsInJlc3VsdCIsInVzZXJJbmZvIiwiaGFuZGxlT3BlblByb2ZpbGVGb3JtIiwicmVzZXQiLCJhZGRQcm9maWxlRm9ybVZhbGlkYXRvciIsInByb2ZpbGVQb3B1cCIsImJ1dHRvbiIsInByb2ZpbGVQaWNQb3B1cCIsImFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yIiwiZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yIiwiaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtIiwiaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSIsImNhcmRzIl0sInNvdXJjZVJvb3QiOiIifQ==