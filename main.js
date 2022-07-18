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
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } //if server returns error, reject the promise


      return Promise.reject("Error: ".concat(res.status));
    });
  }

  getUserInfo() {
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } //if server returns error, reject the promise


      return Promise.reject("Error: ".concat(res.status));
    });
  }

  patchUserAvatar(info) {
    const url = this._baseUrl + "/users/me/avatar";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info)
    });
  }

  patchUserInfo(info) {
    //user.getUserInfo() is passed in for info
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info)
    });
  }

  deleteCard(id) {
    const url = this._baseUrl + "/cards/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers
    });
  }

  uploadCard(info) {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(info)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } //if server returns error, reject the promise


      return Promise.reject("Error: ".concat(res.status));
    });
  }

  likeCard(id) {
    const url = this._baseUrl + "/cards/likes/" + id;
    return fetch(url, {
      method: "PUT",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } //if server returns error, reject the promise


      return Promise.reject("Error: ".concat(res.status));
    });
  }

  unLikeCard(id) {
    const url = this._baseUrl + "/cards/likes/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } //if server returns error, reject the promise


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
  constructor(data, templateSelector, handleCardClick) {
    _defineProperty(this, "_delete", () => {
      this._element.remove();

      this._element = null;
    });

    this._handleCardClick = handleCardClick;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardTemplate = document.querySelector(templateSelector).content.querySelector(".card");
    this._element;
    this._cardImage;
  }

  createCardElement() {
    this._element = this._getElement();

    this._setImageAndName();

    this._setEventListener();

    return this._element;
  }

  _getElement() {
    return this._cardTemplate.cloneNode(true);
  }

  _setEventListener() {
    const likeButton = this._element.querySelector(".card__like-button");

    const deleteButton = this._element.querySelector(".card__delete-button");

    likeButton.addEventListener("click", this._like);
    deleteButton.addEventListener("click", this._delete);

    const cardImage = this._element.querySelector(".card__image");

    cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _like(evt) {
    const heart = evt.target;
    heart.classList.toggle("card__active-button");
  }

  _setImageAndName() {
    this._cardImage = this._element.querySelector(".card__image");
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
;

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

  open(data) //data contains name and link. sent here and not in the constructor
  {
    this.name = data.name;
    this.link = data.link;

    this._setDataImagePopup();

    super.open();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopupWithImage);
;

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
      newName,
      newJob,
      newAvatar
    } = _ref2;
    this.userNameElement.textContent = newName;
    this.userJobElement.textContent = newJob;
    this.userAvatarElement.src = newAvatar;
  }

  getUserInfo() {
    const newObject = {
      username: this.userNameElement.textContent,
      userinfo: this.userJobElement.textContent,
      userAvatar: this.userAvatarElement.src
    };
    return newObject;
  }

}


;

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
  profileImageSelector: ".profile__image"
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
const avatarImg = document.querySelector(".profile__image"); // Form data

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
    authorization: "7201271b-2cce-46ab-9f28-d324b822f8cb"
  }
}).then(res => res.json()).then(result => {
  console.log(result);
});
const api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json"
  }
});
const user = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_8__.UserInfo({
  userName: ".profile__name",
  userJob: ".profile__title",
  userAvatar: ".profile__image"
}); // function renderCard(cardContainer, data, cardPopupObject)
// {
//   const cardObject = new Card(data, "#card-template", () => {
//     cardPopupObject.open(data);
//   });
//   const newCard = cardObject.createCardElement();
//   cardContainer.addItem(newCard);
// }

function handleCardClick(name, imageUrl) {
  imagePopupObject.open(name, imageUrl);
}

function handleLikeClick(card, cardId, isLiked) {
  api.updateLikes(cardId, isLiked).then(data => {
    card._likes = data.likes;
  }).catch(err => {
    console.log(err);
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUsseUJBQXlCLENBQUMvRyxJQUExQjtBQUNELENBRkQ7QUFJQTRELGFBQWEsQ0FBQzlHLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLE1BQU07RUFDNUN5SyxzQkFBc0IsQ0FBQ3ZILElBQXZCO0FBQ0QsQ0FGRDtBQUlBeUQsaUJBQWlCLENBQUMzRyxnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsTUFBTTtFQUNoRCxNQUFNK0ssU0FBUyxHQUFHaEQsSUFBSSxDQUFDbkssV0FBTCxFQUFsQjtFQUNBeUosU0FBUyxDQUFDakQsS0FBVixHQUFrQjJHLFNBQVMsQ0FBQ3pFLFFBQTVCO0VBQ0FnQixVQUFVLENBQUNsRCxLQUFYLEdBQW1CMkcsU0FBUyxDQUFDeEUsUUFBN0I7RUFDQThELDBCQUEwQixDQUFDbkgsSUFBM0IsR0FKZ0QsQ0FNaEQ7RUFFQTtFQUNBOztFQUVBeUcscUJBQXFCLENBQUNwSSxjQUF0QjtBQUNELENBWkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCI7XG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICAvL2lmIHNlcnZlciByZXR1cm5zIGVycm9yLCByZWplY3QgdGhlIHByb21pc2VcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiO1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgLy9pZiBzZXJ2ZXIgcmV0dXJucyBlcnJvciwgcmVqZWN0IHRoZSBwcm9taXNlXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZS9hdmF0YXJcIjtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIHBhdGNoVXNlckluZm8oaW5mbykge1xuICAgIC8vdXNlci5nZXRVc2VySW5mbygpIGlzIHBhc3NlZCBpbiBmb3IgaW5mb1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiO1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9cIiArIGlkO1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHNcIjtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIC8vaWYgc2VydmVyIHJldHVybnMgZXJyb3IsIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZDtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIC8vaWYgc2VydmVyIHJldHVybnMgZXJyb3IsIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9saWtlcy9cIiArIGlkO1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgLy9pZiBzZXJ2ZXIgcmV0dXJucyBlcnJvciwgcmVqZWN0IHRoZSBwcm9taXNlXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCB7IEFwaSB9O1xuIiwiY2xhc3MgQ2FyZCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgdGVtcGxhdGVTZWxlY3RvciwgaGFuZGxlQ2FyZENsaWNrKSB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgICB0aGlzLl9jYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgICAgIHRoaXMuX2NhcmRMaW5rID0gZGF0YS5saW5rO1xuICAgICAgdGhpcy5fY2FyZFRlbXBsYXRlID0gZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IodGVtcGxhdGVTZWxlY3RvcilcbiAgICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgICAgdGhpcy5fZWxlbWVudDsgXG4gICAgICB0aGlzLl9jYXJkSW1hZ2U7IFxuICAgIH1cbiAgICBjcmVhdGVDYXJkRWxlbWVudCgpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KCk7XG4gIFxuICAgICAgdGhpcy5fc2V0SW1hZ2VBbmROYW1lKCk7XG4gICAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVyKCk7XG4gIFxuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gICAgfVxuICBcbiAgICBfZ2V0RWxlbWVudCgpXG4gICAge1xuICAgICAgcmV0dXJuIHRoaXMuX2NhcmRUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7IFxuICAgIH1cbiAgICBfc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIGNvbnN0IGxpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICAgIGxpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2xpa2UpOyBcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fZGVsZXRlKTtcbiAgXG4gICAgICBjb25zdCBjYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgICBjYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKCk7XG4gICAgICB9KTtcbiAgICB9IFxuICBcbiAgICBfbGlrZShldnQpIHtcbiAgICAgIGNvbnN0IGhlYXJ0ID0gZXZ0LnRhcmdldDsgXG4gICAgICBoZWFydC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fYWN0aXZlLWJ1dHRvblwiKTtcbiAgICB9XG4gIFxuICAgIF9kZWxldGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgfVxuICBcbiAgICBfc2V0SW1hZ2VBbmROYW1lKCkge1xuICAgICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5fY2FyZExpbmt9KTtgO1xuICAgICAgdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGhpcy5fY2FyZE5hbWU7XG4gICAgfVxuICB9XG4gIFxuICBcbiAgXG4gIFxuICBleHBvcnQge0NhcmR9O1xuICAiLCJpbXBvcnQge2N1c3RvbVNldHRpbmdzfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcbmNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xuICB9XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlKSB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpOyBcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpOyBcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTsgXG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKTsgXG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIGNsZWFyQWxsRXJyb3JzKClcbiAge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIGN1c3RvbVNldHRpbmdzLmlucHV0U2VsZWN0b3JcbiAgICAgIClcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCwgaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBfaGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkge1xuICAgIHJldHVybiBpbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZDtcbiAgICB9KTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBfZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KSB7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cblxuICBfZW5hYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxuXG4gIHNldEJ1dHRvbkluYWN0aXZlKCkgeyBcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgfVxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7IFxuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTsgXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBGb3JtVmFsaWRhdG9yfTsiLCJjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgLyogVGhlIHZpc2libGUgY2xhc3Mgb3ZlcnJpZGVzIHRoZSBwcmV2aW91cyBjbGFzcyBiZWNhdXNlIGl0cyBmYXJ0aGVyIGRvd24gdGhlIHBhZ2UuIHNlZSBtb2RhbC5jc3MuKi9cbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFxuICAgICAgXCJwb3B1cF9vcGVuXCJcbiAgICApOyAvKmFjdGl2YXRlIGEgY2xhc3MgdGhhdCBtYWtlcyBpdCB2aXNpYmxlKi9cbiAgICBcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7IC8vY2xvc2Ugb24gZXNjXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgXCJwb3B1cF9vcGVuXCJcbiAgICApOyAvKmRlYWN0aXZhdGUgYSBjbGFzcyB0aGF0IG1ha2VzIGl0IHZpc2libGUqL1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+e1xuICAgIC8vdGhpcyBpcyBhbiBhcnJvdyBmdW5jdGlvblxuICAgIC8vdGhhdCB3YXksIHdlIGRvIG5vdCBoYXZlIHRvIGNyZWF0ZSBhbiBhcnJvdyBmdW5jdGlvbiB3aGVuIHNldHRpbmcgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgLy9hbHNvIGJlY2F1c2Ugd2UgZG8gbm90IGNyZWF0ZSBhIG5ldyBhcnJvdyBmdW5jdGlvbiB3aGVuIHNldHRpbmcgZXZlbnQgbGlzdGVuZXIsIHdlIGNhbiByZW1vdmUgdGhpcyBldmVudCBsaXN0ZW5lclxuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy9jbG9zZSB3aGVuIFggaXMgY2xpY2tlZFxuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xuICAgICAgLy91c2UgbW91c2Vkb3duIHNvIHRoYXQgaWYgdXNlciBjbGlja3Mgb24gYm94IGFuZCBkcmFncyBvdXRzaWRlLCB0aGlzIGV2ZW50IGRvZXMgbm90IHRyaWdnZXJcbiAgICAgIC8vb25seSB0cmlnZ2VycyBpZiB0aGV5IGNsaWNrIG91dHNpZGUgbW9kYWwgYm94XG5cbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cDs7XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcblxuY2xhc3MgUG9wdXBXaXRoQ29uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcG9wdXBTZWxlY3RvcixcbiAgICBoYW5kbGVGb3JtU3VibWl0IFxuICApIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTsgXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5cbiAgICB0aGlzLl9jYXJkVG9EZWxldGU7XG4gIH1cblxuICBzZXRDYXJkVG9EZWxldGUoY2FyZE9iaikge1xuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZSA9IGNhcmRPYmo7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTsgXG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2NhcmRUb0RlbGV0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhDb25maXJtOyIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5jbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwb3B1cFNlbGVjdG9yLFxuICAgIGhhbmRsZUZvcm1TdWJtaXQgXG4gICkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpOyBcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcblxuICAgIGNvbnN0IGlucHV0T2JqID0ge307XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dE9ialtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlucHV0T2JqOyBcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7IFxuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTsgXG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoRm9ybTsiLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIlxuXG5jbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwe1xuICAgIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpXG4gICAge1xuICAgICAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICAgICAgXG4gICAgfVxuICAgIF9zZXREYXRhSW1hZ2VQb3B1cCgpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VQb3B1cFBpYyA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctaW1hZ2VcIik7XG4gICAgICAgIGNvbnN0IGltYWdlUG9wdXBUZXh0ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1uYW1lXCIpO1xuICAgICAgICBpbWFnZVBvcHVwUGljLnNyYyA9IHRoaXMubGluaztcbiAgICAgICAgaW1hZ2VQb3B1cFRleHQudGV4dENvbnRlbnQgPSB0aGlzLm5hbWU7XG4gICAgICAgIGltYWdlUG9wdXBQaWMuYWx0ID0gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgIG9wZW4oZGF0YSkvL2RhdGEgY29udGFpbnMgbmFtZSBhbmQgbGluay4gc2VudCBoZXJlIGFuZCBub3QgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAge1xuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMubGluayA9IGRhdGEubGluaztcbiAgICAgICAgdGhpcy5fc2V0RGF0YUltYWdlUG9wdXAoKTtcbiAgICAgICAgc3VwZXIub3BlbigpO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoSW1hZ2U7OyIsIlxuXG5jbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uOyIsIlxuY2xhc3MgVXNlckluZm8ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgeyB1c2VyTmFtZSwgdXNlckpvYiwgdXNlckF2YXRhciB9IFxuICAgICkgXG4gICAge1xuICAgICAgdGhpcy51c2VyTmFtZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICAgIHRoaXMudXNlckpvYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJKb2IpO1xuICAgICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckF2YXRhcik7XG4gICAgfVxuICAgIHNldFVzZXJJbmZvKHsgbmV3TmFtZSwgbmV3Sm9iLCBuZXdBdmF0YXIgfSkge1xuICAgICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuZXdOYW1lO1xuICAgICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IG5ld0pvYjtcbiAgICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQuc3JjID0gbmV3QXZhdGFyO1xuICAgIH1cbiAgICBnZXRVc2VySW5mbygpIHtcbiAgICAgIGNvbnN0IG5ld09iamVjdCA9IHtcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgICB1c2VyaW5mbzogdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgdXNlckF2YXRhcjogdGhpcy51c2VyQXZhdGFyRWxlbWVudC5zcmMsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9XG4gICAgfVxuICBcbiAgZXhwb3J0IHsgVXNlckluZm8gfTs7IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiU2Fzc2FmcmFzIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5ODU1OTA2OTM1Mi0zZDg0MzdiMGQ0MmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkFuZ2VsIFRyZWVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjExODU5MzI4MDUzLTNjYmM5ZjkzOTlmND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzI2JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTXlydGxlIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzg1ODc5NzE3NS1iN2RiYTNjNWM4ZmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVGw4ZkcxNWNuUnNaU1V5TUdKbFlXTm9KVEl3YzI5MWRHZ2xNakJqWVhKdmJHbHVZWHhsYm53d2ZId3dmSHclM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJFZGlzdG8gQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ2MTg4OTk0LWZlYTBlY2JiMDRhND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9Njg3JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVGFibGUgUm9jayBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc5MTI2ODk0MzAtMjhkNjYyNGZlNDY3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2NtOW1hV3hsTFhCaFoyVjhOM3g4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ29uZ2FyZWUgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTU2NTMwNTE5NjgtNjljMmIwZTQzMzQ3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuXTtcblxuIGV4cG9ydCBjb25zdCBjdXN0b21TZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5wb3B1cF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJwb3B1cF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG4gIHByb2ZpbGVJbWFnZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbWFnZVwiXG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbi8vSW1wb3J0IGNsYXNzZXNcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpLmpzXCI7XG5cbmltcG9ydCB7IEZvcm1WYWxpZGF0b3IgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XG5cbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XG5cbmltcG9ydCB7IGN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzXCI7XG5cbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcblxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzXCI7XG5cbi8vIEJ1dHRvbnMgYW5kIG90aGVyIERPTSBlbGVtZW50c1xuXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fZWRpdC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGFkZENhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgYWRkQ2FyZEZvcm0gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGVkaXRBdmF0YXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2F2YXRhci1idXR0b25cIik7XG5jb25zdCBhdmF0YXJJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ltYWdlXCIpO1xuXG4vLyBGb3JtIGRhdGFcbmNvbnN0IG5hbWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVcIl0nKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJkZXNjcmlwdGlvblwiXScpO1xuY29uc3QgaW1hZ2VOYW1lSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInBsYWNlLW5hbWVcIl0nKTtcbmNvbnN0IGltYWdlTGlua0lucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsaW5rXCJdJyk7XG5cbmNvbnN0IGltYWdlUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmltYWdlUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vL0dyb3VwIElEOiBncm91cC0xMlxuXG5mZXRjaChcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTIvdXNlcnMvbWVcIiwge1xuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCI3MjAxMjcxYi0yY2NlLTQ2YWItOWYyOC1kMzI0YjgyMmY4Y2JcIixcbiAgfSxcbn0pXG4gIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICB9KTtcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCB1c2VyID0gbmV3IFVzZXJJbmZvKHtcbiAgdXNlck5hbWU6IFwiLnByb2ZpbGVfX25hbWVcIixcbiAgdXNlckpvYjogXCIucHJvZmlsZV9fdGl0bGVcIixcbiAgdXNlckF2YXRhcjogXCIucHJvZmlsZV9faW1hZ2VcIixcbn0pO1xuXG4vLyBmdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdClcbi8vIHtcbi8vICAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKGRhdGEsIFwiI2NhcmQtdGVtcGxhdGVcIiwgKCkgPT4ge1xuLy8gICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuLy8gICB9KTtcblxuLy8gICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCgpO1xuLy8gICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG4vLyB9XG5cbmZ1bmN0aW9uIGhhbmRsZUNhcmRDbGljayhuYW1lLCBpbWFnZVVybCkge1xuICBpbWFnZVBvcHVwT2JqZWN0Lm9wZW4obmFtZSwgaW1hZ2VVcmwpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMaWtlQ2xpY2soY2FyZCwgY2FyZElkLCBpc0xpa2VkKSB7XG4gIGFwaVxuICAgIC51cGRhdGVMaWtlcyhjYXJkSWQsIGlzTGlrZWQpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNhcmQuX2xpa2VzID0gZGF0YS5saWtlcztcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufVxuXG5jb25zdCBjYXJkR3JpZE9iamVjdCA9IG5ldyBTZWN0aW9uKFxuICB7XG4gICAgaXRlbXM6IG51bGwsXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBcIi5waG90by1ncmlkX19jYXJkc1wiXG4pO1xuXG5hcGlcbiAgLmdldFVzZXJJbmZvKClcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICB1c2VyLnNldFVzZXJJbmZvKGRhdGEpO1xuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG4gIC50aGVuKCgpID0+IHtcbiAgICBhcGlcbiAgICAgIC5nZXRJbml0aWFsQ2FyZHMoKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5zZXRJdGVtcyhyZXN1bHQpO1xuICAgICAgICBjYXJkR3JpZE9iamVjdC5yZW5kZXJJdGVtcygpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0LCBkZWxldGVQb3B1cE9iamVjdCkge1xuICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoXG4gICAgZGF0YSxcbiAgICBcIiNjYXJkLXRlbXBsYXRlXCIsXG4gICAgKCkgPT4ge1xuICAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5zZXRDYXJkVG9EZWxldGUoY2FyZE9iamVjdCk7XG4gICAgICBkZWxldGVQb3B1cE9iamVjdC5vcGVuKCk7XG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoY2FyZE9iamVjdC5nZXRJc0xpa2VkQnlDdXJyZW50VXNlcigpID09IGZhbHNlKSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC5saWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7IFxuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLnVuTGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXNlclxuICApO1xuXG4gIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KHVzZXIpO1xuICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG59XG5cbmNvbnN0IGZvcm1FbGVtZW50c0xpc3QgPSBBcnJheS5mcm9tKFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmZvcm1TZWxlY3Rvcilcbik7XG5cbmNvbnN0IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0ID0gZm9ybUVsZW1lbnRzTGlzdC5tYXAoKGZvcm0pID0+IHtcbiAgY29uc3QgZm9ybU9iamVjdCA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBmb3JtKTtcbiAgZm9ybU9iamVjdC5lbmFibGVWYWxpZGF0aW9uKCk7XG4gIHJldHVybiBmb3JtT2JqZWN0O1xufSk7XG5cbmNvbnN0IGVkaXRQcm9maWxlRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGRlc2NyaXB0aW9uXCJcbik7XG5cbmNvbnN0IGFkZENhcmRGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kbGlua1wiXG4pO1xuXG5jb25zdCBlZGl0QXZhdGFyRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwiYXZhdGFyZm9ybVwiXG4pO1xuXG5jb25zdCBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI2F2YXRhci1wb3B1cFwiLFxuICAodmFsdWVzKSA9PiB7XG4gICAgYXZhdGFySW1nLnNyYyA9IHZhbHVlcy5hdmF0YXI7XG4gICAgZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgICBhcGlcbiAgICAgIC5wYXRjaFVzZXJBdmF0YXIodmFsdWVzKVxuICAgICAgLnRoZW4oZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLnRoZW4oZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5lZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI2VkaXQtcG9wdXBcIixcbiAgKHZhbHVlcykgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWU6IHZhbHVlcy5uYW1lLCBhYm91dDogdmFsdWVzLnRpdGxlIH0pO1xuICAgIGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICAgIGFwaVxuICAgICAgLnBhdGNoVXNlckluZm8odXNlci5nZXRVc2VySW5mbygpKVxuICAgICAgLnRoZW4oZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC50aGVuKGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZENhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKCkgPT4ge1xuICBjb25zdCBuZXdDYXJkSW5mbyA9IHtcbiAgICBuYW1lOiBpbWFnZU5hbWVJbnB1dC52YWx1ZSxcbiAgICBsaW5rOiBpbWFnZUxpbmtJbnB1dC52YWx1ZSxcbiAgICBsaWtlczogW10sXG4gICAgb3duZXI6IHVzZXIuZ2V0VXNlckluZm8oKSxcbiAgfTtcblxuICBhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAudXBsb2FkQ2FyZChuZXdDYXJkSW5mbylcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBkYXRhIH0pO1xuXG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgbmV3Q2FyZEluZm8sXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSlcblxuICAgIC50aGVuKGFkZENhcmRGb3JtLnJlc2V0KCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1PYmplY3Quc2V0QnV0dG9uSW5hY3RpdmUoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRsb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFxuICBcIiNkZWxldGUtcG9wdXBcIixcbiAgKGNhcmRPYmpUb0RlbGV0ZSkgPT4ge1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZE9ialRvRGVsZXRlLmdldElkKCkpXG4gICAgICAudGhlbihjYXJkT2JqVG9EZWxldGUuZGVsZXRlRnJvbVBhZ2UoKSlcbiAgICAgIC50aGVuKGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuZWRpdEF2YXRhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXIuZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJuYW1lO1xuICB0aXRsZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJpbmZvO1xuICBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG5cbiAgLy91c2VyLmdldFVzZXJJbmZvKCk7XG5cbiAgLy9uYW1lSW5wdXQudmFsdWUgPSBuYW1lVGV4dC50ZXh0Q29udGVudDtcbiAgLy90aXRsZUlucHV0LnZhbHVlID0gdGl0bGVUZXh0LnRleHRDb250ZW50O1xuXG4gIGVkaXRQcm9maWxlRm9ybU9iamVjdC5jbGVhckFsbEVycm9ycygpO1xufSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRJbml0aWFsQ2FyZHMiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwiZ2V0VXNlckluZm8iLCJwYXRjaFVzZXJBdmF0YXIiLCJpbmZvIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRjaFVzZXJJbmZvIiwiZGVsZXRlQ2FyZCIsImlkIiwidXBsb2FkQ2FyZCIsImxpa2VDYXJkIiwidW5MaWtlQ2FyZCIsIkNhcmQiLCJkYXRhIiwidGVtcGxhdGVTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9jYXJkTmFtZSIsIm5hbWUiLCJfY2FyZExpbmsiLCJsaW5rIiwiX2NhcmRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJfY2FyZEltYWdlIiwiY3JlYXRlQ2FyZEVsZW1lbnQiLCJfZ2V0RWxlbWVudCIsIl9zZXRJbWFnZUFuZE5hbWUiLCJfc2V0RXZlbnRMaXN0ZW5lciIsImNsb25lTm9kZSIsImxpa2VCdXR0b24iLCJkZWxldGVCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiX2xpa2UiLCJfZGVsZXRlIiwiY2FyZEltYWdlIiwiZXZ0IiwiaGVhcnQiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJzdHlsZSIsInRleHRDb250ZW50IiwiY3VzdG9tU2V0dGluZ3MiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWxlbWVudCIsImVycm9yTWVzc2FnZSIsImVycm9yRWxlbWVudCIsImlucHV0RXJyb3JDbGFzcyIsImFkZCIsImVycm9yQ2xhc3MiLCJfaGlkZUlucHV0RXJyb3IiLCJjbGVhckFsbEVycm9ycyIsImlucHV0TGlzdCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJ2YWxpZGl0eSIsInZhbGlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGFzSW52YWxpZElucHV0Iiwic29tZSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImJ1dHRvbkVsZW1lbnQiLCJfZGlzYWJsZUJ1dHRvbiIsIl9lbmFibGVCdXR0b24iLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwic2V0QnV0dG9uSW5hY3RpdmUiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImVuYWJsZVZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsIl9wb3B1cCIsIl9idXR0b24iLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldEV2ZW50TGlzdGVuZXJzIiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2Zvcm0iLCJfY2FyZFRvRGVsZXRlIiwic2V0Q2FyZFRvRGVsZXRlIiwiY2FyZE9iaiIsInByZXZlbnREZWZhdWx0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfc2V0RGF0YUltYWdlUG9wdXAiLCJpbWFnZVBvcHVwUGljIiwiaW1hZ2VQb3B1cFRleHQiLCJzcmMiLCJhbHQiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zQXJyYXkiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwiY2xlYXIiLCJpbm5lckhUTUwiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInVzZXJBdmF0YXIiLCJ1c2VyTmFtZUVsZW1lbnQiLCJ1c2VySm9iRWxlbWVudCIsInVzZXJBdmF0YXJFbGVtZW50Iiwic2V0VXNlckluZm8iLCJuZXdOYW1lIiwibmV3Sm9iIiwibmV3QXZhdGFyIiwibmV3T2JqZWN0IiwidXNlcm5hbWUiLCJ1c2VyaW5mbyIsImluaXRpYWxDYXJkcyIsImZvcm1TZWxlY3RvciIsInByb2ZpbGVJbWFnZVNlbGVjdG9yIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkQ2FyZEJ1dHRvbiIsImFkZENhcmRQb3B1cCIsImFkZENhcmRGb3JtIiwiZWRpdEF2YXRhckJ1dHRvbiIsImF2YXRhckltZyIsIm5hbWVUZXh0IiwidGl0bGVUZXh0IiwibmFtZUlucHV0IiwidGl0bGVJbnB1dCIsImltYWdlTmFtZUlucHV0IiwiaW1hZ2VMaW5rSW5wdXQiLCJpbWFnZVBvcHVwT2JqZWN0IiwiYXV0aG9yaXphdGlvbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJhcGkiLCJ1c2VyIiwiaW1hZ2VVcmwiLCJoYW5kbGVMaWtlQ2xpY2siLCJjYXJkIiwiY2FyZElkIiwiaXNMaWtlZCIsInVwZGF0ZUxpa2VzIiwiX2xpa2VzIiwibGlrZXMiLCJjYXRjaCIsImVyciIsImNhcmRHcmlkT2JqZWN0IiwicmVuZGVyQ2FyZCIsImRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QiLCJzZXRJdGVtcyIsImNhcmRDb250YWluZXIiLCJjYXJkUG9wdXBPYmplY3QiLCJkZWxldGVQb3B1cE9iamVjdCIsImNhcmRPYmplY3QiLCJnZXRJc0xpa2VkQnlDdXJyZW50VXNlciIsImdldElkIiwic2V0TGlrZXMiLCJuZXdDYXJkIiwiZm9ybUVsZW1lbnRzTGlzdCIsImZvcm1WYWxpZGF0b3JPYmplY3RMaXN0IiwibWFwIiwiZm9ybSIsImZvcm1PYmplY3QiLCJlZGl0UHJvZmlsZUZvcm1PYmplY3QiLCJmaW5kIiwib2JqIiwiZ2V0QXR0cmlidXRlIiwiYWRkQ2FyZEZvcm1PYmplY3QiLCJlZGl0QXZhdGFyRm9ybU9iamVjdCIsImVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3QiLCJ2YWx1ZXMiLCJhdmF0YXIiLCJzZXRMb2FkaW5nVGV4dCIsImVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0Iiwic2V0VXNlckluZm9UZXh0T25seSIsImFib3V0IiwidGl0bGUiLCJhZGRDYXJkRm9ybVBvcHVwT2JqZWN0IiwibmV3Q2FyZEluZm8iLCJvd25lciIsInNldGxvYWRpbmdUZXh0IiwiY2FyZE9ialRvRGVsZXRlIiwiZGVsZXRlRnJvbVBhZ2UiLCJ1c2VySW5wdXQiXSwic291cmNlUm9vdCI6IiJ9