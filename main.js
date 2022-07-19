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
  } // _toggleButtonState(inputList, buttonElement) {
  //   if (this._hasInvalidInput(inputList)) {
  //     this._disableButton(buttonElement);
  //   } else {
  //     this._enableButton(buttonElement);
  //   }
  // }


  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  } // _disableButton(buttonElement) {
  //   buttonElement.classList.add(this.settings.inactiveButtonClass);
  // }
  // _enableButton(buttonElement) {
  //   buttonElement.classList.remove(this.settings.inactiveButtonClass);
  // }


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUI7RUFDbkIvQixHQUFHLENBQ0EvSyxVQURILENBQ2M4TSxlQUFlLENBQUN6SyxLQUFoQixFQURkLEVBRUdwRCxJQUZILENBRVE2TixlQUFlLENBQUNDLGNBQWhCLEVBRlIsRUFHRzlOLElBSEgsQ0FHUWtNLHlCQUF5QixDQUFDbEYsS0FBMUIsRUFIUixFQUlHbUYsS0FKSCxDQUlVQyxHQUFELElBQVM7SUFDZC9ILE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEgsR0FBWjtFQUNELENBTkg7QUFPRCxDQVYrQixDQUFsQztBQVlBRix5QkFBeUIsQ0FBQzVFLGlCQUExQjtBQUVBNkQsZ0JBQWdCLENBQUNsSCxnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsTUFBTTtFQUMvQ29KLHlCQUF5QixDQUFDbEcsSUFBMUI7QUFDRCxDQUZEO0FBSUE2RCxhQUFhLENBQUMvRyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxNQUFNO0VBQzVDeUosc0JBQXNCLENBQUN2RyxJQUF2QjtBQUNELENBRkQ7QUFJQTBELGlCQUFpQixDQUFDNUcsZ0JBQWxCLENBQW1DLE9BQW5DLEVBQTRDLE1BQU07RUFDaEQsTUFBTThKLFNBQVMsR0FBR2hDLElBQUksQ0FBQ3hMLFdBQUwsRUFBbEI7RUFDQWdMLFNBQVMsQ0FBQ2pELEtBQVYsR0FBa0J5RixTQUFTLENBQUNDLFFBQTVCO0VBQ0F4QyxVQUFVLENBQUNsRCxLQUFYLEdBQW1CeUYsU0FBUyxDQUFDRSxRQUE3QjtFQUNBVCwwQkFBMEIsQ0FBQ3JHLElBQTNCLEdBSmdELENBTWhEO0VBRUE7RUFDQTs7RUFFQTRGLHFCQUFxQixDQUFDckgsY0FBdEI7QUFDRCxDQVpELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9wYWdlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWUvYXZhdGFyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VySW5mbyhpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBpIH07XG4iLCJjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgZGF0YSxcbiAgICB0ZW1wbGF0ZVNlbGVjdG9yLFxuICAgIGhhbmRsZUNhcmRDbGljayxcbiAgICBoYW5kbGVEZWxldGVDbGljayxcbiAgICBoYW5kbGVMaWtlQ2xpY2ssXG4gICAgY3VycmVudFVzZXJcbiAgKSB7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrID0gaGFuZGxlRGVsZXRlQ2xpY2s7XG4gICAgdGhpcy5faGFuZGxlTGlrZUNsaWNrID0gaGFuZGxlTGlrZUNsaWNrOyBcbiAgICB0aGlzLl9jYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9jYXJkTGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fb3duZXIgPSBkYXRhLm93bmVyO1xuICAgIHRoaXMuX2lkID0gZGF0YS5pZDtcbiAgICB0aGlzLl9jdXJyZW50VXNlciA9IGN1cnJlbnRVc2VyO1xuICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgIHRoaXMuX2VsZW1lbnQ7XG4gICAgdGhpcy5fY2FyZEltYWdlO1xuXG4gICAgdGhpcy5fbGlrZUJ1dHRvbjtcbiAgICB0aGlzLl9kZWxldGVCdXR0b247XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2U7XG4gICAgdGhpcy5fbnVtTGlrZXNUZXh0O1xuICAgIHRoaXMuX2lzTGlrZWRCeUN1cnJlbnRVc2VyO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgY3JlYXRlQ2FyZEVsZW1lbnQodXNlckRhdGEpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jYXJkX19kZWxldGUtaW1hZ2VcIlxuICAgICk7XG4gICAgdGhpcy5faGVhcnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1pbWFnZVwiKTtcblxuICAgIHRoaXMuX251bUxpa2VzVGV4dCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLXRleHRcIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG5cbiAgICBpZiAodXNlckRhdGEuZ2V0VXNlckluZm8oKS5uYW1lID09PSB0aGlzLl9vd25lci5uYW1lKSB7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5fc2V0SW1hZ2VBbmROYW1lKCk7XG4gICAgdGhpcy5fbG9hZExpa2VzKCk7XG5cbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVyKCk7XG5cbiAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IGZhbHNlO1xuICAgIHRoaXMuX2xpa2VzLmZvckVhY2goKGxpa2UpID0+IHtcbiAgICAgIGlmIChsaWtlLl9pZCA9PT0gdXNlckRhdGEuZ2V0VXNlckluZm8oKS5pZCkge1xuICAgICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUxpa2VzSW1hZ2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBnZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXI7XG4gIH1cbiAgX2dldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcmRUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgX3NldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gdGhpcy5fbGlrZShldnQpKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLl9oYW5kbGVEZWxldGVDbGljaygpXG4gICAgKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUlzTGlrZWQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIpO1xuICAgIGlmICh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5faXNMaWtlZEJ5Q3VycmVudFVzZXIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlciA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLl9pc0xpa2VkQnlDdXJyZW50VXNlcik7XG4gIH1cblxuICBfdG9nZ2xlTGlrZXNJbWFnZSgpIHtcbiAgICB0aGlzLl9oZWFydC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZV9hY3RpdmVcIik7XG4gIH1cbiAgX2xpa2UoZXZ0KSB7XG4gICAgdGhpcy5fdG9nZ2xlTGlrZXNJbWFnZSgpO1xuICAgIHRoaXMuX2hhbmRsZUxpa2VDbGljaygpO1xuICAgIHRoaXMuX3RvZ2dsZUlzTGlrZWQoKTtcbiAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gIH1cblxuICBzZXRMaWtlcyhsaWtlc0FycmF5KSB7XG4gICAgdGhpcy5fbGlrZXMgPSBsaWtlc0FycmF5O1xuICAgIHRoaXMuX251bUxpa2VzVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIGRlbGV0ZUZyb21QYWdlID0gKCkgPT4ge1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gIH07XG5cbiAgX2xvYWRMaWtlcygpIHtcbiAgICBpZiAodGhpcy5fbGlrZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fbnVtTGlrZXNUZXh0LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9udW1MaWtlc1RleHQudGV4dENvbnRlbnQgPSAwO1xuICAgIH1cbiAgfVxuICBfc2V0SW1hZ2VBbmROYW1lKCkge1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zdHlsZSA9IGBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3RoaXMuX2NhcmRMaW5rfSk7YDtcbiAgICB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9jYXJkTmFtZTtcbiAgfVxufVxuXG5leHBvcnQgeyBDYXJkIH07XG4iLCJpbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWxlbWVudCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKTtcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICBjbGVhckFsbEVycm9ycygpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmlucHV0U2VsZWN0b3IpXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAvLyAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAvLyAgICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIGJ1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCkge1xuICAvLyAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICAvLyB9XG5cbiAgLy8gX2VuYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KSB7XG4gIC8vICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIC8vIH1cblxuICBzZXRCdXR0b25JbmFjdGl2ZSgpIHtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgfVxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgRm9ybVZhbGlkYXRvciB9O1xuIiwiY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIC8qIFRoZSB2aXNpYmxlIGNsYXNzIG92ZXJyaWRlcyB0aGUgcHJldmlvdXMgY2xhc3MgYmVjYXVzZSBpdHMgZmFydGhlciBkb3duIHRoZSBwYWdlLiBzZWUgbW9kYWwuY3NzLiovXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcbiAgICAgIFwicG9wdXBfb3BlblwiXG4gICAgKTsgLyphY3RpdmF0ZSBhIGNsYXNzIHRoYXQgbWFrZXMgaXQgdmlzaWJsZSovXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7IC8vY2xvc2Ugb24gZXNjXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgXCJwb3B1cF9vcGVuXCJcbiAgICApOyAvKmRlYWN0aXZhdGUgYSBjbGFzcyB0aGF0IG1ha2VzIGl0IHZpc2libGUqL1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+IHtcbiAgICAvL3RoaXMgaXMgYW4gYXJyb3cgZnVuY3Rpb25cbiAgICAvL3RoYXQgd2F5LCB3ZSBkbyBub3QgaGF2ZSB0byBjcmVhdGUgYW4gYXJyb3cgZnVuY3Rpb24gd2hlbiBzZXR0aW5nIHRoZSBldmVudCBsaXN0ZW5lclxuICAgIC8vYWxzbyBiZWNhdXNlIHdlIGRvIG5vdCBjcmVhdGUgYSBuZXcgYXJyb3cgZnVuY3Rpb24gd2hlbiBzZXR0aW5nIGV2ZW50IGxpc3RlbmVyLCB3ZSBjYW4gcmVtb3ZlIHRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvL2Nsb3NlIHdoZW4gWCBpcyBjbGlja2VkXG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XG4gICAgICAvL3VzZSBtb3VzZWRvd24gc28gdGhhdCBpZiB1c2VyIGNsaWNrcyBvbiBib3ggYW5kIGRyYWdzIG91dHNpZGUsIHRoaXMgZXZlbnQgZG9lcyBub3QgdHJpZ2dlclxuICAgICAgLy9vbmx5IHRyaWdnZXJzIGlmIHRoZXkgY2xpY2sgb3V0c2lkZSBtb2RhbCBib3hcblxuICAgICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXBcIikpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwO1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcblxuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZTtcbiAgfVxuXG4gIHNldENhcmRUb0RlbGV0ZShjYXJkT2JqKSB7XG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlID0gY2FyZE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9jYXJkVG9EZWxldGUpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTtcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5jbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG5cbiAgICBjb25zdCBpbnB1dE9iaiA9IHt9O1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRPYmpbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnB1dE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEZvcm07XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgfVxuICBfc2V0RGF0YUltYWdlUG9wdXAoKSB7XG4gICAgY29uc3QgaW1hZ2VQb3B1cFBpYyA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgY29uc3QgaW1hZ2VQb3B1cFRleHQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgaW1hZ2VQb3B1cFBpYy5zcmMgPSB0aGlzLmxpbms7XG4gICAgaW1hZ2VQb3B1cFRleHQudGV4dENvbnRlbnQgPSB0aGlzLm5hbWU7XG4gICAgaW1hZ2VQb3B1cFBpYy5hbHQgPSB0aGlzLm5hbWU7XG4gIH1cbiAgb3BlbihcbiAgICBkYXRhIC8vZGF0YSBjb250YWlucyBuYW1lIGFuZCBsaW5rLiBzZW50IGhlcmUgYW5kIG5vdCBpbiB0aGUgY29uc3RydWN0b3JcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMubGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9zZXREYXRhSW1hZ2VQb3B1cCgpO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhJbWFnZTtcbiIsImNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjtcbiIsImNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyB1c2VyTmFtZSwgdXNlckpvYiwgdXNlckF2YXRhciB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyQXZhdGFyKTtcbiAgfVxuICBzZXRVc2VySW5mbyh7IG5hbWUsIGFib3V0LCBhdmF0YXIsIF9pZCB9KSB7XG4gICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50LnNyYyA9IGF2YXRhcjtcbiAgICB0aGlzLmlkID0gX2lkO1xuICB9XG5cbiAgc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IGFib3V0O1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgY29uc3QgbmV3T2JqZWN0ID0ge1xuICAgICAgbmFtZTogdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBhYm91dDogdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgIH07XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxufVxuXG5leHBvcnQgeyBVc2VySW5mbyB9O1xuIiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiU2Fzc2FmcmFzIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5ODU1OTA2OTM1Mi0zZDg0MzdiMGQ0MmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkFuZ2VsIFRyZWVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjExODU5MzI4MDUzLTNjYmM5ZjkzOTlmND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzI2JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTXlydGxlIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzg1ODc5NzE3NS1iN2RiYTNjNWM4ZmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVGw4ZkcxNWNuUnNaU1V5TUdKbFlXTm9KVEl3YzI5MWRHZ2xNakJqWVhKdmJHbHVZWHhsYm53d2ZId3dmSHclM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJFZGlzdG8gQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ2MTg4OTk0LWZlYTBlY2JiMDRhND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9Njg3JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVGFibGUgUm9jayBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc5MTI2ODk0MzAtMjhkNjYyNGZlNDY3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2NtOW1hV3hsTFhCaFoyVjhOM3g4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ29uZ2FyZWUgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTU2NTMwNTE5NjgtNjljMmIwZTQzMzQ3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGN1c3RvbVNldHRpbmdzID0ge1xuICBmb3JtU2VsZWN0b3I6IFwiLnBvcHVwX19mb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcInBvcHVwX19zYXZlLWJ1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbiAgcHJvZmlsZUltYWdlU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2F2YXRhclwiLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbi8vSW1wb3J0IGNsYXNzZXNcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuLi9jb21wb25lbnRzL0FwaS5qc1wiO1xuXG5pbXBvcnQgeyBGb3JtVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xuXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuXG5pbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50cy5qc1wiO1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5cbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qc1wiO1xuXG4vLyBCdXR0b25zIGFuZCBvdGhlciBET00gZWxlbWVudHNcblxuY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hdmF0YXItYnV0dG9uXCIpO1xuY29uc3QgYXZhdGFySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXJcIik7XG5cbi8vIEZvcm0gZGF0YVxuY29uc3QgbmFtZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpO1xuY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpO1xuY29uc3QgdGl0bGVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XG5jb25zdCBpbWFnZU5hbWVJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGxhY2UtbmFtZVwiXScpO1xuY29uc3QgaW1hZ2VMaW5rSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImxpbmtcIl0nKTtcblxuY29uc3QgaW1hZ2VQb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuaW1hZ2VQb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vL1Rva2VuIGFuZCBJRCBpbmZvXG4vL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbmZldGNoKFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMi91c2Vycy9tZVwiLCB7XG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICB9LFxufSlcbiAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gIH0pO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlckluZm8oe1xuICB1c2VyTmFtZTogXCIucHJvZmlsZV9faW5mby1uYW1lXCIsXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX2luZm8tdGl0bGVcIixcbiAgdXNlckF2YXRhcjogXCIucHJvZmlsZV9fYXZhdGFyXCIsXG59KTtcblxuLy8gZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QpXG4vLyB7XG4vLyAgIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChkYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcbi8vICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbi8vICAgfSk7XG5cbi8vICAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQoKTtcbi8vICAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xuLy8gfVxuXG5jb25zdCBjYXJkR3JpZE9iamVjdCA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgaXRlbXM6IG51bGwsXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBcIi5waG90by1ncmlkX19jYXJkc1wiXG4pO1xuXG5hcGlcbiAgLmdldFVzZXJJbmZvKClcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICB1c2VyLnNldFVzZXJJbmZvKGRhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG4gIC50aGVuKCgpID0+IHtcbiAgICBhcGlcbiAgICAgIC5nZXRJbml0aWFsQ2FyZHMoKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5zZXRJdGVtcyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5yZW5kZXJJdGVtcygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0LCBkZWxldGVQb3B1cE9iamVjdCkge1xuICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5zZXRDYXJkVG9EZWxldGUoY2FyZE9iamVjdCk7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5vcGVuKCk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoY2FyZE9iamVjdC5nZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpID09IGZhbHNlKSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5saWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlcbiAgICAgICAgICAudW5MaWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1c2VyXG4gICk7XG5cbiAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQodXNlcik7XG4gIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbn1cblxuY29uc3QgZm9ybUVsZW1lbnRzTGlzdCA9IEFycmF5LmZyb20oXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY3VzdG9tU2V0dGluZ3MuZm9ybVNlbGVjdG9yKVxuKTtcblxuY29uc3QgZm9ybVZhbGlkYXRvck9iamVjdExpc3QgPSBmb3JtRWxlbWVudHNMaXN0Lm1hcCgoZm9ybSkgPT4ge1xuICBjb25zdCBmb3JtT2JqZWN0ID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGZvcm0pO1xuICBmb3JtT2JqZWN0LmVuYWJsZVZhbGlkYXRpb24oKTtcbiAgcmV0dXJuIGZvcm1PYmplY3Q7XG59KTtcblxuY29uc3QgZWRpdFByb2ZpbGVGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kZGVzY3JpcHRpb25cIlxuKTtcblxuY29uc3QgYWRkQ2FyZEZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRsaW5rXCJcbik7XG5cbmNvbnN0IGVkaXRBdmF0YXJGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJhdmF0YXJmb3JtXCJcbik7XG5cbmNvbnN0IGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjYXZhdGFyLXBvcHVwXCIsXG4gICh2YWx1ZXMpID0+IHtcbiAgICBhdmF0YXJJbWcuc3JjID0gdmFsdWVzLmF2YXRhcjtcbiAgICBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICAgIGFwaVxuICAgICAgLnBhdGNoVXNlckF2YXRhcih2YWx1ZXMpXG4gICAgICAudGhlbihlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAudGhlbihlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjZWRpdC1wb3B1cFwiLFxuICAodmFsdWVzKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mb1RleHRPbmx5KHsgbmFtZTogdmFsdWVzLm5hbWUsIGFib3V0OiB2YWx1ZXMudGl0bGUgfSk7XG4gICAgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gICAgYXBpXG4gICAgICAucGF0Y2hVc2VySW5mbyh1c2VyLmdldFVzZXJJbmZvKCkpXG4gICAgICAudGhlbihlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLnRoZW4oZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoKSA9PiB7XG4gIGNvbnN0IG5ld0NhcmRJbmZvID0ge1xuICAgIG5hbWU6IGltYWdlTmFtZUlucHV0LnZhbHVlLFxuICAgIGxpbms6IGltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIGxpa2VzOiBbXSxcbiAgICBvd25lcjogdXNlci5nZXRVc2VySW5mbygpLFxuICB9O1xuXG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC51cGxvYWRDYXJkKG5ld0NhcmRJbmZvKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IGRhdGEgfSk7XG5cbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBuZXdDYXJkSW5mbyxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9KVxuXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm0ucmVzZXQoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybU9iamVjdC5zZXRCdXR0b25JbmFjdGl2ZSgpKVxuICAgIC50aGVuKGFkZENhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldGxvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXG4gIFwiI2RlbGV0ZS1wb3B1cFwiLFxuICAoY2FyZE9ialRvRGVsZXRlKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkT2JqVG9EZWxldGUuZ2V0SWQoKSlcbiAgICAgIC50aGVuKGNhcmRPYmpUb0RlbGV0ZS5kZWxldGVGcm9tUGFnZSgpKVxuICAgICAgLnRoZW4oZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5lZGl0QXZhdGFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmFkZENhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG59KTtcblxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcklucHV0ID0gdXNlci5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcm5hbWU7XG4gIHRpdGxlSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcmluZm87XG4gIGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcblxuICAvL3VzZXIuZ2V0VXNlckluZm8oKTtcblxuICAvL25hbWVJbnB1dC52YWx1ZSA9IG5hbWVUZXh0LnRleHRDb250ZW50O1xuICAvL3RpdGxlSW5wdXQudmFsdWUgPSB0aXRsZVRleHQudGV4dENvbnRlbnQ7XG5cbiAgZWRpdFByb2ZpbGVGb3JtT2JqZWN0LmNsZWFyQWxsRXJyb3JzKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRVc2VySW5mbyIsInBhdGNoVXNlckF2YXRhciIsImluZm8iLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGNoVXNlckluZm8iLCJkZWxldGVDYXJkIiwiaWQiLCJ1cGxvYWRDYXJkIiwibGlrZUNhcmQiLCJ1bkxpa2VDYXJkIiwiQ2FyZCIsImRhdGEiLCJ0ZW1wbGF0ZVNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJoYW5kbGVMaWtlQ2xpY2siLCJjdXJyZW50VXNlciIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9oYW5kbGVEZWxldGVDbGljayIsIl9oYW5kbGVMaWtlQ2xpY2siLCJfY2FyZE5hbWUiLCJuYW1lIiwiX2NhcmRMaW5rIiwibGluayIsIl9saWtlcyIsImxpa2VzIiwiX293bmVyIiwib3duZXIiLCJfaWQiLCJfY3VycmVudFVzZXIiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9jYXJkSW1hZ2UiLCJfbGlrZUJ1dHRvbiIsIl9kZWxldGVCdXR0b24iLCJfZGVsZXRlQnV0dG9uSW1hZ2UiLCJfbnVtTGlrZXNUZXh0IiwiX2lzTGlrZWRCeUN1cnJlbnRVc2VyIiwiZ2V0SWQiLCJjcmVhdGVDYXJkRWxlbWVudCIsInVzZXJEYXRhIiwiX2dldEVsZW1lbnQiLCJfaGVhcnQiLCJfc2V0SW1hZ2VBbmROYW1lIiwiX2xvYWRMaWtlcyIsIl9zZXRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImxpa2UiLCJfdG9nZ2xlTGlrZXNJbWFnZSIsImdldElzTGlrZWRCeUN1cnJlbnRVc2VyIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsIl9saWtlIiwiX3RvZ2dsZUlzTGlrZWQiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJzZXRMaWtlcyIsImxpa2VzQXJyYXkiLCJzdHlsZSIsImN1c3RvbVNldHRpbmdzIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJpbnB1dEVycm9yQ2xhc3MiLCJhZGQiLCJlcnJvckNsYXNzIiwiX2hpZGVJbnB1dEVycm9yIiwiY2xlYXJBbGxFcnJvcnMiLCJpbnB1dExpc3QiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJ2YWxpZGl0eSIsInZhbGlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGFzSW52YWxpZElucHV0Iiwic29tZSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImJ1dHRvbkVsZW1lbnQiLCJkaXNhYmxlZCIsInNldEJ1dHRvbkluYWN0aXZlIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfZGlzYWJsZUJ1dHRvbiIsImVuYWJsZVZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsIl9wb3B1cCIsIl9idXR0b24iLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2Zvcm0iLCJfY2FyZFRvRGVsZXRlIiwic2V0Q2FyZFRvRGVsZXRlIiwiY2FyZE9iaiIsInByZXZlbnREZWZhdWx0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfc2V0RGF0YUltYWdlUG9wdXAiLCJpbWFnZVBvcHVwUGljIiwiaW1hZ2VQb3B1cFRleHQiLCJzcmMiLCJhbHQiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zQXJyYXkiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwic2V0SXRlbXMiLCJjbGVhciIsImlubmVySFRNTCIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlckF2YXRhciIsInVzZXJOYW1lRWxlbWVudCIsInVzZXJKb2JFbGVtZW50IiwidXNlckF2YXRhckVsZW1lbnQiLCJzZXRVc2VySW5mbyIsImFib3V0IiwiYXZhdGFyIiwic2V0VXNlckluZm9UZXh0T25seSIsIm5ld09iamVjdCIsImluaXRpYWxDYXJkcyIsImZvcm1TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJCdXR0b24iLCJhdmF0YXJJbWciLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwiaW1hZ2VQb3B1cE9iamVjdCIsImF1dGhvcml6YXRpb24iLCJyZXN1bHQiLCJhcGkiLCJ1c2VyIiwiY2FyZEdyaWRPYmplY3QiLCJyZW5kZXJDYXJkIiwiZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCIsImNhdGNoIiwiZXJyIiwiY2FyZENvbnRhaW5lciIsImNhcmRQb3B1cE9iamVjdCIsImRlbGV0ZVBvcHVwT2JqZWN0IiwiY2FyZE9iamVjdCIsIm5ld0NhcmQiLCJmb3JtRWxlbWVudHNMaXN0IiwiZm9ybVZhbGlkYXRvck9iamVjdExpc3QiLCJtYXAiLCJmb3JtIiwiZm9ybU9iamVjdCIsImVkaXRQcm9maWxlRm9ybU9iamVjdCIsImZpbmQiLCJvYmoiLCJnZXRBdHRyaWJ1dGUiLCJhZGRDYXJkRm9ybU9iamVjdCIsImVkaXRBdmF0YXJGb3JtT2JqZWN0IiwiZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdCIsInZhbHVlcyIsInNldExvYWRpbmdUZXh0IiwiZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QiLCJ0aXRsZSIsImFkZENhcmRGb3JtUG9wdXBPYmplY3QiLCJuZXdDYXJkSW5mbyIsInNldGxvYWRpbmdUZXh0IiwiY2FyZE9ialRvRGVsZXRlIiwiZGVsZXRlRnJvbVBhZ2UiLCJ1c2VySW5wdXQiLCJ1c2VybmFtZSIsInVzZXJpbmZvIl0sInNvdXJjZVJvb3QiOiIifQ==