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
/* harmony export */   "FormValidator": () => (/* binding */ FormValidator)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/components/constants.js");


class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(".".concat(inputElement.id, "-error"));
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.add(this.settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(".".concat(inputElement.id, "-error"));
    errorElement.classList.add(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = "";
  }

  clearAllErrors() {
    const inputList = Array.from(this.formElement.querySelectorAll(_constants_js__WEBPACK_IMPORTED_MODULE_0__.customSettings.inputSelector));
    inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this.settings.inactiveButtonClass);
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this.settings.inactiveButtonClass);
  }

  setButtonInactive() {
    const buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);

    this._disableButton(buttonElement);
  }

  enableValidation() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
    const buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

}



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
      //this is an arrow function
      //that way, we do not have to create an arrow function when setting the event listener
      //also because we do not create a new arrow function when setting event listener, we can remove this event listener
      if (evt.key === "Escape") {
        this.close();
      }
    });

    this._popup = document.querySelector(popupSelector);
    this._button = this._popup.querySelector(".popup__close-button");
  }

  open() {
    /* The visible class overrides the previous class because its farther down the page. see modal.css.*/
    this._popup.classList.add("popup_open");
    /*activate a class that makes it visible*/


    document.addEventListener("keydown", this._handleEscClose); //close on esc
  }

  close() {
    this._popup.classList.remove("popup_open");
    /*deactivate a class that makes it visible*/


    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    //close when X is clicked
    this._button.addEventListener("click", () => this.close());

    this._popup.addEventListener("mousedown", evt => {
      //use mousedown so that if user clicks on box and drags outside, this event does not trigger
      //only triggers if they click outside modal box
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
  submitButtonSelector: ".popup__button",
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
}

const formElementsList = Array.from(document.querySelectorAll(_components_constants_js__WEBPACK_IMPORTED_MODULE_4__.customSettings.formSelector));
const formValidatorObjectList = formElementsList.map(form => {
  const formObject = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.FormValidator(_components_constants_js__WEBPACK_IMPORTED_MODULE_4__.customSettings, form);
  formObject.enableValidation();
  return formObject;
});
const editProfileFormObject = formValidatorObjectList.find(obj => obj.formElement.getAttribute("name") == "nameanddescription");
const addCardFormObject = formValidatorObjectList.find(obj => obj.formElement.getAttribute("name") == "nameandlink");
const editAvatarFormObject = formValidatorObjectList.find(obj => obj.formElement.getAttribute("name") == "avatarform");
const editAvatarFormPopupObject = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]("#avatar-popup", values => {
  avatarImg.src = values.avatar;
  editAvatarFormPopupObject.setLoadingText(true);
  api.patchUserAvatar(values).then(editAvatarFormPopupObject.close()).then(editAvatarFormPopupObject.setLoadingText(false)).catch(err => {
    console.log(err);
  });
});
editAvatarFormPopupObject.setEventListeners();
const editProfileFormPopupObject = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]("#edit-popup", values => {
  user.setUserInfoTextOnly({
    name: values.name,
    about: values.title
  });
  editProfileFormPopupObject.setLoadingText(true);
  api.patchUserInfo(user.getUserInfo()).then(editProfileFormPopupObject.close()).then(editProfileFormPopupObject.setLoadingText(false)).catch(err => {
    console.log(err);
  });
});
editProfileFormPopupObject.setEventListeners();
const addCardFormPopupObject = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]("#create-popup", () => {
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
    likes: [],
    owner: user.getUserInfo()
  };
  addCardFormPopupObject.setLoadingText(true);
  api.uploadCard(newCardInfo).then(data => {
    console.log({
      data
    });
    renderCard(cardGridObject, newCardInfo, imagePopupObject, deleteCardFormPopupObject);
  }).then(addCardForm.reset()).then(addCardFormObject.setButtonInactive()).then(addCardFormPopupObject.close()).then(addCardFormPopupObject.setloadingText(false)).catch(err => {
    console.log(err);
  });
});
addCardFormPopupObject.setEventListeners();
const deleteCardFormPopupObject = new _components_PopupWithConfirm_js__WEBPACK_IMPORTED_MODULE_9__["default"]("#delete-popup", cardObjToDelete => {
  api.deleteCard(cardObjToDelete.getId()).then(cardObjToDelete.deleteFromPage()).then(deleteCardFormPopupObject.close()).catch(err => {
    console.log(err);
  });
});
deleteCardFormPopupObject.setEventListeners();
editAvatarButton.addEventListener("click", () => {
  editAvatarFormPopupObject.open();
});
addCardButton.addEventListener("click", () => {
  addCardFormPopupObject.open();
});
editProfileButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  nameInput.value = userInput.username;
  titleInput.value = userInput.userinfo;
  editProfileFormPopupObject.open(); //user.getUserInfo();
  //nameInput.value = nameText.textContent;
  //titleInput.value = titleText.textContent;

  editProfileFormObject.clearAllErrors();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWUvYXZhdGFyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VySW5mbyhpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBpIH07XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZGF0YSxcbiAgICB0ZW1wbGF0ZVNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVEZWxldGVDbGljayxcbiAgICBoYW5kbGVMaWtlQ2xpY2ssXG4gICAgY3VycmVudFVzZXJcbiAgKSB7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrID0gaGFuZGxlRGVsZXRlQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrOyBcbiAgICB0aGlzLl9jYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9jYXJkTGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fb3duZXIgPSBkYXRhLm93bmVyO1xuICAgIHRoaXMuX2lkID0gZGF0YS5pZDtcbiAgICB0aGlzLl9jdXJyZW50VXNlciA9IGN1cnJlbnRVc2VyO1xuICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgIHRoaXMuX2VsZW1lbnQ7XG4gICAgdGhpcy5fY2FyZEltYWdlO1xuXG4gICAgdGhpcy5fbGlrZUJ1dHRvbjtcbiAgICB0aGlzLl9kZWxldGVCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2U7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0O1xuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgY3JlYXRlQ2FyZEVsZW1lbnQodXNlckRhdGEpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jYXJkX19kZWxldGUtaW1hZ2VcIlxuICAgICk7XG4gICAgdGhpcy5faGVhcnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1pbWFnZVwiKTtcblxuICAgIHRoaXMuX251bUxpa2VzVGV4dCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLXRleHRcIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG5cbiAgICBpZiAodXNlckRhdGEuZ2V0VXNlckluZm8oKS5uYW1lID09PSB0aGlzLl9vd25lci5uYW1lKSB7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5fc2V0SW1hZ2VBbmROYW1lKCk7XG4gICAgdGhpcy5fbG9hZExpa2VzKCk7XG5cbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVyKCk7XG5cbiAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IGZhbHNlO1xuICAgIHRoaXMuX2xpa2VzLmZvckVhY2goKGxpa2UpID0+IHtcbiAgICAgIGlmIChsaWtlLl9pZCA9PT0gdXNlckRhdGEuZ2V0VXNlckluZm8oKS5pZCkge1xuICAgICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUxpa2VzSW1hZ2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBnZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXI7XG4gIH1cbiAgX2dldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gdGhpcy5fbGlrZShldnQpKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVEZWxldGVDbGljaygpXG4gICAgKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUlzTGlrZWQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gIH1cblxuICBfdG9nZ2xlTGlrZXNJbWFnZSgpIHtcbiAgICB0aGlzLl9oZWFydC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gIH1cbiAgX2xpa2UoZXZ0KSB7XG4gICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljaygpO1xuICAgIHRoaXMuX3RvZ2dsZUlzTGlrZWQoKTtcbiAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gIH1cblxuICBzZXRMaWtlcyhsaWtlc0FycmF5KSB7XG4gICAgdGhpcy5fbGlrZXMgPSBsaWtlc0FycmF5O1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIGRlbGV0ZUZyb21QYWdlID0gKCkgPT4ge1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gIH07XG5cbiAgX2xvYWRMaWtlcygpIHtcbiAgICBpZiAodGhpcy5fbGlrZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSAwO1xuICAgIH1cbiAgfVxuICBfc2V0SW1hZ2VBbmROYW1lKCkge1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zdHlsZSA9IGBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3RoaXMuX2NhcmRMaW5rfSk7YDtcbiAgICB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9jYXJkTmFtZTtcbiAgfVxufVxuXG5leHBvcnQgeyBDYXJkIH07XG4iLCJpbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWxlbWVudCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICBjbGVhckFsbEVycm9ycygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmlucHV0U2VsZWN0b3IpXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxuXG4gIF9lbmFibGVCdXR0b24oYnV0dG9uRWxlbWVudCkge1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9XG5cbiAgc2V0QnV0dG9uSW5hY3RpdmUoKSB7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2V0dGluZ3MuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLnNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEZvcm1WYWxpZGF0b3IgfTtcbiIsImNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gIH1cbiAgb3BlbigpIHtcbiAgICAvKiBUaGUgdmlzaWJsZSBjbGFzcyBvdmVycmlkZXMgdGhlIHByZXZpb3VzIGNsYXNzIGJlY2F1c2UgaXRzIGZhcnRoZXIgZG93biB0aGUgcGFnZS4gc2VlIG1vZGFsLmNzcy4qL1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXG4gICAgICBcInBvcHVwX29wZW5cIlxuICAgICk7IC8qYWN0aXZhdGUgYSBjbGFzcyB0aGF0IG1ha2VzIGl0IHZpc2libGUqL1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpOyAvL2Nsb3NlIG9uIGVzY1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIFwicG9wdXBfb3BlblwiXG4gICAgKTsgLypkZWFjdGl2YXRlIGEgY2xhc3MgdGhhdCBtYWtlcyBpdCB2aXNpYmxlKi9cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PiB7XG4gICAgLy90aGlzIGlzIGFuIGFycm93IGZ1bmN0aW9uXG4gICAgLy90aGF0IHdheSwgd2UgZG8gbm90IGhhdmUgdG8gY3JlYXRlIGFuIGFycm93IGZ1bmN0aW9uIHdoZW4gc2V0dGluZyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAvL2Fsc28gYmVjYXVzZSB3ZSBkbyBub3QgY3JlYXRlIGEgbmV3IGFycm93IGZ1bmN0aW9uIHdoZW4gc2V0dGluZyBldmVudCBsaXN0ZW5lciwgd2UgY2FuIHJlbW92ZSB0aGlzIGV2ZW50IGxpc3RlbmVyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy9jbG9zZSB3aGVuIFggaXMgY2xpY2tlZFxuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xuICAgICAgLy91c2UgbW91c2Vkb3duIHNvIHRoYXQgaWYgdXNlciBjbGlja3Mgb24gYm94IGFuZCBkcmFncyBvdXRzaWRlLCB0aGlzIGV2ZW50IGRvZXMgbm90IHRyaWdnZXJcbiAgICAgIC8vb25seSB0cmlnZ2VycyBpZiB0aGV5IGNsaWNrIG91dHNpZGUgbW9kYWwgYm94XG5cbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cDtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5cbiAgICB0aGlzLl9jYXJkVG9EZWxldGU7XG4gIH1cblxuICBzZXRDYXJkVG9EZWxldGUoY2FyZE9iaikge1xuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZSA9IGNhcmRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fY2FyZFRvRGVsZXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0cyA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuXG4gICAgY29uc3QgaW5wdXRPYmogPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0T2JqW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5wdXRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhGb3JtO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gIH1cbiAgX3NldERhdGFJbWFnZVBvcHVwKCkge1xuICAgIGNvbnN0IGltYWdlUG9wdXBQaWMgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgIGNvbnN0IGltYWdlUG9wdXBUZXh0ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgIGltYWdlUG9wdXBQaWMuc3JjID0gdGhpcy5saW5rO1xuICAgIGltYWdlUG9wdXBUZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgIGltYWdlUG9wdXBQaWMuYWx0ID0gdGhpcy5uYW1lO1xuICB9XG4gIG9wZW4oXG4gICAgZGF0YSAvL2RhdGEgY29udGFpbnMgbmFtZSBhbmQgbGluay4gc2VudCBoZXJlIGFuZCBub3QgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fc2V0RGF0YUltYWdlUG9wdXAoKTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoSW1hZ2U7XG4iLCJjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gIHNldEl0ZW1zKGl0ZW1zKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cblxuICByZW5kZXJJdGVtcygpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5faXRlbXNBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEl0ZW0oZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb247XG4iLCJjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHsgdXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckpvYik7XG4gICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckF2YXRhcik7XG4gIH1cbiAgc2V0VXNlckluZm8oeyBuYW1lLCBhYm91dCwgYXZhdGFyLCBfaWQgfSkge1xuICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudC5zcmMgPSBhdmF0YXI7XG4gICAgdGhpcy5pZCA9IF9pZDtcbiAgfVxuXG4gIHNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IHtcbiAgICAgIG5hbWU6IHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICB9O1xuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cbn1cblxuZXhwb3J0IHsgVXNlckluZm8gfTtcbiIsImV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIlNhc3NhZnJhcyBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTg1NTkwNjkzNTItM2Q4NDM3YjBkNDJjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJBbmdlbCBUcmVlXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxMTg1OTMyODA1My0zY2JjOWY5Mzk5ZjQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcyNiZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIk15cnRsZSBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc4NTg3OTcxNzUtYjdkYmEzYzVjOGZjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4elpXRnlZMmg4TVRsOGZHMTVjblJzWlNVeU1HSmxZV05vSlRJd2MyOTFkR2dsTWpCallYSnZiR2x1WVh4bGJud3dmSHd3Zkh3JTNEJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiRWRpc3RvIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU0NjE4ODk5NC1mZWEwZWNiYjA0YTQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTY4NyZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRhYmxlIFJvY2sgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3OTEyNjg5NDMwLTI4ZDY2MjRmZTQ2Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdjbTltYVd4bExYQmhaMlY4TjN4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkNvbmdhcmVlIE5hdGlvbmFsIFBhcmtcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE1NjUzMDUxOTY4LTY5YzJiMGU0MzM0Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBjdXN0b21TZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5wb3B1cF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJwb3B1cF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG4gIHByb2ZpbGVJbWFnZVNlbGVjdG9yOiBcIi5wcm9maWxlX19hdmF0YXJcIixcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vL0ltcG9ydCBjbGFzc2VzXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGkuanNcIjtcblxuaW1wb3J0IHsgRm9ybVZhbGlkYXRvciB9IGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcblxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcblxuaW1wb3J0IHsgY3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHMuanNcIjtcblxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xuXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanNcIjtcblxuLy8gQnV0dG9ucyBhbmQgb3RoZXIgRE9NIGVsZW1lbnRzXG5cbmNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgYWRkQ2FyZFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBhZGRDYXJkRm9ybSA9IGFkZENhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYXZhdGFyLWJ1dHRvblwiKTtcbmNvbnN0IGF2YXRhckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpO1xuXG4vLyBGb3JtIGRhdGFcbmNvbnN0IG5hbWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVcIl0nKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJkZXNjcmlwdGlvblwiXScpO1xuY29uc3QgaW1hZ2VOYW1lSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInBsYWNlLW5hbWVcIl0nKTtcbmNvbnN0IGltYWdlTGlua0lucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsaW5rXCJdJyk7XG5cbmNvbnN0IGltYWdlUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmltYWdlUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vL0dyb3VwIElEOiBncm91cC0xMlxuXG5mZXRjaChcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTIvdXNlcnMvbWVcIiwge1xuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgfSxcbn0pXG4gIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICB9KTtcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCB1c2VyID0gbmV3IFVzZXJJbmZvKHtcbiAgdXNlck5hbWU6IFwiLnByb2ZpbGVfX2luZm8tbmFtZVwiLFxuICB1c2VySm9iOiBcIi5wcm9maWxlX19pbmZvLXRpdGxlXCIsXG4gIHVzZXJBdmF0YXI6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufSk7XG5cbi8vIGZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0KVxuLy8ge1xuLy8gICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoZGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoKSA9PiB7XG4vLyAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KCk7XG4vLyAgIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbi8vIH1cblxuY29uc3QgY2FyZEdyaWRPYmplY3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBudWxsLFxuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgXCIucGhvdG8tZ3JpZF9fY2FyZHNcIlxuKTtcblxuYXBpXG4gIC5nZXRVc2VySW5mbygpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mbyhkYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAudGhlbigoKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZ2V0SW5pdGlhbENhcmRzKClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3Quc2V0SXRlbXMocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3QucmVuZGVySXRlbXMoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdCwgZGVsZXRlUG9wdXBPYmplY3QpIHtcbiAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Quc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmplY3QpO1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Qub3BlbigpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGNhcmRPYmplY3QuZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIoKSA9PSBmYWxzZSkge1xuICAgICAgICBhcGlcbiAgICAgICAgICAubGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLnVuTGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXNlclxuICApO1xuXG4gIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KHVzZXIpO1xuICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG59XG5cbmNvbnN0IGZvcm1FbGVtZW50c0xpc3QgPSBBcnJheS5mcm9tKFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmZvcm1TZWxlY3Rvcilcbik7XG5cbmNvbnN0IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0ID0gZm9ybUVsZW1lbnRzTGlzdC5tYXAoKGZvcm0pID0+IHtcbiAgY29uc3QgZm9ybU9iamVjdCA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBmb3JtKTtcbiAgZm9ybU9iamVjdC5lbmFibGVWYWxpZGF0aW9uKCk7XG4gIHJldHVybiBmb3JtT2JqZWN0O1xufSk7XG5cbmNvbnN0IGVkaXRQcm9maWxlRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGRlc2NyaXB0aW9uXCJcbik7XG5cbmNvbnN0IGFkZENhcmRGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kbGlua1wiXG4pO1xuXG5jb25zdCBlZGl0QXZhdGFyRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwiYXZhdGFyZm9ybVwiXG4pO1xuXG5jb25zdCBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI2F2YXRhci1wb3B1cFwiLFxuICAodmFsdWVzKSA9PiB7XG4gICAgYXZhdGFySW1nLnNyYyA9IHZhbHVlcy5hdmF0YXI7XG4gICAgZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgICBhcGlcbiAgICAgIC5wYXRjaFVzZXJBdmF0YXIodmFsdWVzKVxuICAgICAgLnRoZW4oZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLnRoZW4oZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5lZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI2VkaXQtcG9wdXBcIixcbiAgKHZhbHVlcykgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWU6IHZhbHVlcy5uYW1lLCBhYm91dDogdmFsdWVzLnRpdGxlIH0pO1xuICAgIGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICAgIGFwaVxuICAgICAgLnBhdGNoVXNlckluZm8odXNlci5nZXRVc2VySW5mbygpKVxuICAgICAgLnRoZW4oZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC50aGVuKGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZENhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKCkgPT4ge1xuICBjb25zdCBuZXdDYXJkSW5mbyA9IHtcbiAgICBuYW1lOiBpbWFnZU5hbWVJbnB1dC52YWx1ZSxcbiAgICBsaW5rOiBpbWFnZUxpbmtJbnB1dC52YWx1ZSxcbiAgICBsaWtlczogW10sXG4gICAgb3duZXI6IHVzZXIuZ2V0VXNlckluZm8oKSxcbiAgfTtcblxuICBhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAudXBsb2FkQ2FyZChuZXdDYXJkSW5mbylcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBkYXRhIH0pO1xuXG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgbmV3Q2FyZEluZm8sXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSlcblxuICAgIC50aGVuKGFkZENhcmRGb3JtLnJlc2V0KCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1PYmplY3Quc2V0QnV0dG9uSW5hY3RpdmUoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRsb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFxuICBcIiNkZWxldGUtcG9wdXBcIixcbiAgKGNhcmRPYmpUb0RlbGV0ZSkgPT4ge1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZE9ialRvRGVsZXRlLmdldElkKCkpXG4gICAgICAudGhlbihjYXJkT2JqVG9EZWxldGUuZGVsZXRlRnJvbVBhZ2UoKSlcbiAgICAgIC50aGVuKGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuZWRpdEF2YXRhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXIuZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJuYW1lO1xuICB0aXRsZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJpbmZvO1xuICBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG5cbiAgLy91c2VyLmdldFVzZXJJbmZvKCk7XG5cbiAgLy9uYW1lSW5wdXQudmFsdWUgPSBuYW1lVGV4dC50ZXh0Q29udGVudDtcbiAgLy90aXRsZUlucHV0LnZhbHVlID0gdGl0bGVUZXh0LnRleHRDb250ZW50O1xuXG4gIGVkaXRQcm9maWxlRm9ybU9iamVjdC5jbGVhckFsbEVycm9ycygpO1xufSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwiZ2V0VXNlckluZm8iLCJwYXRjaFVzZXJBdmF0YXIiLCJpbmZvIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRjaFVzZXJJbmZvIiwiZGVsZXRlQ2FyZCIsImlkIiwidXBsb2FkQ2FyZCIsImxpa2VDYXJkIiwidW5MaWtlQ2FyZCIsIkNhcmQiLCJkYXRhIiwidGVtcGxhdGVTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZURlbGV0ZUNsaWNrIiwiaGFuZGxlTGlrZUNsaWNrIiwiY3VycmVudFVzZXIiLCJfZWxlbWVudCIsInJlbW92ZSIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlRGVsZXRlQ2xpY2siLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2NhcmROYW1lIiwibmFtZSIsIl9jYXJkTGluayIsImxpbmsiLCJfbGlrZXMiLCJsaWtlcyIsIl9vd25lciIsIm93bmVyIiwiX2lkIiwiX2N1cnJlbnRVc2VyIiwiX2NhcmRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJfY2FyZEltYWdlIiwiX2xpa2VCdXR0b24iLCJfZGVsZXRlQnV0dG9uIiwiX2RlbGV0ZUJ1dHRvbkltYWdlIiwiX251bUxpa2VzVGV4dCIsIl9pc0xpa2VkQnlDdXJyZW50VXNlciIsImdldElkIiwiY3JlYXRlQ2FyZEVsZW1lbnQiLCJ1c2VyRGF0YSIsIl9nZXRFbGVtZW50IiwiX2hlYXJ0IiwiX3NldEltYWdlQW5kTmFtZSIsIl9sb2FkTGlrZXMiLCJfc2V0RXZlbnRMaXN0ZW5lciIsImZvckVhY2giLCJsaWtlIiwiX3RvZ2dsZUxpa2VzSW1hZ2UiLCJnZXRJc0xpa2VkQnlDdXJyZW50VXNlciIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJfbGlrZSIsIl90b2dnbGVJc0xpa2VkIiwiY29uc29sZSIsImxvZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRleHRDb250ZW50IiwibGVuZ3RoIiwic2V0TGlrZXMiLCJsaWtlc0FycmF5Iiwic3R5bGUiLCJjdXN0b21TZXR0aW5ncyIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbGVtZW50IiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwiaW5wdXRFcnJvckNsYXNzIiwiYWRkIiwiZXJyb3JDbGFzcyIsIl9oaWRlSW5wdXRFcnJvciIsImNsZWFyQWxsRXJyb3JzIiwiaW5wdXRMaXN0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hhc0ludmFsaWRJbnB1dCIsInNvbWUiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJidXR0b25FbGVtZW50IiwiX2Rpc2FibGVCdXR0b24iLCJfZW5hYmxlQnV0dG9uIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsInNldEJ1dHRvbkluYWN0aXZlIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJlbmFibGVWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwia2V5IiwiY2xvc2UiLCJfcG9wdXAiLCJfYnV0dG9uIiwib3BlbiIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9mb3JtIiwiX2NhcmRUb0RlbGV0ZSIsInNldENhcmRUb0RlbGV0ZSIsImNhcmRPYmoiLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwV2l0aEZvcm0iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dHMiLCJpbnB1dE9iaiIsImlucHV0IiwidmFsdWUiLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3NldERhdGFJbWFnZVBvcHVwIiwiaW1hZ2VQb3B1cFBpYyIsImltYWdlUG9wdXBUZXh0Iiwic3JjIiwiYWx0IiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtc0FycmF5IiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInNldEl0ZW1zIiwiY2xlYXIiLCJpbm5lckhUTUwiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInVzZXJBdmF0YXIiLCJ1c2VyTmFtZUVsZW1lbnQiLCJ1c2VySm9iRWxlbWVudCIsInVzZXJBdmF0YXJFbGVtZW50Iiwic2V0VXNlckluZm8iLCJhYm91dCIsImF2YXRhciIsInNldFVzZXJJbmZvVGV4dE9ubHkiLCJuZXdPYmplY3QiLCJpbml0aWFsQ2FyZHMiLCJmb3JtU2VsZWN0b3IiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJCdXR0b24iLCJhdmF0YXJJbWciLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwiaW1hZ2VQb3B1cE9iamVjdCIsImF1dGhvcml6YXRpb24iLCJyZXN1bHQiLCJhcGkiLCJ1c2VyIiwiY2FyZEdyaWRPYmplY3QiLCJyZW5kZXJDYXJkIiwiZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCIsImNhdGNoIiwiZXJyIiwiY2FyZENvbnRhaW5lciIsImNhcmRQb3B1cE9iamVjdCIsImRlbGV0ZVBvcHVwT2JqZWN0IiwiY2FyZE9iamVjdCIsIm5ld0NhcmQiLCJmb3JtRWxlbWVudHNMaXN0IiwiZm9ybVZhbGlkYXRvck9iamVjdExpc3QiLCJtYXAiLCJmb3JtIiwiZm9ybU9iamVjdCIsImVkaXRQcm9maWxlRm9ybU9iamVjdCIsImZpbmQiLCJvYmoiLCJnZXRBdHRyaWJ1dGUiLCJhZGRDYXJkRm9ybU9iamVjdCIsImVkaXRBdmF0YXJGb3JtT2JqZWN0IiwiZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdCIsInZhbHVlcyIsInNldExvYWRpbmdUZXh0IiwiZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QiLCJ0aXRsZSIsImFkZENhcmRGb3JtUG9wdXBPYmplY3QiLCJuZXdDYXJkSW5mbyIsInNldGxvYWRpbmdUZXh0IiwiY2FyZE9ialRvRGVsZXRlIiwiZGVsZXRlRnJvbVBhZ2UiLCJ1c2VySW5wdXQiLCJ1c2VybmFtZSIsInVzZXJpbmZvIl0sInNvdXJjZVJvb3QiOiIifQ==