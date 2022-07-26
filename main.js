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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG4gIGluaXRpYWxpemUoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuICBfaGFuZGxlRmV0Y2hSZXNwb25zZShwYXRoLCBtZXRob2RVc2VkID0gXCJHRVRcIiwgYm9keUNvbnRlbnQgPSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0ke3BhdGh9YCwge1xuICAgICAgbWV0aG9kOiBtZXRob2RVc2VkLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IGJvZHlDb250ZW50LFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIik7XG4gIH1cbiAgZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgYWJvdXQ6IGlucHV0VmFsdWVzLmFib3V0LFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBsaW5rOiBpbnB1dFZhbHVlcy5saW5rLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIsIFwiUE9TVFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgZ2V0Q2FyZExpa2VJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuXG4gIGFkZExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIlBVVFwiKTtcbiAgfVxuICByZW1vdmVMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cbiAgZWRpdFByb2ZpbGVQaWMoYXZhdGFyTGluaykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYXZhdGFyOiBhdmF0YXJMaW5rLmF2YXRhcixcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZS9hdmF0YXJcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbn1cbiIsImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICkge1xuICAgIHRoaXMuX2ltYWdlTGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5fdGV4dCA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGlrZXMgPSBjYXJkRGF0YS5saWtlcztcbiAgICB0aGlzLl9jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICB0aGlzLl9vd25lcklkID0gY2FyZERhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX2NhcmRJZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uID0gaGFuZGxlVHJhc2hCdXR0b247XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICB9XG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBnZXRDYXJkSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRJZDtcbiAgfVxuICB1cGRhdGVMaWtlcyhsaWtlcykge1xuICAgIHRoaXMuX2xpa2VzID0gbGlrZXM7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcbiAgfVxuXG4gIF9yZW5kZXJMaWtlcygpIHtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfVxuICB9XG4gIF9pc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9saWtlcy5zb21lKCh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlci5faWQgPT09IHRoaXMuX2N1cnJlbnRVc2VySWQ7XG4gICAgfSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlX2FjdGl2ZVwiKSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcInJlbW92ZVwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwiYWRkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX3RyYXNoQnV0dG9uKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQudGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG4gIGNyZWF0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2VzXCIpO1xuICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl90ZXh0O1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9pbWFnZUxpbms7XG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fdGV4dDtcblxuICAgIGlmICh0aGlzLl9vd25lcklkICE9PSB0aGlzLl9jdXJyZW50VXNlcklkKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmQ7XG4iLCJcbmNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICB9XG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIF9oYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PlxuICAgIGlucHV0TGlzdC5zb21lKChpbnB1dEVsKSA9PiAhaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdG9yKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG4vLyBjaGVja1xuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UgPSB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSA9IHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIildO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIF9oYW5kbGVCdXR0b25DbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgX2hhbmRsZU92ZXJsYXlDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRocmVlIHdheXMgdG8gY2xvc2UgdGhlIHBvcHVwOlxuICAgIC8vIDEpIGhpdCBFU0Mga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICAvLyAyKSBtb3VzZXVwIG9uIHRoZSBjbG9zZSBidXR0b25cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgLy8gMykgbW91c2V1cCBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldFN1Ym1pdChoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cbiAgXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBfaGFuZGxlU3VibWl0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB0aGlzLl9nZXRJbnB1dFZhbHVlcygpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQoaW5wdXRWYWx1ZXMsIHRoaXMuX2J1dHRvbik7XG4gIH07XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIHRoaXMuX2Zvcm1FbC5yZXNldCgpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICB9XG4gIG9wZW4oaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICBpbWFnZUVsLnNyYyA9IGltYWdlLnNyYztcbiAgICBpbWFnZUVsLmFsdCA9IGltYWdlLmFsdDtcbiAgICBjb25zdCBjYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGNhcHRpb24udGV4dENvbnRlbnQgPSBpbWFnZS5hbHQ7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheS5mb3JFYWNoKChhcnJFbCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoYXJyRWwpO1xuICAgIH0pO1xuICB9XG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgbmFtZVNlbGVjdG9yLCBqb2JTZWxlY3RvciwgYXZhdGFyU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX25hbWVTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xuICAgIHRoaXMuX2pvYlNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcbiAgICB0aGlzLl9hdmF0YXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXJTZWxlY3Rvcik7XG4gIH1cbiAgLy8gdG8gcG9wdWxhdGUgZm9ybSBmaWVsZHMgYWZ0ZXIgcG9wdXAgb3BlblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCxcbiAgICAgIGF2YXRhcjogdGhpcy5fYXZhdGFyU2xvdC5zcmMsXG4gICAgfTtcbiAgfVxuICAvLyB1cG9uIGZvcm0gc3VibWlzc2lvblxuICBzZXRVc2VySW5mbyhkYXRhKSB7XG4gICAgdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgLy8gdGhpcy5fYXZhdGFyU2xvdC5hbHQgPSBgJHtkYXRhLm5hbWV9YDtcbiAgICAvLyB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG4gIHNldFVzZXJBdmF0YXIoZGF0YSkge1xuICAgIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fYnV0dG9uXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbmV4cG9ydCBjb25zdCBjYXJkc0NvbnRhaW5lciA9IFwiLnBob3RvLWdyaWRfX2NhcmRzXCI7XG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vLyBJbXBvcnRlZCBDbGFzc2VzXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQge1xuICBjYXJkc0NvbnRhaW5lcixcbiAgY2FyZFNlbGVjdG9yLFxuICBzZXR0aW5ncyxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcblxuXG5jb25zdCBlZGl0UHJvZmlsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2luZm8tZWRpdC1idXR0b25cIik7XG5jb25zdCBhZGRQaWN0dXJlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF2YXRhci1wb3B1cFwiKTtcbmNvbnN0IGZvcm1GaWVsZEF1dGhvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG5jb25zdCBmb3JtRmllbGRQaWN0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcGxhY2UtZm9ybVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlXCIpO1xuY29uc3QgcHJvZmlsZVBpY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItdXJsXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pY29uXCIpO1xuXG4vLyAvL1Rva2VuIGFuZCBJRCBpbmZvXG4vLyAvL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vIC8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbi8vIEFQSSBjbGFzc1xuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2VDbGljayhjYXJkSWQsIGFjdGlvbiwgY2FyZCkge1xuICBpZiAoYWN0aW9uID09PSBcInJlbW92ZVwiKSB7XG4gICAgYXBpXG4gICAgICAucmVtb3ZlTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQudXBkYXRlTGlrZXMocmVzLmxpa2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXBpXG4gICAgICAuYWRkTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQudXBkYXRlTGlrZXMocmVzLmxpa2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpbnB1dFZhbHVlcykge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgaW5wdXRWYWx1ZXMsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApO1xuICBjb25zdCBjYXJkRWwgPSBjYXJkLmNyZWF0ZUNhcmQoKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkRWwpO1xufVxuXG5jb25zdCBwbGFjZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY3JlYXRlLXBvcHVwXCIsIChpbnB1dFZhbHVlcykgPT4ge1xuICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5hZGROZXdDYXJkKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChpbnB1dFZhbHVlcyk7XG4gICAgICBwbGFjZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgaW1hZ2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuZnVuY3Rpb24gaGFuZGxlQ2FyZENsaWNrKGltYWdlKSB7XG4gIGltYWdlUG9wdXAub3BlbihpbWFnZSk7XG59XG5cbmNvbnN0IGRlbGV0ZUNhcmRDb25maXJtYXRpb24gPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcIi5kZWxldGUtcG9wdXBcIik7XG5cbmZ1bmN0aW9uIGhhbmRsZVRyYXNoQnV0dG9uKGNhcmQpIHtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5zZXRTdWJtaXQoKCkgPT4ge1xuICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmQuZ2V0Q2FyZElkKCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcmQuZGVsZXRlQ2FyZCgpO1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfSk7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ub3BlbigpO1xufVxuXG5sZXQgY2FyZFNlY3Rpb24gPSBudWxsO1xuXG5mdW5jdGlvbiBmaWxsUHJvZmlsZUZvcm0oKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIGlucHV0UHJvZmlsZU5hbWUudmFsdWUgPSByZXN1bHQubmFtZTtcbiAgaW5wdXRQcm9maWxlVGl0bGUudmFsdWUgPSByZXN1bHQuYWJvdXQ7XG59XG5mdW5jdGlvbiBoYW5kbGVPcGVuUHJvZmlsZUZvcm0oKSB7XG4gIC8vIGZvcm1GaWVsZEF1dGhvci5yZXNldCgpO1xuICBmaWxsUHJvZmlsZUZvcm0oKTtcbiAgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQb3B1cC5vcGVuKCk7XG59XG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIG5hbWVTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby1uYW1lXCIsXG4gIGpvYlNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLXRpdGxlXCIsXG4gIGF2YXRhclNlbGVjdG9yOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn0pO1xuY29uc3QgcHJvZmlsZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjZWRpdC1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMsIGJ1dHRvbikgPT4ge1xuICBwcm9maWxlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGlucHV0VmFsdWVzKTtcbiAgICAgIHByb2ZpbGVQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgcHJvZmlsZVBpY1BvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiLmF2YXRhci1wb3B1cFwiLFxuICAoaW5wdXRWYWx1ZXMsIGJ1dHRvbikgPT4ge1xuICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmVkaXRQcm9maWxlUGljKGlucHV0VmFsdWVzKVxuICAgICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICAgIHVzZXJJbmZvLnNldFVzZXJBdmF0YXIoaW5wdXRWYWx1ZXMpO1xuICAgICAgICBwcm9maWxlUGljUG9wdXAuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cbmNvbnN0IGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIGVkaXRQcm9maWxlRm9ybSk7XG5hZGRQcm9maWxlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIGFkZFBpY3R1cmVGb3JtKTtcbmFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIHNldHRpbmdzLFxuICBlZGl0UHJvZmlsZVBpY0Zvcm1cbik7XG5lZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSgpIHtcbiAgZm9ybUZpZWxkUGljdHVyZS5yZXNldCgpO1xuXG4gIGFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwbGFjZVBvcHVwLm9wZW4oKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSgpIHtcbiAgcHJvZmlsZVBpY0lucHV0LnZhbHVlID0gdXNlckluZm8uZ2V0VXNlckluZm8oKS5hdmF0YXI7XG4gIGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBpY1BvcHVwLm9wZW4oKTtcbn1cbmFkZFBpY3R1cmVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSk7XG5lZGl0UHJvZmlsZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlblByb2ZpbGVGb3JtKTtcbmVkaXRQcm9maWxlUGljSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKTtcblxubGV0IGN1cnJlbnRVc2VySWQgPSBudWxsO1xuYXBpXG4gIC5pbml0aWFsaXplKClcbiAgLnRoZW4oKFt1c2VyLCBjYXJkc10pID0+IHtcbiAgICBjdXJyZW50VXNlcklkID0gdXNlci5faWQ7XG4gICAgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAgICAgIHtcbiAgICAgICAgaXRlbXM6IGNhcmRzLFxuICAgICAgICByZW5kZXJlcjogcmVuZGVyQ2FyZCxcbiAgICAgIH0sXG4gICAgICBjYXJkc0NvbnRhaW5lclxuICAgICk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcblxuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHVzZXIpO1xuICB9KVxuICAuY2F0Y2goKHJlcykgPT4ge1xuICAgIGFsZXJ0KHJlcyk7XG4gIH0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwiYmFzZVVybCIsImhlYWRlcnMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJhbGwiLCJnZXRVc2VySW5mbyIsImdldEluaXRpYWxDYXJkcyIsIl9oYW5kbGVGZXRjaFJlc3BvbnNlIiwicGF0aCIsIm1ldGhvZFVzZWQiLCJib2R5Q29udGVudCIsInVuZGVmaW5lZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJlZGl0VXNlclByb2ZpbGUiLCJpbnB1dFZhbHVlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYW1lIiwiYWJvdXQiLCJhZGROZXdDYXJkIiwibGluayIsImdldENhcmRMaWtlSW5mbyIsImRlbGV0ZUNhcmQiLCJjYXJkSWQiLCJhZGRMaWtlIiwicmVtb3ZlTGlrZSIsImVkaXRQcm9maWxlUGljIiwiYXZhdGFyTGluayIsImF2YXRhciIsIkNhcmQiLCJjYXJkRGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZVRyYXNoQnV0dG9uIiwiY3VycmVudFVzZXJJZCIsImhhbmRsZUxpa2VDbGljayIsIl9pbWFnZUxpbmsiLCJfdGV4dCIsIl9saWtlcyIsImxpa2VzIiwiX2N1cnJlbnRVc2VySWQiLCJfb3duZXJJZCIsIm93bmVyIiwiX2lkIiwiX2NhcmRJZCIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZVRyYXNoQnV0dG9uIiwiX2hhbmRsZUxpa2VDbGljayIsIl9nZXRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJnZXRDYXJkSWQiLCJ1cGRhdGVMaWtlcyIsIl9yZW5kZXJMaWtlcyIsIl9saWtlQ291bnQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsIl9pc0xpa2VkIiwiX2hlYXJ0QnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwic29tZSIsInVzZXIiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udGFpbnMiLCJfdHJhc2hCdXR0b24iLCJfY2FyZEltYWdlIiwiZXZ0IiwidGFyZ2V0IiwiX2NhcmRFbGVtZW50IiwiY3JlYXRlQ2FyZCIsImNhcmRUaXRsZSIsImFsdCIsInNyYyIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbCIsImlucHV0TGlzdCIsImlucHV0RWwiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3NldHRpbmdzIiwiX2Zvcm1FbCIsImJ1dHRvbkVsZW1lbnQiLCJmb3JFYWNoIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yTWVzc2FnZSIsInZhbGlkYXRpb25NZXNzYWdlIiwiaW5wdXRJZCIsImlkIiwiZXJyb3JFbCIsImVycm9yQ2xhc3MiLCJlbmFibGVWYWxpZGF0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwicHJldmVudERlZmF1bHQiLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwiX2hhbmRsZUJ1dHRvbkNsb3NlIiwiX2hhbmRsZU92ZXJsYXlDbG9zZSIsIl9jbG9zZUJ1dHRvbiIsIl9mb3JtTGlzdCIsImtleSIsImNsb3NlIiwib3BlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJQb3B1cFdpdGhDb25maXJtIiwiX2J1dHRvbiIsIl9idXR0b25PcmlnaW5hbFRleHQiLCJzZXRTdWJtaXQiLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYnV0dG9uVGV4dCIsIlBvcHVwV2l0aEZvcm0iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dENvbnRlbnQiLCJ2YWx1ZSIsIl9oYW5kbGVTdWJtaXRDbGljayIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJpbWFnZSIsImltYWdlRWwiLCJjYXB0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pbml0aWFsQXJyYXkiLCJfY29udGFpbmVyIiwiX3JlbmRlcmVyIiwicmVuZGVySXRlbXMiLCJhcnJFbCIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJhdmF0YXJTZWxlY3RvciIsIl9uYW1lU2xvdCIsIl9qb2JTbG90IiwiX2F2YXRhclNsb3QiLCJzZXRVc2VySW5mbyIsImRhdGEiLCJzZXRVc2VyQXZhdGFyIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwicHJvZmlsZVBvcHVwIiwiYnV0dG9uIiwicHJvZmlsZVBpY1BvcHVwIiwiYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IiLCJlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IiLCJoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0iLCJoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtIiwiY2FyZHMiXSwic291cmNlUm9vdCI6IiJ9