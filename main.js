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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih7IGJhc2VVcmwsIGhlYWRlcnMgfSkge1xuICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHNcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lXCIsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VyQXZhdGFyKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lL2F2YXRhclwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIHBhdGNoVXNlckluZm8oaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgdXBsb2FkQ2FyZChpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxpa2VDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9saWtlcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVuTGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEFwaSB9O1xuIiwiY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGRhdGEsXG4gICAgdGVtcGxhdGVTZWxlY3RvcixcbiAgICBoYW5kbGVDYXJkQ2xpY2ssXG4gICAgaGFuZGxlRGVsZXRlQ2xpY2ssXG4gICAgaGFuZGxlTGlrZUNsaWNrLFxuICAgIGN1cnJlbnRVc2VyXG4gICkge1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVEZWxldGVDbGljayA9IGhhbmRsZURlbGV0ZUNsaWNrO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljayA9IGhhbmRsZUxpa2VDbGljaztcbiAgICB0aGlzLl9jYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9jYXJkTGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fb3duZXIgPSBkYXRhLm93bmVyO1xuICAgIHRoaXMuX2lkID0gZGF0YS5pZDtcbiAgICB0aGlzLl9jdXJyZW50VXNlciA9IGN1cnJlbnRVc2VyO1xuICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgIHRoaXMuX2VsZW1lbnQ7XG4gICAgdGhpcy5fY2FyZEltYWdlO1xuXG4gICAgdGhpcy5fbGlrZUJ1dHRvbjtcbiAgICB0aGlzLl9kZWxldGVCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2U7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0O1xuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgY3JlYXRlQ2FyZEVsZW1lbnQodXNlckRhdGEpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jYXJkX19kZWxldGUtaW1hZ2VcIlxuICAgICk7XG4gICAgdGhpcy5faGVhcnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1pbWFnZVwiKTtcblxuICAgIHRoaXMuX251bUxpa2VzVGV4dCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcblxuICAgIGlmICh1c2VyRGF0YS5nZXRVc2VySW5mbygpLm5hbWUgPT09IHRoaXMuX293bmVyLm5hbWUpIHtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZXRlQnV0dG9uLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRJbWFnZUFuZE5hbWUoKTtcbiAgICB0aGlzLl9sb2FkTGlrZXMoKTtcblxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIoKTtcblxuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgdGhpcy5fbGlrZXMuZm9yRWFjaCgobGlrZSkgPT4ge1xuICAgICAgaWYgKGxpa2UuX2lkID09PSB1c2VyRGF0YS5nZXRVc2VySW5mbygpLmlkKSB7XG4gICAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcikge1xuICAgICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIGdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcjtcbiAgfVxuICBfZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiB0aGlzLl9saWtlKGV2dCkpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKClcbiAgICApO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBfdG9nZ2xlSXNMaWtlZCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIF90b2dnbGVMaWtlc0ltYWdlKCkge1xuICAgIHRoaXMuX2hlYXJ0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgfVxuICBfbGlrZShldnQpIHtcbiAgICB0aGlzLl90b2dnbGVMaWtlc0ltYWdlKCk7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKCk7XG4gICAgdGhpcy5fdG9nZ2xlSXNMaWtlZCgpO1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIHNldExpa2VzKGxpa2VzQXJyYXkpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzQXJyYXk7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICB9XG5cbiAgZGVsZXRlRnJvbVBhZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgfTtcblxuICBfbG9hZExpa2VzKCkge1xuICAgIGlmICh0aGlzLl9saWtlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IDA7XG4gICAgfVxuICB9XG4gIF9zZXRJbWFnZUFuZE5hbWUoKSB7XG4gICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5fY2FyZExpbmt9KTtgO1xuICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX2NhcmROYW1lO1xuICB9XG59XG5cbmV4cG9ydCB7IENhcmQgfTtcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG5cbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbGVtZW50LmlkO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xuIiwiY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpOyAvL2Nsb3NlIG9uIGVzY1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX29wZW5cIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlID0gKGV2dCkgPT4ge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9O1xuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQpID0+IHtcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cDtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5cbiAgICB0aGlzLl9jYXJkVG9EZWxldGU7XG4gIH1cblxuICBzZXRDYXJkVG9EZWxldGUoY2FyZE9iaikge1xuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZSA9IGNhcmRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fY2FyZFRvRGVsZXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICAgIHRoaXMuX2J1dHRvblRleHQgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX29yaWdpbmFUdGV4dCA9IHRoaXMuX2J1dHRvblRleHQudGV4dENvbnRlbnQ7XG4gIH1cblxuICBzZXRMb2FkaW5nVGV4dChpc0xvYWRpbmcpIHtcbiAgICBjb25zb2xlLmxvZyh7IGlzTG9hZGluZyB9KTtcbiAgICBpZiAoaXNMb2FkaW5nID09PSB0cnVlKSB7XG4gICAgICB0aGlzLl9idXR0b25UZXh0LnRleHRDb250ZW50ID0gXCJTYXZpbmcuLi5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYnV0dG9uVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX29yaWdpbmFsVGV4dDtcbiAgICB9XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG5cbiAgICBjb25zdCBpbnB1dE9iaiA9IHt9O1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRPYmpbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnB1dE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEZvcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBfc2V0RGF0YUltYWdlUG9wdXAoKSB7XG4gICAgY29uc3QgaW1hZ2VQb3B1cFBpYyA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgY29uc3QgaW1hZ2VQb3B1cFRleHQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgaW1hZ2VQb3B1cFBpYy5zcmMgPSB0aGlzLmxpbms7XG4gICAgaW1hZ2VQb3B1cFRleHQudGV4dENvbnRlbnQgPSB0aGlzLm5hbWU7XG4gICAgaW1hZ2VQb3B1cFBpYy5hbHQgPSB0aGlzLm5hbWU7XG4gIH1cbiAgb3BlbihcbiAgICBkYXRhIC8vZGF0YSBjb250YWlucyBuYW1lIGFuZCBsaW5rLiBzZW50IGhlcmUgYW5kIG5vdCBpbiB0aGUgY29uc3RydWN0b3JcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMubGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9zZXREYXRhSW1hZ2VQb3B1cCgpO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhJbWFnZTtcbiIsImNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcbiIsImNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyB1c2VyTmFtZSwgdXNlckpvYiwgdXNlckF2YXRhciB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyQXZhdGFyKTtcbiAgfVxuICBzZXRVc2VySW5mbyh7IG5hbWUsIGFib3V0LCBhdmF0YXIsIF9pZCB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50LnNyYyA9IGF2YXRhcjtcbiAgICB0aGlzLmlkID0gX2lkO1xuICB9XG5cbiAgc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IGFib3V0O1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgY29uc3QgbmV3T2JqZWN0ID0ge1xuICAgICAgbmFtZTogdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgIH07XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxufVxuXG5leHBvcnQgeyBVc2VySW5mbyB9O1xuIiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiU2Fzc2FmcmFzIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5ODU1OTA2OTM1Mi0zZDg0MzdiMGQ0MmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkFuZ2VsIFRyZWVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjExODU5MzI4MDUzLTNjYmM5ZjkzOTlmND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzI2JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTXlydGxlIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzg1ODc5NzE3NS1iN2RiYTNjNWM4ZmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVGw4ZkcxNWNuUnNaU1V5TUdKbFlXTm9KVEl3YzI5MWRHZ2xNakJqWVhKdmJHbHVZWHhsYm53d2ZId3dmSHclM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJFZGlzdG8gQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ2MTg4OTk0LWZlYTBlY2JiMDRhND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9Njg3JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVGFibGUgUm9jayBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc5MTI2ODk0MzAtMjhkNjYyNGZlNDY3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2NtOW1hV3hsTFhCaFoyVjhOM3g4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ29uZ2FyZWUgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTU2NTMwNTE5NjgtNjljMmIwZTQzMzQ3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGN1c3RvbVNldHRpbmdzID0ge1xuICBmb3JtU2VsZWN0b3I6IFwiLnBvcHVwX19mb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX3NhdmUtYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX3NhdmUtYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxuICBwcm9maWxlSW1hZ2VTZWxlY3RvcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuLy9JbXBvcnQgY2xhc3Nlc1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpLmpzXCI7XG5cbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcblxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcblxuaW1wb3J0IHsgY3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHMuanNcIjtcblxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xuXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanNcIjtcblxuLy8gQnV0dG9ucyBhbmQgb3RoZXIgRE9NIGVsZW1lbnRzXG5cbmNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgYWRkQ2FyZFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBhZGRDYXJkRm9ybSA9IGFkZENhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItcG9wdXBcIik7XG5jb25zdCBlZGl0QXZhdGFyRm9ybSA9IGVkaXRBdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYXZhdGFyLWJ1dHRvblwiKTtcbmNvbnN0IGF2YXRhckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpO1xuXG4vLyBGb3JtIGRhdGFcbmNvbnN0IG5hbWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVcIl0nKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJkZXNjcmlwdGlvblwiXScpO1xuY29uc3QgaW1hZ2VOYW1lSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInBsYWNlLW5hbWVcIl0nKTtcbmNvbnN0IGltYWdlTGlua0lucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsaW5rXCJdJyk7XG5cbmNvbnN0IGltYWdlUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmltYWdlUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vL0dyb3VwIElEOiBncm91cC0xMlxuXG5mZXRjaChcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTIvdXNlcnMvbWVcIiwge1xuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgfSxcbn0pXG4gIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICB9KTtcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCB1c2VyID0gbmV3IFVzZXJJbmZvKHtcbiAgdXNlck5hbWU6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICB1c2VySm9iOiBcIi5wcm9maWxlX19pbmZvLXRpdGxlXCIsXG4gIHVzZXJBdmF0YXI6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5cbi8vIGZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0KVxuLy8ge1xuLy8gICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoZGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoKSA9PiB7XG4vLyAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KCk7XG4vLyAgIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbi8vIH1cblxuY29uc3QgY2FyZEdyaWRPYmplY3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBudWxsLFxuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgXCIucGhvdG8tZ3JpZF9fY2FyZHNcIlxuKTtcblxuYXBpXG4gIC5nZXRVc2VySW5mbygpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mbyhkYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAudGhlbigoKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZ2V0SW5pdGlhbENhcmRzKClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3Quc2V0SXRlbXMocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3QucmVuZGVySXRlbXMoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdCwgZGVsZXRlUG9wdXBPYmplY3QpIHtcbiAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Quc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmplY3QpO1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Qub3BlbigpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGNhcmRPYmplY3QuZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIoKSA9PSBmYWxzZSkge1xuICAgICAgICBhcGlcbiAgICAgICAgICAubGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLnVuTGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXNlclxuICApO1xuXG4gIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KHVzZXIpO1xuICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG59XG5cbi8vIGNvbnN0IGZvcm1FbGVtZW50c0xpc3QgPSBBcnJheS5mcm9tKFxuLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmZvcm1TZWxlY3Rvcilcbi8vICk7XG5cbi8vIGNvbnN0IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0ID0gZm9ybUVsZW1lbnRzTGlzdC5tYXAoKGZvcm0pID0+IHtcbi8vICAgY29uc3QgZm9ybU9iamVjdCA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBmb3JtKTtcbi8vICAgZm9ybU9iamVjdC5lbmFibGVWYWxpZGF0aW9uKCk7XG4vLyAgIHJldHVybiBmb3JtT2JqZWN0O1xuLy8gfSk7XG5cbi8vIGNvbnN0IGVkaXRQcm9maWxlRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4vLyAgIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGRlc2NyaXB0aW9uXCJcbi8vICk7XG5cbi8vIGNvbnN0IGFkZENhcmRGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbi8vICAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kbGlua1wiXG4vLyApO1xuXG4vLyBjb25zdCBlZGl0QXZhdGFyRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4vLyAgIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwiYXZhdGFyZm9ybVwiXG4vLyApO1xuY29uc3QgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgY3VzdG9tU2V0dGluZ3MsXG4gIGVkaXRQcm9maWxlRm9ybVxuKTtcbmFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkSW1hZ2VGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGFkZENhcmRGb3JtKTtcbmFkZEltYWdlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZEF2YXRhckZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihcbiAgY3VzdG9tU2V0dGluZ3MsXG4gIGVkaXRBdmF0YXJGb3JtXG4pO1xuYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcblxuY29uc3QgYWRkQXZhdGFyRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2F2YXRhci1wb3B1cFwiLCAodmFsdWVzKSA9PiB7XG4gIGF2YXRhckltZy5zcmMgPSB2YWx1ZXMuYXZhdGFyO1xuICBhZGRBdmF0YXJGb3JtVmFsaWRhdG9yLnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAucGF0Y2hVc2VyQXZhdGFyKHZhbHVlcylcbiAgICAudGhlbihhZGRBdmF0YXJGb3JtVmFsaWRhdG9yLmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5zZXRMb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZEF2YXRhckZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkUHJvZmlsZUZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNlZGl0LXBvcHVwXCIsICh2YWx1ZXMpID0+IHtcbiAgdXNlci5zZXRVc2VySW5mb1RleHRPbmx5KHsgbmFtZTogdmFsdWVzLm5hbWUsIGFib3V0OiB2YWx1ZXMudGl0bGUgfSk7XG4gIGFkZFByb2ZpbGVGb3JtLnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAucGF0Y2hVc2VySW5mbyh1c2VyLmdldFVzZXJJbmZvKCkpXG4gICAgLnRoZW4oYWRkUHJvZmlsZUZvcm0uY2xvc2UoKSlcbiAgICAudGhlbihhZGRQcm9maWxlRm9ybS5zZXRMb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZFByb2ZpbGVGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZE5ld0NhcmRGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY3JlYXRlLXBvcHVwXCIsICgpID0+IHtcbiAgY29uc3QgbmV3Q2FyZEluZm8gPSB7XG4gICAgbmFtZTogaW1hZ2VOYW1lSW5wdXQudmFsdWUsXG4gICAgbGluazogaW1hZ2VMaW5rSW5wdXQudmFsdWUsXG4gICAgbGlrZXM6IFtdLFxuICAgIG93bmVyOiB1c2VyLmdldFVzZXJJbmZvKCksXG4gIH07XG5cbiAgYWRkQ2FyZEZvcm0uc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC51cGxvYWRDYXJkKG5ld0NhcmRJbmZvKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IGRhdGEgfSk7XG5cbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBuZXdDYXJkSW5mbyxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9KVxuXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm0ucmVzZXQoKSlcbiAgICAudGhlbihhZGRJbWFnZUZvcm1WYWxpZGF0b3Iuc2V0QnV0dG9uSW5hY3RpdmUoKSlcbiAgICAudGhlbihhZGROZXdDYXJkRm9ybS5jbG9zZSgpKVxuICAgIC50aGVuKGFkZE5ld0NhcmRGb3JtLnNldGxvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkTmV3Q2FyZEZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFxuICBcIiNkZWxldGUtcG9wdXBcIixcbiAgKGNhcmRPYmpUb0RlbGV0ZSkgPT4ge1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZE9ialRvRGVsZXRlLmdldElkKCkpXG4gICAgICAudGhlbihjYXJkT2JqVG9EZWxldGUuZGVsZXRlRnJvbVBhZ2UoKSlcbiAgICAgIC50aGVuKGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuZWRpdEF2YXRhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBlZGl0QXZhdGFyRm9ybS5vcGVuKCk7XG59KTtcblxuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGROZXdDYXJkRm9ybS5vcGVuKCk7XG59KTtcblxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcklucHV0ID0gdXNlci5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcm5hbWU7XG4gIHRpdGxlSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcmluZm87XG4gIGVkaXRQcm9maWxlRm9ybS5vcGVuKCk7XG5cbiAgLy91c2VyLmdldFVzZXJJbmZvKCk7XG5cbiAgLy9uYW1lSW5wdXQudmFsdWUgPSBuYW1lVGV4dC50ZXh0Q29udGVudDtcbiAgLy90aXRsZUlucHV0LnZhbHVlID0gdGl0bGVUZXh0LnRleHRDb250ZW50O1xuXG4gIGVkaXRQcm9maWxlRm9ybS5jbGVhckFsbEVycm9ycygpO1xufSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwiZ2V0VXNlckluZm8iLCJwYXRjaFVzZXJBdmF0YXIiLCJpbmZvIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRjaFVzZXJJbmZvIiwiZGVsZXRlQ2FyZCIsImlkIiwidXBsb2FkQ2FyZCIsImxpa2VDYXJkIiwidW5MaWtlQ2FyZCIsIkNhcmQiLCJkYXRhIiwidGVtcGxhdGVTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZURlbGV0ZUNsaWNrIiwiaGFuZGxlTGlrZUNsaWNrIiwiY3VycmVudFVzZXIiLCJfZWxlbWVudCIsInJlbW92ZSIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlRGVsZXRlQ2xpY2siLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2NhcmROYW1lIiwibmFtZSIsIl9jYXJkTGluayIsImxpbmsiLCJfbGlrZXMiLCJsaWtlcyIsIl9vd25lciIsIm93bmVyIiwiX2lkIiwiX2N1cnJlbnRVc2VyIiwiX2NhcmRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJfY2FyZEltYWdlIiwiX2xpa2VCdXR0b24iLCJfZGVsZXRlQnV0dG9uIiwiX2RlbGV0ZUJ1dHRvbkltYWdlIiwiX251bUxpa2VzVGV4dCIsIl9pc0xpa2VkQnlDdXJyZW50VXNlciIsImdldElkIiwiY3JlYXRlQ2FyZEVsZW1lbnQiLCJ1c2VyRGF0YSIsIl9nZXRFbGVtZW50IiwiX2hlYXJ0IiwiX3NldEltYWdlQW5kTmFtZSIsIl9sb2FkTGlrZXMiLCJfc2V0RXZlbnRMaXN0ZW5lciIsImZvckVhY2giLCJsaWtlIiwiX3RvZ2dsZUxpa2VzSW1hZ2UiLCJnZXRJc0xpa2VkQnlDdXJyZW50VXNlciIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJfbGlrZSIsIl90b2dnbGVJc0xpa2VkIiwiY29uc29sZSIsImxvZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRleHRDb250ZW50IiwibGVuZ3RoIiwic2V0TGlrZXMiLCJsaWtlc0FycmF5Iiwic3R5bGUiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsImlucHV0TGlzdCIsInNvbWUiLCJpbnB1dEVsZW1lbnQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3NldHRpbmdzIiwiX2Zvcm1FbGVtZW50IiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiYnV0dG9uRWxlbWVudCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZWQiLCJhZGQiLCJpbnB1dEVycm9yQ2xhc3MiLCJpbnB1dElkIiwiZXJyb3JFbCIsImVycm9yTWVzc2FnZSIsImVycm9yQ2xhc3MiLCJlbmFibGVWYWxpZGF0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwicHJldmVudERlZmF1bHQiLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsIl9wb3B1cCIsIl9idXR0b24iLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2Zvcm0iLCJfY2FyZFRvRGVsZXRlIiwic2V0Q2FyZFRvRGVsZXRlIiwiY2FyZE9iaiIsIlBvcHVwV2l0aEZvcm0iLCJfYnV0dG9uVGV4dCIsIl9vcmlnaW5hVHRleHQiLCJzZXRMb2FkaW5nVGV4dCIsImlzTG9hZGluZyIsIl9vcmlnaW5hbFRleHQiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dHMiLCJpbnB1dE9iaiIsImlucHV0IiwidmFsdWUiLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3NldERhdGFJbWFnZVBvcHVwIiwiaW1hZ2VQb3B1cFBpYyIsImltYWdlUG9wdXBUZXh0Iiwic3JjIiwiYWx0IiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtc0FycmF5IiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInNldEl0ZW1zIiwiY2xlYXIiLCJpbm5lckhUTUwiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInVzZXJBdmF0YXIiLCJ1c2VyTmFtZUVsZW1lbnQiLCJ1c2VySm9iRWxlbWVudCIsInVzZXJBdmF0YXJFbGVtZW50Iiwic2V0VXNlckluZm8iLCJhYm91dCIsImF2YXRhciIsInNldFVzZXJJbmZvVGV4dE9ubHkiLCJuZXdPYmplY3QiLCJpbml0aWFsQ2FyZHMiLCJjdXN0b21TZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJNb2RhbCIsImVkaXRBdmF0YXJGb3JtIiwiZWRpdEF2YXRhckJ1dHRvbiIsImF2YXRhckltZyIsIm5hbWVUZXh0IiwidGl0bGVUZXh0IiwibmFtZUlucHV0IiwidGl0bGVJbnB1dCIsImltYWdlTmFtZUlucHV0IiwiaW1hZ2VMaW5rSW5wdXQiLCJpbWFnZVBvcHVwT2JqZWN0IiwiYXV0aG9yaXphdGlvbiIsInJlc3VsdCIsImFwaSIsInVzZXIiLCJjYXJkR3JpZE9iamVjdCIsInJlbmRlckNhcmQiLCJkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0IiwiY2F0Y2giLCJlcnIiLCJjYXJkQ29udGFpbmVyIiwiY2FyZFBvcHVwT2JqZWN0IiwiZGVsZXRlUG9wdXBPYmplY3QiLCJjYXJkT2JqZWN0IiwibmV3Q2FyZCIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwiYWRkSW1hZ2VGb3JtVmFsaWRhdG9yIiwiYWRkQXZhdGFyRm9ybVZhbGlkYXRvciIsImFkZEF2YXRhckZvcm0iLCJ2YWx1ZXMiLCJhZGRQcm9maWxlRm9ybSIsInRpdGxlIiwiYWRkTmV3Q2FyZEZvcm0iLCJuZXdDYXJkSW5mbyIsInNldEJ1dHRvbkluYWN0aXZlIiwic2V0bG9hZGluZ1RleHQiLCJjYXJkT2JqVG9EZWxldGUiLCJkZWxldGVGcm9tUGFnZSIsInVzZXJJbnB1dCIsInVzZXJuYW1lIiwidXNlcmluZm8iLCJjbGVhckFsbEVycm9ycyJdLCJzb3VyY2VSb290IjoiIn0=