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
    this._id = data._id;
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
    const errorMessage = inputElement.validationMessage;

    const errorElement = this._formElement.querySelector(".".concat(inputElement.id, "-error"));

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    const inputId = inputElement.id;

    const errorElement = this._formElement.querySelector(".".concat(inputElement.id, "-error"));

    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
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
  addAvatarForm.setLoadingText(true);
  api.patchUserAvatar(values).then(addAvatarFormValidator.close()).then(addAvatarForm.setLoadingText(false)).catch(err => {
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
  addNewCardForm.setLoadingText(true);
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
  addProfileForm.open();
  addProfileFormValidator.resetValidation();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxDQVBELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWUvYXZhdGFyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VySW5mbyhpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBpIH07XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZGF0YSxcbiAgICB0ZW1wbGF0ZVNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVEZWxldGVDbGljayxcbiAgICBoYW5kbGVMaWtlQ2xpY2ssXG4gICAgY3VycmVudFVzZXJcbiAgKSB7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrID0gaGFuZGxlRGVsZXRlQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrO1xuICAgIHRoaXMuX2NhcmROYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2NhcmRMaW5rID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX2xpa2VzID0gZGF0YS5saWtlcztcbiAgICB0aGlzLl9vd25lciA9IGRhdGEub3duZXI7XG4gICAgdGhpcy5faWQgPSBkYXRhLl9pZDtcbiAgICB0aGlzLl9jdXJyZW50VXNlciA9IGN1cnJlbnRVc2VyO1xuICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgIHRoaXMuX2VsZW1lbnQ7XG4gICAgdGhpcy5fY2FyZEltYWdlO1xuXG4gICAgdGhpcy5fbGlrZUJ1dHRvbjtcbiAgICB0aGlzLl9kZWxldGVCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2U7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0O1xuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgY3JlYXRlQ2FyZEVsZW1lbnQodXNlckRhdGEpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jYXJkX19kZWxldGUtaW1hZ2VcIlxuICAgICk7XG4gICAgdGhpcy5faGVhcnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1pbWFnZVwiKTtcblxuICAgIHRoaXMuX251bUxpa2VzVGV4dCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlc1wiKTtcblxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcblxuICAgIGlmICh1c2VyRGF0YS5nZXRVc2VySW5mbygpLm5hbWUgPT09IHRoaXMuX293bmVyLm5hbWUpIHtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGVsZXRlQnV0dG9uLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRJbWFnZUFuZE5hbWUoKTtcbiAgICB0aGlzLl9sb2FkTGlrZXMoKTtcblxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIoKTtcblxuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgdGhpcy5fbGlrZXMuZm9yRWFjaCgobGlrZSkgPT4ge1xuICAgICAgaWYgKGxpa2UuX2lkID09PSB1c2VyRGF0YS5nZXRVc2VySW5mbygpLmlkKSB7XG4gICAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcikge1xuICAgICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIGdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcjtcbiAgfVxuICBfZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICBfc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiB0aGlzLl9saWtlKGV2dCkpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKClcbiAgICApO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBfdG9nZ2xlSXNMaWtlZCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIF90b2dnbGVMaWtlc0ltYWdlKCkge1xuICAgIHRoaXMuX2hlYXJ0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlX2FjdGl2ZVwiKTtcbiAgfVxuICBfbGlrZShldnQpIHtcbiAgICB0aGlzLl90b2dnbGVMaWtlc0ltYWdlKCk7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrKCk7XG4gICAgdGhpcy5fdG9nZ2xlSXNMaWtlZCgpO1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIHNldExpa2VzKGxpa2VzQXJyYXkpIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzQXJyYXk7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICB9XG5cbiAgZGVsZXRlRnJvbVBhZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgfTtcblxuICBfbG9hZExpa2VzKCkge1xuICAgIGlmICh0aGlzLl9saWtlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IDA7XG4gICAgfVxuICB9XG4gIF9zZXRJbWFnZUFuZE5hbWUoKSB7XG4gICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5fY2FyZExpbmt9KTtgO1xuICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX2NhcmROYW1lO1xuICB9XG59XG5cbmV4cG9ydCB7IENhcmQgfTtcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgX2hhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+XG4gICAgaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG5cbiAgICBjb25zdCBpbnB1dElkID0gaW5wdXRFbGVtZW50LmlkO1xuXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlO1xuXG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3NldHRpbmdzLmVycm9yQ2xhc3MpO1xuICB9XG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGlucHV0SWQgPSBpbnB1dEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuICBlbmFibGVWYWxpZGF0b3IoKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gW1xuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKSxcbiAgICBdO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBbXG4gICAgICAuLi50aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpLFxuICAgIF07XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XG4iLCJjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5cIik7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7IC8vY2xvc2Ugb24gZXNjXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXBfb3BlblwiKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PiB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXBcIikpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcblxuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZTtcbiAgfVxuXG4gIHNldENhcmRUb0RlbGV0ZShjYXJkT2JqKSB7XG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlID0gY2FyZE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9jYXJkVG9EZWxldGUpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5jbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gICAgdGhpcy5fYnV0dG9uVGV4dCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fc2F2ZS1idXR0b25cIik7XG4gICAgdGhpcy5fb3JpZ2luYVR0ZXh0ID0gdGhpcy5fYnV0dG9uVGV4dC50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldExvYWRpbmdUZXh0KGlzTG9hZGluZykge1xuICAgIGNvbnNvbGUubG9nKHsgaXNMb2FkaW5nIH0pO1xuICAgIGlmIChpc0xvYWRpbmcgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX2J1dHRvblRleHQudGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b25UZXh0LnRleHRDb250ZW50ID0gdGhpcy5fb3JpZ2luYWxUZXh0O1xuICAgIH1cbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcblxuICAgIGNvbnN0IGlucHV0T2JqID0ge307XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dE9ialtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlucHV0T2JqO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoRm9ybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5jbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICB9XG4gIF9zZXREYXRhSW1hZ2VQb3B1cCgpIHtcbiAgICBjb25zdCBpbWFnZVBvcHVwUGljID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICBjb25zdCBpbWFnZVBvcHVwVGV4dCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICBpbWFnZVBvcHVwUGljLnNyYyA9IHRoaXMubGluaztcbiAgICBpbWFnZVBvcHVwVGV4dC50ZXh0Q29udGVudCA9IHRoaXMubmFtZTtcbiAgICBpbWFnZVBvcHVwUGljLmFsdCA9IHRoaXMubmFtZTtcbiAgfVxuICBvcGVuKFxuICAgIGRhdGEgLy9kYXRhIGNvbnRhaW5zIG5hbWUgYW5kIGxpbmsuIHNlbnQgaGVyZSBhbmQgbm90IGluIHRoZSBjb25zdHJ1Y3RvclxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5saW5rID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX3NldERhdGFJbWFnZVBvcHVwKCk7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEltYWdlO1xuIiwiY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICBzZXRJdGVtcyhpdGVtcykge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uO1xuIiwiY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih7IHVzZXJOYW1lLCB1c2VySm9iLCB1c2VyQXZhdGFyIH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlck5hbWUpO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJKb2IpO1xuICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJBdmF0YXIpO1xuICB9XG4gIHNldFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQsIGF2YXRhciwgX2lkIH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IGFib3V0O1xuICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQuc3JjID0gYXZhdGFyO1xuICAgIHRoaXMuaWQgPSBfaWQ7XG4gIH1cblxuICBzZXRVc2VySW5mb1RleHRPbmx5KHsgbmFtZSwgYWJvdXQgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIGFib3V0OiB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG59XG5cbmV4cG9ydCB7IFVzZXJJbmZvIH07XG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xuICB7XG4gICAgbmFtZTogXCJTYXNzYWZyYXMgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4NTU5MDY5MzUyLTNkODQzN2IwZDQyYz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQW5nZWwgVHJlZVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTE4NTkzMjgwNTMtM2NiYzlmOTM5OWY0P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MjYmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJNeXJ0bGUgQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3ODU4Nzk3MTc1LWI3ZGJhM2M1YzhmYz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UbDhmRzE1Y25Sc1pTVXlNR0psWVdOb0pUSXdjMjkxZEdnbE1qQmpZWEp2YkdsdVlYeGxibnd3Zkh3d2ZIdyUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkVkaXN0byBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDYxODg5OTQtZmVhMGVjYmIwNGE0P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz02ODcmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUYWJsZSBSb2NrIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzkxMjY4OTQzMC0yOGQ2NjI0ZmU0Njc/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3Y205bWFXeGxMWEJoWjJWOE4zeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJDb25nYXJlZSBOYXRpb25hbCBQYXJrXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNTY1MzA1MTk2OC02OWMyYjBlNDMzNDc/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgY3VzdG9tU2V0dGluZ3MgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIucG9wdXBfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fc2F2ZS1idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJwb3B1cF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG4gIHByb2ZpbGVJbWFnZVNlbGVjdG9yOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vL0ltcG9ydCBjbGFzc2VzXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGkuanNcIjtcblxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xuXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuXG5pbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50cy5qc1wiO1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5cbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qc1wiO1xuXG4vLyBCdXR0b25zIGFuZCBvdGhlciBET00gZWxlbWVudHNcblxuY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F2YXRhci1wb3B1cFwiKTtcbmNvbnN0IGVkaXRBdmF0YXJGb3JtID0gZWRpdEF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hdmF0YXItYnV0dG9uXCIpO1xuY29uc3QgYXZhdGFySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5cbi8vIEZvcm0gZGF0YVxuY29uc3QgbmFtZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpO1xuY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpO1xuY29uc3QgdGl0bGVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XG5jb25zdCBpbWFnZU5hbWVJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGxhY2UtbmFtZVwiXScpO1xuY29uc3QgaW1hZ2VMaW5rSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImxpbmtcIl0nKTtcblxuY29uc3QgaW1hZ2VQb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuaW1hZ2VQb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vL1Rva2VuIGFuZCBJRCBpbmZvXG4vL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbmZldGNoKFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMi91c2Vycy9tZVwiLCB7XG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICB9LFxufSlcbiAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gIH0pO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlckluZm8oe1xuICB1c2VyTmFtZTogXCIucHJvZmlsZV9faW5mby1uYW1lXCIsXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgdXNlckF2YXRhcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcblxuLy8gZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QpXG4vLyB7XG4vLyAgIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChkYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcbi8vICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbi8vICAgfSk7XG5cbi8vICAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQoKTtcbi8vICAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xuLy8gfVxuXG5jb25zdCBjYXJkR3JpZE9iamVjdCA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgaXRlbXM6IG51bGwsXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBcIi5waG90by1ncmlkX19jYXJkc1wiXG4pO1xuXG5hcGlcbiAgLmdldFVzZXJJbmZvKClcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICB1c2VyLnNldFVzZXJJbmZvKGRhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG4gIC50aGVuKCgpID0+IHtcbiAgICBhcGlcbiAgICAgIC5nZXRJbml0aWFsQ2FyZHMoKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5zZXRJdGVtcyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5yZW5kZXJJdGVtcygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0LCBkZWxldGVQb3B1cE9iamVjdCkge1xuICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5zZXRDYXJkVG9EZWxldGUoY2FyZE9iamVjdCk7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5vcGVuKCk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoY2FyZE9iamVjdC5nZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpID09IGZhbHNlKSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5saWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlcbiAgICAgICAgICAudW5MaWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1c2VyXG4gICk7XG5cbiAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQodXNlcik7XG4gIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbn1cblxuLy8gY29uc3QgZm9ybUVsZW1lbnRzTGlzdCA9IEFycmF5LmZyb20oXG4vLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY3VzdG9tU2V0dGluZ3MuZm9ybVNlbGVjdG9yKVxuLy8gKTtcblxuLy8gY29uc3QgZm9ybVZhbGlkYXRvck9iamVjdExpc3QgPSBmb3JtRWxlbWVudHNMaXN0Lm1hcCgoZm9ybSkgPT4ge1xuLy8gICBjb25zdCBmb3JtT2JqZWN0ID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGZvcm0pO1xuLy8gICBmb3JtT2JqZWN0LmVuYWJsZVZhbGlkYXRpb24oKTtcbi8vICAgcmV0dXJuIGZvcm1PYmplY3Q7XG4vLyB9KTtcblxuLy8gY29uc3QgZWRpdFByb2ZpbGVGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbi8vICAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kZGVzY3JpcHRpb25cIlxuLy8gKTtcblxuLy8gY29uc3QgYWRkQ2FyZEZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuLy8gICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRsaW5rXCJcbi8vICk7XG5cbi8vIGNvbnN0IGVkaXRBdmF0YXJGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbi8vICAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJhdmF0YXJmb3JtXCJcbi8vICk7XG5jb25zdCBhZGRQcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBjdXN0b21TZXR0aW5ncyxcbiAgZWRpdFByb2ZpbGVGb3JtXG4pO1xuYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdG9yKCk7XG5jb25zdCBhZGRJbWFnZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjdXN0b21TZXR0aW5ncywgYWRkQ2FyZEZvcm0pO1xuYWRkSW1hZ2VGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuY29uc3QgYWRkQXZhdGFyRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKFxuICBjdXN0b21TZXR0aW5ncyxcbiAgZWRpdEF2YXRhckZvcm1cbik7XG5hZGRBdmF0YXJGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRvcigpO1xuXG5jb25zdCBhZGRBdmF0YXJGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjYXZhdGFyLXBvcHVwXCIsICh2YWx1ZXMpID0+IHtcbiAgYXZhdGFySW1nLnNyYyA9IHZhbHVlcy5hdmF0YXI7XG4gIGFkZEF2YXRhckZvcm0uc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC5wYXRjaFVzZXJBdmF0YXIodmFsdWVzKVxuICAgIC50aGVuKGFkZEF2YXRhckZvcm1WYWxpZGF0b3IuY2xvc2UoKSlcbiAgICAudGhlbihhZGRBdmF0YXJGb3JtLnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkQXZhdGFyRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGRQcm9maWxlRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKHZhbHVlcykgPT4ge1xuICB1c2VyLnNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lOiB2YWx1ZXMubmFtZSwgYWJvdXQ6IHZhbHVlcy50aXRsZSB9KTtcbiAgYWRkUHJvZmlsZUZvcm0uc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC5wYXRjaFVzZXJJbmZvKHVzZXIuZ2V0VXNlckluZm8oKSlcbiAgICAudGhlbihhZGRQcm9maWxlRm9ybS5jbG9zZSgpKVxuICAgIC50aGVuKGFkZFByb2ZpbGVGb3JtLnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkUHJvZmlsZUZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkTmV3Q2FyZEZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKCkgPT4ge1xuICBjb25zdCBuZXdDYXJkSW5mbyA9IHtcbiAgICBuYW1lOiBpbWFnZU5hbWVJbnB1dC52YWx1ZSxcbiAgICBsaW5rOiBpbWFnZUxpbmtJbnB1dC52YWx1ZSxcbiAgICBsaWtlczogW10sXG4gICAgb3duZXI6IHVzZXIuZ2V0VXNlckluZm8oKSxcbiAgfTtcblxuICBhZGROZXdDYXJkRm9ybS5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnVwbG9hZENhcmQobmV3Q2FyZEluZm8pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZGF0YSB9KTtcblxuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIG5ld0NhcmRJbmZvLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0pXG5cbiAgICAudGhlbihhZGRDYXJkRm9ybS5yZXNldCgpKVxuICAgIC50aGVuKGFkZEltYWdlRm9ybVZhbGlkYXRvci5zZXRCdXR0b25JbmFjdGl2ZSgpKVxuICAgIC50aGVuKGFkZE5ld0NhcmRGb3JtLmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkTmV3Q2FyZEZvcm0uc2V0bG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGROZXdDYXJkRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXG4gIFwiI2RlbGV0ZS1wb3B1cFwiLFxuICAoY2FyZE9ialRvRGVsZXRlKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkT2JqVG9EZWxldGUuZ2V0SWQoKSlcbiAgICAgIC50aGVuKGNhcmRPYmpUb0RlbGV0ZS5kZWxldGVGcm9tUGFnZSgpKVxuICAgICAgLnRoZW4oZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5lZGl0QXZhdGFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZEF2YXRhckZvcm0ub3BlbigpO1xufSk7XG5cbmFkZENhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkTmV3Q2FyZEZvcm0ub3BlbigpO1xufSk7XG5cbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXIuZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJuYW1lO1xuICB0aXRsZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJpbmZvO1xuICBhZGRQcm9maWxlRm9ybS5vcGVuKCk7XG5cbiAgYWRkUHJvZmlsZUZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRVc2VySW5mbyIsInBhdGNoVXNlckF2YXRhciIsImluZm8iLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGNoVXNlckluZm8iLCJkZWxldGVDYXJkIiwiaWQiLCJ1cGxvYWRDYXJkIiwibGlrZUNhcmQiLCJ1bkxpa2VDYXJkIiwiQ2FyZCIsImRhdGEiLCJ0ZW1wbGF0ZVNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJoYW5kbGVMaWtlQ2xpY2siLCJjdXJyZW50VXNlciIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVEZWxldGVDbGljayIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfY2FyZE5hbWUiLCJuYW1lIiwiX2NhcmRMaW5rIiwibGluayIsIl9saWtlcyIsImxpa2VzIiwiX293bmVyIiwib3duZXIiLCJfaWQiLCJfY3VycmVudFVzZXIiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9jYXJkSW1hZ2UiLCJfbGlrZUJ1dHRvbiIsIl9kZWxldGVCdXR0b24iLCJfZGVsZXRlQnV0dG9uSW1hZ2UiLCJfbnVtTGlrZXNUZXh0IiwiX2lzTGlrZWRCeUN1cnJlbnRVc2VyIiwiZ2V0SWQiLCJjcmVhdGVDYXJkRWxlbWVudCIsInVzZXJEYXRhIiwiX2dldEVsZW1lbnQiLCJfaGVhcnQiLCJfc2V0SW1hZ2VBbmROYW1lIiwiX2xvYWRMaWtlcyIsIl9zZXRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImxpa2UiLCJfdG9nZ2xlTGlrZXNJbWFnZSIsImdldElzTGlrZWRCeUN1cnJlbnRVc2VyIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsIl9saWtlIiwiX3RvZ2dsZUlzTGlrZWQiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJzZXRMaWtlcyIsImxpa2VzQXJyYXkiLCJzdHlsZSIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwiaW5wdXRMaXN0Iiwic29tZSIsImlucHV0RWxlbWVudCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2V0dGluZ3MiLCJfZm9ybUVsZW1lbnQiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJidXR0b25FbGVtZW50IiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJkaXNhYmxlZCIsImFkZCIsImlucHV0RXJyb3JDbGFzcyIsImlucHV0SWQiLCJlcnJvck1lc3NhZ2UiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImVycm9yRWxlbWVudCIsImVycm9yQ2xhc3MiLCJlbmFibGVWYWxpZGF0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwicHJldmVudERlZmF1bHQiLCJyZXNldFZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsIl9wb3B1cCIsIl9idXR0b24iLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2Zvcm0iLCJfY2FyZFRvRGVsZXRlIiwic2V0Q2FyZFRvRGVsZXRlIiwiY2FyZE9iaiIsIlBvcHVwV2l0aEZvcm0iLCJfYnV0dG9uVGV4dCIsIl9vcmlnaW5hVHRleHQiLCJzZXRMb2FkaW5nVGV4dCIsImlzTG9hZGluZyIsIl9vcmlnaW5hbFRleHQiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dHMiLCJpbnB1dE9iaiIsImlucHV0IiwidmFsdWUiLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3NldERhdGFJbWFnZVBvcHVwIiwiaW1hZ2VQb3B1cFBpYyIsImltYWdlUG9wdXBUZXh0Iiwic3JjIiwiYWx0IiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtc0FycmF5IiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInNldEl0ZW1zIiwiY2xlYXIiLCJpbm5lckhUTUwiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInVzZXJBdmF0YXIiLCJ1c2VyTmFtZUVsZW1lbnQiLCJ1c2VySm9iRWxlbWVudCIsInVzZXJBdmF0YXJFbGVtZW50Iiwic2V0VXNlckluZm8iLCJhYm91dCIsImF2YXRhciIsInNldFVzZXJJbmZvVGV4dE9ubHkiLCJuZXdPYmplY3QiLCJpbml0aWFsQ2FyZHMiLCJjdXN0b21TZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJNb2RhbCIsImVkaXRBdmF0YXJGb3JtIiwiZWRpdEF2YXRhckJ1dHRvbiIsImF2YXRhckltZyIsIm5hbWVUZXh0IiwidGl0bGVUZXh0IiwibmFtZUlucHV0IiwidGl0bGVJbnB1dCIsImltYWdlTmFtZUlucHV0IiwiaW1hZ2VMaW5rSW5wdXQiLCJpbWFnZVBvcHVwT2JqZWN0IiwiYXV0aG9yaXphdGlvbiIsInJlc3VsdCIsImFwaSIsInVzZXIiLCJjYXJkR3JpZE9iamVjdCIsInJlbmRlckNhcmQiLCJkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0IiwiY2F0Y2giLCJlcnIiLCJjYXJkQ29udGFpbmVyIiwiY2FyZFBvcHVwT2JqZWN0IiwiZGVsZXRlUG9wdXBPYmplY3QiLCJjYXJkT2JqZWN0IiwibmV3Q2FyZCIsImFkZFByb2ZpbGVGb3JtVmFsaWRhdG9yIiwiYWRkSW1hZ2VGb3JtVmFsaWRhdG9yIiwiYWRkQXZhdGFyRm9ybVZhbGlkYXRvciIsImFkZEF2YXRhckZvcm0iLCJ2YWx1ZXMiLCJhZGRQcm9maWxlRm9ybSIsInRpdGxlIiwiYWRkTmV3Q2FyZEZvcm0iLCJuZXdDYXJkSW5mbyIsInNldEJ1dHRvbkluYWN0aXZlIiwic2V0bG9hZGluZ1RleHQiLCJjYXJkT2JqVG9EZWxldGUiLCJkZWxldGVGcm9tUGFnZSIsInVzZXJJbnB1dCIsInVzZXJuYW1lIiwidXNlcmluZm8iXSwic291cmNlUm9vdCI6IiJ9