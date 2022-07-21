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

  editProfileForm.clearAllErrors();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Olsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhdGNoVXNlckF2YXRhcihpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZS9hdmF0YXJcIiwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJJbmZvKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIHVwbG9hZENhcmQoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBsaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICB1bkxpa2VDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9saWtlcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBBcGkgfTtcbiIsImNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhLFxuICAgIHRlbXBsYXRlU2VsZWN0b3IsXG4gICAgaGFuZGxlQ2FyZENsaWNrLFxuICAgIGhhbmRsZURlbGV0ZUNsaWNrLFxuICAgIGhhbmRsZUxpa2VDbGljayxcbiAgICBjdXJyZW50VXNlclxuICApIHtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlRGVsZXRlQ2xpY2sgPSBoYW5kbGVEZWxldGVDbGljaztcbiAgICB0aGlzLl9oYW5kbGVMaWtlQ2xpY2sgPSBoYW5kbGVMaWtlQ2xpY2s7XG4gICAgdGhpcy5fY2FyZE5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fY2FyZExpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fbGlrZXMgPSBkYXRhLmxpa2VzO1xuICAgIHRoaXMuX293bmVyID0gZGF0YS5vd25lcjtcbiAgICB0aGlzLl9pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5fY3VycmVudFVzZXIgPSBjdXJyZW50VXNlcjtcbiAgICB0aGlzLl9jYXJkVGVtcGxhdGUgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGVtcGxhdGVTZWxlY3RvcilcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcbiAgICB0aGlzLl9lbGVtZW50O1xuICAgIHRoaXMuX2NhcmRJbWFnZTtcblxuICAgIHRoaXMuX2xpa2VCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbkltYWdlO1xuICAgIHRoaXMuX251bUxpa2VzVGV4dDtcbiAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcjtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIGNyZWF0ZUNhcmRFbGVtZW50KHVzZXJEYXRhKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnQoKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbkltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuY2FyZF9fZGVsZXRlLWltYWdlXCJcbiAgICApO1xuICAgIHRoaXMuX2hlYXJ0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtaW1hZ2VcIik7XG5cbiAgICB0aGlzLl9udW1MaWtlc1RleHQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZXNcIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG5cbiAgICBpZiAodXNlckRhdGEuZ2V0VXNlckluZm8oKS5uYW1lID09PSB0aGlzLl9vd25lci5uYW1lKSB7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5fc2V0SW1hZ2VBbmROYW1lKCk7XG4gICAgdGhpcy5fbG9hZExpa2VzKCk7XG5cbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVyKCk7XG5cbiAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IGZhbHNlO1xuICAgIHRoaXMuX2xpa2VzLmZvckVhY2goKGxpa2UpID0+IHtcbiAgICAgIGlmIChsaWtlLl9pZCA9PT0gdXNlckRhdGEuZ2V0VXNlckluZm8oKS5pZCkge1xuICAgICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUxpa2VzSW1hZ2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBnZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXI7XG4gIH1cbiAgX2dldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gdGhpcy5fbGlrZShldnQpKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVEZWxldGVDbGljaygpXG4gICAgKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUlzTGlrZWQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gIH1cblxuICBfdG9nZ2xlTGlrZXNJbWFnZSgpIHtcbiAgICB0aGlzLl9oZWFydC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gIH1cbiAgX2xpa2UoZXZ0KSB7XG4gICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljaygpO1xuICAgIHRoaXMuX3RvZ2dsZUlzTGlrZWQoKTtcbiAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gIH1cblxuICBzZXRMaWtlcyhsaWtlc0FycmF5KSB7XG4gICAgdGhpcy5fbGlrZXMgPSBsaWtlc0FycmF5O1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIGRlbGV0ZUZyb21QYWdlID0gKCkgPT4ge1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gIH07XG5cbiAgX2xvYWRMaWtlcygpIHtcbiAgICBpZiAodGhpcy5fbGlrZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSAwO1xuICAgIH1cbiAgfVxuICBfc2V0SW1hZ2VBbmROYW1lKCkge1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zdHlsZSA9IGBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3RoaXMuX2NhcmRMaW5rfSk7YDtcbiAgICB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9jYXJkTmFtZTtcbiAgfVxufVxuXG5leHBvcnQgeyBDYXJkIH07XG4iLCJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xuICB9XG5cbiAgX3NldEV2ZW50TGlzdGVuZXJzKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfVxuICB9XG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIF9oYXNJbnZhbGlkSW5wdXQgPSAoaW5wdXRMaXN0KSA9PlxuICAgIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+ICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpO1xuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuXG4gICAgY29uc3QgaW5wdXRJZCA9IGlucHV0RWxlbWVudC5pZDtcblxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbGVtZW50LmlkO1xuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBlcnJvckVsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBlcnJvckVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdG9yKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IFtcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2V0dGluZ3MuaW5wdXRTZWxlY3RvciksXG4gICAgXTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcblxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxuICByZXNldFZhbGlkYXRpb24oKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcbiIsImNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwicG9wdXBfb3BlblwiKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTsgLy9jbG9zZSBvbiBlc2NcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cFwiKSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXA7XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuXG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlO1xuICB9XG5cbiAgc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmopIHtcbiAgICB0aGlzLl9jYXJkVG9EZWxldGUgPSBjYXJkT2JqO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2NhcmRUb0RlbGV0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgICB0aGlzLl9idXR0b25UZXh0ID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiKTtcbiAgICB0aGlzLl9vcmlnaW5hVHRleHQgPSB0aGlzLl9idXR0b25UZXh0LnRleHRDb250ZW50O1xuICB9XG5cbiAgc2V0TG9hZGluZ1RleHQoaXNMb2FkaW5nKSB7XG4gICAgY29uc29sZS5sb2coeyBpc0xvYWRpbmcgfSk7XG4gICAgaWYgKGlzTG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fYnV0dG9uVGV4dC50ZXh0Q29udGVudCA9IFwiU2F2aW5nLi4uXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1dHRvblRleHQudGV4dENvbnRlbnQgPSB0aGlzLl9vcmlnaW5hbFRleHQ7XG4gICAgfVxuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0cyA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuXG4gICAgY29uc3QgaW5wdXRPYmogPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0T2JqW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5wdXRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhGb3JtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gIH1cbiAgX3NldERhdGFJbWFnZVBvcHVwKCkge1xuICAgIGNvbnN0IGltYWdlUG9wdXBQaWMgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgIGNvbnN0IGltYWdlUG9wdXBUZXh0ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGltYWdlUG9wdXBQaWMuc3JjID0gdGhpcy5saW5rO1xuICAgIGltYWdlUG9wdXBUZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgIGltYWdlUG9wdXBQaWMuYWx0ID0gdGhpcy5uYW1lO1xuICB9XG4gIG9wZW4oXG4gICAgZGF0YSAvL2RhdGEgY29udGFpbnMgbmFtZSBhbmQgbGluay4gc2VudCBoZXJlIGFuZCBub3QgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fc2V0RGF0YUltYWdlUG9wdXAoKTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoSW1hZ2U7XG4iLCJjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gIHNldEl0ZW1zKGl0ZW1zKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cblxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5faXRlbXNBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247XG4iLCJjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgdXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckpvYik7XG4gICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckF2YXRhcik7XG4gIH1cbiAgc2V0VXNlckluZm8oeyBuYW1lLCBhYm91dCwgYXZhdGFyLCBfaWQgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudC5zcmMgPSBhdmF0YXI7XG4gICAgdGhpcy5pZCA9IF9pZDtcbiAgfVxuXG4gIHNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IHtcbiAgICAgIG5hbWU6IHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICB9O1xuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cbn1cblxuZXhwb3J0IHsgVXNlckluZm8gfTtcbiIsImV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIlNhc3NhZnJhcyBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTg1NTkwNjkzNTItM2Q4NDM3YjBkNDJjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJBbmdlbCBUcmVlXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxMTg1OTMyODA1My0zY2JjOWY5Mzk5ZjQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcyNiZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIk15cnRsZSBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc4NTg3OTcxNzUtYjdkYmEzYzVjOGZjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4elpXRnlZMmg4TVRsOGZHMTVjblJzWlNVeU1HSmxZV05vSlRJd2MyOTFkR2dsTWpCallYSnZiR2x1WVh4bGJud3dmSHd3Zkh3JTNEJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiRWRpc3RvIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU0NjE4ODk5NC1mZWEwZWNiYjA0YTQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTY4NyZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRhYmxlIFJvY2sgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3OTEyNjg5NDMwLTI4ZDY2MjRmZTQ2Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdjbTltYVd4bExYQmhaMlY4TjN4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkNvbmdhcmVlIE5hdGlvbmFsIFBhcmtcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE1NjUzMDUxOTY4LTY5YzJiMGU0MzM0Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBjdXN0b21TZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5wb3B1cF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19zYXZlLWJ1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcInBvcHVwX19zYXZlLWJ1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbiAgcHJvZmlsZUltYWdlU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbi8vSW1wb3J0IGNsYXNzZXNcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuLi9jb21wb25lbnRzL0FwaS5qc1wiO1xuXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XG5cbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XG5cbmltcG9ydCB7IGN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzXCI7XG5cbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcblxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzXCI7XG5cbi8vIEJ1dHRvbnMgYW5kIG90aGVyIERPTSBlbGVtZW50c1xuXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fZWRpdC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGFkZENhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgYWRkQ2FyZEZvcm0gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGVkaXRBdmF0YXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXZhdGFyLXBvcHVwXCIpO1xuY29uc3QgZWRpdEF2YXRhckZvcm0gPSBlZGl0QXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGVkaXRBdmF0YXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2F2YXRhci1idXR0b25cIik7XG5jb25zdCBhdmF0YXJJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2F2YXRhclwiKTtcblxuLy8gRm9ybSBkYXRhXG5jb25zdCBuYW1lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbmNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJyk7XG5jb25zdCB0aXRsZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiZGVzY3JpcHRpb25cIl0nKTtcbmNvbnN0IGltYWdlTmFtZUlucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJwbGFjZS1uYW1lXCJdJyk7XG5jb25zdCBpbWFnZUxpbmtJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibGlua1wiXScpO1xuXG5jb25zdCBpbWFnZVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5pbWFnZVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vVG9rZW4gYW5kIElEIGluZm9cbi8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuZmV0Y2goXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyL3VzZXJzL21lXCIsIHtcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gIH0sXG59KVxuICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgfSk7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VySW5mbyh7XG4gIHVzZXJOYW1lOiBcIi5wcm9maWxlX19pbmZvLW5hbWVcIixcbiAgdXNlckpvYjogXCIucHJvZmlsZV9faW5mby10aXRsZVwiLFxuICB1c2VyQXZhdGFyOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn0pO1xuXG4vLyBmdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdClcbi8vIHtcbi8vICAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKGRhdGEsIFwiI2NhcmQtdGVtcGxhdGVcIiwgKCkgPT4ge1xuLy8gICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuLy8gICB9KTtcblxuLy8gICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCgpO1xuLy8gICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG4vLyB9XG5cbmNvbnN0IGNhcmRHcmlkT2JqZWN0ID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICBpdGVtczogbnVsbCxcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBkYXRhLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIFwiLnBob3RvLWdyaWRfX2NhcmRzXCJcbik7XG5cbmFwaVxuICAuZ2V0VXNlckluZm8oKVxuICAudGhlbigoZGF0YSkgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm8oZGF0YSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGFwaVxuICAgICAgLmdldEluaXRpYWxDYXJkcygpXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnNldEl0ZW1zKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnJlbmRlckl0ZW1zKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QsIGRlbGV0ZVBvcHVwT2JqZWN0KSB7XG4gIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0LnNldENhcmRUb0RlbGV0ZShjYXJkT2JqZWN0KTtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0Lm9wZW4oKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGlmIChjYXJkT2JqZWN0LmdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkgPT0gZmFsc2UpIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLmxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC51bkxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVzZXJcbiAgKTtcblxuICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCh1c2VyKTtcbiAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xufVxuXG4vLyBjb25zdCBmb3JtRWxlbWVudHNMaXN0ID0gQXJyYXkuZnJvbShcbi8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjdXN0b21TZXR0aW5ncy5mb3JtU2VsZWN0b3IpXG4vLyApO1xuXG4vLyBjb25zdCBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdCA9IGZvcm1FbGVtZW50c0xpc3QubWFwKChmb3JtKSA9PiB7XG4vLyAgIGNvbnN0IGZvcm1PYmplY3QgPSBuZXcgRm9ybVZhbGlkYXRvcihjdXN0b21TZXR0aW5ncywgZm9ybSk7XG4vLyAgIGZvcm1PYmplY3QuZW5hYmxlVmFsaWRhdGlvbigpO1xuLy8gICByZXR1cm4gZm9ybU9iamVjdDtcbi8vIH0pO1xuXG4vLyBjb25zdCBlZGl0UHJvZmlsZUZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuLy8gICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRkZXNjcmlwdGlvblwiXG4vLyApO1xuXG4vLyBjb25zdCBhZGRDYXJkRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4vLyAgIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGxpbmtcIlxuLy8gKTtcblxuLy8gY29uc3QgZWRpdEF2YXRhckZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuLy8gICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcImF2YXRhcmZvcm1cIlxuLy8gKTtcbmNvbnN0IGFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIGN1c3RvbVNldHRpbmdzLFxuICBlZGl0UHJvZmlsZUZvcm1cbik7XG5hZGRQcm9maWxlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0b3IoKTtcbmNvbnN0IGFkZEltYWdlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBhZGRDYXJkRm9ybSk7XG5hZGRJbWFnZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRBdmF0YXJGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXG4gIGN1c3RvbVNldHRpbmdzLFxuICBlZGl0QXZhdGFyRm9ybVxuKTtcbmFkZEF2YXRhckZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5cbmNvbnN0IGFkZEF2YXRhckZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNhdmF0YXItcG9wdXBcIiwgKHZhbHVlcykgPT4ge1xuICBhdmF0YXJJbWcuc3JjID0gdmFsdWVzLmF2YXRhcjtcbiAgYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnBhdGNoVXNlckF2YXRhcih2YWx1ZXMpXG4gICAgLnRoZW4oYWRkQXZhdGFyRm9ybVZhbGlkYXRvci5jbG9zZSgpKVxuICAgIC50aGVuKGFkZEF2YXRhckZvcm1WYWxpZGF0b3Iuc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRBdmF0YXJGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZFByb2ZpbGVGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjZWRpdC1wb3B1cFwiLCAodmFsdWVzKSA9PiB7XG4gIHVzZXIuc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWU6IHZhbHVlcy5uYW1lLCBhYm91dDogdmFsdWVzLnRpdGxlIH0pO1xuICBhZGRQcm9maWxlRm9ybS5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnBhdGNoVXNlckluZm8odXNlci5nZXRVc2VySW5mbygpKVxuICAgIC50aGVuKGFkZFByb2ZpbGVGb3JtLmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkUHJvZmlsZUZvcm0uc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRQcm9maWxlRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGROZXdDYXJkRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoKSA9PiB7XG4gIGNvbnN0IG5ld0NhcmRJbmZvID0ge1xuICAgIG5hbWU6IGltYWdlTmFtZUlucHV0LnZhbHVlLFxuICAgIGxpbms6IGltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIGxpa2VzOiBbXSxcbiAgICBvd25lcjogdXNlci5nZXRVc2VySW5mbygpLFxuICB9O1xuXG4gIGFkZENhcmRGb3JtLnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAudXBsb2FkQ2FyZChuZXdDYXJkSW5mbylcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBkYXRhIH0pO1xuXG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgbmV3Q2FyZEluZm8sXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSlcblxuICAgIC50aGVuKGFkZENhcmRGb3JtLnJlc2V0KCkpXG4gICAgLnRoZW4oYWRkSW1hZ2VGb3JtVmFsaWRhdG9yLnNldEJ1dHRvbkluYWN0aXZlKCkpXG4gICAgLnRoZW4oYWRkTmV3Q2FyZEZvcm0uY2xvc2UoKSlcbiAgICAudGhlbihhZGROZXdDYXJkRm9ybS5zZXRsb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZE5ld0NhcmRGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcbiAgXCIjZGVsZXRlLXBvcHVwXCIsXG4gIChjYXJkT2JqVG9EZWxldGUpID0+IHtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmRPYmpUb0RlbGV0ZS5nZXRJZCgpKVxuICAgICAgLnRoZW4oY2FyZE9ialRvRGVsZXRlLmRlbGV0ZUZyb21QYWdlKCkpXG4gICAgICAudGhlbihkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5kZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmVkaXRBdmF0YXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQXZhdGFyRm9ybS5vcGVuKCk7XG59KTtcblxuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGROZXdDYXJkRm9ybS5vcGVuKCk7XG59KTtcblxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcklucHV0ID0gdXNlci5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcm5hbWU7XG4gIHRpdGxlSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcmluZm87XG4gIGFkZFByb2ZpbGVGb3JtLm9wZW4oKTtcblxuICAvL3VzZXIuZ2V0VXNlckluZm8oKTtcblxuICAvL25hbWVJbnB1dC52YWx1ZSA9IG5hbWVUZXh0LnRleHRDb250ZW50O1xuICAvL3RpdGxlSW5wdXQudmFsdWUgPSB0aXRsZVRleHQudGV4dENvbnRlbnQ7XG5cbiAgZWRpdFByb2ZpbGVGb3JtLmNsZWFyQWxsRXJyb3JzKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRVc2VySW5mbyIsInBhdGNoVXNlckF2YXRhciIsImluZm8iLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGNoVXNlckluZm8iLCJkZWxldGVDYXJkIiwiaWQiLCJ1cGxvYWRDYXJkIiwibGlrZUNhcmQiLCJ1bkxpa2VDYXJkIiwiQ2FyZCIsImRhdGEiLCJ0ZW1wbGF0ZVNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJoYW5kbGVMaWtlQ2xpY2siLCJjdXJyZW50VXNlciIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVEZWxldGVDbGljayIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfY2FyZE5hbWUiLCJuYW1lIiwiX2NhcmRMaW5rIiwibGluayIsIl9saWtlcyIsImxpa2VzIiwiX293bmVyIiwib3duZXIiLCJfaWQiLCJfY3VycmVudFVzZXIiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9jYXJkSW1hZ2UiLCJfbGlrZUJ1dHRvbiIsIl9kZWxldGVCdXR0b24iLCJfZGVsZXRlQnV0dG9uSW1hZ2UiLCJfbnVtTGlrZXNUZXh0IiwiX2lzTGlrZWRCeUN1cnJlbnRVc2VyIiwiZ2V0SWQiLCJjcmVhdGVDYXJkRWxlbWVudCIsInVzZXJEYXRhIiwiX2dldEVsZW1lbnQiLCJfaGVhcnQiLCJfc2V0SW1hZ2VBbmROYW1lIiwiX2xvYWRMaWtlcyIsIl9zZXRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImxpa2UiLCJfdG9nZ2xlTGlrZXNJbWFnZSIsImdldElzTGlrZWRCeUN1cnJlbnRVc2VyIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsIl9saWtlIiwiX3RvZ2dsZUlzTGlrZWQiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJzZXRMaWtlcyIsImxpa2VzQXJyYXkiLCJzdHlsZSIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwiaW5wdXRMaXN0Iiwic29tZSIsImlucHV0RWxlbWVudCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsZW1lbnQiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJidXR0b25FbGVtZW50IiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImFkZCIsImlucHV0RXJyb3JDbGFzcyIsImlucHV0SWQiLCJlcnJvckVsIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JDbGFzcyIsImVuYWJsZVZhbGlkYXRvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlc2V0VmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsImtleSIsImNsb3NlIiwiX3BvcHVwIiwiX2J1dHRvbiIsIm9wZW4iLCJfaGFuZGxlRXNjQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aENvbmZpcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9jYXJkVG9EZWxldGUiLCJzZXRDYXJkVG9EZWxldGUiLCJjYXJkT2JqIiwiUG9wdXBXaXRoRm9ybSIsIl9idXR0b25UZXh0IiwiX29yaWdpbmFUdGV4dCIsInNldExvYWRpbmdUZXh0IiwiaXNMb2FkaW5nIiwiX29yaWdpbmFsVGV4dCIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfc2V0RGF0YUltYWdlUG9wdXAiLCJpbWFnZVBvcHVwUGljIiwiaW1hZ2VQb3B1cFRleHQiLCJzcmMiLCJhbHQiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zQXJyYXkiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwic2V0SXRlbXMiLCJjbGVhciIsImlubmVySFRNTCIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlckF2YXRhciIsInVzZXJOYW1lRWxlbWVudCIsInVzZXJKb2JFbGVtZW50IiwidXNlckF2YXRhckVsZW1lbnQiLCJzZXRVc2VySW5mbyIsImFib3V0IiwiYXZhdGFyIiwic2V0VXNlckluZm9UZXh0T25seSIsIm5ld09iamVjdCIsImluaXRpYWxDYXJkcyIsImN1c3RvbVNldHRpbmdzIiwiZm9ybVNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsInByb2ZpbGVJbWFnZVNlbGVjdG9yIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkQ2FyZEJ1dHRvbiIsImFkZENhcmRQb3B1cCIsImFkZENhcmRGb3JtIiwiZWRpdEF2YXRhck1vZGFsIiwiZWRpdEF2YXRhckZvcm0iLCJlZGl0QXZhdGFyQnV0dG9uIiwiYXZhdGFySW1nIiwibmFtZVRleHQiLCJ0aXRsZVRleHQiLCJuYW1lSW5wdXQiLCJ0aXRsZUlucHV0IiwiaW1hZ2VOYW1lSW5wdXQiLCJpbWFnZUxpbmtJbnB1dCIsImltYWdlUG9wdXBPYmplY3QiLCJhdXRob3JpemF0aW9uIiwicmVzdWx0IiwiYXBpIiwidXNlciIsImNhcmRHcmlkT2JqZWN0IiwicmVuZGVyQ2FyZCIsImRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QiLCJjYXRjaCIsImVyciIsImNhcmRDb250YWluZXIiLCJjYXJkUG9wdXBPYmplY3QiLCJkZWxldGVQb3B1cE9iamVjdCIsImNhcmRPYmplY3QiLCJuZXdDYXJkIiwiYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJhZGRJbWFnZUZvcm1WYWxpZGF0b3IiLCJhZGRBdmF0YXJGb3JtVmFsaWRhdG9yIiwiYWRkQXZhdGFyRm9ybSIsInZhbHVlcyIsImFkZFByb2ZpbGVGb3JtIiwidGl0bGUiLCJhZGROZXdDYXJkRm9ybSIsIm5ld0NhcmRJbmZvIiwic2V0QnV0dG9uSW5hY3RpdmUiLCJzZXRsb2FkaW5nVGV4dCIsImNhcmRPYmpUb0RlbGV0ZSIsImRlbGV0ZUZyb21QYWdlIiwidXNlcklucHV0IiwidXNlcm5hbWUiLCJ1c2VyaW5mbyIsImNsZWFyQWxsRXJyb3JzIl0sInNvdXJjZVJvb3QiOiIifQ==