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
const addPictureForm = document.querySelector(".popup__preview-image");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlLE1BQU1BLEdBQU4sQ0FBVTtFQUN2QkMsV0FBVyxPQUF1QjtJQUFBLElBQXRCO01BQUVDLE9BQUY7TUFBV0M7SUFBWCxDQUFzQjtJQUNoQyxLQUFLQyxRQUFMLEdBQWdCRixPQUFoQjtJQUNBLEtBQUtHLFFBQUwsR0FBZ0JGLE9BQWhCO0VBQ0Q7O0VBQ0RHLFVBQVUsR0FBRztJQUNYLE9BQU9DLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLENBQUMsS0FBS0MsV0FBTCxFQUFELEVBQXFCLEtBQUtDLGVBQUwsRUFBckIsQ0FBWixDQUFQO0VBQ0Q7O0VBQ0RDLG9CQUFvQixDQUFDQyxJQUFELEVBQW9EO0lBQUEsSUFBN0NDLFVBQTZDLHVFQUFoQyxLQUFnQztJQUFBLElBQXpCQyxXQUF5Qix1RUFBWEMsU0FBVztJQUN0RSxPQUFPQyxLQUFLLFdBQUksS0FBS1osUUFBVCxTQUFvQlEsSUFBcEIsR0FBNEI7TUFDdENLLE1BQU0sRUFBRUosVUFEOEI7TUFFdENWLE9BQU8sRUFBRSxLQUFLRSxRQUZ3QjtNQUd0Q2EsSUFBSSxFQUFFSjtJQUhnQyxDQUE1QixDQUFMLENBSUpLLElBSkksQ0FJRUMsR0FBRCxJQUFTO01BQ2YsSUFBSUEsR0FBRyxDQUFDQyxFQUFSLEVBQVk7UUFDVixPQUFPRCxHQUFHLENBQUNFLElBQUosRUFBUDtNQUNELENBRkQsTUFFTztRQUNMLE9BQU9mLE9BQU8sQ0FBQ2dCLE1BQVIsa0JBQXlCSCxHQUFHLENBQUNJLE1BQTdCLEVBQVA7TUFDRDtJQUNGLENBVk0sQ0FBUDtFQVdEOztFQUNEZCxlQUFlLEdBQUc7SUFDaEIsT0FBTyxLQUFLQyxvQkFBTCxDQUEwQixRQUExQixDQUFQO0VBQ0Q7O0VBQ0RGLFdBQVcsR0FBRztJQUNaLE9BQU8sS0FBS0Usb0JBQUwsQ0FBMEIsV0FBMUIsQ0FBUDtFQUNEOztFQUNEYyxlQUFlLENBQUNDLFdBQUQsRUFBYztJQUMzQixNQUFNWixXQUFXLEdBQUdhLElBQUksQ0FBQ0MsU0FBTCxDQUFlO01BQ2pDQyxJQUFJLEVBQUVILFdBQVcsQ0FBQ0csSUFEZTtNQUVqQ0MsS0FBSyxFQUFFSixXQUFXLENBQUNJO0lBRmMsQ0FBZixDQUFwQjtJQUlBLE9BQU8sS0FBS25CLG9CQUFMLENBQTBCLFdBQTFCLEVBQXVDLE9BQXZDLEVBQWdERyxXQUFoRCxDQUFQO0VBQ0Q7O0VBQ0RpQixVQUFVLENBQUNMLFdBQUQsRUFBYztJQUN0QixNQUFNWixXQUFXLEdBQUdhLElBQUksQ0FBQ0MsU0FBTCxDQUFlO01BQ2pDQyxJQUFJLEVBQUVILFdBQVcsQ0FBQ0csSUFEZTtNQUVqQ0csSUFBSSxFQUFFTixXQUFXLENBQUNNO0lBRmUsQ0FBZixDQUFwQjtJQUlBLE9BQU8sS0FBS3JCLG9CQUFMLENBQTBCLFFBQTFCLEVBQW9DLE1BQXBDLEVBQTRDRyxXQUE1QyxDQUFQO0VBQ0Q7O0VBQ0RtQixlQUFlLEdBQUc7SUFDaEIsT0FBTyxLQUFLdEIsb0JBQUwsQ0FBMEIsUUFBMUIsQ0FBUDtFQUNEOztFQUNEdUIsVUFBVSxDQUFDQyxNQUFELEVBQVM7SUFDakIsT0FBTyxLQUFLeEIsb0JBQUwsa0JBQW9Dd0IsTUFBcEMsR0FBOEMsUUFBOUMsQ0FBUDtFQUNEOztFQUVEQyxPQUFPLENBQUNELE1BQUQsRUFBUztJQUNkLE9BQU8sS0FBS3hCLG9CQUFMLHdCQUEwQ3dCLE1BQTFDLEdBQW9ELEtBQXBELENBQVA7RUFDRDs7RUFDREUsVUFBVSxDQUFDRixNQUFELEVBQVM7SUFDakIsT0FBTyxLQUFLeEIsb0JBQUwsd0JBQTBDd0IsTUFBMUMsR0FBb0QsUUFBcEQsQ0FBUDtFQUNEOztFQUNERyxjQUFjLENBQUNDLFVBQUQsRUFBYTtJQUN6QixNQUFNekIsV0FBVyxHQUFHYSxJQUFJLENBQUNDLFNBQUwsQ0FBZTtNQUNqQ1ksTUFBTSxFQUFFRCxVQUFVLENBQUNDO0lBRGMsQ0FBZixDQUFwQjtJQUdBLE9BQU8sS0FBSzdCLG9CQUFMLENBQTBCLGtCQUExQixFQUE4QyxPQUE5QyxFQUF1REcsV0FBdkQsQ0FBUDtFQUNEOztBQTNEc0I7Ozs7Ozs7Ozs7Ozs7O0FDQXpCLE1BQU0yQixJQUFOLENBQVc7RUFDVHhDLFdBQVcsQ0FDVHlDLFFBRFMsRUFFVEMsWUFGUyxFQUdUQyxlQUhTLEVBSVRDLGlCQUpTLEVBS1RDLGFBTFMsRUFNVEMsZUFOUyxFQU9UO0lBQ0EsS0FBS0MsVUFBTCxHQUFrQk4sUUFBUSxDQUFDVixJQUEzQjtJQUNBLEtBQUtpQixLQUFMLEdBQWFQLFFBQVEsQ0FBQ2IsSUFBdEI7SUFDQSxLQUFLcUIsTUFBTCxHQUFjUixRQUFRLENBQUNTLEtBQXZCO0lBQ0EsS0FBS0MsY0FBTCxHQUFzQk4sYUFBdEI7SUFDQSxLQUFLTyxRQUFMLEdBQWdCWCxRQUFRLENBQUNZLEtBQVQsQ0FBZUMsR0FBL0I7SUFDQSxLQUFLQyxPQUFMLEdBQWVkLFFBQVEsQ0FBQ2EsR0FBeEI7SUFDQSxLQUFLRSxhQUFMLEdBQXFCZCxZQUFyQjtJQUNBLEtBQUtlLGdCQUFMLEdBQXdCZCxlQUF4QjtJQUNBLEtBQUtlLGtCQUFMLEdBQTBCZCxpQkFBMUI7SUFDQSxLQUFLZSxnQkFBTCxHQUF3QmIsZUFBeEI7RUFDRDs7RUFDRGMsWUFBWSxHQUFHO0lBQ2IsT0FBT0MsUUFBUSxDQUNaQyxhQURJLENBQ1UsS0FBS04sYUFEZixFQUVKTyxPQUZJLENBRUlELGFBRkosQ0FFa0IsT0FGbEIsRUFHSkUsU0FISSxDQUdNLElBSE4sQ0FBUDtFQUlEOztFQUNEQyxTQUFTLEdBQUc7SUFDVixPQUFPLEtBQUtWLE9BQVo7RUFDRDs7RUFDRFcsV0FBVyxDQUFDaEIsS0FBRCxFQUFRO0lBQ2pCLEtBQUtELE1BQUwsR0FBY0MsS0FBZDs7SUFDQSxLQUFLaUIsWUFBTDtFQUNEOztFQUVEQSxZQUFZLEdBQUc7SUFDYixLQUFLQyxVQUFMLENBQWdCQyxXQUFoQixHQUE4QixLQUFLcEIsTUFBTCxDQUFZcUIsTUFBMUM7O0lBQ0EsSUFBSSxLQUFLQyxRQUFMLEVBQUosRUFBcUI7TUFDbkIsS0FBS0MsWUFBTCxDQUFrQkMsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLG1CQUFoQztJQUNELENBRkQsTUFFTztNQUNMLEtBQUtGLFlBQUwsQ0FBa0JDLFNBQWxCLENBQTRCRSxNQUE1QixDQUFtQyxtQkFBbkM7SUFDRDtFQUNGOztFQUNESixRQUFRLEdBQUc7SUFDVCxPQUFPLEtBQUt0QixNQUFMLENBQVkyQixJQUFaLENBQWtCQyxJQUFELElBQVU7TUFDaEMsT0FBT0EsSUFBSSxDQUFDdkIsR0FBTCxLQUFhLEtBQUtILGNBQXpCO0lBQ0QsQ0FGTSxDQUFQO0VBR0Q7O0VBQ0QyQixrQkFBa0IsR0FBRztJQUNuQixLQUFLTixZQUFMLENBQWtCTyxnQkFBbEIsQ0FBbUMsU0FBbkMsRUFBOEMsTUFBTTtNQUNsRCxJQUFJLEtBQUtQLFlBQUwsQ0FBa0JDLFNBQWxCLENBQTRCTyxRQUE1QixDQUFxQyxtQkFBckMsQ0FBSixFQUErRDtRQUM3RCxLQUFLckIsZ0JBQUwsQ0FBc0IsS0FBS0osT0FBM0IsRUFBb0MsUUFBcEMsRUFBOEMsSUFBOUM7TUFDRCxDQUZELE1BRU87UUFDTCxLQUFLSSxnQkFBTCxDQUFzQixLQUFLSixPQUEzQixFQUFvQyxLQUFwQyxFQUEyQyxJQUEzQztNQUNEO0lBQ0YsQ0FORDs7SUFRQSxJQUFJLEtBQUswQixZQUFULEVBQXVCO01BQ3JCLEtBQUtBLFlBQUwsQ0FBa0JGLGdCQUFsQixDQUFtQyxTQUFuQyxFQUE4QyxNQUFNO1FBQ2xELEtBQUtyQixrQkFBTCxDQUF3QixJQUF4QjtNQUNELENBRkQ7SUFHRDs7SUFFRCxLQUFLd0IsVUFBTCxDQUFnQkgsZ0JBQWhCLENBQWlDLFNBQWpDLEVBQTZDSSxHQUFELElBQVM7TUFDbkQsS0FBSzFCLGdCQUFMLENBQXNCMEIsR0FBRyxDQUFDQyxNQUExQjtJQUNELENBRkQ7RUFHRDs7RUFFRG5ELFVBQVUsR0FBRztJQUNYLEtBQUtvRCxZQUFMLENBQWtCVixNQUFsQjs7SUFDQSxLQUFLVSxZQUFMLEdBQW9CLElBQXBCO0VBQ0Q7O0VBQ0RDLFVBQVUsR0FBRztJQUNYLEtBQUtELFlBQUwsR0FBb0IsS0FBS3pCLFlBQUwsRUFBcEI7SUFDQSxLQUFLc0IsVUFBTCxHQUFrQixLQUFLRyxZQUFMLENBQWtCdkIsYUFBbEIsQ0FBZ0MsY0FBaEMsQ0FBbEI7O0lBQ0EsTUFBTXlCLFNBQVMsR0FBRyxLQUFLRixZQUFMLENBQWtCdkIsYUFBbEIsQ0FBZ0MsY0FBaEMsQ0FBbEI7O0lBQ0EsS0FBS00sVUFBTCxHQUFrQixLQUFLaUIsWUFBTCxDQUFrQnZCLGFBQWxCLENBQWdDLGNBQWhDLENBQWxCO0lBQ0EsS0FBS21CLFlBQUwsR0FBb0IsS0FBS0ksWUFBTCxDQUFrQnZCLGFBQWxCLENBQWdDLHNCQUFoQyxDQUFwQjtJQUNBLEtBQUtVLFlBQUwsR0FBb0IsS0FBS2EsWUFBTCxDQUFrQnZCLGFBQWxCLENBQWdDLG9CQUFoQyxDQUFwQjtJQUVBLEtBQUtvQixVQUFMLENBQWdCTSxHQUFoQixHQUFzQixLQUFLeEMsS0FBM0I7SUFDQSxLQUFLa0MsVUFBTCxDQUFnQk8sR0FBaEIsR0FBc0IsS0FBSzFDLFVBQTNCO0lBQ0F3QyxTQUFTLENBQUNsQixXQUFWLEdBQXdCLEtBQUtyQixLQUE3Qjs7SUFFQSxJQUFJLEtBQUtJLFFBQUwsS0FBa0IsS0FBS0QsY0FBM0IsRUFBMkM7TUFDekMsS0FBSzhCLFlBQUwsQ0FBa0JOLE1BQWxCOztNQUNBLEtBQUtNLFlBQUwsR0FBb0IsSUFBcEI7SUFDRDs7SUFDRCxLQUFLSCxrQkFBTDs7SUFDQSxLQUFLWCxZQUFMOztJQUVBLE9BQU8sS0FBS2tCLFlBQVo7RUFDRDs7QUEzRlE7O0FBOEZYLGlFQUFlN0MsSUFBZjs7Ozs7Ozs7Ozs7Ozs7OztBQzdGQSxNQUFNa0QsYUFBTixDQUFvQjtFQUNsQjFGLFdBQVcsQ0FBQzJGLFFBQUQsRUFBV0MsTUFBWCxFQUFtQjtJQUFBLDBDQTJCVkMsU0FBRCxJQUNqQkEsU0FBUyxDQUFDakIsSUFBVixDQUFnQmtCLE9BQUQsSUFBYSxDQUFDQSxPQUFPLENBQUNDLFFBQVIsQ0FBaUJDLEtBQTlDLENBNUI0Qjs7SUFDNUIsS0FBS0MsU0FBTCxHQUFpQk4sUUFBakI7SUFDQSxLQUFLTyxPQUFMLEdBQWVOLE1BQWY7RUFDRDs7RUFFRGQsa0JBQWtCLENBQUNlLFNBQUQsRUFBWU0sYUFBWixFQUEyQjtJQUMzQ04sU0FBUyxDQUFDTyxPQUFWLENBQW1CTixPQUFELElBQWE7TUFDN0JBLE9BQU8sQ0FBQ2YsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsTUFBTTtRQUN0QyxLQUFLc0IsbUJBQUwsQ0FBeUJQLE9BQXpCOztRQUNBLEtBQUtRLGtCQUFMLENBQXdCVCxTQUF4QixFQUFtQ00sYUFBbkM7TUFDRCxDQUhEO0lBSUQsQ0FMRDtFQU1EOztFQUNERSxtQkFBbUIsQ0FBQ1AsT0FBRCxFQUFVO0lBQzNCLElBQUksQ0FBQ0EsT0FBTyxDQUFDQyxRQUFSLENBQWlCQyxLQUF0QixFQUE2QjtNQUMzQixLQUFLTyxlQUFMLENBQXFCVCxPQUFyQjtJQUNELENBRkQsTUFFTztNQUNMLEtBQUtVLGVBQUwsQ0FBcUJWLE9BQXJCO0lBQ0Q7RUFDRjs7RUFDRFEsa0JBQWtCLENBQUNULFNBQUQsRUFBWU0sYUFBWixFQUEyQjtJQUMzQyxJQUFJLEtBQUtNLGdCQUFMLENBQXNCWixTQUF0QixDQUFKLEVBQXNDO01BQ3BDTSxhQUFhLENBQUNPLFFBQWQsR0FBeUIsSUFBekI7SUFDRCxDQUZELE1BRU87TUFDTFAsYUFBYSxDQUFDTyxRQUFkLEdBQXlCLEtBQXpCO0lBQ0Q7RUFDRjs7RUFJREgsZUFBZSxDQUFDVCxPQUFELEVBQVU7SUFDdkJBLE9BQU8sQ0FBQ3JCLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLEtBQUt1QixTQUFMLENBQWVVLGVBQXJDO0lBQ0EsTUFBTUMsWUFBWSxHQUFHZCxPQUFPLENBQUNlLGlCQUE3QjtJQUNBLE1BQU1DLE9BQU8sR0FBR2hCLE9BQU8sQ0FBQ2lCLEVBQXhCOztJQUNBLE1BQU1DLE9BQU8sR0FBRyxLQUFLZCxPQUFMLENBQWFwQyxhQUFiLFlBQStCZ0QsT0FBL0IsWUFBaEI7O0lBQ0FFLE9BQU8sQ0FBQzNDLFdBQVIsR0FBc0J1QyxZQUF0QjtJQUNBSSxPQUFPLENBQUN2QyxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixLQUFLdUIsU0FBTCxDQUFlZ0IsVUFBckM7RUFDRDs7RUFDRFQsZUFBZSxDQUFDVixPQUFELEVBQVU7SUFDdkJBLE9BQU8sQ0FBQ3JCLFNBQVIsQ0FBa0JFLE1BQWxCLENBQXlCLEtBQUtzQixTQUFMLENBQWVVLGVBQXhDO0lBQ0EsTUFBTUcsT0FBTyxHQUFHaEIsT0FBTyxDQUFDaUIsRUFBeEI7O0lBQ0EsTUFBTUMsT0FBTyxHQUFHLEtBQUtkLE9BQUwsQ0FBYXBDLGFBQWIsWUFBK0JnRCxPQUEvQixZQUFoQjs7SUFDQUUsT0FBTyxDQUFDM0MsV0FBUixHQUFzQixFQUF0QjtJQUNBMkMsT0FBTyxDQUFDdkMsU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUIsS0FBS3NCLFNBQUwsQ0FBZWdCLFVBQXhDO0VBQ0Q7O0VBQ0RDLGVBQWUsR0FBRztJQUNoQixNQUFNckIsU0FBUyxHQUFHLENBQ2hCLEdBQUcsS0FBS0ssT0FBTCxDQUFhaUIsZ0JBQWIsQ0FBOEIsS0FBS2xCLFNBQUwsQ0FBZW1CLGFBQTdDLENBRGEsQ0FBbEI7O0lBR0EsTUFBTWpCLGFBQWEsR0FBRyxLQUFLRCxPQUFMLENBQWFwQyxhQUFiLENBQ3BCLEtBQUttQyxTQUFMLENBQWVvQixvQkFESyxDQUF0Qjs7SUFHQSxLQUFLbkIsT0FBTCxDQUFhbkIsZ0JBQWIsQ0FBOEIsUUFBOUIsRUFBeUNJLEdBQUQsSUFBUztNQUMvQ0EsR0FBRyxDQUFDbUMsY0FBSjtJQUNELENBRkQ7O0lBR0EsS0FBS3hDLGtCQUFMLENBQXdCZSxTQUF4QixFQUFtQ00sYUFBbkM7RUFDRDs7RUFDRG9CLGVBQWUsR0FBRztJQUNoQixNQUFNMUIsU0FBUyxHQUFHLENBQ2hCLEdBQUcsS0FBS0ssT0FBTCxDQUFhaUIsZ0JBQWIsQ0FBOEIsS0FBS2xCLFNBQUwsQ0FBZW1CLGFBQTdDLENBRGEsQ0FBbEI7O0lBR0EsTUFBTWpCLGFBQWEsR0FBRyxLQUFLRCxPQUFMLENBQWFwQyxhQUFiLENBQ3BCLEtBQUttQyxTQUFMLENBQWVvQixvQkFESyxDQUF0Qjs7SUFHQXhCLFNBQVMsQ0FBQ08sT0FBVixDQUFtQk4sT0FBRCxJQUFhO01BQzdCLEtBQUtVLGVBQUwsQ0FBcUJWLE9BQXJCO0lBQ0QsQ0FGRDs7SUFHQSxLQUFLUSxrQkFBTCxDQUF3QlQsU0FBeEIsRUFBbUNNLGFBQW5DO0VBQ0Q7O0FBckVpQixFQXVFcEI7OztBQUNBLGlFQUFlVCxhQUFmOzs7Ozs7Ozs7Ozs7OztBQ3pFZSxNQUFNOEIsS0FBTixDQUFZO0VBQ3pCeEgsV0FBVyxDQUFDeUgsYUFBRCxFQUFnQjtJQUN6QixLQUFLQyxNQUFMLEdBQWM3RCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIyRCxhQUF2QixDQUFkO0lBQ0EsS0FBS0UsZUFBTCxHQUF1QixLQUFLQSxlQUFMLENBQXFCQyxJQUFyQixDQUEwQixJQUExQixDQUF2QjtJQUNBLEtBQUtDLGtCQUFMLEdBQTBCLEtBQUtBLGtCQUFMLENBQXdCRCxJQUF4QixDQUE2QixJQUE3QixDQUExQjtJQUNBLEtBQUtFLG1CQUFMLEdBQTJCLEtBQUtBLG1CQUFMLENBQXlCRixJQUF6QixDQUE4QixJQUE5QixDQUEzQjtJQUNBLEtBQUtHLFlBQUwsR0FBb0IsS0FBS0wsTUFBTCxDQUFZNUQsYUFBWixDQUEwQixzQkFBMUIsQ0FBcEI7SUFDQSxLQUFLa0UsU0FBTCxHQUFpQixDQUFDLEdBQUcsS0FBS04sTUFBTCxDQUFZUCxnQkFBWixDQUE2QixjQUE3QixDQUFKLENBQWpCO0VBQ0Q7O0VBRURRLGVBQWUsQ0FBQ3hDLEdBQUQsRUFBTTtJQUNuQixJQUFJQSxHQUFHLENBQUM4QyxHQUFKLEtBQVksUUFBaEIsRUFBMEI7TUFDeEIsS0FBS0MsS0FBTDtJQUNEO0VBQ0Y7O0VBQ0RMLGtCQUFrQixHQUFHO0lBQ25CLEtBQUtLLEtBQUw7RUFDRDs7RUFDREosbUJBQW1CLENBQUMzQyxHQUFELEVBQU07SUFDdkIsSUFBSUEsR0FBRyxDQUFDQyxNQUFKLEtBQWUsS0FBS3NDLE1BQXhCLEVBQWdDO01BQzlCLEtBQUtRLEtBQUw7SUFDRDtFQUNGOztFQUNEQyxJQUFJLEdBQUc7SUFDTCxLQUFLckQsa0JBQUw7O0lBRUEsS0FBSzRDLE1BQUwsQ0FBWWpELFNBQVosQ0FBc0JDLEdBQXRCLENBQTBCLFlBQTFCO0VBQ0Q7O0VBQ0R3RCxLQUFLLEdBQUc7SUFDTixLQUFLUixNQUFMLENBQVlqRCxTQUFaLENBQXNCRSxNQUF0QixDQUE2QixZQUE3Qjs7SUFFQWQsUUFBUSxDQUFDdUUsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS1QsZUFBM0M7O0lBQ0EsS0FBS0ksWUFBTCxDQUFrQkssbUJBQWxCLENBQXNDLFNBQXRDLEVBQWlELEtBQUtQLGtCQUF0RDs7SUFDQSxLQUFLSCxNQUFMLENBQVlVLG1CQUFaLENBQWdDLFNBQWhDLEVBQTJDLEtBQUtOLG1CQUFoRDtFQUNEOztFQUVEaEQsa0JBQWtCLEdBQUc7SUFDbkI7SUFDQTtJQUNBakIsUUFBUSxDQUFDa0IsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsS0FBSzRDLGVBQXhDLEVBSG1CLENBSW5COztJQUNBLEtBQUtJLFlBQUwsQ0FBa0JoRCxnQkFBbEIsQ0FBbUMsU0FBbkMsRUFBOEMsS0FBSzhDLGtCQUFuRCxFQUxtQixDQU1uQjs7O0lBQ0EsS0FBS0gsTUFBTCxDQUFZM0MsZ0JBQVosQ0FBNkIsU0FBN0IsRUFBd0MsS0FBSytDLG1CQUE3QztFQUNEOztBQTVDd0I7Ozs7Ozs7Ozs7Ozs7OztBQ0EzQjtBQUVlLE1BQU1PLGdCQUFOLFNBQStCYiw4Q0FBL0IsQ0FBcUM7RUFDbER4SCxXQUFXLENBQUN5SCxhQUFELEVBQWdCO0lBQ3pCLE1BQU1BLGFBQU47SUFDQSxLQUFLYSxPQUFMLEdBQWUsS0FBS1osTUFBTCxDQUFZNUQsYUFBWixDQUEwQixnQkFBMUIsQ0FBZjtJQUNBLEtBQUt5RSxtQkFBTCxHQUEyQixLQUFLRCxPQUFMLENBQWFqRSxXQUF4QztFQUNEOztFQUVEbUUsU0FBUyxDQUFDQyxnQkFBRCxFQUFtQjtJQUMxQixLQUFLQyxpQkFBTCxHQUF5QkQsZ0JBQXpCO0VBQ0Q7O0VBQ0RQLEtBQUssR0FBRztJQUNOLE1BQU1BLEtBQU47O0lBQ0EsS0FBS0ksT0FBTCxDQUFhRixtQkFBYixDQUFpQyxTQUFqQyxFQUE0QyxLQUFLTSxpQkFBakQ7RUFDRDs7RUFDRFAsSUFBSSxHQUFHO0lBQ0wsTUFBTUEsSUFBTjs7SUFDQSxLQUFLRyxPQUFMLENBQWF2RCxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxLQUFLMkQsaUJBQTlDO0VBQ0Q7O0VBQ0RDLGFBQWEsQ0FBQ0MsU0FBRCxFQUFZQyxVQUFaLEVBQXdCO0lBQ25DLElBQUlELFNBQUosRUFBZTtNQUNiLEtBQUtOLE9BQUwsQ0FBYTVCLFFBQWIsR0FBd0IsSUFBeEI7TUFDQSxLQUFLNEIsT0FBTCxDQUFhakUsV0FBYixHQUEyQndFLFVBQTNCO0lBQ0QsQ0FIRCxNQUdPO01BQ0wsS0FBS1AsT0FBTCxDQUFhakUsV0FBYixHQUEyQixLQUFLa0UsbUJBQWhDO01BQ0EsS0FBS0QsT0FBTCxDQUFhNUIsUUFBYixHQUF3QixLQUF4QjtJQUNEO0VBQ0Y7O0FBMUJpRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGcEQ7QUFFZSxNQUFNb0MsYUFBTixTQUE0QnRCLDhDQUE1QixDQUFrQztFQUMvQ3hILFdBQVcsQ0FBQ3lILGFBQUQsRUFBZ0JnQixnQkFBaEIsRUFBa0M7SUFDM0MsTUFBTWhCLGFBQU47O0lBRDJDLDRDQXdCeEIsTUFBTTtNQUN6QixNQUFNaEcsV0FBVyxHQUFHLEtBQUtzSCxlQUFMLEVBQXBCOztNQUNBLEtBQUtMLGlCQUFMLENBQXVCakgsV0FBdkIsRUFBb0MsS0FBSzZHLE9BQXpDO0lBQ0QsQ0EzQjRDOztJQUUzQyxLQUFLSSxpQkFBTCxHQUF5QkQsZ0JBQXpCO0lBQ0EsS0FBS1QsU0FBTCxHQUFpQixDQUFDLEdBQUcsS0FBS04sTUFBTCxDQUFZUCxnQkFBWixDQUE2QixjQUE3QixDQUFKLENBQWpCO0lBQ0EsS0FBS2pCLE9BQUwsR0FBZSxLQUFLd0IsTUFBTCxDQUFZNUQsYUFBWixDQUEwQixjQUExQixDQUFmO0lBQ0EsS0FBS3dFLE9BQUwsR0FBZSxLQUFLWixNQUFMLENBQVk1RCxhQUFaLENBQTBCLGdCQUExQixDQUFmO0lBQ0EsS0FBS3lFLG1CQUFMLEdBQTJCLEtBQUtELE9BQUwsQ0FBYWpFLFdBQXhDO0VBQ0Q7O0VBRUQwRSxlQUFlLEdBQUc7SUFDaEIsTUFBTWxELFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSzZCLE1BQUwsQ0FBWVAsZ0JBQVosQ0FBNkIsZUFBN0IsQ0FBSixDQUFsQjtJQUNBLE1BQU02QixZQUFZLEdBQUcsRUFBckI7SUFDQW5ELFNBQVMsQ0FBQ08sT0FBVixDQUFtQk4sT0FBRCxJQUFhO01BQzdCa0QsWUFBWSxDQUFDbEQsT0FBTyxDQUFDbEUsSUFBVCxDQUFaLEdBQTZCa0UsT0FBTyxDQUFDbUQsS0FBckM7SUFDRCxDQUZEO0lBR0EsT0FBT0QsWUFBUDtFQUNEOztFQUNEbEUsa0JBQWtCLEdBQUc7SUFDbkIsS0FBS2tELFNBQUwsQ0FBZTVCLE9BQWYsQ0FBd0JSLE1BQUQsSUFBWTtNQUNqQ0EsTUFBTSxDQUFDYixnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxLQUFLbUUsa0JBQXZDO0lBQ0QsQ0FGRDs7SUFJQSxNQUFNcEUsa0JBQU47RUFDRDs7RUFLRG9ELEtBQUssR0FBRztJQUNOLE1BQU1BLEtBQU47O0lBQ0EsS0FBS2hDLE9BQUwsQ0FBYWtDLG1CQUFiLENBQWlDLFFBQWpDLEVBQTJDLEtBQUtjLGtCQUFoRDtFQUNEOztFQUNEUCxhQUFhLENBQUNDLFNBQUQsRUFBWUMsVUFBWixFQUF3QjtJQUNuQyxJQUFJRCxTQUFKLEVBQWU7TUFDYixLQUFLTixPQUFMLENBQWE1QixRQUFiLEdBQXdCLElBQXhCO01BQ0EsS0FBSzRCLE9BQUwsQ0FBYWpFLFdBQWIsR0FBMkJ3RSxVQUEzQjtJQUNELENBSEQsTUFHTztNQUNMLEtBQUtQLE9BQUwsQ0FBYWpFLFdBQWIsR0FBMkIsS0FBS2tFLG1CQUFoQztNQUNBLEtBQUtELE9BQUwsQ0FBYTVCLFFBQWIsR0FBd0IsS0FBeEI7SUFDRDtFQUNGOztBQXpDOEM7Ozs7Ozs7Ozs7Ozs7OztBQ0ZqRDtBQUNlLE1BQU15QyxjQUFOLFNBQTZCM0IsOENBQTdCLENBQW1DO0VBQ2hEeEgsV0FBVyxDQUFDeUgsYUFBRCxFQUFnQjtJQUN6QixNQUFNQSxhQUFOO0VBQ0Q7O0VBQ0RVLElBQUksQ0FBQ2lCLEtBQUQsRUFBUTtJQUNWLE1BQU1DLE9BQU8sR0FBRyxLQUFLM0IsTUFBTCxDQUFZNUQsYUFBWixDQUEwQix1QkFBMUIsQ0FBaEI7O0lBQ0F1RixPQUFPLENBQUM1RCxHQUFSLEdBQWMyRCxLQUFLLENBQUMzRCxHQUFwQjtJQUNBNEQsT0FBTyxDQUFDN0QsR0FBUixHQUFjNEQsS0FBSyxDQUFDNUQsR0FBcEI7O0lBQ0EsTUFBTThELE9BQU8sR0FBRyxLQUFLNUIsTUFBTCxDQUFZNUQsYUFBWixDQUEwQixzQkFBMUIsQ0FBaEI7O0lBQ0F3RixPQUFPLENBQUNqRixXQUFSLEdBQXNCK0UsS0FBSyxDQUFDNUQsR0FBNUI7SUFDQSxNQUFNMkMsSUFBTjtFQUNEOztBQVgrQzs7Ozs7Ozs7Ozs7Ozs7QUNEbkMsTUFBTW9CLE9BQU4sQ0FBYztFQUMzQnZKLFdBQVcsT0FBc0J3SixpQkFBdEIsRUFBeUM7SUFBQSxJQUF4QztNQUFFQyxLQUFGO01BQVNDO0lBQVQsQ0FBd0M7SUFDbEQsS0FBS0MsYUFBTCxHQUFxQkYsS0FBckI7SUFDQSxLQUFLRyxVQUFMLEdBQWtCL0YsUUFBUSxDQUFDQyxhQUFULENBQXVCMEYsaUJBQXZCLENBQWxCO0lBQ0EsS0FBS0ssU0FBTCxHQUFpQkgsUUFBakI7RUFDRDs7RUFDREksV0FBVyxHQUFHO0lBQ1osS0FBS0gsYUFBTCxDQUFtQnZELE9BQW5CLENBQTRCMkQsS0FBRCxJQUFXO01BQ3BDLEtBQUtGLFNBQUwsQ0FBZUUsS0FBZjtJQUNELENBRkQ7RUFHRDs7RUFDREMsT0FBTyxDQUFDQyxPQUFELEVBQVU7SUFDZixLQUFLTCxVQUFMLENBQWdCTSxPQUFoQixDQUF3QkQsT0FBeEI7RUFDRDs7QUFiMEI7Ozs7Ozs7Ozs7Ozs7O0FDQWQsTUFBTUUsUUFBTixDQUFlO0VBQzVCbkssV0FBVyxPQUFnRDtJQUFBLElBQS9DO01BQUVvSyxZQUFGO01BQWdCQyxXQUFoQjtNQUE2QkM7SUFBN0IsQ0FBK0M7SUFDekQsS0FBS0MsU0FBTCxHQUFpQjFHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QnNHLFlBQXZCLENBQWpCO0lBQ0EsS0FBS0ksUUFBTCxHQUFnQjNHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QnVHLFdBQXZCLENBQWhCO0lBQ0EsS0FBS0ksV0FBTCxHQUFtQjVHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QndHLGNBQXZCLENBQW5CO0VBQ0QsQ0FMMkIsQ0FNNUI7OztFQUNBOUosV0FBVyxHQUFHO0lBQ1osT0FBTztNQUNMb0IsSUFBSSxFQUFFLEtBQUsySSxTQUFMLENBQWVsRyxXQURoQjtNQUVMeEMsS0FBSyxFQUFFLEtBQUsySSxRQUFMLENBQWNuRyxXQUZoQjtNQUdMOUIsTUFBTSxFQUFFLEtBQUtrSSxXQUFMLENBQWlCaEY7SUFIcEIsQ0FBUDtFQUtELENBYjJCLENBYzVCOzs7RUFDQWlGLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0lBQ2hCLEtBQUtKLFNBQUwsQ0FBZWxHLFdBQWYsR0FBNkJzRyxJQUFJLENBQUMvSSxJQUFsQztJQUNBLEtBQUs0SSxRQUFMLENBQWNuRyxXQUFkLEdBQTRCc0csSUFBSSxDQUFDOUksS0FBakM7SUFDQSxLQUFLNEksV0FBTCxDQUFpQmpGLEdBQWpCLGFBQTBCbUYsSUFBSSxDQUFDL0ksSUFBL0I7SUFDQSxLQUFLNkksV0FBTCxDQUFpQmhGLEdBQWpCLEdBQXVCa0YsSUFBSSxDQUFDcEksTUFBNUI7RUFDRDs7RUFDRHFJLGFBQWEsQ0FBQ0QsSUFBRCxFQUFPO0lBQ2xCLEtBQUtGLFdBQUwsQ0FBaUJoRixHQUFqQixHQUF1QmtGLElBQUksQ0FBQ3BJLE1BQTVCO0VBQ0Q7O0FBdkIyQjs7Ozs7Ozs7Ozs7Ozs7OztBQ0F2QixNQUFNb0QsUUFBUSxHQUFHO0VBQ3RCeUIsYUFBYSxFQUFFLGVBRE87RUFFdEJDLG9CQUFvQixFQUFFLGdCQUZBO0VBR3RCVixlQUFlLEVBQUUseUJBSEs7RUFJdEJNLFVBQVUsRUFBRTtBQUpVLENBQWpCO0FBTUEsTUFBTTRELGNBQWMsR0FBRyxvQkFBdkI7QUFDQSxNQUFNbkksWUFBWSxHQUFHLGdCQUFyQjs7Ozs7Ozs7Ozs7QUNQUDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0NKQTs7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxNQUFNb0ksZUFBZSxHQUFHakgsUUFBUSxDQUFDQyxhQUFULENBQXVCLDRCQUF2QixDQUF4QjtBQUNBLE1BQU1pSCxjQUFjLEdBQUdsSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsc0JBQXZCLENBQXZCO0FBQ0EsTUFBTWtILGVBQWUsR0FBR25ILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUF4QjtBQUNBLE1BQU1tSCxjQUFjLEdBQUdwSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsdUJBQXZCLENBQXZCO0FBQ0EsTUFBTW9ILGtCQUFrQixHQUFHckgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQTNCO0FBQ0EsTUFBTXFILGVBQWUsR0FBR3RILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixvQkFBdkIsQ0FBeEI7QUFDQSxNQUFNc0gsZ0JBQWdCLEdBQUd2SCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXpCO0FBQ0EsTUFBTXVILGdCQUFnQixHQUFHeEgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQXpCO0FBQ0EsTUFBTXdILGlCQUFpQixHQUFHekgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGdCQUF2QixDQUExQjtBQUNBLE1BQU15SCxlQUFlLEdBQUcxSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBeEI7QUFDQSxNQUFNMEgsa0JBQWtCLEdBQUczSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQTNCLEVBRUE7QUFDQTtBQUNBO0FBRUE7O0FBQ0EsTUFBTTJILEdBQUcsR0FBRyxJQUFJMUwsdURBQUosQ0FBUTtFQUNsQkUsT0FBTyxFQUFFLDZDQURTO0VBRWxCQyxPQUFPLEVBQUU7SUFDUHdMLGFBQWEsRUFBRSxzQ0FEUjtJQUVQLGdCQUFnQjtFQUZUO0FBRlMsQ0FBUixDQUFaOztBQVNBLFNBQVM1SSxlQUFULENBQXlCWixNQUF6QixFQUFpQ3lKLE1BQWpDLEVBQXlDQyxJQUF6QyxFQUErQztFQUM3QyxJQUFJRCxNQUFNLEtBQUssUUFBZixFQUF5QjtJQUN2QkYsR0FBRyxDQUNBckosVUFESCxDQUNjRixNQURkLEVBRUdoQixJQUZILENBRVNDLEdBQUQsSUFBUztNQUNieUssSUFBSSxDQUFDMUgsV0FBTCxDQUFpQi9DLEdBQUcsQ0FBQytCLEtBQXJCO0lBQ0QsQ0FKSCxFQUtHMkksS0FMSCxDQUtVMUssR0FBRCxJQUFTO01BQ2QySyxLQUFLLENBQUMzSyxHQUFELENBQUw7SUFDRCxDQVBIO0VBUUQsQ0FURCxNQVNPO0lBQ0xzSyxHQUFHLENBQ0F0SixPQURILENBQ1dELE1BRFgsRUFFR2hCLElBRkgsQ0FFU0MsR0FBRCxJQUFTO01BQ2J5SyxJQUFJLENBQUMxSCxXQUFMLENBQWlCL0MsR0FBRyxDQUFDK0IsS0FBckI7SUFDRCxDQUpILEVBS0cySSxLQUxILENBS1UxSyxHQUFELElBQVM7TUFDZDJLLEtBQUssQ0FBQzNLLEdBQUQsQ0FBTDtJQUNELENBUEg7RUFRRDtBQUNGOztBQUVELFNBQVM0SyxVQUFULENBQW9CdEssV0FBcEIsRUFBaUM7RUFDL0IsTUFBTW1LLElBQUksR0FBRyxJQUFJcEosd0RBQUosQ0FDWGYsV0FEVyxFQUVYaUIsK0RBRlcsRUFHWEMsZUFIVyxFQUlYQyxpQkFKVyxFQUtYQyxhQUxXLEVBTVhDLGVBTlcsQ0FBYjtFQVFBLE1BQU1rSixNQUFNLEdBQUdKLElBQUksQ0FBQ3RHLFVBQUwsRUFBZjtFQUNBMkcsV0FBVyxDQUFDakMsT0FBWixDQUFvQmdDLE1BQXBCO0FBQ0Q7O0FBRUQsTUFBTUUsVUFBVSxHQUFHLElBQUlwRCxpRUFBSixDQUFrQixlQUFsQixFQUFvQ3JILFdBQUQsSUFBaUI7RUFDckV5SyxVQUFVLENBQUN2RCxhQUFYLENBQXlCLElBQXpCLEVBQStCLFdBQS9CO0VBQ0E4QyxHQUFHLENBQ0EzSixVQURILENBQ2NMLFdBRGQsRUFFR1AsSUFGSCxDQUVTTyxXQUFELElBQWlCO0lBQ3JCc0ssVUFBVSxDQUFDdEssV0FBRCxDQUFWO0lBQ0F5SyxVQUFVLENBQUNoRSxLQUFYO0VBQ0QsQ0FMSCxFQU1HMkQsS0FOSCxDQU1VMUssR0FBRCxJQUFTO0lBQ2QySyxLQUFLLENBQUMzSyxHQUFELENBQUw7RUFDRCxDQVJILEVBU0dnTCxPQVRILENBU1csTUFBTTtJQUNiRCxVQUFVLENBQUN2RCxhQUFYLENBQXlCLEtBQXpCLEVBQWdDLFdBQWhDO0VBQ0QsQ0FYSDtBQVlELENBZGtCLENBQW5CO0FBZ0JBLE1BQU15RCxVQUFVLEdBQUcsSUFBSWpELGtFQUFKLENBQW1CLGdCQUFuQixDQUFuQjs7QUFDQSxTQUFTeEcsZUFBVCxDQUF5QnlHLEtBQXpCLEVBQWdDO0VBQzlCZ0QsVUFBVSxDQUFDakUsSUFBWCxDQUFnQmlCLEtBQWhCO0FBQ0Q7O0FBRUQsTUFBTWlELHNCQUFzQixHQUFHLElBQUloRSxvRUFBSixDQUFxQixlQUFyQixDQUEvQjs7QUFFQSxTQUFTekYsaUJBQVQsQ0FBMkJnSixJQUEzQixFQUFpQztFQUMvQlMsc0JBQXNCLENBQUM3RCxTQUF2QixDQUFpQyxNQUFNO0lBQ3JDNkQsc0JBQXNCLENBQUMxRCxhQUF2QixDQUFxQyxJQUFyQyxFQUEyQyxXQUEzQztJQUNBOEMsR0FBRyxDQUNBeEosVUFESCxDQUNjMkosSUFBSSxDQUFDM0gsU0FBTCxFQURkLEVBRUcvQyxJQUZILENBRVEsTUFBTTtNQUNWMEssSUFBSSxDQUFDM0osVUFBTDtNQUNBb0ssc0JBQXNCLENBQUNuRSxLQUF2QjtJQUNELENBTEgsRUFNRzJELEtBTkgsQ0FNVTFLLEdBQUQsSUFBUztNQUNkMkssS0FBSyxDQUFDM0ssR0FBRCxDQUFMO0lBQ0QsQ0FSSCxFQVNHZ0wsT0FUSCxDQVNXLE1BQU07TUFDYkUsc0JBQXNCLENBQUMxRCxhQUF2QixDQUFxQyxLQUFyQyxFQUE0QyxXQUE1QztJQUNELENBWEg7RUFZRCxDQWREO0VBZUEwRCxzQkFBc0IsQ0FBQ2xFLElBQXZCO0FBQ0Q7O0FBRUQsSUFBSThELFdBQVcsR0FBRyxJQUFsQjs7QUFFQSxTQUFTSyxlQUFULEdBQTJCO0VBQ3pCLE1BQU1DLE1BQU0sR0FBR0MsUUFBUSxDQUFDaE0sV0FBVCxFQUFmO0VBQ0E2SyxnQkFBZ0IsQ0FBQ3BDLEtBQWpCLEdBQXlCc0QsTUFBTSxDQUFDM0ssSUFBaEM7RUFDQTBKLGlCQUFpQixDQUFDckMsS0FBbEIsR0FBMEJzRCxNQUFNLENBQUMxSyxLQUFqQztBQUNEOztBQUNELFNBQVM0SyxxQkFBVCxHQUFpQztFQUMvQnRCLGVBQWUsQ0FBQ3VCLEtBQWhCO0VBQ0FKLGVBQWU7RUFDZkssdUJBQXVCLENBQUNwRixlQUF4QjtFQUNBcUYsWUFBWSxDQUFDekUsSUFBYjtBQUNEOztBQUNELE1BQU1xRSxRQUFRLEdBQUcsSUFBSXJDLDREQUFKLENBQWE7RUFDNUJDLFlBQVksRUFBRSxxQkFEYztFQUU1QkMsV0FBVyxFQUFFLHNCQUZlO0VBRzVCQyxjQUFjLEVBQUU7QUFIWSxDQUFiLENBQWpCO0FBS0EsTUFBTXNDLFlBQVksR0FBRyxJQUFJOUQsaUVBQUosQ0FBa0IsYUFBbEIsRUFBaUMsQ0FBQ3JILFdBQUQsRUFBY29MLE1BQWQsS0FBeUI7RUFDN0VELFlBQVksQ0FBQ2pFLGFBQWIsQ0FBMkIsSUFBM0IsRUFBaUMsV0FBakM7RUFDQThDLEdBQUcsQ0FDQWpLLGVBREgsQ0FDbUJDLFdBRG5CLEVBRUdQLElBRkgsQ0FFU08sV0FBRCxJQUFpQjtJQUNyQitLLFFBQVEsQ0FBQzlCLFdBQVQsQ0FBcUJqSixXQUFyQjtJQUNBbUwsWUFBWSxDQUFDMUUsS0FBYjtFQUNELENBTEgsRUFNRzJELEtBTkgsQ0FNVTFLLEdBQUQsSUFBUztJQUNkMkssS0FBSyxDQUFDM0ssR0FBRCxDQUFMO0VBQ0QsQ0FSSCxFQVNHZ0wsT0FUSCxDQVNXLE1BQU07SUFDYlMsWUFBWSxDQUFDakUsYUFBYixDQUEyQixLQUEzQixFQUFrQyxXQUFsQztFQUNELENBWEg7QUFZRCxDQWRvQixDQUFyQjtBQWdCQSxNQUFNbUUsZUFBZSxHQUFHLElBQUloRSxpRUFBSixDQUN0QixlQURzQixFQUV0QixDQUFDckgsV0FBRCxFQUFjb0wsTUFBZCxLQUF5QjtFQUN2QkMsZUFBZSxDQUFDbkUsYUFBaEIsQ0FBOEIsSUFBOUIsRUFBb0MsV0FBcEM7RUFDQThDLEdBQUcsQ0FDQXBKLGNBREgsQ0FDa0JaLFdBRGxCLEVBRUdQLElBRkgsQ0FFU08sV0FBRCxJQUFpQjtJQUNyQitLLFFBQVEsQ0FBQzVCLGFBQVQsQ0FBdUJuSixXQUF2QjtJQUNBcUwsZUFBZSxDQUFDNUUsS0FBaEI7RUFDRCxDQUxILEVBTUcyRCxLQU5ILENBTVUxSyxHQUFELElBQVM7SUFDZDJLLEtBQUssQ0FBQzNLLEdBQUQsQ0FBTDtFQUNELENBUkgsRUFTR2dMLE9BVEgsQ0FTVyxNQUFNO0lBQ2JXLGVBQWUsQ0FBQ25FLGFBQWhCLENBQThCLEtBQTlCLEVBQXFDLFdBQXJDO0VBQ0QsQ0FYSDtBQVlELENBaEJxQixDQUF4QjtBQW1CQSxNQUFNZ0UsdUJBQXVCLEdBQUcsSUFBSWpILGlFQUFKLENBQWtCQywyREFBbEIsRUFBNEJxRixlQUE1QixDQUFoQztBQUNBMkIsdUJBQXVCLENBQUN6RixlQUF4QjtBQUNBLE1BQU02Rix1QkFBdUIsR0FBRyxJQUFJckgsaUVBQUosQ0FBa0JDLDJEQUFsQixFQUE0QnNGLGNBQTVCLENBQWhDO0FBQ0E4Qix1QkFBdUIsQ0FBQzdGLGVBQXhCO0FBQ0EsTUFBTThGLDJCQUEyQixHQUFHLElBQUl0SCxpRUFBSixDQUNsQ0MsMkRBRGtDLEVBRWxDdUYsa0JBRmtDLENBQXBDO0FBSUE4QiwyQkFBMkIsQ0FBQzlGLGVBQTVCOztBQUVBLFNBQVMrRix3QkFBVCxHQUFvQztFQUNsQzdCLGdCQUFnQixDQUFDc0IsS0FBakI7RUFFQUssdUJBQXVCLENBQUN4RixlQUF4QjtFQUNBMkUsVUFBVSxDQUFDL0QsSUFBWDtBQUNEOztBQUVELFNBQVMrRSw0QkFBVCxHQUF3QztFQUN0QzNCLGVBQWUsQ0FBQ3RDLEtBQWhCLEdBQXdCdUQsUUFBUSxDQUFDaE0sV0FBVCxHQUF1QitCLE1BQS9DO0VBQ0F5SywyQkFBMkIsQ0FBQ3pGLGVBQTVCO0VBQ0F1RixlQUFlLENBQUMzRSxJQUFoQjtBQUNEOztBQUNENEMsY0FBYyxDQUFDaEcsZ0JBQWYsQ0FBZ0MsU0FBaEMsRUFBMkNrSSx3QkFBM0M7QUFDQW5DLGVBQWUsQ0FBQy9GLGdCQUFoQixDQUFpQyxTQUFqQyxFQUE0QzBILHFCQUE1QztBQUNBakIsa0JBQWtCLENBQUN6RyxnQkFBbkIsQ0FBb0MsU0FBcEMsRUFBK0NtSSw0QkFBL0M7QUFFQSxJQUFJckssYUFBYSxHQUFHLElBQXBCO0FBQ0E0SSxHQUFHLENBQ0FwTCxVQURILEdBRUdhLElBRkgsQ0FFUSxRQUFtQjtFQUFBLElBQWxCLENBQUMyRCxJQUFELEVBQU9zSSxLQUFQLENBQWtCO0VBQ3ZCdEssYUFBYSxHQUFHZ0MsSUFBSSxDQUFDdkIsR0FBckI7RUFDQTJJLFdBQVcsR0FBRyxJQUFJMUMsMkRBQUosQ0FDWjtJQUNFRSxLQUFLLEVBQUUwRCxLQURUO0lBRUV6RCxRQUFRLEVBQUVxQztFQUZaLENBRFksRUFLWmxCLGlFQUxZLENBQWQ7RUFPQW9CLFdBQVcsQ0FBQ25DLFdBQVo7RUFFQTBDLFFBQVEsQ0FBQzlCLFdBQVQsQ0FBcUI3RixJQUFyQjtBQUNELENBZEgsRUFlR2dILEtBZkgsQ0FlVTFLLEdBQUQsSUFBUztFQUNkMkssS0FBSyxDQUFDM0ssR0FBRCxDQUFMO0FBQ0QsQ0FqQkgsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuICBpbml0aWFsaXplKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cbiAgX2hhbmRsZUZldGNoUmVzcG9uc2UocGF0aCwgbWV0aG9kVXNlZCA9IFwiR0VUXCIsIGJvZHlDb250ZW50ID0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kVXNlZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIpO1xuICB9XG4gIGVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGFib3V0OiBpbnB1dFZhbHVlcy5hYm91dCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBhZGROZXdDYXJkKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgbGluazogaW5wdXRWYWx1ZXMubGluayxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiLCBcIlBPU1RcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGdldENhcmRMaWtlSW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBkZWxldGVDYXJkKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cblxuICBhZGRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJQVVRcIik7XG4gIH1cbiAgcmVtb3ZlTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG4gIGVkaXRQcm9maWxlUGljKGF2YXRhckxpbmspIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGF2YXRhcjogYXZhdGFyTGluay5hdmF0YXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWUvYXZhdGFyXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG59XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApIHtcbiAgICB0aGlzLl9pbWFnZUxpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX3RleHQgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpa2VzID0gY2FyZERhdGEubGlrZXM7XG4gICAgdGhpcy5fY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgdGhpcy5fb3duZXJJZCA9IGNhcmREYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl9jYXJkSWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbiA9IGhhbmRsZVRyYXNoQnV0dG9uO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgfVxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgZ2V0Q2FyZElkKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkSWQ7XG4gIH1cbiAgdXBkYXRlTGlrZXMobGlrZXMpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG4gIH1cblxuICBfcmVuZGVyTGlrZXMoKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuICBfaXNMaWtlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlrZXMuc29tZSgodXNlcikgPT4ge1xuICAgICAgcmV0dXJuIHVzZXIuX2lkID09PSB0aGlzLl9jdXJyZW50VXNlcklkO1xuICAgIH0pO1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZV9hY3RpdmVcIikpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJyZW1vdmVcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcImFkZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl90cmFzaEJ1dHRvbikge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbih0aGlzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soZXZ0LnRhcmdldCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcbiAgfVxuICBjcmVhdGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gICAgdGhpcy5fbGlrZUNvdW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcbiAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fdGV4dDtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5faW1hZ2VMaW5rO1xuICAgIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX3RleHQ7XG5cbiAgICBpZiAodGhpcy5fb3duZXJJZCAhPT0gdGhpcy5fY3VycmVudFVzZXJJZCkge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcblxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiXG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBfaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT5cbiAgICBpbnB1dExpc3Quc29tZSgoaW5wdXRFbCkgPT4gIWlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRvcigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuLy8gY2hlY2tcbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlID0gdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UgPSB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlQnV0dG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIF9oYW5kbGVPdmVybGF5Q2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBUaHJlZSB3YXlzIHRvIGNsb3NlIHRoZSBwb3B1cDpcbiAgICAvLyAxKSBoaXQgRVNDIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgLy8gMikgbW91c2V1cCBvbiB0aGUgY2xvc2UgYnV0dG9uXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIC8vIDMpIG1vdXNldXAgb24gdGhlIG92ZXJsYXlcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXQoaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybUxpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fZm9ybVwiKV07XG4gICAgdGhpcy5fZm9ybUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19idXR0b25cIik7XG4gICAgdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0ID0gdGhpcy5fYnV0dG9uLnRleHRDb250ZW50O1xuICB9XG4gIFxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2lucHV0XCIpXTtcbiAgICBjb25zdCBpbnB1dENvbnRlbnQgPSB7fTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRDb250ZW50W2lucHV0RWwubmFtZV0gPSBpbnB1dEVsLnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dENvbnRlbnQ7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2Zvcm1MaXN0LmZvckVhY2goKGZvcm1FbCkgPT4ge1xuICAgICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbiAgX2hhbmRsZVN1Ym1pdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzLCB0aGlzLl9idXR0b24pO1xuICB9O1xuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm1FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBvcGVuKGltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VFbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgaW1hZ2VFbC5zcmMgPSBpbWFnZS5zcmM7XG4gICAgaW1hZ2VFbC5hbHQgPSBpbWFnZS5hbHQ7XG4gICAgY29uc3QgY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBjYXB0aW9uLnRleHRDb250ZW50ID0gaW1hZ2UuYWx0O1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgfVxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkuZm9yRWFjaCgoYXJyRWwpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGFyckVsKTtcbiAgICB9KTtcbiAgfVxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gICAgdGhpcy5fYXZhdGFyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXZhdGFyU2VsZWN0b3IpO1xuICB9XG4gIC8vIHRvIHBvcHVsYXRlIGZvcm0gZmllbGRzIGFmdGVyIHBvcHVwIG9wZW5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhdmF0YXI6IHRoaXMuX2F2YXRhclNsb3Quc3JjLFxuICAgIH07XG4gIH1cbiAgLy8gdXBvbiBmb3JtIHN1Ym1pc3Npb25cbiAgc2V0VXNlckluZm8oZGF0YSkge1xuICAgIHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuICAgIHRoaXMuX2F2YXRhclNsb3QuYWx0ID0gYCR7ZGF0YS5uYW1lfWA7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxuICBzZXRVc2VyQXZhdGFyKGRhdGEpIHtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J1dHRvblwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2lucHV0LXR5cGVfZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbmV4cG9ydCBjb25zdCBjYXJkc0NvbnRhaW5lciA9IFwiLnBob3RvLWdyaWRfX2NhcmRzXCI7XG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vLyBJbXBvcnRlZCBDbGFzc2VzXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQge1xuICBjYXJkc0NvbnRhaW5lcixcbiAgY2FyZFNlbGVjdG9yLFxuICBzZXR0aW5ncyxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcblxuXG5jb25zdCBlZGl0UHJvZmlsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2luZm8tZWRpdC1idXR0b25cIik7XG5jb25zdCBhZGRQaWN0dXJlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXZhdGFyLXBvcHVwXCIpO1xuY29uc3QgZm9ybUZpZWxkQXV0aG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbmNvbnN0IGZvcm1GaWVsZFBpY3R1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wbGFjZS1mb3JtXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGVcIik7XG5jb25zdCBwcm9maWxlUGljSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci11cmxcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ljb25cIik7XG5cbi8vIC8vVG9rZW4gYW5kIElEIGluZm9cbi8vIC8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy8gLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuLy8gQVBJIGNsYXNzXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cblxuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmRJZCwgYWN0aW9uLCBjYXJkKSB7XG4gIGlmIChhY3Rpb24gPT09IFwicmVtb3ZlXCIpIHtcbiAgICBhcGlcbiAgICAgIC5yZW1vdmVMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcGlcbiAgICAgIC5hZGRMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGlucHV0VmFsdWVzKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBpbnB1dFZhbHVlcyxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICk7XG4gIGNvbnN0IGNhcmRFbCA9IGNhcmQuY3JlYXRlQ2FyZCgpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbCk7XG59XG5cbmNvbnN0IHBsYWNlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKGlucHV0VmFsdWVzKSA9PiB7XG4gIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGlucHV0VmFsdWVzKTtcbiAgICAgIHBsYWNlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5mdW5jdGlvbiBoYW5kbGVDYXJkQ2xpY2soaW1hZ2UpIHtcbiAgaW1hZ2VQb3B1cC5vcGVuKGltYWdlKTtcbn1cblxuY29uc3QgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFwiLmRlbGV0ZS1wb3B1cFwiKTtcblxuZnVuY3Rpb24gaGFuZGxlVHJhc2hCdXR0b24oY2FyZCkge1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnNldFN1Ym1pdCgoKSA9PiB7XG4gICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZC5nZXRDYXJkSWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZC5kZWxldGVDYXJkKCk7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5vcGVuKCk7XG59XG5cbmxldCBjYXJkU2VjdGlvbiA9IG51bGw7XG5cbmZ1bmN0aW9uIGZpbGxQcm9maWxlRm9ybSgpIHtcbiAgY29uc3QgcmVzdWx0ID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgaW5wdXRQcm9maWxlTmFtZS52YWx1ZSA9IHJlc3VsdC5uYW1lO1xuICBpbnB1dFByb2ZpbGVUaXRsZS52YWx1ZSA9IHJlc3VsdC5hYm91dDtcbn1cbmZ1bmN0aW9uIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSgpIHtcbiAgZm9ybUZpZWxkQXV0aG9yLnJlc2V0KCk7XG4gIGZpbGxQcm9maWxlRm9ybSgpO1xuICBhZGRQcm9maWxlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcbn1cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgam9iU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgYXZhdGFyU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5jb25zdCBwcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LXBvcHVwXCIsIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xuICAgICAgcHJvZmlsZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBwcm9maWxlUGljUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIuYXZhdGFyLXBvcHVwXCIsXG4gIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZWRpdFByb2ZpbGVQaWMoaW5wdXRWYWx1ZXMpXG4gICAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcihpbnB1dFZhbHVlcyk7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgZWRpdFByb2ZpbGVGb3JtKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkUGljdHVyZUZvcm0pO1xuYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgc2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlUGljRm9ybVxuKTtcbmVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcblxuZnVuY3Rpb24gaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKCkge1xuICBmb3JtRmllbGRQaWN0dXJlLnJlc2V0KCk7XG5cbiAgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHBsYWNlUG9wdXAub3BlbigpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKCkge1xuICBwcm9maWxlUGljSW5wdXQudmFsdWUgPSB1c2VySW5mby5nZXRVc2VySW5mbygpLmF2YXRhcjtcbiAgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUGljUG9wdXAub3BlbigpO1xufVxuYWRkUGljdHVyZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKTtcbmVkaXRQcm9maWxlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuUHJvZmlsZUZvcm0pO1xuZWRpdFByb2ZpbGVQaWNJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0pO1xuXG5sZXQgY3VycmVudFVzZXJJZCA9IG51bGw7XG5hcGlcbiAgLmluaXRpYWxpemUoKVxuICAudGhlbigoW3VzZXIsIGNhcmRzXSkgPT4ge1xuICAgIGN1cnJlbnRVc2VySWQgPSB1c2VyLl9pZDtcbiAgICBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICAgICAge1xuICAgICAgICBpdGVtczogY2FyZHMsXG4gICAgICAgIHJlbmRlcmVyOiByZW5kZXJDYXJkLFxuICAgICAgfSxcbiAgICAgIGNhcmRzQ29udGFpbmVyXG4gICAgKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xuXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlcik7XG4gIH0pXG4gIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgYWxlcnQocmVzKTtcbiAgfSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsImFsbCIsImdldFVzZXJJbmZvIiwiZ2V0SW5pdGlhbENhcmRzIiwiX2hhbmRsZUZldGNoUmVzcG9uc2UiLCJwYXRoIiwibWV0aG9kVXNlZCIsImJvZHlDb250ZW50IiwidW5kZWZpbmVkIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsImVkaXRVc2VyUHJvZmlsZSIsImlucHV0VmFsdWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJhYm91dCIsImFkZE5ld0NhcmQiLCJsaW5rIiwiZ2V0Q2FyZExpa2VJbmZvIiwiZGVsZXRlQ2FyZCIsImNhcmRJZCIsImFkZExpa2UiLCJyZW1vdmVMaWtlIiwiZWRpdFByb2ZpbGVQaWMiLCJhdmF0YXJMaW5rIiwiYXZhdGFyIiwiQ2FyZCIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlVHJhc2hCdXR0b24iLCJjdXJyZW50VXNlcklkIiwiaGFuZGxlTGlrZUNsaWNrIiwiX2ltYWdlTGluayIsIl90ZXh0IiwiX2xpa2VzIiwibGlrZXMiLCJfY3VycmVudFVzZXJJZCIsIl9vd25lcklkIiwib3duZXIiLCJfaWQiLCJfY2FyZElkIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlVHJhc2hCdXR0b24iLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2dldFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNsb25lTm9kZSIsImdldENhcmRJZCIsInVwZGF0ZUxpa2VzIiwiX3JlbmRlckxpa2VzIiwiX2xpa2VDb3VudCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwiX2lzTGlrZWQiLCJfaGVhcnRCdXR0b24iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzb21lIiwidXNlciIsIl9zZXRFdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWlucyIsIl90cmFzaEJ1dHRvbiIsIl9jYXJkSW1hZ2UiLCJldnQiLCJ0YXJnZXQiLCJfY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiY2FyZFRpdGxlIiwiYWx0Iiwic3JjIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsIiwiaW5wdXRMaXN0IiwiaW5wdXRFbCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsIiwiYnV0dG9uRWxlbWVudCIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpbnB1dElkIiwiaWQiLCJlcnJvckVsIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJfaGFuZGxlQnV0dG9uQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsb3NlIiwiX2Nsb3NlQnV0dG9uIiwiX2Zvcm1MaXN0Iiwia2V5IiwiY2xvc2UiLCJvcGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBvcHVwV2l0aENvbmZpcm0iLCJfYnV0dG9uIiwiX2J1dHRvbk9yaWdpbmFsVGV4dCIsInNldFN1Ym1pdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b25UZXh0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0Q29udGVudCIsInZhbHVlIiwiX2hhbmRsZVN1Ym1pdENsaWNrIiwiUG9wdXBXaXRoSW1hZ2UiLCJpbWFnZSIsImltYWdlRWwiLCJjYXB0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pbml0aWFsQXJyYXkiLCJfY29udGFpbmVyIiwiX3JlbmRlcmVyIiwicmVuZGVySXRlbXMiLCJhcnJFbCIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJhdmF0YXJTZWxlY3RvciIsIl9uYW1lU2xvdCIsIl9qb2JTbG90IiwiX2F2YXRhclNsb3QiLCJzZXRVc2VySW5mbyIsImRhdGEiLCJzZXRVc2VyQXZhdGFyIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsInJlc2V0IiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlUG9wdXAiLCJidXR0b24iLCJwcm9maWxlUGljUG9wdXAiLCJhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciIsImVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciIsImhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSIsImhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0iLCJjYXJkcyJdLCJzb3VyY2VSb290IjoiIn0=