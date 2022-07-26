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
    let bodyContent = arguments.length > 2 ? arguments[2] : undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxJQUFTO0VBQ2QySyxLQUFLLENBQUMzSyxHQUFELENBQUw7QUFDRCxDQWpCSCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG4gIGluaXRpYWxpemUoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmdldFVzZXJJbmZvKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKTtcbiAgfVxuICBfaGFuZGxlRmV0Y2hSZXNwb25zZShwYXRoLCBtZXRob2RVc2VkID0gXCJHRVRcIiwgYm9keUNvbnRlbnQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0ke3BhdGh9YCwge1xuICAgICAgbWV0aG9kOiBtZXRob2RVc2VkLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IGJvZHlDb250ZW50LFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvY2FyZHNcIik7XG4gIH1cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoXCIvdXNlcnMvbWVcIik7XG4gIH1cbiAgZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgYm9keUNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBpbnB1dFZhbHVlcy5uYW1lLFxuICAgICAgYWJvdXQ6IGlucHV0VmFsdWVzLmFib3V0LFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL3VzZXJzL21lXCIsIFwiUEFUQ0hcIiwgYm9keUNvbnRlbnQpO1xuICB9XG4gIGFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBib2R5Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGlucHV0VmFsdWVzLm5hbWUsXG4gICAgICBsaW5rOiBpbnB1dFZhbHVlcy5saW5rLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIsIFwiUE9TVFwiLCBib2R5Q29udGVudCk7XG4gIH1cbiAgZ2V0Q2FyZExpa2VJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKFwiL2NhcmRzXCIpO1xuICB9XG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy8ke2NhcmRJZH1gLCBcIkRFTEVURVwiKTtcbiAgfVxuXG4gIGFkZExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZldGNoUmVzcG9uc2UoYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLCBcIlBVVFwiKTtcbiAgfVxuICByZW1vdmVMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVGZXRjaFJlc3BvbnNlKGAvY2FyZHMvbGlrZXMvJHtjYXJkSWR9YCwgXCJERUxFVEVcIik7XG4gIH1cbiAgZWRpdFByb2ZpbGVQaWMoYXZhdGFyTGluaykge1xuICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYXZhdGFyOiBhdmF0YXJMaW5rLmF2YXRhcixcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmV0Y2hSZXNwb25zZShcIi91c2Vycy9tZS9hdmF0YXJcIiwgXCJQQVRDSFwiLCBib2R5Q29udGVudCk7XG4gIH1cbn1cbiIsImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYXJkRGF0YSxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICkge1xuICAgIHRoaXMuX2ltYWdlTGluayA9IGNhcmREYXRhLmxpbms7XG4gICAgdGhpcy5fdGV4dCA9IGNhcmREYXRhLm5hbWU7XG4gICAgdGhpcy5fbGlrZXMgPSBjYXJkRGF0YS5saWtlcztcbiAgICB0aGlzLl9jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICB0aGlzLl9vd25lcklkID0gY2FyZERhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX2NhcmRJZCA9IGNhcmREYXRhLl9pZDtcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uID0gaGFuZGxlVHJhc2hCdXR0b247XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICB9XG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBnZXRDYXJkSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRJZDtcbiAgfVxuICB1cGRhdGVMaWtlcyhsaWtlcykge1xuICAgIHRoaXMuX2xpa2VzID0gbGlrZXM7XG4gICAgdGhpcy5fcmVuZGVyTGlrZXMoKTtcbiAgfVxuXG4gIF9yZW5kZXJMaWtlcygpIHtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQoKSkge1xuICAgICAgdGhpcy5faGVhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gICAgfVxuICB9XG4gIF9pc0xpa2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9saWtlcy5zb21lKCh1c2VyKSA9PiB7XG4gICAgICByZXR1cm4gdXNlci5faWQgPT09IHRoaXMuX2N1cnJlbnRVc2VySWQ7XG4gICAgfSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oZWFydEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJjYXJkX19saWtlX2FjdGl2ZVwiKSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sodGhpcy5fY2FyZElkLCBcInJlbW92ZVwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayh0aGlzLl9jYXJkSWQsIFwiYWRkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX3RyYXNoQnV0dG9uKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQudGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xuICB9XG4gIGNyZWF0ZUNhcmQoKSB7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2VzXCIpO1xuICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2hlYXJ0QnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl90ZXh0O1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9pbWFnZUxpbms7XG4gICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fdGV4dDtcblxuICAgIGlmICh0aGlzLl9vd25lcklkICE9PSB0aGlzLl9jdXJyZW50VXNlcklkKSB7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX3RyYXNoQnV0dG9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9yZW5kZXJMaWtlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmQ7XG4iLCJcbmNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9mb3JtRWwgPSBmb3JtRWw7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XG4gICAgfVxuICB9XG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIF9oYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PlxuICAgIGlucHV0TGlzdC5zb21lKChpbnB1dEVsKSA9PiAhaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbCkge1xuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsLmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRJZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdG9yKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG4vLyBjaGVja1xuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlQnV0dG9uQ2xvc2UgPSB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSA9IHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2Zvcm1MaXN0ID0gWy4uLnRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXBfX2Zvcm1cIildO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIF9oYW5kbGVCdXR0b25DbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgX2hhbmRsZU92ZXJsYXlDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldCA9PT0gdGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUJ1dHRvbkNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVPdmVybGF5Q2xvc2UpO1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFRocmVlIHdheXMgdG8gY2xvc2UgdGhlIHBvcHVwOlxuICAgIC8vIDEpIGhpdCBFU0Mga2V5XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgICAvLyAyKSBtb3VzZXVwIG9uIHRoZSBjbG9zZSBidXR0b25cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVCdXR0b25DbG9zZSk7XG4gICAgLy8gMykgbW91c2V1cCBvbiB0aGUgb3ZlcmxheVxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbG9zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fYnV0dG9uXCIpO1xuICAgIHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dCA9IHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldFN1Ym1pdChoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtTGlzdCA9IFsuLi50aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19mb3JtXCIpXTtcbiAgICB0aGlzLl9mb3JtRWwgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKTtcbiAgICB0aGlzLl9idXR0b25PcmlnaW5hbFRleHQgPSB0aGlzLl9idXR0b24udGV4dENvbnRlbnQ7XG4gIH1cbiAgXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbLi4udGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIildO1xuICAgIGNvbnN0IGlucHV0Q29udGVudCA9IHt9O1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICBpbnB1dENvbnRlbnRbaW5wdXRFbC5uYW1lXSA9IGlucHV0RWwudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0Q29udGVudDtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXRDbGljayk7XG4gICAgfSk7XG5cbiAgICBzdXBlci5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBfaGFuZGxlU3VibWl0Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB0aGlzLl9nZXRJbnB1dFZhbHVlcygpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQoaW5wdXRWYWx1ZXMsIHRoaXMuX2J1dHRvbik7XG4gIH07XG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0Q2xpY2spO1xuICB9XG4gIHJlbmRlckxvYWRpbmcoaXNMb2FkaW5nLCBidXR0b25UZXh0KSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgdGhpcy5fYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuX2J1dHRvbk9yaWdpbmFsVGV4dDtcbiAgICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICB9XG4gIG9wZW4oaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUVsID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICBpbWFnZUVsLnNyYyA9IGltYWdlLnNyYztcbiAgICBpbWFnZUVsLmFsdCA9IGltYWdlLmFsdDtcbiAgICBjb25zdCBjYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGNhcHRpb24udGV4dENvbnRlbnQgPSBpbWFnZS5hbHQ7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pbml0aWFsQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuX2luaXRpYWxBcnJheS5mb3JFYWNoKChhcnJFbCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoYXJyRWwpO1xuICAgIH0pO1xuICB9XG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgbmFtZVNlbGVjdG9yLCBqb2JTZWxlY3RvciwgYXZhdGFyU2VsZWN0b3IgfSkge1xuICAgIHRoaXMuX25hbWVTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xuICAgIHRoaXMuX2pvYlNsb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcbiAgICB0aGlzLl9hdmF0YXJTbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXJTZWxlY3Rvcik7XG4gIH1cbiAgLy8gdG8gcG9wdWxhdGUgZm9ybSBmaWVsZHMgYWZ0ZXIgcG9wdXAgb3BlblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCxcbiAgICAgIGF2YXRhcjogdGhpcy5fYXZhdGFyU2xvdC5zcmMsXG4gICAgfTtcbiAgfVxuICAvLyB1cG9uIGZvcm0gc3VibWlzc2lvblxuICBzZXRVc2VySW5mbyhkYXRhKSB7XG4gICAgdGhpcy5fbmFtZVNsb3QudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fam9iU2xvdC50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG4gICAgdGhpcy5fYXZhdGFyU2xvdC5hbHQgPSBgJHtkYXRhLm5hbWV9YDtcbiAgICB0aGlzLl9hdmF0YXJTbG90LnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG4gIHNldFVzZXJBdmF0YXIoZGF0YSkge1xuICAgIHRoaXMuX2F2YXRhclNsb3Quc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fYnV0dG9uXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9faW5wdXQtdHlwZV9lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG59O1xuZXhwb3J0IGNvbnN0IGNhcmRzQ29udGFpbmVyID0gXCIucGhvdG8tZ3JpZF9fY2FyZHNcIjtcbmV4cG9ydCBjb25zdCBjYXJkU2VsZWN0b3IgPSBcIiNjYXJkLXRlbXBsYXRlXCI7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5cbi8vIEltcG9ydGVkIENsYXNzZXNcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmRcIjtcbmltcG9ydCB7XG4gIGNhcmRzQ29udGFpbmVyLFxuICBjYXJkU2VsZWN0b3IsXG4gIHNldHRpbmdzLFxufSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHNcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3JcIjtcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb25cIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybVwiO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlXCI7XG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaVwiO1xuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybVwiO1xuXG5cbmNvbnN0IGVkaXRQcm9maWxlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faW5mby1lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGFkZFBpY3R1cmVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgYWRkUGljdHVyZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlUGljRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXZhdGFyLXBvcHVwXCIpO1xuY29uc3QgZm9ybUZpZWxkQXV0aG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXByb2ZpbGUtZm9ybVwiKTtcbmNvbnN0IGZvcm1GaWVsZFBpY3R1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wbGFjZS1mb3JtXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lXCIpO1xuY29uc3QgaW5wdXRQcm9maWxlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGVcIik7XG5jb25zdCBwcm9maWxlUGljSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci11cmxcIik7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ljb25cIik7XG5cbi8vIC8vVG9rZW4gYW5kIElEIGluZm9cbi8vIC8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy8gLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuLy8gQVBJIGNsYXNzXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cblxuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmRJZCwgYWN0aW9uLCBjYXJkKSB7XG4gIGlmIChhY3Rpb24gPT09IFwicmVtb3ZlXCIpIHtcbiAgICBhcGlcbiAgICAgIC5yZW1vdmVMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcGlcbiAgICAgIC5hZGRMaWtlKGNhcmRJZClcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY2FyZC51cGRhdGVMaWtlcyhyZXMubGlrZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGlucHV0VmFsdWVzKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcbiAgICBpbnB1dFZhbHVlcyxcbiAgICBjYXJkU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZVRyYXNoQnV0dG9uLFxuICAgIGN1cnJlbnRVc2VySWQsXG4gICAgaGFuZGxlTGlrZUNsaWNrXG4gICk7XG4gIGNvbnN0IGNhcmRFbCA9IGNhcmQuY3JlYXRlQ2FyZCgpO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbCk7XG59XG5cbmNvbnN0IHBsYWNlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKGlucHV0VmFsdWVzKSA9PiB7XG4gIHBsYWNlUG9wdXAucmVuZGVyTG9hZGluZyh0cnVlLCBcIlNhdmluZy4uLlwiKTtcbiAgYXBpXG4gICAgLmFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpXG4gICAgLnRoZW4oKGlucHV0VmFsdWVzKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGlucHV0VmFsdWVzKTtcbiAgICAgIHBsYWNlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICBhbGVydChyZXMpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgcGxhY2VQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5mdW5jdGlvbiBoYW5kbGVDYXJkQ2xpY2soaW1hZ2UpIHtcbiAgaW1hZ2VQb3B1cC5vcGVuKGltYWdlKTtcbn1cblxuY29uc3QgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbiA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFwiLmRlbGV0ZS1wb3B1cFwiKTtcblxuZnVuY3Rpb24gaGFuZGxlVHJhc2hCdXR0b24oY2FyZCkge1xuICBkZWxldGVDYXJkQ29uZmlybWF0aW9uLnNldFN1Ym1pdCgoKSA9PiB7XG4gICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZC5nZXRDYXJkSWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZC5kZWxldGVDYXJkKCk7XG4gICAgICAgIGRlbGV0ZUNhcmRDb25maXJtYXRpb24uY2xvc2UoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICBhbGVydChyZXMpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgZGVsZXRlQ2FyZENvbmZpcm1hdGlvbi5vcGVuKCk7XG59XG5cbmxldCBjYXJkU2VjdGlvbiA9IG51bGw7XG5cbmZ1bmN0aW9uIGZpbGxQcm9maWxlRm9ybSgpIHtcbiAgY29uc3QgcmVzdWx0ID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgaW5wdXRQcm9maWxlTmFtZS52YWx1ZSA9IHJlc3VsdC5uYW1lO1xuICBpbnB1dFByb2ZpbGVUaXRsZS52YWx1ZSA9IHJlc3VsdC5hYm91dDtcbn1cbmZ1bmN0aW9uIGhhbmRsZU9wZW5Qcm9maWxlRm9ybSgpIHtcbiAgZm9ybUZpZWxkQXV0aG9yLnJlc2V0KCk7XG4gIGZpbGxQcm9maWxlRm9ybSgpO1xuICBhZGRQcm9maWxlRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcHJvZmlsZVBvcHVwLm9wZW4oKTtcbn1cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgam9iU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgYXZhdGFyU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5jb25zdCBwcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LXBvcHVwXCIsIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKHRydWUsIFwiU2F2aW5nLi4uXCIpO1xuICBhcGlcbiAgICAuZWRpdFVzZXJQcm9maWxlKGlucHV0VmFsdWVzKVxuICAgIC50aGVuKChpbnB1dFZhbHVlcykgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xuICAgICAgcHJvZmlsZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgYWxlcnQocmVzKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIHByb2ZpbGVQb3B1cC5yZW5kZXJMb2FkaW5nKGZhbHNlLCBcIlNhdmluZy4uLlwiKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBwcm9maWxlUGljUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIuYXZhdGFyLXBvcHVwXCIsXG4gIChpbnB1dFZhbHVlcywgYnV0dG9uKSA9PiB7XG4gICAgcHJvZmlsZVBpY1BvcHVwLnJlbmRlckxvYWRpbmcodHJ1ZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgYXBpXG4gICAgICAuZWRpdFByb2ZpbGVQaWMoaW5wdXRWYWx1ZXMpXG4gICAgICAudGhlbigoaW5wdXRWYWx1ZXMpID0+IHtcbiAgICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcihpbnB1dFZhbHVlcyk7XG4gICAgICAgIHByb2ZpbGVQaWNQb3B1cC5jbG9zZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIGFsZXJ0KHJlcyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBwcm9maWxlUGljUG9wdXAucmVuZGVyTG9hZGluZyhmYWxzZSwgXCJTYXZpbmcuLi5cIik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgZWRpdFByb2ZpbGVGb3JtKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkUGljdHVyZUZvcm0pO1xuYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBlZGl0UHJvZmlsZVBpY0Zvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgc2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlUGljRm9ybVxuKTtcbmVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcblxuZnVuY3Rpb24gaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKCkge1xuICBmb3JtRmllbGRQaWN0dXJlLnJlc2V0KCk7XG5cbiAgYWRkUGljdHVyZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG4gIHBsYWNlUG9wdXAub3BlbigpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPcGVuRWRpdFByb2ZpbGVQaWNGb3JtKCkge1xuICBwcm9maWxlUGljSW5wdXQudmFsdWUgPSB1c2VySW5mby5nZXRVc2VySW5mbygpLmF2YXRhcjtcbiAgZWRpdFByb2ZpbGVQaWNGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlUGljUG9wdXAub3BlbigpO1xufVxuYWRkUGljdHVyZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlT3BlbkFkZFBpY3R1cmVGb3JtKTtcbmVkaXRQcm9maWxlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVPcGVuUHJvZmlsZUZvcm0pO1xuZWRpdFByb2ZpbGVQaWNJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0pO1xuXG5sZXQgY3VycmVudFVzZXJJZCA9IG51bGw7XG5hcGlcbiAgLmluaXRpYWxpemUoKVxuICAudGhlbigoW3VzZXIsIGNhcmRzXSkgPT4ge1xuICAgIGN1cnJlbnRVc2VySWQgPSB1c2VyLl9pZDtcbiAgICBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxuICAgICAge1xuICAgICAgICBpdGVtczogY2FyZHMsXG4gICAgICAgIHJlbmRlcmVyOiByZW5kZXJDYXJkLFxuICAgICAgfSxcbiAgICAgIGNhcmRzQ29udGFpbmVyXG4gICAgKTtcbiAgICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xuXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8odXNlcik7XG4gIH0pXG4gIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgYWxlcnQocmVzKTtcbiAgfSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsImFsbCIsImdldFVzZXJJbmZvIiwiZ2V0SW5pdGlhbENhcmRzIiwiX2hhbmRsZUZldGNoUmVzcG9uc2UiLCJwYXRoIiwibWV0aG9kVXNlZCIsImJvZHlDb250ZW50IiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsInJlamVjdCIsInN0YXR1cyIsImVkaXRVc2VyUHJvZmlsZSIsImlucHV0VmFsdWVzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJhYm91dCIsImFkZE5ld0NhcmQiLCJsaW5rIiwiZ2V0Q2FyZExpa2VJbmZvIiwiZGVsZXRlQ2FyZCIsImNhcmRJZCIsImFkZExpa2UiLCJyZW1vdmVMaWtlIiwiZWRpdFByb2ZpbGVQaWMiLCJhdmF0YXJMaW5rIiwiYXZhdGFyIiwiQ2FyZCIsImNhcmREYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlVHJhc2hCdXR0b24iLCJjdXJyZW50VXNlcklkIiwiaGFuZGxlTGlrZUNsaWNrIiwiX2ltYWdlTGluayIsIl90ZXh0IiwiX2xpa2VzIiwibGlrZXMiLCJfY3VycmVudFVzZXJJZCIsIl9vd25lcklkIiwib3duZXIiLCJfaWQiLCJfY2FyZElkIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlVHJhc2hCdXR0b24iLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2dldFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNsb25lTm9kZSIsImdldENhcmRJZCIsInVwZGF0ZUxpa2VzIiwiX3JlbmRlckxpa2VzIiwiX2xpa2VDb3VudCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwiX2lzTGlrZWQiLCJfaGVhcnRCdXR0b24iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzb21lIiwidXNlciIsIl9zZXRFdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWlucyIsIl90cmFzaEJ1dHRvbiIsIl9jYXJkSW1hZ2UiLCJldnQiLCJ0YXJnZXQiLCJfY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiY2FyZFRpdGxlIiwiYWx0Iiwic3JjIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsIiwiaW5wdXRMaXN0IiwiaW5wdXRFbCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsIiwiYnV0dG9uRWxlbWVudCIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JNZXNzYWdlIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpbnB1dElkIiwiaWQiLCJlcnJvckVsIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJfaGFuZGxlQnV0dG9uQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsb3NlIiwiX2Nsb3NlQnV0dG9uIiwiX2Zvcm1MaXN0Iiwia2V5IiwiY2xvc2UiLCJvcGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlBvcHVwV2l0aENvbmZpcm0iLCJfYnV0dG9uIiwiX2J1dHRvbk9yaWdpbmFsVGV4dCIsInNldFN1Ym1pdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJidXR0b25UZXh0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0Q29udGVudCIsInZhbHVlIiwiX2hhbmRsZVN1Ym1pdENsaWNrIiwiUG9wdXBXaXRoSW1hZ2UiLCJpbWFnZSIsImltYWdlRWwiLCJjYXB0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pbml0aWFsQXJyYXkiLCJfY29udGFpbmVyIiwiX3JlbmRlcmVyIiwicmVuZGVySXRlbXMiLCJhcnJFbCIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJhdmF0YXJTZWxlY3RvciIsIl9uYW1lU2xvdCIsIl9qb2JTbG90IiwiX2F2YXRhclNsb3QiLCJzZXRVc2VySW5mbyIsImRhdGEiLCJzZXRVc2VyQXZhdGFyIiwiY2FyZHNDb250YWluZXIiLCJlZGl0UHJvZmlsZUljb24iLCJhZGRQaWN0dXJlSWNvbiIsImVkaXRQcm9maWxlRm9ybSIsImFkZFBpY3R1cmVGb3JtIiwiZWRpdFByb2ZpbGVQaWNGb3JtIiwiZm9ybUZpZWxkQXV0aG9yIiwiZm9ybUZpZWxkUGljdHVyZSIsImlucHV0UHJvZmlsZU5hbWUiLCJpbnB1dFByb2ZpbGVUaXRsZSIsInByb2ZpbGVQaWNJbnB1dCIsImVkaXRQcm9maWxlUGljSWNvbiIsImFwaSIsImF1dGhvcml6YXRpb24iLCJhY3Rpb24iLCJjYXJkIiwiY2F0Y2giLCJhbGVydCIsInJlbmRlckNhcmQiLCJjYXJkRWwiLCJjYXJkU2VjdGlvbiIsInBsYWNlUG9wdXAiLCJmaW5hbGx5IiwiaW1hZ2VQb3B1cCIsImRlbGV0ZUNhcmRDb25maXJtYXRpb24iLCJmaWxsUHJvZmlsZUZvcm0iLCJyZXN1bHQiLCJ1c2VySW5mbyIsImhhbmRsZU9wZW5Qcm9maWxlRm9ybSIsInJlc2V0IiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlUG9wdXAiLCJidXR0b24iLCJwcm9maWxlUGljUG9wdXAiLCJhZGRQaWN0dXJlRm9ybVZhbGlkYXRvciIsImVkaXRQcm9maWxlUGljRm9ybVZhbGlkYXRvciIsImhhbmRsZU9wZW5BZGRQaWN0dXJlRm9ybSIsImhhbmRsZU9wZW5FZGl0UHJvZmlsZVBpY0Zvcm0iLCJjYXJkcyJdLCJzb3VyY2VSb290IjoiIn0=