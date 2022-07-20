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
    this._numLikesText = this._element.querySelector(".card__like-text");
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
editAvatarFormValidator.enableValidator();
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
  editAvatarForm.open();
});
addCardButton.addEventListener("click", () => {
  addNewCardForm.open();
});
editProfileButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  nameInput.value = userInput.username;
  titleInput.value = userInput.userinfo;
  editProfileForm.open(); //user.getUserInfo();
  //nameInput.value = nameText.textContent;
  //titleInput.value = titleText.textContent;

  editProfileForm.clearAllErrors();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2VzIjpbIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWUvYXZhdGFyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VySW5mbyhpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBpIH07XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZGF0YSxcbiAgICB0ZW1wbGF0ZVNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVEZWxldGVDbGljayxcbiAgICBoYW5kbGVMaWtlQ2xpY2ssXG4gICAgY3VycmVudFVzZXJcbiAgKSB7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrID0gaGFuZGxlRGVsZXRlQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICAgIHRoaXMuX2NhcmROYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2NhcmRMaW5rID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX2xpa2VzID0gZGF0YS5saWtlcztcbiAgICB0aGlzLl9vd25lciA9IGRhdGEub3duZXI7XG4gICAgdGhpcy5faWQgPSBkYXRhLmlkO1xuICAgIHRoaXMuX2N1cnJlbnRVc2VyID0gY3VycmVudFVzZXI7XG4gICAgdGhpcy5fY2FyZFRlbXBsYXRlID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRlbXBsYXRlU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIik7XG4gICAgdGhpcy5fZWxlbWVudDtcbiAgICB0aGlzLl9jYXJkSW1hZ2U7XG5cbiAgICB0aGlzLl9saWtlQnV0dG9uO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbjtcbiAgICB0aGlzLl9kZWxldGVCdXR0b25JbWFnZTtcbiAgICB0aGlzLl9udW1MaWtlc1RleHQ7XG4gICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXI7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBjcmVhdGVDYXJkRWxlbWVudCh1c2VyRGF0YSkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KCk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b25JbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLmNhcmRfX2RlbGV0ZS1pbWFnZVwiXG4gICAgKTtcbiAgICB0aGlzLl9oZWFydCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWltYWdlXCIpO1xuXG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtdGV4dFwiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcblxuICAgIGlmICh1c2VyRGF0YS5nZXRVc2VySW5mbygpLm5hbWUgPT09IHRoaXMuX293bmVyLm5hbWUpIHtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZXRlQnV0dG9uLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRJbWFnZUFuZE5hbWUoKTtcbiAgICB0aGlzLl9sb2FkTGlrZXMoKTtcblxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIoKTtcblxuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgdGhpcy5fbGlrZXMuZm9yRWFjaCgobGlrZSkgPT4ge1xuICAgICAgaWYgKGxpa2UuX2lkID09PSB1c2VyRGF0YS5nZXRVc2VySW5mbygpLmlkKSB7XG4gICAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcikge1xuICAgICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIGdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcjtcbiAgfVxuICBfZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiB0aGlzLl9saWtlKGV2dCkpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKClcbiAgICApO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBfdG9nZ2xlSXNMaWtlZCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIF90b2dnbGVMaWtlc0ltYWdlKCkge1xuICAgIHRoaXMuX2hlYXJ0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgfVxuICBfbGlrZShldnQpIHtcbiAgICB0aGlzLl90b2dnbGVMaWtlc0ltYWdlKCk7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKCk7XG4gICAgdGhpcy5fdG9nZ2xlSXNMaWtlZCgpO1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIHNldExpa2VzKGxpa2VzQXJyYXkpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzQXJyYXk7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICB9XG5cbiAgZGVsZXRlRnJvbVBhZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgfTtcblxuICBfbG9hZExpa2VzKCkge1xuICAgIGlmICh0aGlzLl9saWtlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IDA7XG4gICAgfVxuICB9XG4gIF9zZXRJbWFnZUFuZE5hbWUoKSB7XG4gICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5fY2FyZExpbmt9KTtgO1xuICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX2NhcmROYW1lO1xuICB9XG59XG5cbmV4cG9ydCB7IENhcmQgfTtcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG5cbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbGVtZW50LmlkO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xuIiwiY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpOyAvL2Nsb3NlIG9uIGVzY1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlID0gKGV2dCkgPT4ge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQpID0+IHtcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cDtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5cbiAgICB0aGlzLl9jYXJkVG9EZWxldGU7XG4gIH1cblxuICBzZXRDYXJkVG9EZWxldGUoY2FyZE9iaikge1xuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZSA9IGNhcmRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fY2FyZFRvRGVsZXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvblRleHQgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX29yaWdpbmFUdGV4dCA9IHRoaXMuX2J1dHRvblRleHQudGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRMb2FkaW5nVGV4dChpc0xvYWRpbmcpIHtcbiAgICBjb25zb2xlLmxvZyh7IGlzTG9hZGluZyB9KTtcbiAgICBpZiAoaXNMb2FkaW5nID09PSB0cnVlKSB7XG4gICAgICB0aGlzLl9idXR0b25UZXh0LnRleHRDb250ZW50ID0gXCJTYXZpbmcuLi5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX29yaWdpbmFsVGV4dDtcbiAgICB9XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG5cbiAgICBjb25zdCBpbnB1dE9iaiA9IHt9O1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRPYmpbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnB1dE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEZvcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBfc2V0RGF0YUltYWdlUG9wdXAoKSB7XG4gICAgY29uc3QgaW1hZ2VQb3B1cFBpYyA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgY29uc3QgaW1hZ2VQb3B1cFRleHQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgaW1hZ2VQb3B1cFBpYy5zcmMgPSB0aGlzLmxpbms7XG4gICAgaW1hZ2VQb3B1cFRleHQudGV4dENvbnRlbnQgPSB0aGlzLm5hbWU7XG4gICAgaW1hZ2VQb3B1cFBpYy5hbHQgPSB0aGlzLm5hbWU7XG4gIH1cbiAgb3BlbihcbiAgICBkYXRhIC8vZGF0YSBjb250YWlucyBuYW1lIGFuZCBsaW5rLiBzZW50IGhlcmUgYW5kIG5vdCBpbiB0aGUgY29uc3RydWN0b3JcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMubGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9zZXREYXRhSW1hZ2VQb3B1cCgpO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhJbWFnZTtcbiIsImNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcbiIsImNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyB1c2VyTmFtZSwgdXNlckpvYiwgdXNlckF2YXRhciB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyQXZhdGFyKTtcbiAgfVxuICBzZXRVc2VySW5mbyh7IG5hbWUsIGFib3V0LCBhdmF0YXIsIF9pZCB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50LnNyYyA9IGF2YXRhcjtcbiAgICB0aGlzLmlkID0gX2lkO1xuICB9XG5cbiAgc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IGFib3V0O1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgY29uc3QgbmV3T2JqZWN0ID0ge1xuICAgICAgbmFtZTogdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgIH07XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxufVxuXG5leHBvcnQgeyBVc2VySW5mbyB9O1xuIiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiU2Fzc2FmcmFzIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5ODU1OTA2OTM1Mi0zZDg0MzdiMGQ0MmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkFuZ2VsIFRyZWVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjExODU5MzI4MDUzLTNjYmM5ZjkzOTlmND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzI2JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTXlydGxlIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzg1ODc5NzE3NS1iN2RiYTNjNWM4ZmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVGw4ZkcxNWNuUnNaU1V5TUdKbFlXTm9KVEl3YzI5MWRHZ2xNakJqWVhKdmJHbHVZWHhsYm53d2ZId3dmSHclM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJFZGlzdG8gQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ2MTg4OTk0LWZlYTBlY2JiMDRhND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9Njg3JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVGFibGUgUm9jayBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc5MTI2ODk0MzAtMjhkNjYyNGZlNDY3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2NtOW1hV3hsTFhCaFoyVjhOM3g4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ29uZ2FyZWUgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTU2NTMwNTE5NjgtNjljMmIwZTQzMzQ3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGN1c3RvbVNldHRpbmdzID0ge1xuICBmb3JtU2VsZWN0b3I6IFwiLnBvcHVwX19mb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX3NhdmUtYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxuICBwcm9maWxlSW1hZ2VTZWxlY3RvcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuLy9JbXBvcnQgY2xhc3Nlc1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpLmpzXCI7XG5cbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcblxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcblxuaW1wb3J0IHsgY3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHMuanNcIjtcblxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xuXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanNcIjtcblxuLy8gQnV0dG9ucyBhbmQgb3RoZXIgRE9NIGVsZW1lbnRzXG5cbmNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgYWRkQ2FyZFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBhZGRDYXJkRm9ybSA9IGFkZENhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItcG9wdXBcIik7XG5jb25zdCBlZGl0QXZhdGFyRm9ybSA9IGVkaXRBdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYXZhdGFyLWJ1dHRvblwiKTtcbmNvbnN0IGF2YXRhckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpO1xuXG4vLyBGb3JtIGRhdGFcbmNvbnN0IG5hbWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVcIl0nKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJkZXNjcmlwdGlvblwiXScpO1xuY29uc3QgaW1hZ2VOYW1lSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInBsYWNlLW5hbWVcIl0nKTtcbmNvbnN0IGltYWdlTGlua0lucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsaW5rXCJdJyk7XG5cbmNvbnN0IGltYWdlUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmltYWdlUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vL0dyb3VwIElEOiBncm91cC0xMlxuXG5mZXRjaChcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTIvdXNlcnMvbWVcIiwge1xuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgfSxcbn0pXG4gIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICB9KTtcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCB1c2VyID0gbmV3IFVzZXJJbmZvKHtcbiAgdXNlck5hbWU6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICB1c2VySm9iOiBcIi5wcm9maWxlX19pbmZvLXRpdGxlXCIsXG4gIHVzZXJBdmF0YXI6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5cbi8vIGZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0KVxuLy8ge1xuLy8gICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoZGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoKSA9PiB7XG4vLyAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KCk7XG4vLyAgIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbi8vIH1cblxuY29uc3QgY2FyZEdyaWRPYmplY3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBudWxsLFxuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgXCIucGhvdG8tZ3JpZF9fY2FyZHNcIlxuKTtcblxuYXBpXG4gIC5nZXRVc2VySW5mbygpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mbyhkYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAudGhlbigoKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZ2V0SW5pdGlhbENhcmRzKClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3Quc2V0SXRlbXMocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3QucmVuZGVySXRlbXMoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdCwgZGVsZXRlUG9wdXBPYmplY3QpIHtcbiAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Quc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmplY3QpO1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Qub3BlbigpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGNhcmRPYmplY3QuZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIoKSA9PSBmYWxzZSkge1xuICAgICAgICBhcGlcbiAgICAgICAgICAubGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLnVuTGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXNlclxuICApO1xuXG4gIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KHVzZXIpO1xuICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG59XG5cbi8vIGNvbnN0IGZvcm1FbGVtZW50c0xpc3QgPSBBcnJheS5mcm9tKFxuLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmZvcm1TZWxlY3Rvcilcbi8vICk7XG5cbi8vIGNvbnN0IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0ID0gZm9ybUVsZW1lbnRzTGlzdC5tYXAoKGZvcm0pID0+IHtcbi8vICAgY29uc3QgZm9ybU9iamVjdCA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBmb3JtKTtcbi8vICAgZm9ybU9iamVjdC5lbmFibGVWYWxpZGF0aW9uKCk7XG4vLyAgIHJldHVybiBmb3JtT2JqZWN0O1xuLy8gfSk7XG5cbi8vIGNvbnN0IGVkaXRQcm9maWxlRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4vLyAgIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGRlc2NyaXB0aW9uXCJcbi8vICk7XG5cbi8vIGNvbnN0IGFkZENhcmRGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbi8vICAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kbGlua1wiXG4vLyApO1xuXG4vLyBjb25zdCBlZGl0QXZhdGFyRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4vLyAgIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwiYXZhdGFyZm9ybVwiXG4vLyApO1xuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgY3VzdG9tU2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlRm9ybVxuKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkSW1hZ2VGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGFkZENhcmRGb3JtKTtcbmFkZEltYWdlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZEF2YXRhckZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgY3VzdG9tU2V0dGluZ3MsXG4gIGVkaXRBdmF0YXJGb3JtXG4pO1xuZWRpdEF2YXRhckZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5cbmNvbnN0IGFkZEF2YXRhckZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNhdmF0YXItcG9wdXBcIiwgKHZhbHVlcykgPT4ge1xuICBhdmF0YXJJbWcuc3JjID0gdmFsdWVzLmF2YXRhcjtcbiAgYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnBhdGNoVXNlckF2YXRhcih2YWx1ZXMpXG4gICAgLnRoZW4oYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5jbG9zZSgpKVxuICAgIC50aGVuKGFkZEF2YXRhckZvcm1WYWxpZGF0b3Iuc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRBdmF0YXJGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZFByb2ZpbGVGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjZWRpdC1wb3B1cFwiLCAodmFsdWVzKSA9PiB7XG4gIHVzZXIuc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWU6IHZhbHVlcy5uYW1lLCBhYm91dDogdmFsdWVzLnRpdGxlIH0pO1xuICBhZGRQcm9maWxlRm9ybS5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnBhdGNoVXNlckluZm8odXNlci5nZXRVc2VySW5mbygpKVxuICAgIC50aGVuKGFkZFByb2ZpbGVGb3JtLmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkUHJvZmlsZUZvcm0uc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRQcm9maWxlRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoKSA9PiB7XG4gIGNvbnN0IG5ld0NhcmRJbmZvID0ge1xuICAgIG5hbWU6IGltYWdlTmFtZUlucHV0LnZhbHVlLFxuICAgIGxpbms6IGltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIGxpa2VzOiBbXSxcbiAgICBvd25lcjogdXNlci5nZXRVc2VySW5mbygpLFxuICB9O1xuXG4gIGFkZENhcmRGb3JtLnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAudXBsb2FkQ2FyZChuZXdDYXJkSW5mbylcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBkYXRhIH0pO1xuXG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgbmV3Q2FyZEluZm8sXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSlcblxuICAgIC50aGVuKGFkZENhcmRGb3JtLnJlc2V0KCkpXG4gICAgLnRoZW4oYWRkSW1hZ2VGb3JtVmFsaWRhdG9yLnNldEJ1dHRvbkluYWN0aXZlKCkpXG4gICAgLnRoZW4oYWRkTmV3Q2FyZEZvcm0uY2xvc2UoKSlcbiAgICAudGhlbihhZGROZXdDYXJkRm9ybS5zZXRsb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZE5ld0NhcmRGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcbiAgXCIjZGVsZXRlLXBvcHVwXCIsXG4gIChjYXJkT2JqVG9EZWxldGUpID0+IHtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmRPYmpUb0RlbGV0ZS5nZXRJZCgpKVxuICAgICAgLnRoZW4oY2FyZE9ialRvRGVsZXRlLmRlbGV0ZUZyb21QYWdlKCkpXG4gICAgICAudGhlbihkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5kZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmVkaXRBdmF0YXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZWRpdEF2YXRhckZvcm0ub3BlbigpO1xufSk7XG5cbmFkZENhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkTmV3Q2FyZEZvcm0ub3BlbigpO1xufSk7XG5cbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXIuZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJuYW1lO1xuICB0aXRsZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJpbmZvO1xuICBlZGl0UHJvZmlsZUZvcm0ub3BlbigpO1xuXG4gIC8vdXNlci5nZXRVc2VySW5mbygpO1xuXG4gIC8vbmFtZUlucHV0LnZhbHVlID0gbmFtZVRleHQudGV4dENvbnRlbnQ7XG4gIC8vdGl0bGVJbnB1dC52YWx1ZSA9IHRpdGxlVGV4dC50ZXh0Q29udGVudDtcblxuICBlZGl0UHJvZmlsZUZvcm0uY2xlYXJBbGxFcnJvcnMoKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwiYmFzZVVybCIsImhlYWRlcnMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0SW5pdGlhbENhcmRzIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInN0YXR1cyIsImdldFVzZXJJbmZvIiwicGF0Y2hVc2VyQXZhdGFyIiwiaW5mbyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGF0Y2hVc2VySW5mbyIsImRlbGV0ZUNhcmQiLCJpZCIsInVwbG9hZENhcmQiLCJsaWtlQ2FyZCIsInVuTGlrZUNhcmQiLCJDYXJkIiwiZGF0YSIsInRlbXBsYXRlU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVEZWxldGVDbGljayIsImhhbmRsZUxpa2VDbGljayIsImN1cnJlbnRVc2VyIiwiX2VsZW1lbnQiLCJyZW1vdmUiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZURlbGV0ZUNsaWNrIiwiX2hhbmRsZUxpa2VDbGljayIsIl9jYXJkTmFtZSIsIm5hbWUiLCJfY2FyZExpbmsiLCJsaW5rIiwiX2xpa2VzIiwibGlrZXMiLCJfb3duZXIiLCJvd25lciIsIl9pZCIsIl9jdXJyZW50VXNlciIsIl9jYXJkVGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiX2NhcmRJbWFnZSIsIl9saWtlQnV0dG9uIiwiX2RlbGV0ZUJ1dHRvbiIsIl9kZWxldGVCdXR0b25JbWFnZSIsIl9udW1MaWtlc1RleHQiLCJfaXNMaWtlZEJ5Q3VycmVudFVzZXIiLCJnZXRJZCIsImNyZWF0ZUNhcmRFbGVtZW50IiwidXNlckRhdGEiLCJfZ2V0RWxlbWVudCIsIl9oZWFydCIsIl9zZXRJbWFnZUFuZE5hbWUiLCJfbG9hZExpa2VzIiwiX3NldEV2ZW50TGlzdGVuZXIiLCJmb3JFYWNoIiwibGlrZSIsIl90b2dnbGVMaWtlc0ltYWdlIiwiZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIiLCJjbG9uZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiX2xpa2UiLCJfdG9nZ2xlSXNMaWtlZCIsImNvbnNvbGUiLCJsb2ciLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsInNldExpa2VzIiwibGlrZXNBcnJheSIsInN0eWxlIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJpbnB1dExpc3QiLCJzb21lIiwiaW5wdXRFbGVtZW50IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zZXR0aW5ncyIsIl9mb3JtRWxlbWVudCIsIl9zZXRFdmVudExpc3RlbmVycyIsImJ1dHRvbkVsZW1lbnQiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX3Nob3dJbnB1dEVycm9yIiwiX2hpZGVJbnB1dEVycm9yIiwiX2hhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkIiwiYWRkIiwiaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRJZCIsImVycm9yRWwiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckNsYXNzIiwiZW5hYmxlVmFsaWRhdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsInByZXZlbnREZWZhdWx0IiwicmVzZXRWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwia2V5IiwiY2xvc2UiLCJfcG9wdXAiLCJfYnV0dG9uIiwib3BlbiIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9mb3JtIiwiX2NhcmRUb0RlbGV0ZSIsInNldENhcmRUb0RlbGV0ZSIsImNhcmRPYmoiLCJQb3B1cFdpdGhGb3JtIiwiX2J1dHRvblRleHQiLCJfb3JpZ2luYVR0ZXh0Iiwic2V0TG9hZGluZ1RleHQiLCJpc0xvYWRpbmciLCJfb3JpZ2luYWxUZXh0IiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRzIiwiaW5wdXRPYmoiLCJpbnB1dCIsInZhbHVlIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9zZXREYXRhSW1hZ2VQb3B1cCIsImltYWdlUG9wdXBQaWMiLCJpbWFnZVBvcHVwVGV4dCIsInNyYyIsImFsdCIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXNBcnJheSIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJzZXRJdGVtcyIsImNsZWFyIiwiaW5uZXJIVE1MIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJ1c2VyQXZhdGFyIiwidXNlck5hbWVFbGVtZW50IiwidXNlckpvYkVsZW1lbnQiLCJ1c2VyQXZhdGFyRWxlbWVudCIsInNldFVzZXJJbmZvIiwiYWJvdXQiLCJhdmF0YXIiLCJzZXRVc2VySW5mb1RleHRPbmx5IiwibmV3T2JqZWN0IiwiaW5pdGlhbENhcmRzIiwiY3VzdG9tU2V0dGluZ3MiLCJmb3JtU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwicHJvZmlsZUltYWdlU2VsZWN0b3IiLCJlZGl0UHJvZmlsZUJ1dHRvbiIsImVkaXRQcm9maWxlTW9kYWwiLCJlZGl0UHJvZmlsZUZvcm0iLCJhZGRDYXJkQnV0dG9uIiwiYWRkQ2FyZFBvcHVwIiwiYWRkQ2FyZEZvcm0iLCJlZGl0QXZhdGFyTW9kYWwiLCJlZGl0QXZhdGFyRm9ybSIsImVkaXRBdmF0YXJCdXR0b24iLCJhdmF0YXJJbWciLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwiaW1hZ2VQb3B1cE9iamVjdCIsImF1dGhvcml6YXRpb24iLCJyZXN1bHQiLCJhcGkiLCJ1c2VyIiwiY2FyZEdyaWRPYmplY3QiLCJyZW5kZXJDYXJkIiwiZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCIsImNhdGNoIiwiZXJyIiwiY2FyZENvbnRhaW5lciIsImNhcmRQb3B1cE9iamVjdCIsImRlbGV0ZVBvcHVwT2JqZWN0IiwiY2FyZE9iamVjdCIsIm5ld0NhcmQiLCJhZGRQcm9maWxlRm9ybVZhbGlkYXRvciIsImFkZEltYWdlRm9ybVZhbGlkYXRvciIsImFkZEF2YXRhckZvcm1WYWxpZGF0b3IiLCJlZGl0QXZhdGFyRm9ybVZhbGlkYXRvciIsImFkZEF2YXRhckZvcm0iLCJ2YWx1ZXMiLCJhZGRQcm9maWxlRm9ybSIsInRpdGxlIiwiYWRkTmV3Q2FyZEZvcm0iLCJuZXdDYXJkSW5mbyIsInNldEJ1dHRvbkluYWN0aXZlIiwic2V0bG9hZGluZ1RleHQiLCJjYXJkT2JqVG9EZWxldGUiLCJkZWxldGVGcm9tUGFnZSIsInVzZXJJbnB1dCIsInVzZXJuYW1lIiwidXNlcmluZm8iLCJjbGVhckFsbEVycm9ycyJdLCJzb3VyY2VSb290IjoiIn0=