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
    this._formEl.addEventListener("submit", this._handleSubmitClick);

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
      about: this._jobSlot.textContent
    };
  }

  getUserAvatar() {
    return {
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
  profilePicInput.value = userInfo.getUserAvatar().avatar;
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
  userInfo.setUserAvatar(user);
}).catch(res => {
  alert(res);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLElBQU4sQ0FBVztFQUNUQyxXQUFXLENBQ1RDLFFBRFMsRUFFVEMsWUFGUyxFQUdUQyxlQUhTLEVBSVRDLGlCQUpTLEVBS1RDLGFBTFMsRUFNVEMsZUFOUyxFQU9UO0lBQ0EsS0FBS0MsVUFBTCxHQUFrQk4sUUFBUSxDQUFDTyxJQUEzQjtJQUNBLEtBQUtDLEtBQUwsR0FBYVIsUUFBUSxDQUFDUyxJQUF0QjtJQUNBLEtBQUtDLE1BQUwsR0FBY1YsUUFBUSxDQUFDVyxLQUF2QjtJQUNBLEtBQUtDLGNBQUwsR0FBc0JSLGFBQXRCO0lBQ0EsS0FBS1MsUUFBTCxHQUFnQmIsUUFBUSxDQUFDYyxLQUFULENBQWVDLEdBQS9CO0lBQ0EsS0FBS0MsT0FBTCxHQUFlaEIsUUFBUSxDQUFDZSxHQUF4QjtJQUNBLEtBQUtFLGFBQUwsR0FBcUJoQixZQUFyQjtJQUNBLEtBQUtpQixnQkFBTCxHQUF3QmhCLGVBQXhCO0lBQ0EsS0FBS2lCLGtCQUFMLEdBQTBCaEIsaUJBQTFCO0lBQ0EsS0FBS2lCLGdCQUFMLEdBQXdCZixlQUF4QjtFQUNEOztFQUNEZ0IsWUFBWSxHQUFHO0lBQ2IsT0FBT0MsUUFBUSxDQUNaQyxhQURJLENBQ1UsS0FBS04sYUFEZixFQUVKTyxPQUZJLENBRUlELGFBRkosQ0FFa0IsT0FGbEIsRUFHSkUsU0FISSxDQUdNLElBSE4sQ0FBUDtFQUlEOztFQUNEQyxTQUFTLEdBQUc7SUFDVixPQUFPLEtBQUtWLE9BQVo7RUFDRDs7RUFDRFcsV0FBVyxDQUFDaEIsS0FBRCxFQUFRO0lBQ2pCLEtBQUtELE1BQUwsR0FBY0MsS0FBZDs7SUFDQSxLQUFLaUIsWUFBTDtFQUNEOztFQUVEQSxZQUFZLEdBQUc7SUFDYixLQUFLQyxVQUFMLENBQWdCQyxXQUFoQixHQUE4QixLQUFLcEIsTUFBTCxDQUFZcUIsTUFBMUM7O0lBQ0EsSUFBSSxLQUFLQyxRQUFMLEVBQUosRUFBcUI7TUFDbkIsS0FBS0MsWUFBTCxDQUFrQkMsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLG1CQUFoQztJQUNELENBRkQsTUFFTztNQUNMLEtBQUtGLFlBQUwsQ0FBa0JDLFNBQWxCLENBQTRCRSxNQUE1QixDQUFtQyxtQkFBbkM7SUFDRDtFQUNGOztFQUNESixRQUFRLEdBQUc7SUFDVCxPQUFPLEtBQUt0QixNQUFMLENBQVkyQixJQUFaLENBQWtCQyxJQUFELElBQVU7TUFDaEMsT0FBT0EsSUFBSSxDQUFDdkIsR0FBTCxLQUFhLEtBQUtILGNBQXpCO0lBQ0QsQ0FGTSxDQUFQO0VBR0Q7O0VBQ0QyQixrQkFBa0IsR0FBRztJQUNuQixLQUFLTixZQUFMLENBQWtCTyxnQkFBbEIsQ0FBbUMsU0FBbkMsRUFBOEMsTUFBTTtNQUNsRDtNQUNBLElBQUksS0FBS1IsUUFBTCxFQUFKLEVBQXFCO1FBQ25CLEtBQUtaLGdCQUFMLENBQXNCLEtBQUtKLE9BQTNCLEVBQW9DLFFBQXBDLEVBQThDLElBQTlDO01BQ0QsQ0FGRCxNQUVPO1FBQ0wsS0FBS0ksZ0JBQUwsQ0FBc0IsS0FBS0osT0FBM0IsRUFBb0MsS0FBcEMsRUFBMkMsSUFBM0M7TUFDRDtJQUNGLENBUEQ7O0lBU0EsSUFBSSxLQUFLeUIsWUFBVCxFQUF1QjtNQUNyQixLQUFLQSxZQUFMLENBQWtCRCxnQkFBbEIsQ0FBbUMsU0FBbkMsRUFBOEMsTUFBTTtRQUNsRCxLQUFLckIsa0JBQUwsQ0FBd0IsSUFBeEI7TUFDRCxDQUZEO0lBR0Q7O0lBRUQsS0FBS3VCLFVBQUwsQ0FBZ0JGLGdCQUFoQixDQUFpQyxTQUFqQyxFQUE2Q0csR0FBRCxJQUFTO01BQ25ELEtBQUt6QixnQkFBTCxDQUFzQnlCLEdBQUcsQ0FBQ0MsTUFBMUI7SUFDRCxDQUZEO0VBR0Q7O0VBRURDLFVBQVUsR0FBRztJQUNYLEtBQUtDLFlBQUwsQ0FBa0JWLE1BQWxCOztJQUNBLEtBQUtVLFlBQUwsR0FBb0IsSUFBcEI7RUFDRDs7RUFDREMsVUFBVSxHQUFHO0lBQ1gsS0FBS0QsWUFBTCxHQUFvQixLQUFLekIsWUFBTCxFQUFwQjtJQUNBLEtBQUtxQixVQUFMLEdBQWtCLEtBQUtJLFlBQUwsQ0FBa0J2QixhQUFsQixDQUFnQyxjQUFoQyxDQUFsQjs7SUFDQSxNQUFNeUIsU0FBUyxHQUFHLEtBQUtGLFlBQUwsQ0FBa0J2QixhQUFsQixDQUFnQyxjQUFoQyxDQUFsQjs7SUFDQSxLQUFLTSxVQUFMLEdBQWtCLEtBQUtpQixZQUFMLENBQWtCdkIsYUFBbEIsQ0FBZ0MsY0FBaEMsQ0FBbEI7SUFDQSxLQUFLa0IsWUFBTCxHQUFvQixLQUFLSyxZQUFMLENBQWtCdkIsYUFBbEIsQ0FBZ0Msc0JBQWhDLENBQXBCO0lBQ0EsS0FBS1UsWUFBTCxHQUFvQixLQUFLYSxZQUFMLENBQWtCdkIsYUFBbEIsQ0FBZ0Msb0JBQWhDLENBQXBCO0lBRUEsS0FBS21CLFVBQUwsQ0FBZ0JPLEdBQWhCLEdBQXNCLEtBQUt6QyxLQUEzQjtJQUNBLEtBQUtrQyxVQUFMLENBQWdCUSxHQUFoQixHQUFzQixLQUFLNUMsVUFBM0I7SUFDQTBDLFNBQVMsQ0FBQ2xCLFdBQVYsR0FBd0IsS0FBS3RCLEtBQTdCOztJQUVBLElBQUksS0FBS0ssUUFBTCxLQUFrQixLQUFLRCxjQUEzQixFQUEyQztNQUN6QyxLQUFLNkIsWUFBTCxDQUFrQkwsTUFBbEI7O01BQ0EsS0FBS0ssWUFBTCxHQUFvQixJQUFwQjtJQUNEOztJQUNELEtBQUtGLGtCQUFMOztJQUNBLEtBQUtYLFlBQUw7O0lBRUEsT0FBTyxLQUFLa0IsWUFBWjtFQUNEOztBQTVGUTs7QUErRlgsaUVBQWVoRCxJQUFmOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUZBLE1BQU1xRCxhQUFOLENBQW9CO0VBQ2xCcEQsV0FBVyxDQUFDcUQsUUFBRCxFQUFXQyxNQUFYLEVBQW1CO0lBQUEsMENBMkJWQyxTQUFELElBQ2pCQSxTQUFTLENBQUNqQixJQUFWLENBQWdCa0IsT0FBRCxJQUFhLENBQUNBLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQkMsS0FBOUMsQ0E1QjRCOztJQUM1QixLQUFLQyxTQUFMLEdBQWlCTixRQUFqQjtJQUNBLEtBQUtPLE9BQUwsR0FBZU4sTUFBZjtFQUNEOztFQUVEZCxrQkFBa0IsQ0FBQ2UsU0FBRCxFQUFZTSxhQUFaLEVBQTJCO0lBQzNDTixTQUFTLENBQUNPLE9BQVYsQ0FBbUJOLE9BQUQsSUFBYTtNQUM3QkEsT0FBTyxDQUFDZixnQkFBUixDQUF5QixPQUF6QixFQUFrQyxNQUFNO1FBQ3RDLEtBQUtzQixtQkFBTCxDQUF5QlAsT0FBekI7O1FBQ0EsS0FBS1Esa0JBQUwsQ0FBd0JULFNBQXhCLEVBQW1DTSxhQUFuQztNQUNELENBSEQ7SUFJRCxDQUxEO0VBTUQ7O0VBQ0RFLG1CQUFtQixDQUFDUCxPQUFELEVBQVU7SUFDM0IsSUFBSSxDQUFDQSxPQUFPLENBQUNDLFFBQVIsQ0FBaUJDLEtBQXRCLEVBQTZCO01BQzNCLEtBQUtPLGVBQUwsQ0FBcUJULE9BQXJCO0lBQ0QsQ0FGRCxNQUVPO01BQ0wsS0FBS1UsZUFBTCxDQUFxQlYsT0FBckI7SUFDRDtFQUNGOztFQUNEUSxrQkFBa0IsQ0FBQ1QsU0FBRCxFQUFZTSxhQUFaLEVBQTJCO0lBQzNDLElBQUksS0FBS00sZ0JBQUwsQ0FBc0JaLFNBQXRCLENBQUosRUFBc0M7TUFDcENNLGFBQWEsQ0FBQ08sUUFBZCxHQUF5QixJQUF6QjtJQUNELENBRkQsTUFFTztNQUNMUCxhQUFhLENBQUNPLFFBQWQsR0FBeUIsS0FBekI7SUFDRDtFQUNGOztFQUlESCxlQUFlLENBQUNULE9BQUQsRUFBVTtJQUN2QkEsT0FBTyxDQUFDckIsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsS0FBS3VCLFNBQUwsQ0FBZVUsZUFBckM7SUFDQSxNQUFNQyxZQUFZLEdBQUdkLE9BQU8sQ0FBQ2UsaUJBQTdCO0lBQ0EsTUFBTUMsT0FBTyxHQUFHaEIsT0FBTyxDQUFDaUIsRUFBeEI7O0lBQ0EsTUFBTUMsT0FBTyxHQUFHLEtBQUtkLE9BQUwsQ0FBYXBDLGFBQWIsWUFBK0JnRCxPQUEvQixZQUFoQjs7SUFDQUUsT0FBTyxDQUFDM0MsV0FBUixHQUFzQnVDLFlBQXRCO0lBQ0FJLE9BQU8sQ0FBQ3ZDLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLEtBQUt1QixTQUFMLENBQWVnQixVQUFyQztFQUNEOztFQUNEVCxlQUFlLENBQUNWLE9BQUQsRUFBVTtJQUN2QkEsT0FBTyxDQUFDckIsU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUIsS0FBS3NCLFNBQUwsQ0FBZVUsZUFBeEM7SUFDQSxNQUFNRyxPQUFPLEdBQUdoQixPQUFPLENBQUNpQixFQUF4Qjs7SUFDQSxNQUFNQyxPQUFPLEdBQUcsS0FBS2QsT0FBTCxDQUFhcEMsYUFBYixZQUErQmdELE9BQS9CLFlBQWhCOztJQUNBRSxPQUFPLENBQUMzQyxXQUFSLEdBQXNCLEVBQXRCO0lBQ0EyQyxPQUFPLENBQUN2QyxTQUFSLENBQWtCRSxNQUFsQixDQUF5QixLQUFLc0IsU0FBTCxDQUFlZ0IsVUFBeEM7RUFDRDs7RUFDREMsZUFBZSxHQUFHO0lBQ2hCLE1BQU1yQixTQUFTLEdBQUcsQ0FDaEIsR0FBRyxLQUFLSyxPQUFMLENBQWFpQixnQkFBYixDQUE4QixLQUFLbEIsU0FBTCxDQUFlbUIsYUFBN0MsQ0FEYSxDQUFsQjs7SUFHQSxNQUFNakIsYUFBYSxHQUFHLEtBQUtELE9BQUwsQ0FBYXBDLGFBQWIsQ0FDcEIsS0FBS21DLFNBQUwsQ0FBZW9CLG9CQURLLENBQXRCOztJQUdBLEtBQUtuQixPQUFMLENBQWFuQixnQkFBYixDQUE4QixRQUE5QixFQUF5Q0csR0FBRCxJQUFTO01BQy9DQSxHQUFHLENBQUNvQyxjQUFKO0lBQ0QsQ0FGRDs7SUFHQSxLQUFLeEMsa0JBQUwsQ0FBd0JlLFNBQXhCLEVBQW1DTSxhQUFuQztFQUNEOztFQUNEb0IsZUFBZSxHQUFHO0lBQ2hCLE1BQU0xQixTQUFTLEdBQUcsQ0FDaEIsR0FBRyxLQUFLSyxPQUFMLENBQWFpQixnQkFBYixDQUE4QixLQUFLbEIsU0FBTCxDQUFlbUIsYUFBN0MsQ0FEYSxDQUFsQjs7SUFHQSxNQUFNakIsYUFBYSxHQUFHLEtBQUtELE9BQUwsQ0FBYXBDLGFBQWIsQ0FDcEIsS0FBS21DLFNBQUwsQ0FBZW9CLG9CQURLLENBQXRCOztJQUdBeEIsU0FBUyxDQUFDTyxPQUFWLENBQW1CTixPQUFELElBQWE7TUFDN0IsS0FBS1UsZUFBTCxDQUFxQlYsT0FBckI7SUFDRCxDQUZEOztJQUdBLEtBQUtRLGtCQUFMLENBQXdCVCxTQUF4QixFQUFtQ00sYUFBbkM7RUFDRDs7QUFyRWlCLEVBdUVwQjs7O0FBQ0EsaUVBQWVULGFBQWY7Ozs7Ozs7Ozs7Ozs7O0FDekVlLE1BQU04QixLQUFOLENBQVk7RUFDekJsRixXQUFXLENBQUNtRixhQUFELEVBQWdCO0lBQ3pCLEtBQUtDLE1BQUwsR0FBYzdELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QjJELGFBQXZCLENBQWQ7SUFDQSxLQUFLRSxlQUFMLEdBQXVCLEtBQUtBLGVBQUwsQ0FBcUJDLElBQXJCLENBQTBCLElBQTFCLENBQXZCO0lBQ0EsS0FBS0Msa0JBQUwsR0FBMEIsS0FBS0Esa0JBQUwsQ0FBd0JELElBQXhCLENBQTZCLElBQTdCLENBQTFCO0lBQ0EsS0FBS0UsbUJBQUwsR0FBMkIsS0FBS0EsbUJBQUwsQ0FBeUJGLElBQXpCLENBQThCLElBQTlCLENBQTNCO0lBQ0EsS0FBS0csWUFBTCxHQUFvQixLQUFLTCxNQUFMLENBQVk1RCxhQUFaLENBQTBCLHNCQUExQixDQUFwQjtJQUNBLEtBQUtrRSxTQUFMLEdBQWlCLENBQUMsR0FBRyxLQUFLTixNQUFMLENBQVlQLGdCQUFaLENBQTZCLGNBQTdCLENBQUosQ0FBakI7RUFDRDs7RUFFRFEsZUFBZSxDQUFDekMsR0FBRCxFQUFNO0lBQ25CLElBQUlBLEdBQUcsQ0FBQytDLEdBQUosS0FBWSxRQUFoQixFQUEwQjtNQUN4QixLQUFLQyxLQUFMO0lBQ0Q7RUFDRjs7RUFDREwsa0JBQWtCLEdBQUc7SUFDbkIsS0FBS0ssS0FBTDtFQUNEOztFQUNESixtQkFBbUIsQ0FBQzVDLEdBQUQsRUFBTTtJQUN2QixJQUFJQSxHQUFHLENBQUNDLE1BQUosS0FBZSxLQUFLdUMsTUFBeEIsRUFBZ0M7TUFDOUIsS0FBS1EsS0FBTDtJQUNEO0VBQ0Y7O0VBQ0RDLElBQUksR0FBRztJQUNMLEtBQUtyRCxrQkFBTDs7SUFFQSxLQUFLNEMsTUFBTCxDQUFZakQsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEIsWUFBMUI7RUFDRDs7RUFDRHdELEtBQUssR0FBRztJQUNOLEtBQUtSLE1BQUwsQ0FBWWpELFNBQVosQ0FBc0JFLE1BQXRCLENBQTZCLFlBQTdCOztJQUVBZCxRQUFRLENBQUN1RSxtQkFBVCxDQUE2QixPQUE3QixFQUFzQyxLQUFLVCxlQUEzQzs7SUFDQSxLQUFLSSxZQUFMLENBQWtCSyxtQkFBbEIsQ0FBc0MsU0FBdEMsRUFBaUQsS0FBS1Asa0JBQXREOztJQUNBLEtBQUtILE1BQUwsQ0FBWVUsbUJBQVosQ0FBZ0MsU0FBaEMsRUFBMkMsS0FBS04sbUJBQWhEO0VBQ0Q7O0VBRURoRCxrQkFBa0IsR0FBRztJQUNuQjtJQUNBO0lBQ0FqQixRQUFRLENBQUNrQixnQkFBVCxDQUEwQixPQUExQixFQUFtQyxLQUFLNEMsZUFBeEMsRUFIbUIsQ0FJbkI7O0lBQ0EsS0FBS0ksWUFBTCxDQUFrQmhELGdCQUFsQixDQUFtQyxTQUFuQyxFQUE4QyxLQUFLOEMsa0JBQW5ELEVBTG1CLENBTW5COzs7SUFDQSxLQUFLSCxNQUFMLENBQVkzQyxnQkFBWixDQUE2QixTQUE3QixFQUF3QyxLQUFLK0MsbUJBQTdDO0VBQ0Q7O0FBNUN3Qjs7Ozs7Ozs7Ozs7Ozs7O0FDQTNCO0FBRWUsTUFBTU8sZ0JBQU4sU0FBK0JiLDhDQUEvQixDQUFxQztFQUNsRGxGLFdBQVcsQ0FBQ21GLGFBQUQsRUFBZ0I7SUFDekIsTUFBTUEsYUFBTjtJQUNBLEtBQUthLE9BQUwsR0FBZSxLQUFLWixNQUFMLENBQVk1RCxhQUFaLENBQTBCLGdCQUExQixDQUFmO0lBQ0EsS0FBS3lFLG1CQUFMLEdBQTJCLEtBQUtELE9BQUwsQ0FBYWpFLFdBQXhDO0VBQ0Q7O0VBRURtRSxTQUFTLENBQUNDLGdCQUFELEVBQW1CO0lBQzFCLEtBQUtDLGlCQUFMLEdBQXlCRCxnQkFBekI7RUFDRDs7RUFDRFAsS0FBSyxHQUFHO0lBQ04sTUFBTUEsS0FBTjs7SUFDQSxLQUFLSSxPQUFMLENBQWFGLG1CQUFiLENBQWlDLFNBQWpDLEVBQTRDLEtBQUtNLGlCQUFqRDtFQUNEOztFQUNEUCxJQUFJLEdBQUc7SUFDTCxNQUFNQSxJQUFOOztJQUNBLEtBQUtHLE9BQUwsQ0FBYXZELGdCQUFiLENBQThCLFNBQTlCLEVBQXlDLEtBQUsyRCxpQkFBOUM7RUFDRDs7RUFDREMsYUFBYSxDQUFDQyxTQUFELEVBQVlDLFVBQVosRUFBd0I7SUFDbkMsSUFBSUQsU0FBSixFQUFlO01BQ2IsS0FBS04sT0FBTCxDQUFhNUIsUUFBYixHQUF3QixJQUF4QjtNQUNBLEtBQUs0QixPQUFMLENBQWFqRSxXQUFiLEdBQTJCd0UsVUFBM0I7SUFDRCxDQUhELE1BR087TUFDTCxLQUFLUCxPQUFMLENBQWFqRSxXQUFiLEdBQTJCLEtBQUtrRSxtQkFBaEM7TUFDQSxLQUFLRCxPQUFMLENBQWE1QixRQUFiLEdBQXdCLEtBQXhCO0lBQ0Q7RUFDRjs7QUExQmlEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZwRDtBQUVlLE1BQU1vQyxhQUFOLFNBQTRCdEIsOENBQTVCLENBQWtDO0VBQy9DbEYsV0FBVyxDQUFDbUYsYUFBRCxFQUFnQmdCLGdCQUFoQixFQUFrQztJQUMzQyxNQUFNaEIsYUFBTjs7SUFEMkMsNENBcUJ4QixNQUFNO01BQ3pCLE1BQU1zQixXQUFXLEdBQUcsS0FBS0MsZUFBTCxFQUFwQjs7TUFDQSxLQUFLTixpQkFBTCxDQUF1QkssV0FBdkIsRUFBb0MsS0FBS1QsT0FBekM7SUFDRCxDQXhCNEM7O0lBRTNDLEtBQUtJLGlCQUFMLEdBQXlCRCxnQkFBekI7SUFDQSxLQUFLdkMsT0FBTCxHQUFlLEtBQUt3QixNQUFMLENBQVk1RCxhQUFaLENBQTBCLGNBQTFCLENBQWY7SUFDQSxLQUFLd0UsT0FBTCxHQUFlLEtBQUtaLE1BQUwsQ0FBWTVELGFBQVosQ0FBMEIsZ0JBQTFCLENBQWY7SUFDQSxLQUFLeUUsbUJBQUwsR0FBMkIsS0FBS0QsT0FBTCxDQUFhakUsV0FBeEM7RUFDRDs7RUFFRDJFLGVBQWUsR0FBRztJQUNoQixNQUFNbkQsU0FBUyxHQUFHLENBQUMsR0FBRyxLQUFLNkIsTUFBTCxDQUFZUCxnQkFBWixDQUE2QixlQUE3QixDQUFKLENBQWxCO0lBQ0EsTUFBTThCLFlBQVksR0FBRyxFQUFyQjtJQUNBcEQsU0FBUyxDQUFDTyxPQUFWLENBQW1CTixPQUFELElBQWE7TUFDN0JtRCxZQUFZLENBQUNuRCxPQUFPLENBQUM5QyxJQUFULENBQVosR0FBNkI4QyxPQUFPLENBQUNvRCxLQUFyQztJQUNELENBRkQ7SUFHQSxPQUFPRCxZQUFQO0VBQ0Q7O0VBQ0RuRSxrQkFBa0IsR0FBRztJQUNuQixLQUFLb0IsT0FBTCxDQUFhbkIsZ0JBQWIsQ0FBOEIsUUFBOUIsRUFBd0MsS0FBS29FLGtCQUE3Qzs7SUFFQSxNQUFNckUsa0JBQU47RUFDRDs7RUFLRG9ELEtBQUssR0FBRztJQUNOLE1BQU1BLEtBQU47O0lBQ0EsS0FBS2hDLE9BQUwsQ0FBYWtDLG1CQUFiLENBQWlDLFFBQWpDLEVBQTJDLEtBQUtlLGtCQUFoRDs7SUFDQSxLQUFLakQsT0FBTCxDQUFha0QsS0FBYjtFQUNEOztFQUNEVCxhQUFhLENBQUNDLFNBQUQsRUFBWUMsVUFBWixFQUF3QjtJQUNuQyxJQUFJRCxTQUFKLEVBQWU7TUFDYixLQUFLTixPQUFMLENBQWE1QixRQUFiLEdBQXdCLElBQXhCO01BQ0EsS0FBSzRCLE9BQUwsQ0FBYWpFLFdBQWIsR0FBMkJ3RSxVQUEzQjtJQUNELENBSEQsTUFHTztNQUNMLEtBQUtQLE9BQUwsQ0FBYWpFLFdBQWIsR0FBMkIsS0FBS2tFLG1CQUFoQztNQUNBLEtBQUtELE9BQUwsQ0FBYTVCLFFBQWIsR0FBd0IsS0FBeEI7SUFDRDtFQUNGOztBQXZDOEM7Ozs7Ozs7Ozs7Ozs7OztBQ0ZqRDtBQUNlLE1BQU0yQyxjQUFOLFNBQTZCN0IsOENBQTdCLENBQW1DO0VBQ2hEbEYsV0FBVyxDQUFDbUYsYUFBRCxFQUFnQjtJQUN6QixNQUFNQSxhQUFOO0VBQ0Q7O0VBQ0RVLElBQUksQ0FBQ21CLEtBQUQsRUFBUTtJQUNWLE1BQU1DLE9BQU8sR0FBRyxLQUFLN0IsTUFBTCxDQUFZNUQsYUFBWixDQUEwQix1QkFBMUIsQ0FBaEI7O0lBQ0F5RixPQUFPLENBQUM5RCxHQUFSLEdBQWM2RCxLQUFLLENBQUM3RCxHQUFwQjtJQUNBOEQsT0FBTyxDQUFDL0QsR0FBUixHQUFjOEQsS0FBSyxDQUFDOUQsR0FBcEI7O0lBQ0EsTUFBTWdFLE9BQU8sR0FBRyxLQUFLOUIsTUFBTCxDQUFZNUQsYUFBWixDQUEwQixzQkFBMUIsQ0FBaEI7O0lBQ0EwRixPQUFPLENBQUNuRixXQUFSLEdBQXNCaUYsS0FBSyxDQUFDOUQsR0FBNUI7SUFDQSxNQUFNMkMsSUFBTjtFQUNEOztBQVgrQzs7Ozs7Ozs7Ozs7Ozs7QUNEbkMsTUFBTXNCLE9BQU4sQ0FBYztFQUMzQm5ILFdBQVcsT0FBc0JvSCxpQkFBdEIsRUFBeUM7SUFBQSxJQUF4QztNQUFFQyxLQUFGO01BQVNDO0lBQVQsQ0FBd0M7SUFDbEQsS0FBS0MsYUFBTCxHQUFxQkYsS0FBckI7SUFDQSxLQUFLRyxVQUFMLEdBQWtCakcsUUFBUSxDQUFDQyxhQUFULENBQXVCNEYsaUJBQXZCLENBQWxCO0lBQ0EsS0FBS0ssU0FBTCxHQUFpQkgsUUFBakI7RUFDRDs7RUFDREksV0FBVyxHQUFHO0lBQ1osS0FBS0gsYUFBTCxDQUFtQnpELE9BQW5CLENBQTRCNkQsS0FBRCxJQUFXO01BQ3BDLEtBQUtGLFNBQUwsQ0FBZUUsS0FBZjtJQUNELENBRkQ7RUFHRDs7RUFDREMsT0FBTyxDQUFDQyxPQUFELEVBQVU7SUFDZixLQUFLTCxVQUFMLENBQWdCTSxPQUFoQixDQUF3QkQsT0FBeEI7RUFDRDs7QUFiMEI7Ozs7Ozs7Ozs7Ozs7O0FDQWQsTUFBTUUsUUFBTixDQUFlO0VBQzVCL0gsV0FBVyxPQUFnRDtJQUFBLElBQS9DO01BQUVnSSxZQUFGO01BQWdCQyxXQUFoQjtNQUE2QkM7SUFBN0IsQ0FBK0M7SUFDekQsS0FBS0MsU0FBTCxHQUFpQjVHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QndHLFlBQXZCLENBQWpCO0lBQ0EsS0FBS0ksUUFBTCxHQUFnQjdHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QnlHLFdBQXZCLENBQWhCO0lBQ0EsS0FBS0ksV0FBTCxHQUFtQjlHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QjBHLGNBQXZCLENBQW5CO0VBQ0QsQ0FMMkIsQ0FNNUI7OztFQUNBSSxXQUFXLEdBQUc7SUFDWixPQUFPO01BQ0w1SCxJQUFJLEVBQUUsS0FBS3lILFNBQUwsQ0FBZXBHLFdBRGhCO01BRUx3RyxLQUFLLEVBQUUsS0FBS0gsUUFBTCxDQUFjckc7SUFGaEIsQ0FBUDtFQUlEOztFQUVEeUcsYUFBYSxHQUFHO0lBQ2QsT0FBTztNQUNMQyxNQUFNLEVBQUUsS0FBS0osV0FBTCxDQUFpQmxGO0lBRHBCLENBQVA7RUFHRCxDQWxCMkIsQ0FtQjVCOzs7RUFDQXVGLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0lBQ2hCLEtBQUtSLFNBQUwsQ0FBZXBHLFdBQWYsR0FBNkI0RyxJQUFJLENBQUNqSSxJQUFsQztJQUNBLEtBQUswSCxRQUFMLENBQWNyRyxXQUFkLEdBQTRCNEcsSUFBSSxDQUFDSixLQUFqQyxDQUZnQixDQUdoQjtJQUNBO0VBQ0Q7O0VBQ0RLLGFBQWEsQ0FBQ0QsSUFBRCxFQUFPO0lBQ2xCLEtBQUtOLFdBQUwsQ0FBaUJsRixHQUFqQixHQUF1QndGLElBQUksQ0FBQ0YsTUFBNUI7RUFDRDs7QUE1QjJCOzs7Ozs7Ozs7Ozs7OztBQ0FmLE1BQU1JLEdBQU4sQ0FBVTtFQUN2QjdJLFdBQVcsT0FBdUI7SUFBQSxJQUF0QjtNQUFFOEksT0FBRjtNQUFXQztJQUFYLENBQXNCO0lBQ2hDLEtBQUtDLFFBQUwsR0FBZ0JGLE9BQWhCO0lBQ0EsS0FBS0csUUFBTCxHQUFnQkYsT0FBaEI7RUFDRDs7RUFDREcsVUFBVSxHQUFHO0lBQ1gsT0FBT0MsT0FBTyxDQUFDQyxHQUFSLENBQVksQ0FBQyxLQUFLZCxXQUFMLEVBQUQsRUFBcUIsS0FBS2UsZUFBTCxFQUFyQixDQUFaLENBQVA7RUFDRDs7RUFDREMsb0JBQW9CLENBQUNDLElBQUQsRUFBb0Q7SUFBQSxJQUE3Q0MsVUFBNkMsdUVBQWhDLEtBQWdDO0lBQUEsSUFBekJDLFdBQXlCLHVFQUFYQyxTQUFXO0lBQ3RFLE9BQU9DLEtBQUssV0FBSSxLQUFLWCxRQUFULFNBQW9CTyxJQUFwQixHQUE0QjtNQUN0Q0ssTUFBTSxFQUFFSixVQUQ4QjtNQUV0Q1QsT0FBTyxFQUFFLEtBQUtFLFFBRndCO01BR3RDWSxJQUFJLEVBQUVKO0lBSGdDLENBQTVCLENBQUwsQ0FJSkssSUFKSSxDQUlFQyxHQUFELElBQVM7TUFDZixJQUFJQSxHQUFHLENBQUNDLEVBQVIsRUFBWTtRQUNWLE9BQU9ELEdBQUcsQ0FBQ0UsSUFBSixFQUFQO01BQ0QsQ0FGRCxNQUVPO1FBQ0wsT0FBT2QsT0FBTyxDQUFDZSxNQUFSLGtCQUF5QkgsR0FBRyxDQUFDSSxNQUE3QixFQUFQO01BQ0Q7SUFDRixDQVZNLENBQVA7RUFXRDs7RUFDRGQsZUFBZSxHQUFHO0lBQ2hCLE9BQU8sS0FBS0Msb0JBQUwsQ0FBMEIsUUFBMUIsQ0FBUDtFQUNEOztFQUNEaEIsV0FBVyxHQUFHO0lBQ1osT0FBTyxLQUFLZ0Isb0JBQUwsQ0FBMEIsV0FBMUIsQ0FBUDtFQUNEOztFQUNEYyxlQUFlLENBQUMzRCxXQUFELEVBQWM7SUFDM0IsTUFBTWdELFdBQVcsR0FBR1ksSUFBSSxDQUFDQyxTQUFMLENBQWU7TUFDakM1SixJQUFJLEVBQUUrRixXQUFXLENBQUMvRixJQURlO01BRWpDNkgsS0FBSyxFQUFFOUIsV0FBVyxDQUFDOEI7SUFGYyxDQUFmLENBQXBCO0lBSUEsT0FBTyxLQUFLZSxvQkFBTCxDQUEwQixXQUExQixFQUF1QyxPQUF2QyxFQUFnREcsV0FBaEQsQ0FBUDtFQUNEOztFQUNEYyxVQUFVLENBQUM5RCxXQUFELEVBQWM7SUFDdEIsTUFBTWdELFdBQVcsR0FBR1ksSUFBSSxDQUFDQyxTQUFMLENBQWU7TUFDakM1SixJQUFJLEVBQUUrRixXQUFXLENBQUMvRixJQURlO01BRWpDRixJQUFJLEVBQUVpRyxXQUFXLENBQUNqRztJQUZlLENBQWYsQ0FBcEI7SUFJQSxPQUFPLEtBQUs4SSxvQkFBTCxDQUEwQixRQUExQixFQUFvQyxNQUFwQyxFQUE0Q0csV0FBNUMsQ0FBUDtFQUNEOztFQUNEZSxlQUFlLEdBQUc7SUFDaEIsT0FBTyxLQUFLbEIsb0JBQUwsQ0FBMEIsUUFBMUIsQ0FBUDtFQUNEOztFQUNEeEcsVUFBVSxDQUFDMkgsTUFBRCxFQUFTO0lBQ2pCLE9BQU8sS0FBS25CLG9CQUFMLGtCQUFvQ21CLE1BQXBDLEdBQThDLFFBQTlDLENBQVA7RUFDRDs7RUFFREMsT0FBTyxDQUFDRCxNQUFELEVBQVM7SUFDZCxPQUFPLEtBQUtuQixvQkFBTCx3QkFBMENtQixNQUExQyxHQUFvRCxLQUFwRCxDQUFQO0VBQ0Q7O0VBQ0RFLFVBQVUsQ0FBQ0YsTUFBRCxFQUFTO0lBQ2pCLE9BQU8sS0FBS25CLG9CQUFMLHdCQUEwQ21CLE1BQTFDLEdBQW9ELFFBQXBELENBQVA7RUFDRDs7RUFDREcsY0FBYyxDQUFDQyxVQUFELEVBQWE7SUFDekIsTUFBTXBCLFdBQVcsR0FBR1ksSUFBSSxDQUFDQyxTQUFMLENBQWU7TUFDakM3QixNQUFNLEVBQUVvQyxVQUFVLENBQUNwQztJQURjLENBQWYsQ0FBcEI7SUFHQSxPQUFPLEtBQUthLG9CQUFMLENBQTBCLGtCQUExQixFQUE4QyxPQUE5QyxFQUF1REcsV0FBdkQsQ0FBUDtFQUNEOztBQTNEc0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbEIsTUFBTXBHLFFBQVEsR0FBRztFQUN0QnlCLGFBQWEsRUFBRSxlQURPO0VBRXRCQyxvQkFBb0IsRUFBRSxnQkFGQTtFQUd0QlYsZUFBZSxFQUFFLGNBSEs7RUFJdEJNLFVBQVUsRUFBRTtBQUpVLENBQWpCO0FBTUEsTUFBTW1HLGNBQWMsR0FBRyxvQkFBdkI7QUFDQSxNQUFNNUssWUFBWSxHQUFHLGdCQUFyQjs7Ozs7Ozs7Ozs7QUNQUDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0NKQTs7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxNQUFNNkssZUFBZSxHQUFHeEosUUFBUSxDQUFDQyxhQUFULENBQXVCLDRCQUF2QixDQUF4QjtBQUNBLE1BQU13SixjQUFjLEdBQUd6SixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsc0JBQXZCLENBQXZCO0FBQ0EsTUFBTXlKLGVBQWUsR0FBRzFKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUF4QjtBQUNBLE1BQU0wSixjQUFjLEdBQUczSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBdkI7QUFDQSxNQUFNMkosa0JBQWtCLEdBQUc1SixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBM0I7QUFDQSxNQUFNNEosZUFBZSxHQUFHN0osUUFBUSxDQUFDQyxhQUFULENBQXVCLG9CQUF2QixDQUF4QjtBQUNBLE1BQU02SixnQkFBZ0IsR0FBRzlKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixvQkFBdkIsQ0FBekI7QUFDQSxNQUFNOEosZ0JBQWdCLEdBQUcvSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBekI7QUFDQSxNQUFNK0osaUJBQWlCLEdBQUdoSyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQTFCO0FBQ0EsTUFBTWdLLGVBQWUsR0FBR2pLLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUF4QjtBQUNBLE1BQU1pSyxrQkFBa0IsR0FBR2xLLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixnQkFBdkIsQ0FBM0IsRUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQSxNQUFNa0ssR0FBRyxHQUFHLElBQUk3QyxrREFBSixDQUFRO0VBQ2xCQyxPQUFPLEVBQUUsNkNBRFM7RUFFbEJDLE9BQU8sRUFBRTtJQUNQNEMsYUFBYSxFQUFFLHNDQURSO0lBRVAsZ0JBQWdCO0VBRlQ7QUFGUyxDQUFSLENBQVo7O0FBU0EsU0FBU3JMLGVBQVQsQ0FBeUJtSyxNQUF6QixFQUFpQ21CLE1BQWpDLEVBQXlDQyxJQUF6QyxFQUErQztFQUM3QyxJQUFJRCxNQUFNLEtBQUssUUFBZixFQUF5QjtJQUN2QkYsR0FBRyxDQUNBZixVQURILENBQ2NGLE1BRGQsRUFFR1gsSUFGSCxDQUVTQyxHQUFELElBQVM7TUFDYjhCLElBQUksQ0FBQ2pLLFdBQUwsQ0FBaUJtSSxHQUFHLENBQUNuSixLQUFyQjtJQUNELENBSkgsRUFLR2tMLEtBTEgsQ0FLVS9CLEdBQUQsSUFBUztNQUNkZ0MsS0FBSyxDQUFDaEMsR0FBRCxDQUFMO0lBQ0QsQ0FQSDtFQVFELENBVEQsTUFTTztJQUNMMkIsR0FBRyxDQUNBaEIsT0FESCxDQUNXRCxNQURYLEVBRUdYLElBRkgsQ0FFU0MsR0FBRCxJQUFTO01BQ2I4QixJQUFJLENBQUNqSyxXQUFMLENBQWlCbUksR0FBRyxDQUFDbkosS0FBckI7SUFDRCxDQUpILEVBS0drTCxLQUxILENBS1UvQixHQUFELElBQVM7TUFDZGdDLEtBQUssQ0FBQ2hDLEdBQUQsQ0FBTDtJQUNELENBUEg7RUFRRDtBQUNGOztBQUVELFNBQVNpQyxVQUFULENBQW9CdkYsV0FBcEIsRUFBaUM7RUFDL0IsTUFBTW9GLElBQUksR0FBRyxJQUFJOUwsd0RBQUosQ0FDWDBHLFdBRFcsRUFFWHZHLDBEQUZXLEVBR1hDLGVBSFcsRUFJWEMsaUJBSlcsRUFLWEMsYUFMVyxFQU1YQyxlQU5XLENBQWI7RUFRQSxNQUFNMkwsTUFBTSxHQUFHSixJQUFJLENBQUM3SSxVQUFMLEVBQWY7RUFDQWtKLFdBQVcsQ0FBQ3RFLE9BQVosQ0FBb0JxRSxNQUFwQjtBQUNEOztBQUVELE1BQU1FLFVBQVUsR0FBRyxJQUFJM0YsaUVBQUosQ0FBa0IsZUFBbEIsRUFBb0NDLFdBQUQsSUFBaUI7RUFDckUwRixVQUFVLENBQUM5RixhQUFYLENBQXlCLElBQXpCLEVBQStCLFdBQS9CO0VBQ0FxRixHQUFHLENBQ0FuQixVQURILENBQ2M5RCxXQURkLEVBRUdxRCxJQUZILENBRVNyRCxXQUFELElBQWlCO0lBQ3JCdUYsVUFBVSxDQUFDdkYsV0FBRCxDQUFWO0lBQ0EwRixVQUFVLENBQUN2RyxLQUFYO0VBQ0QsQ0FMSCxFQU1Ha0csS0FOSCxDQU1VL0IsR0FBRCxJQUFTO0lBQ2RnQyxLQUFLLENBQUNoQyxHQUFELENBQUw7RUFDRCxDQVJILEVBU0dxQyxPQVRILENBU1csTUFBTTtJQUNiRCxVQUFVLENBQUM5RixhQUFYLENBQXlCLEtBQXpCLEVBQWdDLFdBQWhDO0VBQ0QsQ0FYSDtBQVlELENBZGtCLENBQW5CO0FBZ0JBLE1BQU1nRyxVQUFVLEdBQUcsSUFBSXRGLGtFQUFKLENBQW1CLGdCQUFuQixDQUFuQjs7QUFDQSxTQUFTNUcsZUFBVCxDQUF5QjZHLEtBQXpCLEVBQWdDO0VBQzlCcUYsVUFBVSxDQUFDeEcsSUFBWCxDQUFnQm1CLEtBQWhCO0FBQ0Q7O0FBRUQsTUFBTXNGLHNCQUFzQixHQUFHLElBQUl2RyxvRUFBSixDQUFxQixlQUFyQixDQUEvQjs7QUFFQSxTQUFTM0YsaUJBQVQsQ0FBMkJ5TCxJQUEzQixFQUFpQztFQUMvQlMsc0JBQXNCLENBQUNwRyxTQUF2QixDQUFpQyxNQUFNO0lBQ3JDb0csc0JBQXNCLENBQUNqRyxhQUF2QixDQUFxQyxJQUFyQyxFQUEyQyxXQUEzQztJQUNBcUYsR0FBRyxDQUNBNUksVUFESCxDQUNjK0ksSUFBSSxDQUFDbEssU0FBTCxFQURkLEVBRUdtSSxJQUZILENBRVEsTUFBTTtNQUNWK0IsSUFBSSxDQUFDL0ksVUFBTDtNQUNBd0osc0JBQXNCLENBQUMxRyxLQUF2QjtJQUNELENBTEgsRUFNR2tHLEtBTkgsQ0FNVS9CLEdBQUQsSUFBUztNQUNkZ0MsS0FBSyxDQUFDaEMsR0FBRCxDQUFMO0lBQ0QsQ0FSSCxFQVNHcUMsT0FUSCxDQVNXLE1BQU07TUFDYkUsc0JBQXNCLENBQUNqRyxhQUF2QixDQUFxQyxLQUFyQyxFQUE0QyxXQUE1QztJQUNELENBWEg7RUFZRCxDQWREO0VBZUFpRyxzQkFBc0IsQ0FBQ3pHLElBQXZCO0FBQ0Q7O0FBRUQsSUFBSXFHLFdBQVcsR0FBRyxJQUFsQjs7QUFFQSxTQUFTSyxlQUFULEdBQTJCO0VBQ3pCLE1BQU1DLE1BQU0sR0FBR0MsUUFBUSxDQUFDbkUsV0FBVCxFQUFmO0VBQ0FnRCxnQkFBZ0IsQ0FBQzFFLEtBQWpCLEdBQXlCNEYsTUFBTSxDQUFDOUwsSUFBaEM7RUFDQTZLLGlCQUFpQixDQUFDM0UsS0FBbEIsR0FBMEI0RixNQUFNLENBQUNqRSxLQUFqQztBQUNEOztBQUNELFNBQVNtRSxxQkFBVCxHQUFpQztFQUMvQjtFQUNBSCxlQUFlO0VBQ2ZJLHVCQUF1QixDQUFDMUgsZUFBeEI7RUFDQTJILFlBQVksQ0FBQy9HLElBQWI7QUFDRDs7QUFDRCxNQUFNNEcsUUFBUSxHQUFHLElBQUkxRSw0REFBSixDQUFhO0VBQzVCQyxZQUFZLEVBQUUscUJBRGM7RUFFNUJDLFdBQVcsRUFBRSxzQkFGZTtFQUc1QkMsY0FBYyxFQUFFO0FBSFksQ0FBYixDQUFqQjtBQUtBLE1BQU0wRSxZQUFZLEdBQUcsSUFBSXBHLGlFQUFKLENBQWtCLGFBQWxCLEVBQWlDLENBQUNDLFdBQUQsRUFBY29HLE1BQWQsS0FBeUI7RUFDN0VELFlBQVksQ0FBQ3ZHLGFBQWIsQ0FBMkIsSUFBM0IsRUFBaUMsV0FBakM7RUFDQXFGLEdBQUcsQ0FDQXRCLGVBREgsQ0FDbUIzRCxXQURuQixFQUVHcUQsSUFGSCxDQUVTckQsV0FBRCxJQUFpQjtJQUNyQmdHLFFBQVEsQ0FBQy9ELFdBQVQsQ0FBcUJqQyxXQUFyQjtJQUNBbUcsWUFBWSxDQUFDaEgsS0FBYjtFQUNELENBTEgsRUFNR2tHLEtBTkgsQ0FNVS9CLEdBQUQsSUFBUztJQUNkZ0MsS0FBSyxDQUFDaEMsR0FBRCxDQUFMO0VBQ0QsQ0FSSCxFQVNHcUMsT0FUSCxDQVNXLE1BQU07SUFDYlEsWUFBWSxDQUFDdkcsYUFBYixDQUEyQixLQUEzQixFQUFrQyxXQUFsQztFQUNELENBWEg7QUFZRCxDQWRvQixDQUFyQjtBQWdCQSxNQUFNeUcsZUFBZSxHQUFHLElBQUl0RyxpRUFBSixDQUN0QixlQURzQixFQUV0QixDQUFDQyxXQUFELEVBQWNvRyxNQUFkLEtBQXlCO0VBQ3ZCQyxlQUFlLENBQUN6RyxhQUFoQixDQUE4QixJQUE5QixFQUFvQyxXQUFwQztFQUNBcUYsR0FBRyxDQUNBZCxjQURILENBQ2tCbkUsV0FEbEIsRUFFR3FELElBRkgsQ0FFU3JELFdBQUQsSUFBaUI7SUFDckJnRyxRQUFRLENBQUM3RCxhQUFULENBQXVCbkMsV0FBdkI7SUFDQXFHLGVBQWUsQ0FBQ2xILEtBQWhCO0VBQ0QsQ0FMSCxFQU1Ha0csS0FOSCxDQU1VL0IsR0FBRCxJQUFTO0lBQ2RnQyxLQUFLLENBQUNoQyxHQUFELENBQUw7RUFDRCxDQVJILEVBU0dxQyxPQVRILENBU1csTUFBTTtJQUNiVSxlQUFlLENBQUN6RyxhQUFoQixDQUE4QixLQUE5QixFQUFxQyxXQUFyQztFQUNELENBWEg7QUFZRCxDQWhCcUIsQ0FBeEI7QUFtQkEsTUFBTXNHLHVCQUF1QixHQUFHLElBQUl2SixpRUFBSixDQUFrQkMsc0RBQWxCLEVBQTRCNEgsZUFBNUIsQ0FBaEM7QUFDQTBCLHVCQUF1QixDQUFDL0gsZUFBeEI7QUFDQSxNQUFNbUksdUJBQXVCLEdBQUcsSUFBSTNKLGlFQUFKLENBQWtCQyxzREFBbEIsRUFBNEI2SCxjQUE1QixDQUFoQztBQUNBNkIsdUJBQXVCLENBQUNuSSxlQUF4QjtBQUNBLE1BQU1vSSwyQkFBMkIsR0FBRyxJQUFJNUosaUVBQUosQ0FDbENDLHNEQURrQyxFQUVsQzhILGtCQUZrQyxDQUFwQztBQUlBNkIsMkJBQTJCLENBQUNwSSxlQUE1Qjs7QUFFQSxTQUFTcUksd0JBQVQsR0FBb0M7RUFDbEM7RUFFQUYsdUJBQXVCLENBQUM5SCxlQUF4QjtFQUNBa0gsVUFBVSxDQUFDdEcsSUFBWDtBQUNEOztBQUVELFNBQVNxSCw0QkFBVCxHQUF3QztFQUN0QzFCLGVBQWUsQ0FBQzVFLEtBQWhCLEdBQXdCNkYsUUFBUSxDQUFDakUsYUFBVCxHQUF5QkMsTUFBakQ7RUFDQXVFLDJCQUEyQixDQUFDL0gsZUFBNUI7RUFDQTZILGVBQWUsQ0FBQ2pILElBQWhCO0FBQ0Q7O0FBQ0RtRixjQUFjLENBQUN2SSxnQkFBZixDQUFnQyxTQUFoQyxFQUEyQ3dLLHdCQUEzQztBQUNBbEMsZUFBZSxDQUFDdEksZ0JBQWhCLENBQWlDLFNBQWpDLEVBQTRDaUsscUJBQTVDO0FBQ0FqQixrQkFBa0IsQ0FBQ2hKLGdCQUFuQixDQUFvQyxTQUFwQyxFQUErQ3lLLDRCQUEvQztBQUVBLElBQUk3TSxhQUFhLEdBQUcsSUFBcEI7QUFDQXFMLEdBQUcsQ0FDQXhDLFVBREgsR0FFR1ksSUFGSCxDQUVRLFFBQW1CO0VBQUEsSUFBbEIsQ0FBQ3ZILElBQUQsRUFBTzRLLEtBQVAsQ0FBa0I7RUFDdkI5TSxhQUFhLEdBQUdrQyxJQUFJLENBQUN2QixHQUFyQjtFQUNBa0wsV0FBVyxHQUFHLElBQUkvRSwyREFBSixDQUNaO0lBQ0VFLEtBQUssRUFBRThGLEtBRFQ7SUFFRTdGLFFBQVEsRUFBRTBFO0VBRlosQ0FEWSxFQUtabEIsNERBTFksQ0FBZDtFQU9Bb0IsV0FBVyxDQUFDeEUsV0FBWjtFQUVBK0UsUUFBUSxDQUFDL0QsV0FBVCxDQUFxQm5HLElBQXJCO0VBQ0FrSyxRQUFRLENBQUM3RCxhQUFULENBQXVCckcsSUFBdkI7QUFDRCxDQWZILEVBZ0JHdUosS0FoQkgsQ0FnQlUvQixHQUFELElBQVM7RUFDZGdDLEtBQUssQ0FBQ2hDLEdBQUQsQ0FBTDtBQUNELENBbEJILEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3V0aWxzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhcmREYXRhLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlVHJhc2hCdXR0b24sXG4gICAgY3VycmVudFVzZXJJZCxcbiAgICBoYW5kbGVMaWtlQ2xpY2tcbiAgKSB7XG4gICAgdGhpcy5faW1hZ2VMaW5rID0gY2FyZERhdGEubGluaztcbiAgICB0aGlzLl90ZXh0ID0gY2FyZERhdGEubmFtZTtcbiAgICB0aGlzLl9saWtlcyA9IGNhcmREYXRhLmxpa2VzO1xuICAgIHRoaXMuX2N1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xuICAgIHRoaXMuX293bmVySWQgPSBjYXJkRGF0YS5vd25lci5faWQ7XG4gICAgdGhpcy5fY2FyZElkID0gY2FyZERhdGEuX2lkO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlVHJhc2hCdXR0b24gPSBoYW5kbGVUcmFzaEJ1dHRvbjtcbiAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sgPSBoYW5kbGVMaWtlQ2xpY2s7XG4gIH1cbiAgX2dldFRlbXBsYXRlKCkge1xuICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIGdldENhcmRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZElkO1xuICB9XG4gIHVwZGF0ZUxpa2VzKGxpa2VzKSB7XG4gICAgdGhpcy5fbGlrZXMgPSBsaWtlcztcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuICB9XG5cbiAgX3JlbmRlckxpa2VzKCkge1xuICAgIHRoaXMuX2xpa2VDb3VudC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faXNMaWtlZCgpKSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cbiAgX2lzTGlrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpa2VzLnNvbWUoKHVzZXIpID0+IHtcbiAgICAgIHJldHVybiB1c2VyLl9pZCA9PT0gdGhpcy5fY3VycmVudFVzZXJJZDtcbiAgICB9KTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5faGVhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgLy8gaWYgKHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2VfYWN0aXZlXCIpKSB7XG4gICAgICBpZiAodGhpcy5faXNMaWtlZCgpKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwicmVtb3ZlXCIsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJhZGRcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fdHJhc2hCdXR0b24pIHtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlVHJhc2hCdXR0b24odGhpcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKGV2dC50YXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XG4gIH1cbiAgY3JlYXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICBjb25zdCBjYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xuICAgIHRoaXMuX2xpa2VDb3VudCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZXNcIik7XG4gICAgdGhpcy5fdHJhc2hCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5faGVhcnRCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX3RleHQ7XG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2ltYWdlTGluaztcbiAgICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLl90ZXh0O1xuXG4gICAgaWYgKHRoaXMuX293bmVySWQgIT09IHRoaXMuX2N1cnJlbnRVc2VySWQpIHtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcbiIsIlxuY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWwpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbCA9IGZvcm1FbDtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWwpID0+ICFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKTtcblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWwuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dElkfS1lcnJvcmApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxuICByZXNldFZhbGlkYXRpb24oKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH0pO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbn1cbi8vIGNoZWNrXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSA9IHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlID0gdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fY2xvc2VCdXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gICAgdGhpcy5fZm9ybUxpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fZm9ybVwiKV07XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgX2hhbmRsZUJ1dHRvbkNsb3NlKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuICBfaGFuZGxlT3ZlcmxheUNsb3NlKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0ID09PSB0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwicG9wdXBfb3BlblwiKTtcbiAgfVxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXBfb3BlblwiKTtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgdGhpcy5fY2xvc2VCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIHRoaXMuX3BvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gVGhyZWUgd2F5cyB0byBjbG9zZSB0aGUgcG9wdXA6XG4gICAgLy8gMSkgaGl0IEVTQyBrZXlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIC8vIDIpIG1vdXNldXAgb24gdGhlIGNsb3NlIGJ1dHRvblxuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICAvLyAzKSBtb3VzZXVwIG9uIHRoZSBvdmVybGF5XG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19idXR0b25cIik7XG4gICAgdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0ID0gdGhpcy5fYnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0U3VibWl0KGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgfVxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgcmVuZGVyTG9hZGluZyhpc0xvYWRpbmcsIGJ1dHRvblRleHQpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0O1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm1FbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuXG4gICAgc3VwZXIuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbiAgX2hhbmRsZVN1Ym1pdENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzLCB0aGlzLl9idXR0b24pO1xuICB9O1xuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm1FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZVN1Ym1pdENsaWNrKTtcbiAgICB0aGlzLl9mb3JtRWwucmVzZXQoKTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBvcGVuKGltYWdlKSB7XG4gICAgY29uc3QgaW1hZ2VFbCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgaW1hZ2VFbC5zcmMgPSBpbWFnZS5zcmM7XG4gICAgaW1hZ2VFbC5hbHQgPSBpbWFnZS5hbHQ7XG4gICAgY29uc3QgY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBjYXB0aW9uLnRleHRDb250ZW50ID0gaW1hZ2UuYWx0O1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faW5pdGlhbEFycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgfVxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkuZm9yRWFjaCgoYXJyRWwpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGFyckVsKTtcbiAgICB9KTtcbiAgfVxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gICAgdGhpcy5fYXZhdGFyU2xvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXZhdGFyU2VsZWN0b3IpO1xuICB9XG4gIC8vIHRvIHBvcHVsYXRlIGZvcm0gZmllbGRzIGFmdGVyIHBvcHVwIG9wZW5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVTbG90LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2pvYlNsb3QudGV4dENvbnRlbnQsXG4gICAgfTtcbiAgfVxuXG4gIGdldFVzZXJBdmF0YXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF2YXRhcjogdGhpcy5fYXZhdGFyU2xvdC5zcmMsXG4gICAgfTtcbiAgfVxuICAvLyB1cG9uIGZvcm0gc3VibWlzc2lvblxuICBzZXRVc2VySW5mbyhkYXRhKSB7XG4gICAgdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgLy8gdGhpcy5fYXZhdGFyU2xvdC5hbHQgPSBgJHtkYXRhLm5hbWV9YDtcbiAgICAvLyB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG4gIHNldFVzZXJBdmF0YXIoZGF0YSkge1xuICAgIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0VXNlckluZm8oKSwgdGhpcy5nZXRJbml0aWFsQ2FyZHMoKV0pO1xuICB9XG4gIF9oYW5kbGVGZXRjaFJlc3BvbnNlKHBhdGgsIG1ldGhvZFVzZWQgPSBcIkdFVFwiLCBib2R5Q29udGVudCA9IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfSR7cGF0aH1gLCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZFVzZWQsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogYm9keUNvbnRlbnQsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiKTtcbiAgfVxuICBlZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBhYm91dDogaW5wdXRWYWx1ZXMuYWJvdXQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgYWRkTmV3Q2FyZChpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGxpbms6IGlucHV0VmFsdWVzLmxpbmssXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIiwgXCJQT1NUXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBnZXRDYXJkTGlrZUluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZGVsZXRlQ2FyZChjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG5cbiAgYWRkTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiUFVUXCIpO1xuICB9XG4gIHJlbW92ZUxpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuICBlZGl0UHJvZmlsZVBpYyhhdmF0YXJMaW5rKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBhdmF0YXI6IGF2YXRhckxpbmsuYXZhdGFyLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lL2F2YXRhclwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG59O1xuZXhwb3J0IGNvbnN0IGNhcmRzQ29udGFpbmVyID0gXCIucGhvdG8tZ3JpZF9fY2FyZHNcIjtcbmV4cG9ydCBjb25zdCBjYXJkU2VsZWN0b3IgPSBcIiNjYXJkLXRlbXBsYXRlXCI7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5cbi8vIEltcG9ydGVkIENsYXNzZXNcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCB7XG4gIGNhcmRzQ29udGFpbmVyLFxuICBjYXJkU2VsZWN0b3IsXG4gIHNldHRpbmdzLFxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yXCI7XG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uXCI7XG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm9cIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZVwiO1xuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpXCI7XG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtXCI7XG5cblxuY29uc3QgZWRpdFByb2ZpbGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbmZvLWVkaXQtYnV0dG9uXCIpO1xuY29uc3QgYWRkUGljdHVyZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBhZGRQaWN0dXJlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdmF0YXItcG9wdXBcIik7XG5jb25zdCBmb3JtRmllbGRBdXRob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcHJvZmlsZS1mb3JtXCIpO1xuY29uc3QgZm9ybUZpZWxkUGljdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBsYWNlLWZvcm1cIik7XG5jb25zdCBpbnB1dFByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLW5hbWVcIik7XG5jb25zdCBpbnB1dFByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZVwiKTtcbmNvbnN0IHByb2ZpbGVQaWNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXVybFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faWNvblwiKTtcblxuLy8gLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy8gLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vLyAvL0dyb3VwIElEOiBncm91cC0xMlxuXG4vLyBBUEkgY2xhc3NcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2xpY2soY2FyZElkLCBhY3Rpb24sIGNhcmQpIHtcbiAgaWYgKGFjdGlvbiA9PT0gXCJyZW1vdmVcIikge1xuICAgIGFwaVxuICAgICAgLnJlbW92ZUxpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGFwaVxuICAgICAgLmFkZExpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjYXJkLnVwZGF0ZUxpa2VzKHJlcy5saWtlcyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKFxuICAgIGlucHV0VmFsdWVzLFxuICAgIGNhcmRTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlVHJhc2hCdXR0b24sXG4gICAgY3VycmVudFVzZXJJZCxcbiAgICBoYW5kbGVMaWtlQ2xpY2tcbiAgKTtcbiAgY29uc3QgY2FyZEVsID0gY2FyZC5jcmVhdGVDYXJkKCk7XG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZEVsKTtcbn1cblxuY29uc3QgcGxhY2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcbiAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuYWRkTmV3Q2FyZChpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpO1xuICAgICAgcGxhY2VQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmZ1bmN0aW9uIGhhbmRsZUNhcmRDbGljayhpbWFnZSkge1xuICBpbWFnZVBvcHVwLm9wZW4oaW1hZ2UpO1xufVxuXG5jb25zdCBkZWxldGVDYXJkQ29uZmlybWF0aW9uID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXCIuZGVsZXRlLXBvcHVwXCIpO1xuXG5mdW5jdGlvbiBoYW5kbGVUcmFzaEJ1dHRvbihjYXJkKSB7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uc2V0U3VibWl0KCgpID0+IHtcbiAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkLmdldENhcmRJZCgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJkLmRlbGV0ZUNhcmQoKTtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH0pO1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLm9wZW4oKTtcbn1cblxubGV0IGNhcmRTZWN0aW9uID0gbnVsbDtcblxuZnVuY3Rpb24gZmlsbFByb2ZpbGVGb3JtKCkge1xuICBjb25zdCByZXN1bHQgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBpbnB1dFByb2ZpbGVOYW1lLnZhbHVlID0gcmVzdWx0Lm5hbWU7XG4gIGlucHV0UHJvZmlsZVRpdGxlLnZhbHVlID0gcmVzdWx0LmFib3V0O1xufVxuZnVuY3Rpb24gaGFuZGxlT3BlblByb2ZpbGVGb3JtKCkge1xuICAvLyBmb3JtRmllbGRBdXRob3IucmVzZXQoKTtcbiAgZmlsbFByb2ZpbGVGb3JtKCk7XG4gIGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUG9wdXAub3BlbigpO1xufVxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xuICBuYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICBqb2JTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby10aXRsZVwiLFxuICBhdmF0YXJTZWxlY3RvcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcbmNvbnN0IHByb2ZpbGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5lZGl0VXNlclByb2ZpbGUoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyhpbnB1dFZhbHVlcyk7XG4gICAgICBwcm9maWxlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcHJvZmlsZVBvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IHByb2ZpbGVQaWNQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIi5hdmF0YXItcG9wdXBcIixcbiAgKGlucHV0VmFsdWVzLCBidXR0b24pID0+IHtcbiAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5lZGl0UHJvZmlsZVBpYyhpbnB1dFZhbHVlcylcbiAgICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgICB1c2VySW5mby5zZXRVc2VyQXZhdGFyKGlucHV0VmFsdWVzKTtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBlZGl0UHJvZmlsZUZvcm0pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBhZGRQaWN0dXJlRm9ybSk7XG5hZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBzZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVQaWNGb3JtXG4pO1xuZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5mdW5jdGlvbiBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0oKSB7XG4gIC8vIGZvcm1GaWVsZFBpY3R1cmUucmVzZXQoKTtcblxuICBhZGRQaWN0dXJlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcGxhY2VQb3B1cC5vcGVuKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0oKSB7XG4gIHByb2ZpbGVQaWNJbnB1dC52YWx1ZSA9IHVzZXJJbmZvLmdldFVzZXJBdmF0YXIoKS5hdmF0YXI7XG4gIGVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBpY1BvcHVwLm9wZW4oKTtcbn1cbmFkZFBpY3R1cmVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSk7XG5lZGl0UHJvZmlsZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlblByb2ZpbGVGb3JtKTtcbmVkaXRQcm9maWxlUGljSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKTtcblxubGV0IGN1cnJlbnRVc2VySWQgPSBudWxsO1xuYXBpXG4gIC5pbml0aWFsaXplKClcbiAgLnRoZW4oKFt1c2VyLCBjYXJkc10pID0+IHtcbiAgICBjdXJyZW50VXNlcklkID0gdXNlci5faWQ7XG4gICAgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcbiAgICAgIHtcbiAgICAgICAgaXRlbXM6IGNhcmRzLFxuICAgICAgICByZW5kZXJlcjogcmVuZGVyQ2FyZCxcbiAgICAgIH0sXG4gICAgICBjYXJkc0NvbnRhaW5lclxuICAgICk7XG4gICAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcblxuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHVzZXIpO1xuICAgIHVzZXJJbmZvLnNldFVzZXJBdmF0YXIodXNlcik7XG4gIH0pXG4gIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgYWxlcnQocmVzKTtcbiAgfSk7XG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiY2FyZERhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVUcmFzaEJ1dHRvbiIsImN1cnJlbnRVc2VySWQiLCJoYW5kbGVMaWtlQ2xpY2siLCJfaW1hZ2VMaW5rIiwibGluayIsIl90ZXh0IiwibmFtZSIsIl9saWtlcyIsImxpa2VzIiwiX2N1cnJlbnRVc2VySWQiLCJfb3duZXJJZCIsIm93bmVyIiwiX2lkIiwiX2NhcmRJZCIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZVRyYXNoQnV0dG9uIiwiX2hhbmRsZUxpa2VDbGljayIsIl9nZXRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJnZXRDYXJkSWQiLCJ1cGRhdGVMaWtlcyIsIl9yZW5kZXJMaWtlcyIsIl9saWtlQ291bnQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsIl9pc0xpa2VkIiwiX2hlYXJ0QnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwic29tZSIsInVzZXIiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZSIsImV2dCIsInRhcmdldCIsImRlbGV0ZUNhcmQiLCJfY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiY2FyZFRpdGxlIiwiYWx0Iiwic3JjIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsIiwiaW5wdXRMaXN0IiwiaW5wdXRFbCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsIiwiYnV0dG9uRWxlbWVudCIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpbnB1dElkIiwiaWQiLCJlcnJvckVsIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJfaGFuZGxlQnV0dG9uQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsb3NlIiwiX2Nsb3NlQnV0dG9uIiwiX2Zvcm1MaXN0Iiwia2V5IiwiY2xvc2UiLCJvcGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBvcHVwV2l0aENvbmZpcm0iLCJfYnV0dG9uIiwiX2J1dHRvbk9yaWdpbmFsVGV4dCIsInNldFN1Ym1pdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b25UZXh0IiwiUG9wdXBXaXRoRm9ybSIsImlucHV0VmFsdWVzIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRDb250ZW50IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0Q2xpY2siLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiaW1hZ2UiLCJpbWFnZUVsIiwiY2FwdGlvbiIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaW5pdGlhbEFycmF5IiwiX2NvbnRhaW5lciIsIl9yZW5kZXJlciIsInJlbmRlckl0ZW1zIiwiYXJyRWwiLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsIm5hbWVTZWxlY3RvciIsImpvYlNlbGVjdG9yIiwiYXZhdGFyU2VsZWN0b3IiLCJfbmFtZVNsb3QiLCJfam9iU2xvdCIsIl9hdmF0YXJTbG90IiwiZ2V0VXNlckluZm8iLCJhYm91dCIsImdldFVzZXJBdmF0YXIiLCJhdmF0YXIiLCJzZXRVc2VySW5mbyIsImRhdGEiLCJzZXRVc2VyQXZhdGFyIiwiQXBpIiwiYmFzZVVybCIsImhlYWRlcnMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJfaGFuZGxlRmV0Y2hSZXNwb25zZSIsInBhdGgiLCJtZXRob2RVc2VkIiwiYm9keUNvbnRlbnQiLCJ1bmRlZmluZWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwiZWRpdFVzZXJQcm9maWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImFkZE5ld0NhcmQiLCJnZXRDYXJkTGlrZUluZm8iLCJjYXJkSWQiLCJhZGRMaWtlIiwicmVtb3ZlTGlrZSIsImVkaXRQcm9maWxlUGljIiwiYXZhdGFyTGluayIsImNhcmRzQ29udGFpbmVyIiwiZWRpdFByb2ZpbGVJY29uIiwiYWRkUGljdHVyZUljb24iLCJlZGl0UHJvZmlsZUZvcm0iLCJhZGRQaWN0dXJlRm9ybSIsImVkaXRQcm9maWxlUGljRm9ybSIsImZvcm1GaWVsZEF1dGhvciIsImZvcm1GaWVsZFBpY3R1cmUiLCJpbnB1dFByb2ZpbGVOYW1lIiwiaW5wdXRQcm9maWxlVGl0bGUiLCJwcm9maWxlUGljSW5wdXQiLCJlZGl0UHJvZmlsZVBpY0ljb24iLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiYWN0aW9uIiwiY2FyZCIsImNhdGNoIiwiYWxlcnQiLCJyZW5kZXJDYXJkIiwiY2FyZEVsIiwiY2FyZFNlY3Rpb24iLCJwbGFjZVBvcHVwIiwiZmluYWxseSIsImltYWdlUG9wdXAiLCJkZWxldGVDYXJkQ29uZmlybWF0aW9uIiwiZmlsbFByb2ZpbGVGb3JtIiwicmVzdWx0IiwidXNlckluZm8iLCJoYW5kbGVPcGVuUHJvZmlsZUZvcm0iLCJhZGRQcm9maWxlRm9ybVZhbGlkYXRvciIsInByb2ZpbGVQb3B1cCIsImJ1dHRvbiIsInByb2ZpbGVQaWNQb3B1cCIsImFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yIiwiZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yIiwiaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtIiwiaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSIsImNhcmRzIl0sInNvdXJjZVJvb3QiOiIifQ==