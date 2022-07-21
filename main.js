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
/* harmony export */   "Api": () => (/* binding */ Api)
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

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error: ".concat(res.status));
    });
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error: ".concat(res.status));
    });
  }

  patchUserAvatar(info) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info)
    });
  }

  patchUserInfo(info) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info)
    });
  }

  deleteCard(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers
    });
  }

  uploadCard(info) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(info)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error: ".concat(res.status));
    });
  }

  likeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "PUT",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error: ".concat(res.status));
    });
  }

  unLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error: ".concat(res.status));
    });
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
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, currentUser) {
    _defineProperty(this, "deleteFromPage", () => {
      this._element.remove();

      this._element = null;
    });

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data.id;
    this._currentUser = currentUser;
    this._cardTemplate = document.querySelector(templateSelector).content.querySelector(".card");
    this._element;
    this._cardImage;
    this._likeButton;
    this._deleteButton;
    this._deleteButtonImage;
    this._numLikesText;
    this._isLikedByCurrentUser;
  }

  getId() {
    return this._id;
  }

  createCardElement(userData) {
    this._element = this._getElement();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._deleteButtonImage = this._element.querySelector(".card__delete-image");
    this._heart = this._element.querySelector(".card__like-image");
    this._numLikesText = this._element.querySelector(".card__likes");
    this._cardImage = this._element.querySelector(".card__image");

    if (userData.getUserInfo().name === this._owner.name) {} else {
      this._deleteButton.remove();
    }

    this._setImageAndName();

    this._loadLikes();

    this._setEventListener();

    this._isLikedByCurrentUser = false;

    this._likes.forEach(like => {
      if (like._id === userData.getUserInfo().id) {
        this._isLikedByCurrentUser = true;
      }
    });

    if (this._isLikedByCurrentUser) {
      this._toggleLikesImage();
    }

    return this._element;
  }

  getIsLikedByCurrentUser() {
    return this._isLikedByCurrentUser;
  }

  _getElement() {
    return this._cardTemplate.cloneNode(true);
  }

  _setEventListener() {
    this._likeButton.addEventListener("click", evt => this._like(evt));

    this._deleteButton.addEventListener("click", () => this._handleDeleteClick());

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _toggleIsLiked() {
    console.log(this._isLikedByCurrentUser);

    if (this._isLikedByCurrentUser == false) {
      this._isLikedByCurrentUser = true;
    } else {
      this._isLikedByCurrentUser = false;
    }

    console.log(this._isLikedByCurrentUser);
  }

  _toggleLikesImage() {
    this._heart.classList.toggle("card__like_active");
  }

  _like(evt) {
    this._toggleLikesImage();

    this._handleLikeClick();

    this._toggleIsLiked();

    this._numLikesText.textContent = this._likes.length;
  }

  setLikes(likesArray) {
    this._likes = likesArray;
    this._numLikesText.textContent = this._likes.length;
  }

  _loadLikes() {
    if (this._likes != null) {
      this._numLikesText.textContent = this._likes.length;
    } else {
      this._numLikesText.textContent = 0;
    }
  }

  _setImageAndName() {
    this._cardImage.style = "background-image:url(".concat(this._cardLink, ");");
    this._element.querySelector(".card__title").textContent = this._cardName;
  }

}



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
  constructor(settings, formElement) {
    _defineProperty(this, "_hasInvalidInput", inputList => inputList.some(inputElement => !inputElement.validity.valid));

    this._settings = settings;
    this._formElement = formElement;
  }

  _setEventListeners(inputList, buttonElement) {
    inputList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._settings.inputErrorClass);
    const inputId = inputElement.id;

    const errorEl = this._formElement.querySelector(".".concat(inputElement.id, "-error"));

    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    const inputId = inputElement.id;

    const errorEl = this._formElement.querySelector(".".concat(inputElement.id, "-error"));

    errorEl.textContent = "";
    errorEl.classList.remove(this._settings.errorClass);
  }

  enableValidator() {
    const inputList = [...this._formElement.querySelectorAll(this._settings.inputSelector)];

    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._formElement.addEventListener("submit", evt => {
      evt.preventDefault();
    });

    this._setEventListeners(inputList, buttonElement);
  }

  resetValidation() {
    const inputList = [...this._formElement.querySelectorAll(this._settings.inputSelector)];

    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(inputList, buttonElement);
  }

  clearAllErrors() {
    const inputList = Array.from(this.formElement.querySelectorAll(customSettings.inputSelector));
    inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormValidator);

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Popup {
  constructor(popupSelector) {
    _defineProperty(this, "_handleEscClose", evt => {
      if (evt.key === "Escape") {
        this.close();
      }
    });

    this._popup = document.querySelector(popupSelector);
    this._button = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_open");

    document.addEventListener("keydown", this._handleEscClose); //close on esc
  }

  close() {
    this._popup.classList.remove("popup_open");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._button.addEventListener("click", () => this.close());

    this._popup.addEventListener("mousedown", evt => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);

/***/ }),

/***/ "./src/components/PopupWithConfirm.js":
/*!********************************************!*\
  !*** ./src/components/PopupWithConfirm.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");


class PopupWithConfirm extends _Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._cardToDelete;
  }

  setCardToDelete(cardObj) {
    this._cardToDelete = cardObj;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", evt => {
      evt.preventDefault();

      this._handleFormSubmit(this._cardToDelete);
    });
  }

  open() {
    super.open();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopupWithConfirm);

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");


class PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._buttonText = this._form.querySelector(".popup__save-button");
    this._originaTtext = this._buttonText.textContent;
  }

  setLoadingText(isLoading) {
    console.log({
      isLoading
    });

    if (isLoading === true) {
      this._buttonText.textContent = "Saving...";
    } else {
      this._buttonText.textContent = this._originalText;
    }
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll("input");

    const inputObj = {};
    inputs.forEach(input => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", evt => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopupWithForm);

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");


class PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _setDataImagePopup() {
    const imagePopupPic = this._popup.querySelector(".popup__preview-image");

    const imagePopupText = this._popup.querySelector(".popup__preview-name");

    imagePopupPic.src = this.link;
    imagePopupText.textContent = this.name;
    imagePopupPic.alt = this.name;
  }

  open(data //data contains name and link. sent here and not in the constructor
  ) {
    this.name = data.name;
    this.link = data.link;

    this._setDataImagePopup();

    super.open();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopupWithImage);

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Section {
  constructor(_ref, containerSelector) {
    let {
      items,
      renderer
    } = _ref;
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._itemsArray = items;
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();

    this._itemsArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInfo": () => (/* binding */ UserInfo)
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      userName,
      userJob,
      userAvatar
    } = _ref;
    this.userNameElement = document.querySelector(userName);
    this.userJobElement = document.querySelector(userJob);
    this.userAvatarElement = document.querySelector(userAvatar);
  }

  setUserInfo(_ref2) {
    let {
      name,
      about,
      avatar,
      _id
    } = _ref2;
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = about;
    this.userAvatarElement.src = avatar;
    this.id = _id;
  }

  setUserInfoTextOnly(_ref3) {
    let {
      name,
      about
    } = _ref3;
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = about;
  }

  getUserInfo() {
    const newObject = {
      name: this.userNameElement.textContent,
      about: this.userJobElement.textContent,
      id: this.id
    };
    return newObject;
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
/* harmony export */   "customSettings": () => (/* binding */ customSettings),
/* harmony export */   "initialCards": () => (/* binding */ initialCards)
/* harmony export */ });
const initialCards = [{
  name: "Sassafras Mountain",
  link: "https://images.unsplash.com/photo-1598559069352-3d8437b0d42c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
}, {
  name: "Angel Tree",
  link: "https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80"
}, {
  name: "Myrtle Beach",
  link: "https://images.unsplash.com/photo-1617858797175-b7dba3c5c8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG15cnRsZSUyMGJlYWNoJTIwc291dGglMjBjYXJvbGluYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
}, {
  name: "Edisto Beach",
  link: "https://images.unsplash.com/photo-1546188994-fea0ecbb04a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
}, {
  name: "Table Rock Mountain",
  link: "https://images.unsplash.com/photo-1617912689430-28d6624fe467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60"
}, {
  name: "Congaree National Park",
  link: "https://images.unsplash.com/photo-1615653051968-69c2b0e43347?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
}];
const customSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible",
  profileImageSelector: ".profile__avatar"
};

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
/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Api.js */ "./src/components/Api.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/constants.js */ "./src/components/constants.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithConfirm_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithConfirm.js */ "./src/components/PopupWithConfirm.js");
 //Import classes









 // Buttons and other DOM elements

const editProfileButton = document.querySelector("#profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const addCardButton = document.querySelector("#profile__add-button");
const addCardPopup = document.querySelector("#create-popup");
const addCardForm = addCardPopup.querySelector(".popup__form");
const editAvatarModal = document.querySelector("#avatar-popup");
const editAvatarForm = editAvatarModal.querySelector(".popup__form");
const editAvatarButton = document.querySelector("#profile__avatar-button");
const avatarImg = document.querySelector(".profile__avatar"); // Form data

const nameText = document.querySelector(".profile__name");
const titleText = document.querySelector(".profile__title");
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="description"]');
const imageNameInput = addCardForm.querySelector('[name="place-name"]');
const imageLinkInput = addCardForm.querySelector('[name="link"]');
const imagePopupObject = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__["default"]("#preview-popup");
imagePopupObject.setEventListeners(); //Token and ID info
//Token: b1411637-441a-4d25-9227-6de5bf8bcf24
//Group ID: group-12

fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24"
  }
}).then(res => res.json()).then(result => {
  console.log(result);
});
const api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json"
  }
});
const user = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_8__.UserInfo({
  userName: ".profile__info-name",
  userJob: ".profile__info-title",
  userAvatar: ".profile__avatar"
}); // function renderCard(cardContainer, data, cardPopupObject)
// {
//   const cardObject = new Card(data, "#card-template", () => {
//     cardPopupObject.open(data);
//   });
//   const newCard = cardObject.createCardElement();
//   cardContainer.addItem(newCard);
// }

const cardGridObject = new _components_Section_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
  items: null,
  renderer: data => {
    renderCard(cardGridObject, data, imagePopupObject, deleteCardFormPopupObject);
  }
}, ".photo-grid__cards");
api.getUserInfo().then(data => {
  user.setUserInfo(data);
}).catch(err => {
  console.log(err);
}).then(() => {
  api.getInitialCards().then(result => {
    console.log(result);
    cardGridObject.setItems(result);
    cardGridObject.renderItems();
  }).catch(err => {
    console.log(err);
  });
});

function renderCard(cardContainer, data, cardPopupObject, deletePopupObject) {
  const cardObject = new _components_Card_js__WEBPACK_IMPORTED_MODULE_3__.Card(data, "#card-template", () => {
    cardPopupObject.open(data);
  }, () => {
    deletePopupObject.setCardToDelete(cardObject);
    deletePopupObject.open();
  }, () => {
    if (cardObject.getIsLikedByCurrentUser() == false) {
      api.likeCard(cardObject.getId()).then(data => cardObject.setLikes(data.likes)).catch(err => {
        console.log(err);
      });
    } else {
      api.unLikeCard(cardObject.getId()).then(data => cardObject.setLikes(data.likes)).catch(err => {
        console.log(err);
      });
    }
  }, user);
  const newCard = cardObject.createCardElement(user);
  cardContainer.addItem(newCard);
} // const formElementsList = Array.from(
//   document.querySelectorAll(customSettings.formSelector)
// );
// const formValidatorObjectList = formElementsList.map((form) => {
//   const formObject = new FormValidator(customSettings, form);
//   formObject.enableValidation();
//   return formObject;
// });
// const editProfileFormObject = formValidatorObjectList.find(
//   (obj) => obj.formElement.getAttribute("name") == "nameanddescription"
// );
// const addCardFormObject = formValidatorObjectList.find(
//   (obj) => obj.formElement.getAttribute("name") == "nameandlink"
// );
// const editAvatarFormObject = formValidatorObjectList.find(
//   (obj) => obj.formElement.getAttribute("name") == "avatarform"
// );


const addProfileFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__["default"](_components_constants_js__WEBPACK_IMPORTED_MODULE_4__.customSettings, editProfileForm);
addProfileFormValidator.enableValidator();
const addImageFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__["default"](_components_constants_js__WEBPACK_IMPORTED_MODULE_4__.customSettings, addCardForm);
addImageFormValidator.enableValidator();
const addAvatarFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__["default"](_components_constants_js__WEBPACK_IMPORTED_MODULE_4__.customSettings, editAvatarForm);
addAvatarFormValidator.enableValidator();
const addAvatarForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]("#avatar-popup", values => {
  avatarImg.src = values.avatar;
  addAvatarFormValidator.setLoadingText(true);
  api.patchUserAvatar(values).then(addAvatarFormValidator.close()).then(addAvatarFormValidator.setLoadingText(false)).catch(err => {
    console.log(err);
  });
});
addAvatarForm.setEventListeners();
const addProfileForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]("#edit-popup", values => {
  user.setUserInfoTextOnly({
    name: values.name,
    about: values.title
  });
  addProfileForm.setLoadingText(true);
  api.patchUserInfo(user.getUserInfo()).then(addProfileForm.close()).then(addProfileForm.setLoadingText(false)).catch(err => {
    console.log(err);
  });
});
addProfileForm.setEventListeners();
const addNewCardForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]("#create-popup", () => {
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
    likes: [],
    owner: user.getUserInfo()
  };
  addCardForm.setLoadingText(true);
  api.uploadCard(newCardInfo).then(data => {
    console.log({
      data
    });
    renderCard(cardGridObject, newCardInfo, imagePopupObject, deleteCardFormPopupObject);
  }).then(addCardForm.reset()).then(addImageFormValidator.setButtonInactive()).then(addNewCardForm.close()).then(addNewCardForm.setloadingText(false)).catch(err => {
    console.log(err);
  });
});
addNewCardForm.setEventListeners();
const deleteCardFormPopupObject = new _components_PopupWithConfirm_js__WEBPACK_IMPORTED_MODULE_9__["default"]("#delete-popup", cardObjToDelete => {
  api.deleteCard(cardObjToDelete.getId()).then(cardObjToDelete.deleteFromPage()).then(deleteCardFormPopupObject.close()).catch(err => {
    console.log(err);
  });
});
deleteCardFormPopupObject.setEventListeners();
editAvatarButton.addEventListener("click", () => {
  addAvatarForm.open();
});
addCardButton.addEventListener("click", () => {
  addNewCardForm.open();
});
editProfileButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  nameInput.value = userInput.username;
  titleInput.value = userInput.userinfo;
  addProfileForm.open(); //user.getUserInfo();
  //nameInput.value = nameText.textContent;
  //titleInput.value = titleText.textContent;

  addProfileForm.clearAllErrors();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUd4QixJQUFJLENBQUNqTSxXQUFMLEVBQWxCO0VBQ0F5TCxTQUFTLENBQUNuRCxLQUFWLEdBQWtCbUYsU0FBUyxDQUFDQyxRQUE1QjtFQUNBaEMsVUFBVSxDQUFDcEQsS0FBWCxHQUFtQm1GLFNBQVMsQ0FBQ0UsUUFBN0I7RUFDQVYsY0FBYyxDQUFDbEcsSUFBZixHQUpnRCxDQU1oRDtFQUVBO0VBQ0E7O0VBRUFrRyxjQUFjLENBQUM1RyxjQUFmO0FBQ0QsQ0FaRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHNcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lXCIsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VyQXZhdGFyKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lL2F2YXRhclwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIHBhdGNoVXNlckluZm8oaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgdXBsb2FkQ2FyZChpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxpa2VDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9saWtlcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVuTGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwaSB9O1xuIiwiY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGRhdGEsXG4gICAgdGVtcGxhdGVTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlRGVsZXRlQ2xpY2ssXG4gICAgaGFuZGxlTGlrZUNsaWNrLFxuICAgIGN1cnJlbnRVc2VyXG4gICkge1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVEZWxldGVDbGljayA9IGhhbmRsZURlbGV0ZUNsaWNrO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgICB0aGlzLl9jYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9jYXJkTGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fb3duZXIgPSBkYXRhLm93bmVyO1xuICAgIHRoaXMuX2lkID0gZGF0YS5pZDtcbiAgICB0aGlzLl9jdXJyZW50VXNlciA9IGN1cnJlbnRVc2VyO1xuICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgIHRoaXMuX2VsZW1lbnQ7XG4gICAgdGhpcy5fY2FyZEltYWdlO1xuXG4gICAgdGhpcy5fbGlrZUJ1dHRvbjtcbiAgICB0aGlzLl9kZWxldGVCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2U7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0O1xuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgY3JlYXRlQ2FyZEVsZW1lbnQodXNlckRhdGEpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jYXJkX19kZWxldGUtaW1hZ2VcIlxuICAgICk7XG4gICAgdGhpcy5faGVhcnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1pbWFnZVwiKTtcblxuICAgIHRoaXMuX251bUxpa2VzVGV4dCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcblxuICAgIGlmICh1c2VyRGF0YS5nZXRVc2VySW5mbygpLm5hbWUgPT09IHRoaXMuX293bmVyLm5hbWUpIHtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZXRlQnV0dG9uLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRJbWFnZUFuZE5hbWUoKTtcbiAgICB0aGlzLl9sb2FkTGlrZXMoKTtcblxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIoKTtcblxuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgdGhpcy5fbGlrZXMuZm9yRWFjaCgobGlrZSkgPT4ge1xuICAgICAgaWYgKGxpa2UuX2lkID09PSB1c2VyRGF0YS5nZXRVc2VySW5mbygpLmlkKSB7XG4gICAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcikge1xuICAgICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIGdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcjtcbiAgfVxuICBfZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiB0aGlzLl9saWtlKGV2dCkpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKClcbiAgICApO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBfdG9nZ2xlSXNMaWtlZCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIF90b2dnbGVMaWtlc0ltYWdlKCkge1xuICAgIHRoaXMuX2hlYXJ0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgfVxuICBfbGlrZShldnQpIHtcbiAgICB0aGlzLl90b2dnbGVMaWtlc0ltYWdlKCk7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKCk7XG4gICAgdGhpcy5fdG9nZ2xlSXNMaWtlZCgpO1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIHNldExpa2VzKGxpa2VzQXJyYXkpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzQXJyYXk7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICB9XG5cbiAgZGVsZXRlRnJvbVBhZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgfTtcblxuICBfbG9hZExpa2VzKCkge1xuICAgIGlmICh0aGlzLl9saWtlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IDA7XG4gICAgfVxuICB9XG4gIF9zZXRJbWFnZUFuZE5hbWUoKSB7XG4gICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5fY2FyZExpbmt9KTtgO1xuICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX2NhcmROYW1lO1xuICB9XG59XG5cbmV4cG9ydCB7IENhcmQgfTtcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG5cbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbGVtZW50LmlkO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG5cbiAgY2xlYXJBbGxFcnJvcnMoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjdXN0b21TZXR0aW5ncy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwicG9wdXBfb3BlblwiKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTsgLy9jbG9zZSBvbiBlc2NcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cFwiKSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXA7XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuXG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlO1xuICB9XG5cbiAgc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmopIHtcbiAgICB0aGlzLl9jYXJkVG9EZWxldGUgPSBjYXJkT2JqO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2NhcmRUb0RlbGV0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b25UZXh0ID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9vcmlnaW5hVHRleHQgPSB0aGlzLl9idXR0b25UZXh0LnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0TG9hZGluZ1RleHQoaXNMb2FkaW5nKSB7XG4gICAgY29uc29sZS5sb2coeyBpc0xvYWRpbmcgfSk7XG4gICAgaWYgKGlzTG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fYnV0dG9uVGV4dC50ZXh0Q29udGVudCA9IFwiU2F2aW5nLi4uXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvblRleHQudGV4dENvbnRlbnQgPSB0aGlzLl9vcmlnaW5hbFRleHQ7XG4gICAgfVxuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0cyA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuXG4gICAgY29uc3QgaW5wdXRPYmogPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0T2JqW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5wdXRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhGb3JtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gIH1cbiAgX3NldERhdGFJbWFnZVBvcHVwKCkge1xuICAgIGNvbnN0IGltYWdlUG9wdXBQaWMgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgIGNvbnN0IGltYWdlUG9wdXBUZXh0ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGltYWdlUG9wdXBQaWMuc3JjID0gdGhpcy5saW5rO1xuICAgIGltYWdlUG9wdXBUZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgIGltYWdlUG9wdXBQaWMuYWx0ID0gdGhpcy5uYW1lO1xuICB9XG4gIG9wZW4oXG4gICAgZGF0YSAvL2RhdGEgY29udGFpbnMgbmFtZSBhbmQgbGluay4gc2VudCBoZXJlIGFuZCBub3QgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fc2V0RGF0YUltYWdlUG9wdXAoKTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoSW1hZ2U7XG4iLCJjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gIHNldEl0ZW1zKGl0ZW1zKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cblxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5faXRlbXNBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247XG4iLCJjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgdXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckpvYik7XG4gICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckF2YXRhcik7XG4gIH1cbiAgc2V0VXNlckluZm8oeyBuYW1lLCBhYm91dCwgYXZhdGFyLCBfaWQgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudC5zcmMgPSBhdmF0YXI7XG4gICAgdGhpcy5pZCA9IF9pZDtcbiAgfVxuXG4gIHNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IHtcbiAgICAgIG5hbWU6IHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICB9O1xuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cbn1cblxuZXhwb3J0IHsgVXNlckluZm8gfTtcbiIsImV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIlNhc3NhZnJhcyBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTg1NTkwNjkzNTItM2Q4NDM3YjBkNDJjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJBbmdlbCBUcmVlXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxMTg1OTMyODA1My0zY2JjOWY5Mzk5ZjQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcyNiZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIk15cnRsZSBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc4NTg3OTcxNzUtYjdkYmEzYzVjOGZjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4elpXRnlZMmg4TVRsOGZHMTVjblJzWlNVeU1HSmxZV05vSlRJd2MyOTFkR2dsTWpCallYSnZiR2x1WVh4bGJud3dmSHd3Zkh3JTNEJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiRWRpc3RvIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU0NjE4ODk5NC1mZWEwZWNiYjA0YTQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTY4NyZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRhYmxlIFJvY2sgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3OTEyNjg5NDMwLTI4ZDY2MjRmZTQ2Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdjbTltYVd4bExYQmhaMlY4TjN4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkNvbmdhcmVlIE5hdGlvbmFsIFBhcmtcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE1NjUzMDUxOTY4LTY5YzJiMGU0MzM0Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBjdXN0b21TZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5wb3B1cF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcInBvcHVwX19zYXZlLWJ1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbiAgcHJvZmlsZUltYWdlU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbi8vSW1wb3J0IGNsYXNzZXNcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuLi9jb21wb25lbnRzL0FwaS5qc1wiO1xuXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XG5cbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XG5cbmltcG9ydCB7IGN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzXCI7XG5cbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcblxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzXCI7XG5cbi8vIEJ1dHRvbnMgYW5kIG90aGVyIERPTSBlbGVtZW50c1xuXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fZWRpdC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGFkZENhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgYWRkQ2FyZEZvcm0gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGVkaXRBdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXBvcHVwXCIpO1xuY29uc3QgZWRpdEF2YXRhckZvcm0gPSBlZGl0QXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGVkaXRBdmF0YXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2F2YXRhci1idXR0b25cIik7XG5jb25zdCBhdmF0YXJJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcblxuLy8gRm9ybSBkYXRhXG5jb25zdCBuYW1lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbmNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJyk7XG5jb25zdCB0aXRsZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiZGVzY3JpcHRpb25cIl0nKTtcbmNvbnN0IGltYWdlTmFtZUlucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJwbGFjZS1uYW1lXCJdJyk7XG5jb25zdCBpbWFnZUxpbmtJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibGlua1wiXScpO1xuXG5jb25zdCBpbWFnZVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5pbWFnZVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vVG9rZW4gYW5kIElEIGluZm9cbi8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuZmV0Y2goXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyL3VzZXJzL21lXCIsIHtcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gIH0sXG59KVxuICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgfSk7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VySW5mbyh7XG4gIHVzZXJOYW1lOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgdXNlckpvYjogXCIucHJvZmlsZV9faW5mby10aXRsZVwiLFxuICB1c2VyQXZhdGFyOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn0pO1xuXG4vLyBmdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdClcbi8vIHtcbi8vICAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKGRhdGEsIFwiI2NhcmQtdGVtcGxhdGVcIiwgKCkgPT4ge1xuLy8gICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuLy8gICB9KTtcblxuLy8gICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCgpO1xuLy8gICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG4vLyB9XG5cbmNvbnN0IGNhcmRHcmlkT2JqZWN0ID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICBpdGVtczogbnVsbCxcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBkYXRhLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIFwiLnBob3RvLWdyaWRfX2NhcmRzXCJcbik7XG5cbmFwaVxuICAuZ2V0VXNlckluZm8oKVxuICAudGhlbigoZGF0YSkgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm8oZGF0YSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGFwaVxuICAgICAgLmdldEluaXRpYWxDYXJkcygpXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnNldEl0ZW1zKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnJlbmRlckl0ZW1zKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QsIGRlbGV0ZVBvcHVwT2JqZWN0KSB7XG4gIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0LnNldENhcmRUb0RlbGV0ZShjYXJkT2JqZWN0KTtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0Lm9wZW4oKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGlmIChjYXJkT2JqZWN0LmdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkgPT0gZmFsc2UpIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLmxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC51bkxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVzZXJcbiAgKTtcblxuICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCh1c2VyKTtcbiAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xufVxuXG4vLyBjb25zdCBmb3JtRWxlbWVudHNMaXN0ID0gQXJyYXkuZnJvbShcbi8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjdXN0b21TZXR0aW5ncy5mb3JtU2VsZWN0b3IpXG4vLyApO1xuXG4vLyBjb25zdCBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdCA9IGZvcm1FbGVtZW50c0xpc3QubWFwKChmb3JtKSA9PiB7XG4vLyAgIGNvbnN0IGZvcm1PYmplY3QgPSBuZXcgRm9ybVZhbGlkYXRvcihjdXN0b21TZXR0aW5ncywgZm9ybSk7XG4vLyAgIGZvcm1PYmplY3QuZW5hYmxlVmFsaWRhdGlvbigpO1xuLy8gICByZXR1cm4gZm9ybU9iamVjdDtcbi8vIH0pO1xuXG4vLyBjb25zdCBlZGl0UHJvZmlsZUZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuLy8gICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRkZXNjcmlwdGlvblwiXG4vLyApO1xuXG4vLyBjb25zdCBhZGRDYXJkRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4vLyAgIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGxpbmtcIlxuLy8gKTtcblxuLy8gY29uc3QgZWRpdEF2YXRhckZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuLy8gICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcImF2YXRhcmZvcm1cIlxuLy8gKTtcbmNvbnN0IGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIGN1c3RvbVNldHRpbmdzLFxuICBlZGl0UHJvZmlsZUZvcm1cbik7XG5hZGRQcm9maWxlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZEltYWdlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBhZGRDYXJkRm9ybSk7XG5hZGRJbWFnZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRBdmF0YXJGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIGN1c3RvbVNldHRpbmdzLFxuICBlZGl0QXZhdGFyRm9ybVxuKTtcbmFkZEF2YXRhckZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5cbmNvbnN0IGFkZEF2YXRhckZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNhdmF0YXItcG9wdXBcIiwgKHZhbHVlcykgPT4ge1xuICBhdmF0YXJJbWcuc3JjID0gdmFsdWVzLmF2YXRhcjtcbiAgYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnBhdGNoVXNlckF2YXRhcih2YWx1ZXMpXG4gICAgLnRoZW4oYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5jbG9zZSgpKVxuICAgIC50aGVuKGFkZEF2YXRhckZvcm1WYWxpZGF0b3Iuc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRBdmF0YXJGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZFByb2ZpbGVGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjZWRpdC1wb3B1cFwiLCAodmFsdWVzKSA9PiB7XG4gIHVzZXIuc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWU6IHZhbHVlcy5uYW1lLCBhYm91dDogdmFsdWVzLnRpdGxlIH0pO1xuICBhZGRQcm9maWxlRm9ybS5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnBhdGNoVXNlckluZm8odXNlci5nZXRVc2VySW5mbygpKVxuICAgIC50aGVuKGFkZFByb2ZpbGVGb3JtLmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkUHJvZmlsZUZvcm0uc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRQcm9maWxlRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoKSA9PiB7XG4gIGNvbnN0IG5ld0NhcmRJbmZvID0ge1xuICAgIG5hbWU6IGltYWdlTmFtZUlucHV0LnZhbHVlLFxuICAgIGxpbms6IGltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIGxpa2VzOiBbXSxcbiAgICBvd25lcjogdXNlci5nZXRVc2VySW5mbygpLFxuICB9O1xuXG4gIGFkZENhcmRGb3JtLnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAudXBsb2FkQ2FyZChuZXdDYXJkSW5mbylcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBkYXRhIH0pO1xuXG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgbmV3Q2FyZEluZm8sXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSlcblxuICAgIC50aGVuKGFkZENhcmRGb3JtLnJlc2V0KCkpXG4gICAgLnRoZW4oYWRkSW1hZ2VGb3JtVmFsaWRhdG9yLnNldEJ1dHRvbkluYWN0aXZlKCkpXG4gICAgLnRoZW4oYWRkTmV3Q2FyZEZvcm0uY2xvc2UoKSlcbiAgICAudGhlbihhZGROZXdDYXJkRm9ybS5zZXRsb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZE5ld0NhcmRGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcbiAgXCIjZGVsZXRlLXBvcHVwXCIsXG4gIChjYXJkT2JqVG9EZWxldGUpID0+IHtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmRPYmpUb0RlbGV0ZS5nZXRJZCgpKVxuICAgICAgLnRoZW4oY2FyZE9ialRvRGVsZXRlLmRlbGV0ZUZyb21QYWdlKCkpXG4gICAgICAudGhlbihkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5kZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmVkaXRBdmF0YXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQXZhdGFyRm9ybS5vcGVuKCk7XG59KTtcblxuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGROZXdDYXJkRm9ybS5vcGVuKCk7XG59KTtcblxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcklucHV0ID0gdXNlci5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcm5hbWU7XG4gIHRpdGxlSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcmluZm87XG4gIGFkZFByb2ZpbGVGb3JtLm9wZW4oKTtcblxuICAvL3VzZXIuZ2V0VXNlckluZm8oKTtcblxuICAvL25hbWVJbnB1dC52YWx1ZSA9IG5hbWVUZXh0LnRleHRDb250ZW50O1xuICAvL3RpdGxlSW5wdXQudmFsdWUgPSB0aXRsZVRleHQudGV4dENvbnRlbnQ7XG5cbiAgYWRkUHJvZmlsZUZvcm0uY2xlYXJBbGxFcnJvcnMoKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwiYmFzZVVybCIsImhlYWRlcnMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0SW5pdGlhbENhcmRzIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInN0YXR1cyIsImdldFVzZXJJbmZvIiwicGF0Y2hVc2VyQXZhdGFyIiwiaW5mbyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGF0Y2hVc2VySW5mbyIsImRlbGV0ZUNhcmQiLCJpZCIsInVwbG9hZENhcmQiLCJsaWtlQ2FyZCIsInVuTGlrZUNhcmQiLCJDYXJkIiwiZGF0YSIsInRlbXBsYXRlU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVEZWxldGVDbGljayIsImhhbmRsZUxpa2VDbGljayIsImN1cnJlbnRVc2VyIiwiX2VsZW1lbnQiLCJyZW1vdmUiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZURlbGV0ZUNsaWNrIiwiX2hhbmRsZUxpa2VDbGljayIsIl9jYXJkTmFtZSIsIm5hbWUiLCJfY2FyZExpbmsiLCJsaW5rIiwiX2xpa2VzIiwibGlrZXMiLCJfb3duZXIiLCJvd25lciIsIl9pZCIsIl9jdXJyZW50VXNlciIsIl9jYXJkVGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiX2NhcmRJbWFnZSIsIl9saWtlQnV0dG9uIiwiX2RlbGV0ZUJ1dHRvbiIsIl9kZWxldGVCdXR0b25JbWFnZSIsIl9udW1MaWtlc1RleHQiLCJfaXNMaWtlZEJ5Q3VycmVudFVzZXIiLCJnZXRJZCIsImNyZWF0ZUNhcmRFbGVtZW50IiwidXNlckRhdGEiLCJfZ2V0RWxlbWVudCIsIl9oZWFydCIsIl9zZXRJbWFnZUFuZE5hbWUiLCJfbG9hZExpa2VzIiwiX3NldEV2ZW50TGlzdGVuZXIiLCJmb3JFYWNoIiwibGlrZSIsIl90b2dnbGVMaWtlc0ltYWdlIiwiZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIiLCJjbG9uZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiX2xpa2UiLCJfdG9nZ2xlSXNMaWtlZCIsImNvbnNvbGUiLCJsb2ciLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsInNldExpa2VzIiwibGlrZXNBcnJheSIsInN0eWxlIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJpbnB1dExpc3QiLCJzb21lIiwiaW5wdXRFbGVtZW50IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zZXR0aW5ncyIsIl9mb3JtRWxlbWVudCIsIl9zZXRFdmVudExpc3RlbmVycyIsImJ1dHRvbkVsZW1lbnQiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiYWRkIiwiaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRJZCIsImVycm9yRWwiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckNsYXNzIiwiZW5hYmxlVmFsaWRhdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiY2xlYXJBbGxFcnJvcnMiLCJBcnJheSIsImZyb20iLCJjdXN0b21TZXR0aW5ncyIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsImtleSIsImNsb3NlIiwiX3BvcHVwIiwiX2J1dHRvbiIsIm9wZW4iLCJfaGFuZGxlRXNjQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aENvbmZpcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9jYXJkVG9EZWxldGUiLCJzZXRDYXJkVG9EZWxldGUiLCJjYXJkT2JqIiwiUG9wdXBXaXRoRm9ybSIsIl9idXR0b25UZXh0IiwiX29yaWdpbmFUdGV4dCIsInNldExvYWRpbmdUZXh0IiwiaXNMb2FkaW5nIiwiX29yaWdpbmFsVGV4dCIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfc2V0RGF0YUltYWdlUG9wdXAiLCJpbWFnZVBvcHVwUGljIiwiaW1hZ2VQb3B1cFRleHQiLCJzcmMiLCJhbHQiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zQXJyYXkiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwic2V0SXRlbXMiLCJjbGVhciIsImlubmVySFRNTCIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlckF2YXRhciIsInVzZXJOYW1lRWxlbWVudCIsInVzZXJKb2JFbGVtZW50IiwidXNlckF2YXRhckVsZW1lbnQiLCJzZXRVc2VySW5mbyIsImFib3V0IiwiYXZhdGFyIiwic2V0VXNlckluZm9UZXh0T25seSIsIm5ld09iamVjdCIsImluaXRpYWxDYXJkcyIsImZvcm1TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJNb2RhbCIsImVkaXRBdmF0YXJGb3JtIiwiZWRpdEF2YXRhckJ1dHRvbiIsImF2YXRhckltZyIsIm5hbWVUZXh0IiwidGl0bGVUZXh0IiwibmFtZUlucHV0IiwidGl0bGVJbnB1dCIsImltYWdlTmFtZUlucHV0IiwiaW1hZ2VMaW5rSW5wdXQiLCJpbWFnZVBvcHVwT2JqZWN0IiwiYXV0aG9yaXphdGlvbiIsInJlc3VsdCIsImFwaSIsInVzZXIiLCJjYXJkR3JpZE9iamVjdCIsInJlbmRlckNhcmQiLCJkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0IiwiY2F0Y2giLCJlcnIiLCJjYXJkQ29udGFpbmVyIiwiY2FyZFBvcHVwT2JqZWN0IiwiZGVsZXRlUG9wdXBPYmplY3QiLCJjYXJkT2JqZWN0IiwibmV3Q2FyZCIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwiYWRkSW1hZ2VGb3JtVmFsaWRhdG9yIiwiYWRkQXZhdGFyRm9ybVZhbGlkYXRvciIsImFkZEF2YXRhckZvcm0iLCJ2YWx1ZXMiLCJhZGRQcm9maWxlRm9ybSIsInRpdGxlIiwiYWRkTmV3Q2FyZEZvcm0iLCJuZXdDYXJkSW5mbyIsInNldEJ1dHRvbkluYWN0aXZlIiwic2V0bG9hZGluZ1RleHQiLCJjYXJkT2JqVG9EZWxldGUiLCJkZWxldGVGcm9tUGFnZSIsInVzZXJJbnB1dCIsInVzZXJuYW1lIiwidXNlcmluZm8iXSwic291cmNlUm9vdCI6IiJ9