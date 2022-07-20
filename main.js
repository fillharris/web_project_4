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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhdGNoVXNlckF2YXRhcihpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZS9hdmF0YXJcIiwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJJbmZvKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIHVwbG9hZENhcmQoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBsaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICB1bkxpa2VDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9saWtlcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBBcGkgfTtcbiIsImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhLFxuICAgIHRlbXBsYXRlU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZURlbGV0ZUNsaWNrLFxuICAgIGhhbmRsZUxpa2VDbGljayxcbiAgICBjdXJyZW50VXNlclxuICApIHtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlRGVsZXRlQ2xpY2sgPSBoYW5kbGVEZWxldGVDbGljaztcbiAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sgPSBoYW5kbGVMaWtlQ2xpY2s7XG4gICAgdGhpcy5fY2FyZE5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fY2FyZExpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fbGlrZXMgPSBkYXRhLmxpa2VzO1xuICAgIHRoaXMuX293bmVyID0gZGF0YS5vd25lcjtcbiAgICB0aGlzLl9pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5fY3VycmVudFVzZXIgPSBjdXJyZW50VXNlcjtcbiAgICB0aGlzLl9jYXJkVGVtcGxhdGUgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGVtcGxhdGVTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcbiAgICB0aGlzLl9lbGVtZW50O1xuICAgIHRoaXMuX2NhcmRJbWFnZTtcblxuICAgIHRoaXMuX2xpa2VCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbkltYWdlO1xuICAgIHRoaXMuX251bUxpa2VzVGV4dDtcbiAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcjtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIGNyZWF0ZUNhcmRFbGVtZW50KHVzZXJEYXRhKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnQoKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbkltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuY2FyZF9fZGVsZXRlLWltYWdlXCJcbiAgICApO1xuICAgIHRoaXMuX2hlYXJ0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtaW1hZ2VcIik7XG5cbiAgICB0aGlzLl9udW1MaWtlc1RleHQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS10ZXh0XCIpO1xuXG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuXG4gICAgaWYgKHVzZXJEYXRhLmdldFVzZXJJbmZvKCkubmFtZSA9PT0gdGhpcy5fb3duZXIubmFtZSkge1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kZWxldGVCdXR0b24ucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMuX3NldEltYWdlQW5kTmFtZSgpO1xuICAgIHRoaXMuX2xvYWRMaWtlcygpO1xuXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcigpO1xuXG4gICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9saWtlcy5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgICBpZiAobGlrZS5faWQgPT09IHVzZXJEYXRhLmdldFVzZXJJbmZvKCkuaWQpIHtcbiAgICAgICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyKSB7XG4gICAgICB0aGlzLl90b2dnbGVMaWtlc0ltYWdlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG5cbiAgZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyO1xuICB9XG4gIF9nZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIF9zZXRFdmVudExpc3RlbmVyKCkge1xuICAgIHRoaXMuX2xpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IHRoaXMuX2xpa2UoZXZ0KSk7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5faGFuZGxlRGVsZXRlQ2xpY2soKVxuICAgICk7XG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIF90b2dnbGVJc0xpa2VkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyKTtcbiAgICBpZiAodGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpO1xuICB9XG5cbiAgX3RvZ2dsZUxpa2VzSW1hZ2UoKSB7XG4gICAgdGhpcy5faGVhcnQuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2VfYWN0aXZlXCIpO1xuICB9XG4gIF9saWtlKGV2dCkge1xuICAgIHRoaXMuX3RvZ2dsZUxpa2VzSW1hZ2UoKTtcbiAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2soKTtcbiAgICB0aGlzLl90b2dnbGVJc0xpa2VkKCk7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICB9XG5cbiAgc2V0TGlrZXMobGlrZXNBcnJheSkge1xuICAgIHRoaXMuX2xpa2VzID0gbGlrZXNBcnJheTtcbiAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gIH1cblxuICBkZWxldGVGcm9tUGFnZSA9ICgpID0+IHtcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICB9O1xuXG4gIF9sb2FkTGlrZXMoKSB7XG4gICAgaWYgKHRoaXMuX2xpa2VzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gMDtcbiAgICB9XG4gIH1cbiAgX3NldEltYWdlQW5kTmFtZSgpIHtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTp1cmwoJHt0aGlzLl9jYXJkTGlua30pO2A7XG4gICAgdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGhpcy5fY2FyZE5hbWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ2FyZCB9O1xuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWxlbWVudCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xuICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBfaGFzSW52YWxpZElucHV0ID0gKGlucHV0TGlzdCkgPT5cbiAgICBpbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKTtcblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcblxuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsZW1lbnQuaWQ7XG5cbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWxlbWVudC5pZDtcbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRvcigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG5cbiAgICB0aGlzLl9mb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7IC8vY2xvc2Ugb24gZXNjXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXBfb3BlblwiKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PiB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXBcIikpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcblxuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZTtcbiAgfVxuXG4gIHNldENhcmRUb0RlbGV0ZShjYXJkT2JqKSB7XG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlID0gY2FyZE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9jYXJkVG9EZWxldGUpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5jbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gICAgdGhpcy5fYnV0dG9uVGV4dCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fc2F2ZS1idXR0b25cIik7XG4gICAgdGhpcy5fb3JpZ2luYVR0ZXh0ID0gdGhpcy5fYnV0dG9uVGV4dC50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldExvYWRpbmdUZXh0KGlzTG9hZGluZykge1xuICAgIGNvbnNvbGUubG9nKHsgaXNMb2FkaW5nIH0pO1xuICAgIGlmIChpc0xvYWRpbmcgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX2J1dHRvblRleHQudGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b25UZXh0LnRleHRDb250ZW50ID0gdGhpcy5fb3JpZ2luYWxUZXh0O1xuICAgIH1cbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcblxuICAgIGNvbnN0IGlucHV0T2JqID0ge307XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dE9ialtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlucHV0T2JqO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoRm9ybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5jbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICB9XG4gIF9zZXREYXRhSW1hZ2VQb3B1cCgpIHtcbiAgICBjb25zdCBpbWFnZVBvcHVwUGljID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICBjb25zdCBpbWFnZVBvcHVwVGV4dCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBpbWFnZVBvcHVwUGljLnNyYyA9IHRoaXMubGluaztcbiAgICBpbWFnZVBvcHVwVGV4dC50ZXh0Q29udGVudCA9IHRoaXMubmFtZTtcbiAgICBpbWFnZVBvcHVwUGljLmFsdCA9IHRoaXMubmFtZTtcbiAgfVxuICBvcGVuKFxuICAgIGRhdGEgLy9kYXRhIGNvbnRhaW5zIG5hbWUgYW5kIGxpbmsuIHNlbnQgaGVyZSBhbmQgbm90IGluIHRoZSBjb25zdHJ1Y3RvclxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5saW5rID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX3NldERhdGFJbWFnZVBvcHVwKCk7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEltYWdlO1xuIiwiY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICBzZXRJdGVtcyhpdGVtcykge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uO1xuIiwiY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IHVzZXJOYW1lLCB1c2VySm9iLCB1c2VyQXZhdGFyIH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlck5hbWUpO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJKb2IpO1xuICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJBdmF0YXIpO1xuICB9XG4gIHNldFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQsIGF2YXRhciwgX2lkIH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IGFib3V0O1xuICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQuc3JjID0gYXZhdGFyO1xuICAgIHRoaXMuaWQgPSBfaWQ7XG4gIH1cblxuICBzZXRVc2VySW5mb1RleHRPbmx5KHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIGFib3V0OiB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG59XG5cbmV4cG9ydCB7IFVzZXJJbmZvIH07XG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xuICB7XG4gICAgbmFtZTogXCJTYXNzYWZyYXMgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4NTU5MDY5MzUyLTNkODQzN2IwZDQyYz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQW5nZWwgVHJlZVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTE4NTkzMjgwNTMtM2NiYzlmOTM5OWY0P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MjYmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJNeXJ0bGUgQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3ODU4Nzk3MTc1LWI3ZGJhM2M1YzhmYz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UbDhmRzE1Y25Sc1pTVXlNR0psWVdOb0pUSXdjMjkxZEdnbE1qQmpZWEp2YkdsdVlYeGxibnd3Zkh3d2ZIdyUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkVkaXN0byBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDYxODg5OTQtZmVhMGVjYmIwNGE0P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz02ODcmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUYWJsZSBSb2NrIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzkxMjY4OTQzMC0yOGQ2NjI0ZmU0Njc/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3Y205bWFXeGxMWEJoWjJWOE4zeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJDb25nYXJlZSBOYXRpb25hbCBQYXJrXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNTY1MzA1MTk2OC02OWMyYjBlNDMzNDc/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgY3VzdG9tU2V0dGluZ3MgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIucG9wdXBfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fc2F2ZS1idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJwb3B1cF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG4gIHByb2ZpbGVJbWFnZVNlbGVjdG9yOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vL0ltcG9ydCBjbGFzc2VzXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGkuanNcIjtcblxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xuXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuXG5pbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50cy5qc1wiO1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5cbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qc1wiO1xuXG4vLyBCdXR0b25zIGFuZCBvdGhlciBET00gZWxlbWVudHNcblxuY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1wb3B1cFwiKTtcbmNvbnN0IGVkaXRBdmF0YXJGb3JtID0gZWRpdEF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hdmF0YXItYnV0dG9uXCIpO1xuY29uc3QgYXZhdGFySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5cbi8vIEZvcm0gZGF0YVxuY29uc3QgbmFtZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpO1xuY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpO1xuY29uc3QgdGl0bGVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XG5jb25zdCBpbWFnZU5hbWVJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGxhY2UtbmFtZVwiXScpO1xuY29uc3QgaW1hZ2VMaW5rSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImxpbmtcIl0nKTtcblxuY29uc3QgaW1hZ2VQb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuaW1hZ2VQb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vL1Rva2VuIGFuZCBJRCBpbmZvXG4vL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbmZldGNoKFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMi91c2Vycy9tZVwiLCB7XG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICB9LFxufSlcbiAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gIH0pO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlckluZm8oe1xuICB1c2VyTmFtZTogXCIucHJvZmlsZV9faW5mby1uYW1lXCIsXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgdXNlckF2YXRhcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcblxuLy8gZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QpXG4vLyB7XG4vLyAgIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChkYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcbi8vICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbi8vICAgfSk7XG5cbi8vICAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQoKTtcbi8vICAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xuLy8gfVxuXG5jb25zdCBjYXJkR3JpZE9iamVjdCA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgaXRlbXM6IG51bGwsXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBcIi5waG90by1ncmlkX19jYXJkc1wiXG4pO1xuXG5hcGlcbiAgLmdldFVzZXJJbmZvKClcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICB1c2VyLnNldFVzZXJJbmZvKGRhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG4gIC50aGVuKCgpID0+IHtcbiAgICBhcGlcbiAgICAgIC5nZXRJbml0aWFsQ2FyZHMoKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5zZXRJdGVtcyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5yZW5kZXJJdGVtcygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0LCBkZWxldGVQb3B1cE9iamVjdCkge1xuICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5zZXRDYXJkVG9EZWxldGUoY2FyZE9iamVjdCk7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5vcGVuKCk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoY2FyZE9iamVjdC5nZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpID09IGZhbHNlKSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5saWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlcbiAgICAgICAgICAudW5MaWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1c2VyXG4gICk7XG5cbiAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQodXNlcik7XG4gIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbn1cblxuLy8gY29uc3QgZm9ybUVsZW1lbnRzTGlzdCA9IEFycmF5LmZyb20oXG4vLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY3VzdG9tU2V0dGluZ3MuZm9ybVNlbGVjdG9yKVxuLy8gKTtcblxuLy8gY29uc3QgZm9ybVZhbGlkYXRvck9iamVjdExpc3QgPSBmb3JtRWxlbWVudHNMaXN0Lm1hcCgoZm9ybSkgPT4ge1xuLy8gICBjb25zdCBmb3JtT2JqZWN0ID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGZvcm0pO1xuLy8gICBmb3JtT2JqZWN0LmVuYWJsZVZhbGlkYXRpb24oKTtcbi8vICAgcmV0dXJuIGZvcm1PYmplY3Q7XG4vLyB9KTtcblxuLy8gY29uc3QgZWRpdFByb2ZpbGVGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbi8vICAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kZGVzY3JpcHRpb25cIlxuLy8gKTtcblxuLy8gY29uc3QgYWRkQ2FyZEZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuLy8gICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRsaW5rXCJcbi8vICk7XG5cbi8vIGNvbnN0IGVkaXRBdmF0YXJGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbi8vICAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJhdmF0YXJmb3JtXCJcbi8vICk7XG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBjdXN0b21TZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVGb3JtXG4pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRJbWFnZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjdXN0b21TZXR0aW5ncywgYWRkQ2FyZEZvcm0pO1xuYWRkSW1hZ2VGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkQXZhdGFyRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBjdXN0b21TZXR0aW5ncyxcbiAgZWRpdEF2YXRhckZvcm1cbik7XG5hZGRBdmF0YXJGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5jb25zdCBhZGRBdmF0YXJGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjYXZhdGFyLXBvcHVwXCIsICh2YWx1ZXMpID0+IHtcbiAgYXZhdGFySW1nLnNyYyA9IHZhbHVlcy5hdmF0YXI7XG4gIGFkZEF2YXRhckZvcm1WYWxpZGF0b3Iuc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC5wYXRjaFVzZXJBdmF0YXIodmFsdWVzKVxuICAgIC50aGVuKGFkZEF2YXRhckZvcm1WYWxpZGF0b3IuY2xvc2UoKSlcbiAgICAudGhlbihhZGRBdmF0YXJGb3JtVmFsaWRhdG9yLnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkQXZhdGFyRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGRQcm9maWxlRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKHZhbHVlcykgPT4ge1xuICB1c2VyLnNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lOiB2YWx1ZXMubmFtZSwgYWJvdXQ6IHZhbHVlcy50aXRsZSB9KTtcbiAgYWRkUHJvZmlsZUZvcm0uc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC5wYXRjaFVzZXJJbmZvKHVzZXIuZ2V0VXNlckluZm8oKSlcbiAgICAudGhlbihhZGRQcm9maWxlRm9ybS5jbG9zZSgpKVxuICAgIC50aGVuKGFkZFByb2ZpbGVGb3JtLnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkUHJvZmlsZUZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkTmV3Q2FyZEZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKCkgPT4ge1xuICBjb25zdCBuZXdDYXJkSW5mbyA9IHtcbiAgICBuYW1lOiBpbWFnZU5hbWVJbnB1dC52YWx1ZSxcbiAgICBsaW5rOiBpbWFnZUxpbmtJbnB1dC52YWx1ZSxcbiAgICBsaWtlczogW10sXG4gICAgb3duZXI6IHVzZXIuZ2V0VXNlckluZm8oKSxcbiAgfTtcblxuICBhZGRDYXJkRm9ybS5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnVwbG9hZENhcmQobmV3Q2FyZEluZm8pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZGF0YSB9KTtcblxuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIG5ld0NhcmRJbmZvLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0pXG5cbiAgICAudGhlbihhZGRDYXJkRm9ybS5yZXNldCgpKVxuICAgIC50aGVuKGFkZEltYWdlRm9ybVZhbGlkYXRvci5zZXRCdXR0b25JbmFjdGl2ZSgpKVxuICAgIC50aGVuKGFkZE5ld0NhcmRGb3JtLmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkTmV3Q2FyZEZvcm0uc2V0bG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGROZXdDYXJkRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXG4gIFwiI2RlbGV0ZS1wb3B1cFwiLFxuICAoY2FyZE9ialRvRGVsZXRlKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkT2JqVG9EZWxldGUuZ2V0SWQoKSlcbiAgICAgIC50aGVuKGNhcmRPYmpUb0RlbGV0ZS5kZWxldGVGcm9tUGFnZSgpKVxuICAgICAgLnRoZW4oZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5lZGl0QXZhdGFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGVkaXRBdmF0YXJGb3JtLm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZE5ld0NhcmRGb3JtLm9wZW4oKTtcbn0pO1xuXG5lZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCB1c2VySW5wdXQgPSB1c2VyLmdldFVzZXJJbmZvKCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHVzZXJJbnB1dC51c2VybmFtZTtcbiAgdGl0bGVJbnB1dC52YWx1ZSA9IHVzZXJJbnB1dC51c2VyaW5mbztcbiAgZWRpdFByb2ZpbGVGb3JtLm9wZW4oKTtcblxuICAvL3VzZXIuZ2V0VXNlckluZm8oKTtcblxuICAvL25hbWVJbnB1dC52YWx1ZSA9IG5hbWVUZXh0LnRleHRDb250ZW50O1xuICAvL3RpdGxlSW5wdXQudmFsdWUgPSB0aXRsZVRleHQudGV4dENvbnRlbnQ7XG5cbiAgZWRpdFByb2ZpbGVGb3JtLmNsZWFyQWxsRXJyb3JzKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRVc2VySW5mbyIsInBhdGNoVXNlckF2YXRhciIsImluZm8iLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGNoVXNlckluZm8iLCJkZWxldGVDYXJkIiwiaWQiLCJ1cGxvYWRDYXJkIiwibGlrZUNhcmQiLCJ1bkxpa2VDYXJkIiwiQ2FyZCIsImRhdGEiLCJ0ZW1wbGF0ZVNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJoYW5kbGVMaWtlQ2xpY2siLCJjdXJyZW50VXNlciIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVEZWxldGVDbGljayIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfY2FyZE5hbWUiLCJuYW1lIiwiX2NhcmRMaW5rIiwibGluayIsIl9saWtlcyIsImxpa2VzIiwiX293bmVyIiwib3duZXIiLCJfaWQiLCJfY3VycmVudFVzZXIiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9jYXJkSW1hZ2UiLCJfbGlrZUJ1dHRvbiIsIl9kZWxldGVCdXR0b24iLCJfZGVsZXRlQnV0dG9uSW1hZ2UiLCJfbnVtTGlrZXNUZXh0IiwiX2lzTGlrZWRCeUN1cnJlbnRVc2VyIiwiZ2V0SWQiLCJjcmVhdGVDYXJkRWxlbWVudCIsInVzZXJEYXRhIiwiX2dldEVsZW1lbnQiLCJfaGVhcnQiLCJfc2V0SW1hZ2VBbmROYW1lIiwiX2xvYWRMaWtlcyIsIl9zZXRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImxpa2UiLCJfdG9nZ2xlTGlrZXNJbWFnZSIsImdldElzTGlrZWRCeUN1cnJlbnRVc2VyIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsIl9saWtlIiwiX3RvZ2dsZUlzTGlrZWQiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJzZXRMaWtlcyIsImxpa2VzQXJyYXkiLCJzdHlsZSIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwiaW5wdXRMaXN0Iiwic29tZSIsImlucHV0RWxlbWVudCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsZW1lbnQiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJidXR0b25FbGVtZW50IiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImFkZCIsImlucHV0RXJyb3JDbGFzcyIsImlucHV0SWQiLCJlcnJvckVsIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsImtleSIsImNsb3NlIiwiX3BvcHVwIiwiX2J1dHRvbiIsIm9wZW4iLCJfaGFuZGxlRXNjQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aENvbmZpcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9jYXJkVG9EZWxldGUiLCJzZXRDYXJkVG9EZWxldGUiLCJjYXJkT2JqIiwiUG9wdXBXaXRoRm9ybSIsIl9idXR0b25UZXh0IiwiX29yaWdpbmFUdGV4dCIsInNldExvYWRpbmdUZXh0IiwiaXNMb2FkaW5nIiwiX29yaWdpbmFsVGV4dCIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfc2V0RGF0YUltYWdlUG9wdXAiLCJpbWFnZVBvcHVwUGljIiwiaW1hZ2VQb3B1cFRleHQiLCJzcmMiLCJhbHQiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zQXJyYXkiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwic2V0SXRlbXMiLCJjbGVhciIsImlubmVySFRNTCIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlckF2YXRhciIsInVzZXJOYW1lRWxlbWVudCIsInVzZXJKb2JFbGVtZW50IiwidXNlckF2YXRhckVsZW1lbnQiLCJzZXRVc2VySW5mbyIsImFib3V0IiwiYXZhdGFyIiwic2V0VXNlckluZm9UZXh0T25seSIsIm5ld09iamVjdCIsImluaXRpYWxDYXJkcyIsImN1c3RvbVNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsInByb2ZpbGVJbWFnZVNlbGVjdG9yIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkQ2FyZEJ1dHRvbiIsImFkZENhcmRQb3B1cCIsImFkZENhcmRGb3JtIiwiZWRpdEF2YXRhck1vZGFsIiwiZWRpdEF2YXRhckZvcm0iLCJlZGl0QXZhdGFyQnV0dG9uIiwiYXZhdGFySW1nIiwibmFtZVRleHQiLCJ0aXRsZVRleHQiLCJuYW1lSW5wdXQiLCJ0aXRsZUlucHV0IiwiaW1hZ2VOYW1lSW5wdXQiLCJpbWFnZUxpbmtJbnB1dCIsImltYWdlUG9wdXBPYmplY3QiLCJhdXRob3JpemF0aW9uIiwicmVzdWx0IiwiYXBpIiwidXNlciIsImNhcmRHcmlkT2JqZWN0IiwicmVuZGVyQ2FyZCIsImRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QiLCJjYXRjaCIsImVyciIsImNhcmRDb250YWluZXIiLCJjYXJkUG9wdXBPYmplY3QiLCJkZWxldGVQb3B1cE9iamVjdCIsImNhcmRPYmplY3QiLCJuZXdDYXJkIiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJhZGRJbWFnZUZvcm1WYWxpZGF0b3IiLCJhZGRBdmF0YXJGb3JtVmFsaWRhdG9yIiwiYWRkQXZhdGFyRm9ybSIsInZhbHVlcyIsImFkZFByb2ZpbGVGb3JtIiwidGl0bGUiLCJhZGROZXdDYXJkRm9ybSIsIm5ld0NhcmRJbmZvIiwic2V0QnV0dG9uSW5hY3RpdmUiLCJzZXRsb2FkaW5nVGV4dCIsImNhcmRPYmpUb0RlbGV0ZSIsImRlbGV0ZUZyb21QYWdlIiwidXNlcklucHV0IiwidXNlcm5hbWUiLCJ1c2VyaW5mbyIsImNsZWFyQWxsRXJyb3JzIl0sInNvdXJjZVJvb3QiOiIifQ==