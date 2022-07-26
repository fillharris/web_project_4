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
  profilePicInput.value = userInfo.getUserAvatar();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF4QjtFQUNBa0gsVUFBVSxDQUFDdEcsSUFBWDtBQUNEOztBQUVELFNBQVNxSCw0QkFBVCxHQUF3QztFQUN0QzFCLGVBQWUsQ0FBQzVFLEtBQWhCLEdBQXdCNkYsUUFBUSxDQUFDakUsYUFBVCxFQUF4QjtFQUNBd0UsMkJBQTJCLENBQUMvSCxlQUE1QjtFQUNBNkgsZUFBZSxDQUFDakgsSUFBaEI7QUFDRDs7QUFDRG1GLGNBQWMsQ0FBQ3ZJLGdCQUFmLENBQWdDLFNBQWhDLEVBQTJDd0ssd0JBQTNDO0FBQ0FsQyxlQUFlLENBQUN0SSxnQkFBaEIsQ0FBaUMsU0FBakMsRUFBNENpSyxxQkFBNUM7QUFDQWpCLGtCQUFrQixDQUFDaEosZ0JBQW5CLENBQW9DLFNBQXBDLEVBQStDeUssNEJBQS9DO0FBRUEsSUFBSTdNLGFBQWEsR0FBRyxJQUFwQjtBQUNBcUwsR0FBRyxDQUNBeEMsVUFESCxHQUVHWSxJQUZILENBRVEsUUFBbUI7RUFBQSxJQUFsQixDQUFDdkgsSUFBRCxFQUFPNEssS0FBUCxDQUFrQjtFQUN2QjlNLGFBQWEsR0FBR2tDLElBQUksQ0FBQ3ZCLEdBQXJCO0VBQ0FrTCxXQUFXLEdBQUcsSUFBSS9FLDJEQUFKLENBQ1o7SUFDRUUsS0FBSyxFQUFFOEYsS0FEVDtJQUVFN0YsUUFBUSxFQUFFMEU7RUFGWixDQURZLEVBS1psQiw0REFMWSxDQUFkO0VBT0FvQixXQUFXLENBQUN4RSxXQUFaO0VBRUErRSxRQUFRLENBQUMvRCxXQUFULENBQXFCbkcsSUFBckI7RUFDQWtLLFFBQVEsQ0FBQzdELGFBQVQsQ0FBdUJyRyxJQUF2QjtBQUNELENBZkgsRUFnQkd1SixLQWhCSCxDQWdCVS9CLEdBQUQsSUFBUztFQUNkZ0MsS0FBSyxDQUFDaEMsR0FBRCxDQUFMO0FBQ0QsQ0FsQkgsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvdXRpbHMvQXBpLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2FyZERhdGEsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApIHtcbiAgICB0aGlzLl9pbWFnZUxpbmsgPSBjYXJkRGF0YS5saW5rO1xuICAgIHRoaXMuX3RleHQgPSBjYXJkRGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpa2VzID0gY2FyZERhdGEubGlrZXM7XG4gICAgdGhpcy5fY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgdGhpcy5fb3duZXJJZCA9IGNhcmREYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl9jYXJkSWQgPSBjYXJkRGF0YS5faWQ7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbiA9IGhhbmRsZVRyYXNoQnV0dG9uO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgfVxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgZ2V0Q2FyZElkKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkSWQ7XG4gIH1cbiAgdXBkYXRlTGlrZXMobGlrZXMpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xuICAgIHRoaXMuX3JlbmRlckxpa2VzKCk7XG4gIH1cblxuICBfcmVuZGVyTGlrZXMoKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuICBfaXNMaWtlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlrZXMuc29tZSgodXNlcikgPT4ge1xuICAgICAgcmV0dXJuIHVzZXIuX2lkID09PSB0aGlzLl9jdXJyZW50VXNlcklkO1xuICAgIH0pO1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAvLyBpZiAodGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZF9fbGlrZV9hY3RpdmVcIikpIHtcbiAgICAgIGlmICh0aGlzLl9pc0xpa2VkKCkpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKHRoaXMuX2NhcmRJZCwgXCJyZW1vdmVcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcImFkZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl90cmFzaEJ1dHRvbikge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbih0aGlzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soZXZ0LnRhcmdldCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcbiAgfVxuICBjcmVhdGVDYXJkKCkge1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XG4gICAgdGhpcy5fbGlrZUNvdW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcbiAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9oZWFydEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fdGV4dDtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5faW1hZ2VMaW5rO1xuICAgIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX3RleHQ7XG5cbiAgICBpZiAodGhpcy5fb3duZXJJZCAhPT0gdGhpcy5fY3VycmVudFVzZXJJZCkge1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcblxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiXG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybUVsID0gZm9ybUVsO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBfaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT5cbiAgICBpbnB1dExpc3Quc29tZSgoaW5wdXRFbCkgPT4gIWlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0SWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRvcigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuLy8gY2hlY2tcbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlID0gdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UgPSB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBfaGFuZGxlQnV0dG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIF9oYW5kbGVPdmVybGF5Q2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgdGhpcy5fcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlT3ZlcmxheUNsb3NlKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBUaHJlZSB3YXlzIHRvIGNsb3NlIHRoZSBwb3B1cDpcbiAgICAvLyAxKSBoaXQgRVNDIGtleVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gICAgLy8gMikgbW91c2V1cCBvbiB0aGUgY2xvc2UgYnV0dG9uXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UpO1xuICAgIC8vIDMpIG1vdXNldXAgb24gdGhlIG92ZXJsYXlcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRTdWJtaXQoaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICB9XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgfVxuICByZW5kZXJMb2FkaW5nKGlzTG9hZGluZywgYnV0dG9uVGV4dCkge1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSBidXR0b25UZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b24udGV4dENvbnRlbnQgPSB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQ7XG4gICAgICB0aGlzLl9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19idXR0b25cIik7XG4gICAgdGhpcy5fYnV0dG9uT3JpZ2luYWxUZXh0ID0gdGhpcy5fYnV0dG9uLnRleHRDb250ZW50O1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19pbnB1dFwiKV07XG4gICAgY29uc3QgaW5wdXRDb250ZW50ID0ge307XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0Q29udGVudFtpbnB1dEVsLm5hbWVdID0gaW5wdXRFbC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5wdXRDb250ZW50O1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9mb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG5cbiAgICBzdXBlci5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBfaGFuZGxlU3VibWl0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB0aGlzLl9nZXRJbnB1dFZhbHVlcygpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQoaW5wdXRWYWx1ZXMsIHRoaXMuX2J1dHRvbik7XG4gIH07XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICAgIHRoaXMuX2Zvcm1FbC5yZXNldCgpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICB9XG4gIG9wZW4oaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICBpbWFnZUVsLnNyYyA9IGltYWdlLnNyYztcbiAgICBpbWFnZUVsLmFsdCA9IGltYWdlLmFsdDtcbiAgICBjb25zdCBjYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGNhcHRpb24udGV4dENvbnRlbnQgPSBpbWFnZS5hbHQ7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheS5mb3JFYWNoKChhcnJFbCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoYXJyRWwpO1xuICAgIH0pO1xuICB9XG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgbmFtZVNlbGVjdG9yLCBqb2JTZWxlY3RvciwgYXZhdGFyU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX25hbWVTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xuICAgIHRoaXMuX2pvYlNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcbiAgICB0aGlzLl9hdmF0YXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXJTZWxlY3Rvcik7XG4gIH1cbiAgLy8gdG8gcG9wdWxhdGUgZm9ybSBmaWVsZHMgYWZ0ZXIgcG9wdXAgb3BlblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCxcbiAgICB9O1xuICB9XG5cbiAgZ2V0VXNlckF2YXRhcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXZhdGFyOiB0aGlzLl9hdmF0YXJTbG90LnNyYyxcbiAgICB9O1xuICB9XG4gIC8vIHVwb24gZm9ybSBzdWJtaXNzaW9uXG4gIHNldFVzZXJJbmZvKGRhdGEpIHtcbiAgICB0aGlzLl9uYW1lU2xvdC50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9qb2JTbG90LnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbiAgICAvLyB0aGlzLl9hdmF0YXJTbG90LmFsdCA9IGAke2RhdGEubmFtZX1gO1xuICAgIC8vIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbiAgc2V0VXNlckF2YXRhcihkYXRhKSB7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuICBpbml0aWFsaXplKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRVc2VySW5mbygpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSk7XG4gIH1cbiAgX2hhbmRsZUZldGNoUmVzcG9uc2UocGF0aCwgbWV0aG9kVXNlZCA9IFwiR0VUXCIsIGJvZHlDb250ZW50ID0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kVXNlZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBib2R5Q29udGVudCxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIpO1xuICB9XG4gIGVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcbiAgICAgIGFib3V0OiBpbnB1dFZhbHVlcy5hYm91dCxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZVwiLCBcIlBBVENIXCIsIGJvZHlDb250ZW50KTtcbiAgfVxuICBhZGROZXdDYXJkKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgbGluazogaW5wdXRWYWx1ZXMubGluayxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiLCBcIlBPU1RcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGdldENhcmRMaWtlSW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi9jYXJkc1wiKTtcbiAgfVxuICBkZWxldGVDYXJkKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cblxuICBhZGRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJQVVRcIik7XG4gIH1cbiAgcmVtb3ZlTGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShgL2NhcmRzL2xpa2VzLyR7Y2FyZElkfWAsIFwiREVMRVRFXCIpO1xuICB9XG4gIGVkaXRQcm9maWxlUGljKGF2YXRhckxpbmspIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGF2YXRhcjogYXZhdGFyTGluay5hdmF0YXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWUvYXZhdGFyXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J1dHRvblwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbn07XG5leHBvcnQgY29uc3QgY2FyZHNDb250YWluZXIgPSBcIi5waG90by1ncmlkX19jYXJkc1wiO1xuZXhwb3J0IGNvbnN0IGNhcmRTZWxlY3RvciA9IFwiI2NhcmQtdGVtcGxhdGVcIjtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcblxuLy8gSW1wb3J0ZWQgQ2xhc3Nlc1xuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZFwiO1xuaW1wb3J0IHtcbiAgY2FyZHNDb250YWluZXIsXG4gIGNhcmRTZWxlY3RvcixcbiAgc2V0dGluZ3MsXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi91dGlscy9BcGlcIjtcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm1cIjtcblxuXG5jb25zdCBlZGl0UHJvZmlsZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2luZm8tZWRpdC1idXR0b25cIik7XG5jb25zdCBhZGRQaWN0dXJlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF2YXRhci1wb3B1cFwiKTtcbmNvbnN0IGZvcm1GaWVsZEF1dGhvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wcm9maWxlLWZvcm1cIik7XG5jb25zdCBmb3JtRmllbGRQaWN0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcGxhY2UtZm9ybVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtbmFtZVwiKTtcbmNvbnN0IGlucHV0UHJvZmlsZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXRpdGxlXCIpO1xuY29uc3QgcHJvZmlsZVBpY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItdXJsXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pY29uXCIpO1xuXG4vLyAvL1Rva2VuIGFuZCBJRCBpbmZvXG4vLyAvL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vIC8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbi8vIEFQSSBjbGFzc1xuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2VDbGljayhjYXJkSWQsIGFjdGlvbiwgY2FyZCkge1xuICBpZiAoYWN0aW9uID09PSBcInJlbW92ZVwiKSB7XG4gICAgYXBpXG4gICAgICAucmVtb3ZlTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQudXBkYXRlTGlrZXMocmVzLmxpa2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXBpXG4gICAgICAuYWRkTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNhcmQudXBkYXRlTGlrZXMocmVzLmxpa2VzKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpbnB1dFZhbHVlcykge1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoXG4gICAgaW5wdXRWYWx1ZXMsXG4gICAgY2FyZFNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVUcmFzaEJ1dHRvbixcbiAgICBjdXJyZW50VXNlcklkLFxuICAgIGhhbmRsZUxpa2VDbGlja1xuICApO1xuICBjb25zdCBjYXJkRWwgPSBjYXJkLmNyZWF0ZUNhcmQoKTtcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkRWwpO1xufVxuXG5jb25zdCBwbGFjZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY3JlYXRlLXBvcHVwXCIsIChpbnB1dFZhbHVlcykgPT4ge1xuICBwbGFjZVBvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gIGFwaVxuICAgIC5hZGROZXdDYXJkKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChpbnB1dFZhbHVlcyk7XG4gICAgICBwbGFjZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgaW1hZ2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuZnVuY3Rpb24gaGFuZGxlQ2FyZENsaWNrKGltYWdlKSB7XG4gIGltYWdlUG9wdXAub3BlbihpbWFnZSk7XG59XG5cbmNvbnN0IGRlbGV0ZUNhcmRDb25maXJtYXRpb24gPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcIi5kZWxldGUtcG9wdXBcIik7XG5cbmZ1bmN0aW9uIGhhbmRsZVRyYXNoQnV0dG9uKGNhcmQpIHtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5zZXRTdWJtaXQoKCkgPT4ge1xuICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmQuZ2V0Q2FyZElkKCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcmQuZGVsZXRlQ2FyZCgpO1xuICAgICAgICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLmNsb3NlKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgICAgYWxlcnQocmVzKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfSk7XG4gIGRlbGV0ZUNhcmRDb25maXJtYXRpb24ub3BlbigpO1xufVxuXG5sZXQgY2FyZFNlY3Rpb24gPSBudWxsO1xuXG5mdW5jdGlvbiBmaWxsUHJvZmlsZUZvcm0oKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIGlucHV0UHJvZmlsZU5hbWUudmFsdWUgPSByZXN1bHQubmFtZTtcbiAgaW5wdXRQcm9maWxlVGl0bGUudmFsdWUgPSByZXN1bHQuYWJvdXQ7XG59XG5mdW5jdGlvbiBoYW5kbGVPcGVuUHJvZmlsZUZvcm0oKSB7XG4gIC8vIGZvcm1GaWVsZEF1dGhvci5yZXNldCgpO1xuICBmaWxsUHJvZmlsZUZvcm0oKTtcbiAgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQb3B1cC5vcGVuKCk7XG59XG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIG5hbWVTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby1uYW1lXCIsXG4gIGpvYlNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLXRpdGxlXCIsXG4gIGF2YXRhclNlbGVjdG9yOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn0pO1xuY29uc3QgcHJvZmlsZVBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjZWRpdC1wb3B1cFwiLCAoaW5wdXRWYWx1ZXMsIGJ1dHRvbikgPT4ge1xuICBwcm9maWxlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmVkaXRVc2VyUHJvZmlsZShpbnB1dFZhbHVlcylcbiAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGlucHV0VmFsdWVzKTtcbiAgICAgIHByb2ZpbGVQb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChyZXMpID0+IHtcbiAgICAgIGFsZXJ0KHJlcyk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICBwcm9maWxlUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgfSk7XG59KTtcblxuY29uc3QgcHJvZmlsZVBpY1BvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiLmF2YXRhci1wb3B1cFwiLFxuICAoaW5wdXRWYWx1ZXMsIGJ1dHRvbikgPT4ge1xuICAgIHByb2ZpbGVQaWNQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmVkaXRQcm9maWxlUGljKGlucHV0VmFsdWVzKVxuICAgICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICAgIHVzZXJJbmZvLnNldFVzZXJBdmF0YXIoaW5wdXRWYWx1ZXMpO1xuICAgICAgICBwcm9maWxlUGljUG9wdXAuY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcoZmFsc2UsIFwiU2F2aW5nLi4uXCIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cbmNvbnN0IGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIGVkaXRQcm9maWxlRm9ybSk7XG5hZGRQcm9maWxlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIGFkZFBpY3R1cmVGb3JtKTtcbmFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIHNldHRpbmdzLFxuICBlZGl0UHJvZmlsZVBpY0Zvcm1cbik7XG5lZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSgpIHtcbiAgLy8gZm9ybUZpZWxkUGljdHVyZS5yZXNldCgpO1xuXG4gIGFkZFBpY3R1cmVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwbGFjZVBvcHVwLm9wZW4oKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSgpIHtcbiAgcHJvZmlsZVBpY0lucHV0LnZhbHVlID0gdXNlckluZm8uZ2V0VXNlckF2YXRhcigpO1xuICBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHByb2ZpbGVQaWNQb3B1cC5vcGVuKCk7XG59XG5hZGRQaWN0dXJlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuQWRkUGljdHVyZUZvcm0pO1xuZWRpdFByb2ZpbGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSk7XG5lZGl0UHJvZmlsZVBpY0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkVkaXRQcm9maWxlUGljRm9ybSk7XG5cbmxldCBjdXJyZW50VXNlcklkID0gbnVsbDtcbmFwaVxuICAuaW5pdGlhbGl6ZSgpXG4gIC50aGVuKChbdXNlciwgY2FyZHNdKSA9PiB7XG4gICAgY3VycmVudFVzZXJJZCA9IHVzZXIuX2lkO1xuICAgIGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGl0ZW1zOiBjYXJkcyxcbiAgICAgICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXG4gICAgICB9LFxuICAgICAgY2FyZHNDb250YWluZXJcbiAgICApO1xuICAgIGNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XG5cbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyh1c2VyKTtcbiAgICB1c2VySW5mby5zZXRVc2VyQXZhdGFyKHVzZXIpO1xuICB9KVxuICAuY2F0Y2goKHJlcykgPT4ge1xuICAgIGFsZXJ0KHJlcyk7XG4gIH0pO1xuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlVHJhc2hCdXR0b24iLCJjdXJyZW50VXNlcklkIiwiaGFuZGxlTGlrZUNsaWNrIiwiX2ltYWdlTGluayIsImxpbmsiLCJfdGV4dCIsIm5hbWUiLCJfbGlrZXMiLCJsaWtlcyIsIl9jdXJyZW50VXNlcklkIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl9jYXJkSWQiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVUcmFzaEJ1dHRvbiIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiZ2V0Q2FyZElkIiwidXBkYXRlTGlrZXMiLCJfcmVuZGVyTGlrZXMiLCJfbGlrZUNvdW50IiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJfaXNMaWtlZCIsIl9oZWFydEJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNvbWUiLCJ1c2VyIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl90cmFzaEJ1dHRvbiIsIl9jYXJkSW1hZ2UiLCJldnQiLCJ0YXJnZXQiLCJkZWxldGVDYXJkIiwiX2NhcmRFbGVtZW50IiwiY3JlYXRlQ2FyZCIsImNhcmRUaXRsZSIsImFsdCIsInNyYyIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbCIsImlucHV0TGlzdCIsImlucHV0RWwiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3NldHRpbmdzIiwiX2Zvcm1FbCIsImJ1dHRvbkVsZW1lbnQiLCJmb3JFYWNoIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yTWVzc2FnZSIsInZhbGlkYXRpb25NZXNzYWdlIiwiaW5wdXRJZCIsImlkIiwiZXJyb3JFbCIsImVycm9yQ2xhc3MiLCJlbmFibGVWYWxpZGF0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwicHJldmVudERlZmF1bHQiLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwiX2hhbmRsZUJ1dHRvbkNsb3NlIiwiX2hhbmRsZU92ZXJsYXlDbG9zZSIsIl9jbG9zZUJ1dHRvbiIsIl9mb3JtTGlzdCIsImtleSIsImNsb3NlIiwib3BlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJQb3B1cFdpdGhDb25maXJtIiwiX2J1dHRvbiIsIl9idXR0b25PcmlnaW5hbFRleHQiLCJzZXRTdWJtaXQiLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYnV0dG9uVGV4dCIsIlBvcHVwV2l0aEZvcm0iLCJpbnB1dFZhbHVlcyIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0Q29udGVudCIsInZhbHVlIiwiX2hhbmRsZVN1Ym1pdENsaWNrIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsImltYWdlIiwiaW1hZ2VFbCIsImNhcHRpb24iLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2luaXRpYWxBcnJheSIsIl9jb250YWluZXIiLCJfcmVuZGVyZXIiLCJyZW5kZXJJdGVtcyIsImFyckVsIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsImF2YXRhclNlbGVjdG9yIiwiX25hbWVTbG90IiwiX2pvYlNsb3QiLCJfYXZhdGFyU2xvdCIsImdldFVzZXJJbmZvIiwiYWJvdXQiLCJnZXRVc2VyQXZhdGFyIiwiYXZhdGFyIiwic2V0VXNlckluZm8iLCJkYXRhIiwic2V0VXNlckF2YXRhciIsIkFwaSIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImluaXRpYWxpemUiLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5pdGlhbENhcmRzIiwiX2hhbmRsZUZldGNoUmVzcG9uc2UiLCJwYXRoIiwibWV0aG9kVXNlZCIsImJvZHlDb250ZW50IiwidW5kZWZpbmVkIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsImVkaXRVc2VyUHJvZmlsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZGROZXdDYXJkIiwiZ2V0Q2FyZExpa2VJbmZvIiwiY2FyZElkIiwiYWRkTGlrZSIsInJlbW92ZUxpa2UiLCJlZGl0UHJvZmlsZVBpYyIsImF2YXRhckxpbmsiLCJjYXJkc0NvbnRhaW5lciIsImVkaXRQcm9maWxlSWNvbiIsImFkZFBpY3R1cmVJY29uIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkUGljdHVyZUZvcm0iLCJlZGl0UHJvZmlsZVBpY0Zvcm0iLCJmb3JtRmllbGRBdXRob3IiLCJmb3JtRmllbGRQaWN0dXJlIiwiaW5wdXRQcm9maWxlTmFtZSIsImlucHV0UHJvZmlsZVRpdGxlIiwicHJvZmlsZVBpY0lucHV0IiwiZWRpdFByb2ZpbGVQaWNJY29uIiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsImFjdGlvbiIsImNhcmQiLCJjYXRjaCIsImFsZXJ0IiwicmVuZGVyQ2FyZCIsImNhcmRFbCIsImNhcmRTZWN0aW9uIiwicGxhY2VQb3B1cCIsImZpbmFsbHkiLCJpbWFnZVBvcHVwIiwiZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiIsImZpbGxQcm9maWxlRm9ybSIsInJlc3VsdCIsInVzZXJJbmZvIiwiaGFuZGxlT3BlblByb2ZpbGVGb3JtIiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlUG9wdXAiLCJidXR0b24iLCJwcm9maWxlUGljUG9wdXAiLCJhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciIsImVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciIsImhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSIsImhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0iLCJjYXJkcyJdLCJzb3VyY2VSb290IjoiIn0=