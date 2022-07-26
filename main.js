/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/utils/Api.js":
/*!**************************!*\
  !*** ./src/utils/Api.js ***!
  \**************************/
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

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
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
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FormValidator */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Section */ "./src/components/Section.js");
/* harmony import */ var _components_UserInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PopupWithImage */ "./src/components/PopupWithImage.js");
/* harmony import */ var _utils_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/Api */ "./src/utils/Api.js");
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

const api = new _utils_Api__WEBPACK_IMPORTED_MODULE_8__["default"]({
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
  const card = new _components_Card__WEBPACK_IMPORTED_MODULE_1__["default"](inputValues, _utils_constants__WEBPACK_IMPORTED_MODULE_2__.cardSelector, handleCardClick, handleTrashButton, currentUserId, handleLikeClick);
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
const addProfileFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_2__.settings, editProfileForm);
addProfileFormValidator.enableValidator();
const addPictureFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_2__.settings, addPictureForm);
addPictureFormValidator.enableValidator();
const editProfilePicFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_3__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_2__.settings, editProfilePicForm);
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
  }, _utils_constants__WEBPACK_IMPORTED_MODULE_2__.cardsContainer);
  cardSection.renderItems();
  userInfo.setUserInfo(user);
}).catch(res => {
  alert(res);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MkJBQTJCLENBQUNuSSxlQUE1Qjs7QUFFQSxTQUFTb0ksd0JBQVQsR0FBb0M7RUFDbEM7RUFFQUYsdUJBQXVCLENBQUM3SCxlQUF4QjtFQUNBaUgsVUFBVSxDQUFDckcsSUFBWDtBQUNEOztBQUVELFNBQVNvSCw0QkFBVCxHQUF3QztFQUN0QzFCLGVBQWUsQ0FBQzNFLEtBQWhCLEdBQXdCNEYsUUFBUSxDQUFDbEUsV0FBVCxHQUF1QkUsTUFBL0M7RUFDQXVFLDJCQUEyQixDQUFDOUgsZUFBNUI7RUFDQTRILGVBQWUsQ0FBQ2hILElBQWhCO0FBQ0Q7O0FBQ0RrRixjQUFjLENBQUN0SSxnQkFBZixDQUFnQyxTQUFoQyxFQUEyQ3VLLHdCQUEzQztBQUNBbEMsZUFBZSxDQUFDckksZ0JBQWhCLENBQWlDLFNBQWpDLEVBQTRDZ0sscUJBQTVDO0FBQ0FqQixrQkFBa0IsQ0FBQy9JLGdCQUFuQixDQUFvQyxTQUFwQyxFQUErQ3dLLDRCQUEvQztBQUVBLElBQUk1TSxhQUFhLEdBQUcsSUFBcEI7QUFDQW9MLEdBQUcsQ0FDQXhDLFVBREgsR0FFR1ksSUFGSCxDQUVRLFFBQW1CO0VBQUEsSUFBbEIsQ0FBQ3RILElBQUQsRUFBTzJLLEtBQVAsQ0FBa0I7RUFDdkI3TSxhQUFhLEdBQUdrQyxJQUFJLENBQUN2QixHQUFyQjtFQUNBaUwsV0FBVyxHQUFHLElBQUk5RSwyREFBSixDQUNaO0lBQ0VFLEtBQUssRUFBRTZGLEtBRFQ7SUFFRTVGLFFBQVEsRUFBRXlFO0VBRlosQ0FEWSxFQUtabEIsNERBTFksQ0FBZDtFQU9Bb0IsV0FBVyxDQUFDdkUsV0FBWjtFQUVBOEUsUUFBUSxDQUFDL0QsV0FBVCxDQUFxQmxHLElBQXJCO0FBQ0QsQ0FkSCxFQWVHc0osS0FmSCxDQWVVL0IsR0FBRCxJQUFTO0VBQ2RnQyxLQUFLLENBQUNoQyxHQUFELENBQUw7QUFDRCxDQWpCSCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy91dGlscy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICkge1xuICAgIHRoaXMuX2ltYWdlTGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5fdGV4dCA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGlrZXMgPSBjYXJkRGF0YS5saWtlcztcbiAgICB0aGlzLl9jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICB0aGlzLl9vd25lcklkID0gY2FyZERhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX2NhcmRJZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uID0gaGFuZGxlVHJhc2hCdXR0b247XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICB9XG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBnZXRDYXJkSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRJZDtcbiAgfVxuICB1cGRhdGVMaWtlcyhsaWtlcykge1xuICAgIHRoaXMuX2xpa2VzID0gbGlrZXM7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcbiAgfVxuXG4gIF9yZW5kZXJMaWtlcygpIHtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfVxuICB9XG4gIF9pc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9saWtlcy5zb21lKCh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlci5faWQgPT09IHRoaXMuX2N1cnJlbnRVc2VySWQ7XG4gICAgfSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgIC8vIGlmICh0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlX2FjdGl2ZVwiKSkge1xuICAgICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcInJlbW92ZVwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwiYWRkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX3RyYXNoQnV0dG9uKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQudGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG4gIGNyZWF0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2VzXCIpO1xuICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl90ZXh0O1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9pbWFnZUxpbms7XG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fdGV4dDtcblxuICAgIGlmICh0aGlzLl9vd25lcklkICE9PSB0aGlzLl9jdXJyZW50VXNlcklkKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmQ7XG4iLCJcbmNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICB9XG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIF9oYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PlxuICAgIGlucHV0TGlzdC5zb21lKChpbnB1dEVsKSA9PiAhaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdG9yKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG4vLyBjaGVja1xuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UgPSB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSA9IHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIildO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIF9oYW5kbGVCdXR0b25DbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgX2hhbmRsZU92ZXJsYXlDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRocmVlIHdheXMgdG8gY2xvc2UgdGhlIHBvcHVwOlxuICAgIC8vIDEpIGhpdCBFU0Mga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICAvLyAyKSBtb3VzZXVwIG9uIHRoZSBjbG9zZSBidXR0b25cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgLy8gMykgbW91c2V1cCBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldFN1Ym1pdChoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIik7XG4gICAgdGhpcy5fZm9ybUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19idXR0b25cIik7XG4gICAgdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0ID0gdGhpcy5fYnV0dG9uLnRleHRDb250ZW50O1xuICB9XG4gIFxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2lucHV0XCIpXTtcbiAgICBjb25zdCBpbnB1dENvbnRlbnQgPSB7fTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRDb250ZW50W2lucHV0RWwubmFtZV0gPSBpbnB1dEVsLnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dENvbnRlbnQ7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2Zvcm1MaXN0LmZvckVhY2goKGZvcm1FbCkgPT4ge1xuICAgICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIH0pO1xuXG4gICAgc3VwZXIuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbiAgX2hhbmRsZVN1Ym1pdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzLCB0aGlzLl9idXR0b24pO1xuICB9O1xuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm1FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBvcGVuKGltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VFbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgaW1hZ2VFbC5zcmMgPSBpbWFnZS5zcmM7XG4gICAgaW1hZ2VFbC5hbHQgPSBpbWFnZS5hbHQ7XG4gICAgY29uc3QgY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBjYXB0aW9uLnRleHRDb250ZW50ID0gaW1hZ2UuYWx0O1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgfVxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkuZm9yRWFjaCgoYXJyRWwpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGFyckVsKTtcbiAgICB9KTtcbiAgfVxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gICAgdGhpcy5fYXZhdGFyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXZhdGFyU2VsZWN0b3IpO1xuICB9XG4gIC8vIHRvIHBvcHVsYXRlIGZvcm0gZmllbGRzIGFmdGVyIHBvcHVwIG9wZW5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhdmF0YXI6IHRoaXMuX2F2YXRhclNsb3Quc3JjLFxuICAgIH07XG4gIH1cbiAgLy8gdXBvbiBmb3JtIHN1Ym1pc3Npb25cbiAgc2V0VXNlckluZm8oZGF0YSkge1xuICAgIHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuICAgIC8vIHRoaXMuX2F2YXRhclNsb3QuYWx0ID0gYCR7ZGF0YS5uYW1lfWA7XG4gICAgLy8gdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxuICBzZXRVc2VyQXZhdGFyKGRhdGEpIHtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG4gIGluaXRpYWxpemUoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuICBfaGFuZGxlRmV0Y2hSZXNwb25zZShwYXRoLCBtZXRob2RVc2VkID0gXCJHRVRcIiwgYm9keUNvbnRlbnQgPSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0ke3BhdGh9YCwge1xuICAgICAgbWV0aG9kOiBtZXRob2RVc2VkLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IGJvZHlDb250ZW50LFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIik7XG4gIH1cbiAgZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgYWJvdXQ6IGlucHV0VmFsdWVzLmFib3V0LFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBsaW5rOiBpbnB1dFZhbHVlcy5saW5rLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIsIFwiUE9TVFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgZ2V0Q2FyZExpa2VJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuXG4gIGFkZExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIlBVVFwiKTtcbiAgfVxuICByZW1vdmVMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cbiAgZWRpdFByb2ZpbGVQaWMoYXZhdGFyTGluaykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYXZhdGFyOiBhdmF0YXJMaW5rLmF2YXRhcixcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZS9hdmF0YXJcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fYnV0dG9uXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxufTtcbmV4cG9ydCBjb25zdCBjYXJkc0NvbnRhaW5lciA9IFwiLnBob3RvLWdyaWRfX2NhcmRzXCI7XG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuXG4vLyBJbXBvcnRlZCBDbGFzc2VzXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XG5pbXBvcnQge1xuICBjYXJkc0NvbnRhaW5lcixcbiAgY2FyZFNlbGVjdG9yLFxuICBzZXR0aW5ncyxcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvXCI7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcbmltcG9ydCBBcGkgZnJvbSBcIi4uL3V0aWxzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuXG5cbmNvbnN0IGVkaXRQcm9maWxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faW5mby1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGFkZFBpY3R1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgYWRkUGljdHVyZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXZhdGFyLXBvcHVwXCIpO1xuY29uc3QgZm9ybUZpZWxkQXV0aG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbmNvbnN0IGZvcm1GaWVsZFBpY3R1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wbGFjZS1mb3JtXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGVcIik7XG5jb25zdCBwcm9maWxlUGljSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci11cmxcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ljb25cIik7XG5cbi8vIC8vVG9rZW4gYW5kIElEIGluZm9cbi8vIC8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy8gLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuLy8gQVBJIGNsYXNzXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cblxuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmRJZCwgYWN0aW9uLCBjYXJkKSB7XG4gIGlmIChhY3Rpb24gPT09IFwicmVtb3ZlXCIpIHtcbiAgICBhcGlcbiAgICAgIC5yZW1vdmVMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcGlcbiAgICAgIC5hZGRMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGlucHV0VmFsdWVzKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBpbnB1dFZhbHVlcyxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICk7XG4gIGNvbnN0IGNhcmRFbCA9IGNhcmQuY3JlYXRlQ2FyZCgpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbCk7XG59XG5cbmNvbnN0IHBsYWNlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKGlucHV0VmFsdWVzKSA9PiB7XG4gIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGlucHV0VmFsdWVzKTtcbiAgICAgIHBsYWNlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5mdW5jdGlvbiBoYW5kbGVDYXJkQ2xpY2soaW1hZ2UpIHtcbiAgaW1hZ2VQb3B1cC5vcGVuKGltYWdlKTtcbn1cblxuY29uc3QgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFwiLmRlbGV0ZS1wb3B1cFwiKTtcblxuZnVuY3Rpb24gaGFuZGxlVHJhc2hCdXR0b24oY2FyZCkge1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnNldFN1Ym1pdCgoKSA9PiB7XG4gICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZC5nZXRDYXJkSWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZC5kZWxldGVDYXJkKCk7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5vcGVuKCk7XG59XG5cbmxldCBjYXJkU2VjdGlvbiA9IG51bGw7XG5cbmZ1bmN0aW9uIGZpbGxQcm9maWxlRm9ybSgpIHtcbiAgY29uc3QgcmVzdWx0ID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgaW5wdXRQcm9maWxlTmFtZS52YWx1ZSA9IHJlc3VsdC5uYW1lO1xuICBpbnB1dFByb2ZpbGVUaXRsZS52YWx1ZSA9IHJlc3VsdC5hYm91dDtcbn1cbmZ1bmN0aW9uIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSgpIHtcbiAgLy8gZm9ybUZpZWxkQXV0aG9yLnJlc2V0KCk7XG4gIGZpbGxQcm9maWxlRm9ybSgpO1xuICBhZGRQcm9maWxlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcbn1cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgam9iU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgYXZhdGFyU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5jb25zdCBwcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LXBvcHVwXCIsIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xuICAgICAgcHJvZmlsZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBwcm9maWxlUGljUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIuYXZhdGFyLXBvcHVwXCIsXG4gIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZWRpdFByb2ZpbGVQaWMoaW5wdXRWYWx1ZXMpXG4gICAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcihpbnB1dFZhbHVlcyk7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgZWRpdFByb2ZpbGVGb3JtKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkUGljdHVyZUZvcm0pO1xuYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgc2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlUGljRm9ybVxuKTtcbmVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcblxuZnVuY3Rpb24gaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKCkge1xuICAvLyBmb3JtRmllbGRQaWN0dXJlLnJlc2V0KCk7XG5cbiAgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHBsYWNlUG9wdXAub3BlbigpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKCkge1xuICBwcm9maWxlUGljSW5wdXQudmFsdWUgPSB1c2VySW5mby5nZXRVc2VySW5mbygpLmF2YXRhcjtcbiAgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUGljUG9wdXAub3BlbigpO1xufVxuYWRkUGljdHVyZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKTtcbmVkaXRQcm9maWxlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuUHJvZmlsZUZvcm0pO1xuZWRpdFByb2ZpbGVQaWNJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0pO1xuXG5sZXQgY3VycmVudFVzZXJJZCA9IG51bGw7XG5hcGlcbiAgLmluaXRpYWxpemUoKVxuICAudGhlbigoW3VzZXIsIGNhcmRzXSkgPT4ge1xuICAgIGN1cnJlbnRVc2VySWQgPSB1c2VyLl9pZDtcbiAgICBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICAgICAge1xuICAgICAgICBpdGVtczogY2FyZHMsXG4gICAgICAgIHJlbmRlcmVyOiByZW5kZXJDYXJkLFxuICAgICAgfSxcbiAgICAgIGNhcmRzQ29udGFpbmVyXG4gICAgKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xuXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlcik7XG4gIH0pXG4gIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgYWxlcnQocmVzKTtcbiAgfSk7XG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVUcmFzaEJ1dHRvbiIsImN1cnJlbnRVc2VySWQiLCJoYW5kbGVMaWtlQ2xpY2siLCJfaW1hZ2VMaW5rIiwibGluayIsIl90ZXh0IiwibmFtZSIsIl9saWtlcyIsImxpa2VzIiwiX2N1cnJlbnRVc2VySWQiLCJfb3duZXJJZCIsIm93bmVyIiwiX2lkIiwiX2NhcmRJZCIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZVRyYXNoQnV0dG9uIiwiX2hhbmRsZUxpa2VDbGljayIsIl9nZXRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJnZXRDYXJkSWQiLCJ1cGRhdGVMaWtlcyIsIl9yZW5kZXJMaWtlcyIsIl9saWtlQ291bnQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsIl9pc0xpa2VkIiwiX2hlYXJ0QnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwic29tZSIsInVzZXIiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZSIsImV2dCIsInRhcmdldCIsImRlbGV0ZUNhcmQiLCJfY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiY2FyZFRpdGxlIiwiYWx0Iiwic3JjIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsIiwiaW5wdXRMaXN0IiwiaW5wdXRFbCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsIiwiYnV0dG9uRWxlbWVudCIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpbnB1dElkIiwiaWQiLCJlcnJvckVsIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJfaGFuZGxlQnV0dG9uQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsb3NlIiwiX2Nsb3NlQnV0dG9uIiwiX2Zvcm1MaXN0Iiwia2V5IiwiY2xvc2UiLCJvcGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBvcHVwV2l0aENvbmZpcm0iLCJfYnV0dG9uIiwiX2J1dHRvbk9yaWdpbmFsVGV4dCIsInNldFN1Ym1pdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b25UZXh0IiwiUG9wdXBXaXRoRm9ybSIsImlucHV0VmFsdWVzIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRDb250ZW50IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0Q2xpY2siLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiaW1hZ2UiLCJpbWFnZUVsIiwiY2FwdGlvbiIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaW5pdGlhbEFycmF5IiwiX2NvbnRhaW5lciIsIl9yZW5kZXJlciIsInJlbmRlckl0ZW1zIiwiYXJyRWwiLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsIm5hbWVTZWxlY3RvciIsImpvYlNlbGVjdG9yIiwiYXZhdGFyU2VsZWN0b3IiLCJfbmFtZVNsb3QiLCJfam9iU2xvdCIsIl9hdmF0YXJTbG90IiwiZ2V0VXNlckluZm8iLCJhYm91dCIsImF2YXRhciIsInNldFVzZXJJbmZvIiwiZGF0YSIsInNldFVzZXJBdmF0YXIiLCJBcGkiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsImFsbCIsImdldEluaXRpYWxDYXJkcyIsIl9oYW5kbGVGZXRjaFJlc3BvbnNlIiwicGF0aCIsIm1ldGhvZFVzZWQiLCJib2R5Q29udGVudCIsInVuZGVmaW5lZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJyZWplY3QiLCJzdGF0dXMiLCJlZGl0VXNlclByb2ZpbGUiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkTmV3Q2FyZCIsImdldENhcmRMaWtlSW5mbyIsImNhcmRJZCIsImFkZExpa2UiLCJyZW1vdmVMaWtlIiwiZWRpdFByb2ZpbGVQaWMiLCJhdmF0YXJMaW5rIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwicHJvZmlsZVBvcHVwIiwiYnV0dG9uIiwicHJvZmlsZVBpY1BvcHVwIiwiYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IiLCJlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IiLCJoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0iLCJoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtIiwiY2FyZHMiXSwic291cmNlUm9vdCI6IiJ9