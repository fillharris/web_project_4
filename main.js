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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHL0MsSUFBSSxDQUFDcEssV0FBTCxFQUFsQjtFQUNBMEosU0FBUyxDQUFDbEQsS0FBVixHQUFrQjJHLFNBQVMsQ0FBQ3hFLFFBQTVCO0VBQ0FnQixVQUFVLENBQUNuRCxLQUFYLEdBQW1CMkcsU0FBUyxDQUFDdkUsUUFBN0I7RUFDQTZELDBCQUEwQixDQUFDbkgsSUFBM0IsR0FKZ0QsQ0FNaEQ7RUFFQTtFQUNBOztFQUVBeUcscUJBQXFCLENBQUNwSSxjQUF0QjtBQUNELENBWkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWUvYXZhdGFyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VySW5mbyhpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBpIH07XG4iLCJjbGFzcyBDYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCB0ZW1wbGF0ZVNlbGVjdG9yLCBoYW5kbGVDYXJkQ2xpY2spIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICAgIHRoaXMuX2NhcmROYW1lID0gZGF0YS5uYW1lO1xuICAgICAgdGhpcy5fY2FyZExpbmsgPSBkYXRhLmxpbms7XG4gICAgICB0aGlzLl9jYXJkVGVtcGxhdGUgPSBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIik7XG4gICAgICB0aGlzLl9lbGVtZW50OyBcbiAgICAgIHRoaXMuX2NhcmRJbWFnZTsgXG4gICAgfVxuICAgIGNyZWF0ZUNhcmRFbGVtZW50KCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnQoKTtcbiAgXG4gICAgICB0aGlzLl9zZXRJbWFnZUFuZE5hbWUoKTtcbiAgICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIoKTtcbiAgXG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICB9XG4gIFxuICAgIF9nZXRFbGVtZW50KClcbiAgICB7XG4gICAgICByZXR1cm4gdGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTsgXG4gICAgfVxuICAgIF9zZXRFdmVudExpc3RlbmVyKCkge1xuICAgICAgY29uc3QgbGlrZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcbiAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgICAgbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fbGlrZSk7IFxuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9kZWxldGUpO1xuICBcbiAgICAgIGNvbnN0IGNhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICAgIGNhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soKTtcbiAgICAgIH0pO1xuICAgIH0gXG4gIFxuICAgIF9saWtlKGV2dCkge1xuICAgICAgY29uc3QgaGVhcnQgPSBldnQudGFyZ2V0OyBcbiAgICAgIGhlYXJ0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19hY3RpdmUtYnV0dG9uXCIpO1xuICAgIH1cbiAgXG4gICAgX2RlbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIFxuICAgIF9zZXRJbWFnZUFuZE5hbWUoKSB7XG4gICAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgICB0aGlzLl9jYXJkSW1hZ2Uuc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTp1cmwoJHt0aGlzLl9jYXJkTGlua30pO2A7XG4gICAgICB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9jYXJkTmFtZTtcbiAgICB9XG4gIH1cbiAgXG4gIFxuICBcbiAgXG4gIGV4cG9ydCB7Q2FyZH07XG4gICIsImltcG9ydCB7Y3VzdG9tU2V0dGluZ3N9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWxlbWVudCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7IFxuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyk7IFxuICB9XG5cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpOyBcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpOyBcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9XG5cbiAgY2xlYXJBbGxFcnJvcnMoKVxuICB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgY3VzdG9tU2V0dGluZ3MuaW5wdXRTZWxlY3RvclxuICAgICAgKVxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuICBcbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxuXG4gIF9lbmFibGVCdXR0b24oYnV0dG9uRWxlbWVudCkge1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9XG5cbiAgc2V0QnV0dG9uSW5hY3RpdmUoKSB7IFxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLnNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNldHRpbmdzLmlucHV0U2VsZWN0b3IpXG4gICAgKTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTsgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpOyBcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEZvcm1WYWxpZGF0b3J9OyIsImNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gIH1cbiAgb3BlbigpIHtcbiAgICAvKiBUaGUgdmlzaWJsZSBjbGFzcyBvdmVycmlkZXMgdGhlIHByZXZpb3VzIGNsYXNzIGJlY2F1c2UgaXRzIGZhcnRoZXIgZG93biB0aGUgcGFnZS4gc2VlIG1vZGFsLmNzcy4qL1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXG4gICAgICBcInBvcHVwX29wZW5cIlxuICAgICk7IC8qYWN0aXZhdGUgYSBjbGFzcyB0aGF0IG1ha2VzIGl0IHZpc2libGUqL1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTsgLy9jbG9zZSBvbiBlc2NcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBcInBvcHVwX29wZW5cIlxuICAgICk7IC8qZGVhY3RpdmF0ZSBhIGNsYXNzIHRoYXQgbWFrZXMgaXQgdmlzaWJsZSovXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlID0gKGV2dCkgPT57XG4gICAgLy90aGlzIGlzIGFuIGFycm93IGZ1bmN0aW9uXG4gICAgLy90aGF0IHdheSwgd2UgZG8gbm90IGhhdmUgdG8gY3JlYXRlIGFuIGFycm93IGZ1bmN0aW9uIHdoZW4gc2V0dGluZyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAvL2Fsc28gYmVjYXVzZSB3ZSBkbyBub3QgY3JlYXRlIGEgbmV3IGFycm93IGZ1bmN0aW9uIHdoZW4gc2V0dGluZyBldmVudCBsaXN0ZW5lciwgd2UgY2FuIHJlbW92ZSB0aGlzIGV2ZW50IGxpc3RlbmVyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvL2Nsb3NlIHdoZW4gWCBpcyBjbGlja2VkXG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XG4gICAgICAvL3VzZSBtb3VzZWRvd24gc28gdGhhdCBpZiB1c2VyIGNsaWNrcyBvbiBib3ggYW5kIGRyYWdzIG91dHNpZGUsIHRoaXMgZXZlbnQgZG9lcyBub3QgdHJpZ2dlclxuICAgICAgLy9vbmx5IHRyaWdnZXJzIGlmIHRoZXkgY2xpY2sgb3V0c2lkZSBtb2RhbCBib3hcblxuICAgICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXBcIikpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwOztcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwb3B1cFNlbGVjdG9yLFxuICAgIGhhbmRsZUZvcm1TdWJtaXQgXG4gICkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpOyBcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcblxuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZTtcbiAgfVxuXG4gIHNldENhcmRUb0RlbGV0ZShjYXJkT2JqKSB7XG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlID0gY2FyZE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fY2FyZFRvRGVsZXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvcHVwU2VsZWN0b3IsXG4gICAgaGFuZGxlRm9ybVN1Ym1pdCBcbiAgKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7IFxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0cyA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuXG4gICAgY29uc3QgaW5wdXRPYmogPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0T2JqW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5wdXRPYmo7IFxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTsgXG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhGb3JtOyIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiXG5cbmNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXB7XG4gICAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvcilcbiAgICB7XG4gICAgICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgX3NldERhdGFJbWFnZVBvcHVwKCkge1xuICAgICAgICBjb25zdCBpbWFnZVBvcHVwUGljID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICAgICAgY29uc3QgaW1hZ2VQb3B1cFRleHQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgICAgIGltYWdlUG9wdXBQaWMuc3JjID0gdGhpcy5saW5rO1xuICAgICAgICBpbWFnZVBvcHVwVGV4dC50ZXh0Q29udGVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgaW1hZ2VQb3B1cFBpYy5hbHQgPSB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgb3BlbihkYXRhKS8vZGF0YSBjb250YWlucyBuYW1lIGFuZCBsaW5rLiBzZW50IGhlcmUgYW5kIG5vdCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5saW5rID0gZGF0YS5saW5rO1xuICAgICAgICB0aGlzLl9zZXREYXRhSW1hZ2VQb3B1cCgpO1xuICAgICAgICBzdXBlci5vcGVuKCk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhJbWFnZTs7IiwiXG5cbmNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gIH1cblxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG4gXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjsiLCJcbmNsYXNzIFVzZXJJbmZvIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHsgdXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIgfSBcbiAgICApIFxuICAgIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJBdmF0YXIpO1xuICAgIH1cbiAgICBzZXRVc2VySW5mbyh7IG5ld05hbWUsIG5ld0pvYiwgbmV3QXZhdGFyIH0pIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmV3TmFtZTtcbiAgICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBuZXdKb2I7XG4gICAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50LnNyYyA9IG5ld0F2YXRhcjtcbiAgICB9XG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgdXNlcmluZm86IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICAgIHVzZXJBdmF0YXI6IHRoaXMudXNlckF2YXRhckVsZW1lbnQuc3JjLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPYmplY3Q7XG4gICAgfVxuICAgIH1cbiAgXG4gIGV4cG9ydCB7IFVzZXJJbmZvIH07OyIsImV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIlNhc3NhZnJhcyBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTg1NTkwNjkzNTItM2Q4NDM3YjBkNDJjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJBbmdlbCBUcmVlXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxMTg1OTMyODA1My0zY2JjOWY5Mzk5ZjQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcyNiZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIk15cnRsZSBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc4NTg3OTcxNzUtYjdkYmEzYzVjOGZjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4elpXRnlZMmg4TVRsOGZHMTVjblJzWlNVeU1HSmxZV05vSlRJd2MyOTFkR2dsTWpCallYSnZiR2x1WVh4bGJud3dmSHd3Zkh3JTNEJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiRWRpc3RvIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU0NjE4ODk5NC1mZWEwZWNiYjA0YTQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTY4NyZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRhYmxlIFJvY2sgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3OTEyNjg5NDMwLTI4ZDY2MjRmZTQ2Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdjbTltYVd4bExYQmhaMlY4TjN4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkNvbmdhcmVlIE5hdGlvbmFsIFBhcmtcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE1NjUzMDUxOTY4LTY5YzJiMGU0MzM0Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbl07XG5cbiBleHBvcnQgY29uc3QgY3VzdG9tU2V0dGluZ3MgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIucG9wdXBfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX3NhdmUtYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxuICBwcm9maWxlSW1hZ2VTZWxlY3RvcjogXCIucHJvZmlsZV9faW1hZ2VcIlxufVxuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vL0ltcG9ydCBjbGFzc2VzXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGkuanNcIjtcblxuaW1wb3J0IHsgRm9ybVZhbGlkYXRvciB9IGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcblxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcblxuaW1wb3J0IHsgY3VzdG9tU2V0dGluZ3MgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb25zdGFudHMuanNcIjtcblxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xuXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhDb25maXJtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanNcIjtcblxuLy8gQnV0dG9ucyBhbmQgb3RoZXIgRE9NIGVsZW1lbnRzXG5cbmNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtcG9wdXBcIik7XG5jb25zdCBlZGl0UHJvZmlsZUZvcm0gPSBlZGl0UHJvZmlsZU1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hZGQtYnV0dG9uXCIpO1xuY29uc3QgYWRkQ2FyZFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcG9wdXBcIik7XG5jb25zdCBhZGRDYXJkRm9ybSA9IGFkZENhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgZWRpdEF2YXRhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYXZhdGFyLWJ1dHRvblwiKTtcbmNvbnN0IGF2YXRhckltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9faW1hZ2VcIik7XG5cbi8vIEZvcm0gZGF0YVxuY29uc3QgbmFtZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpO1xuY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpO1xuY29uc3QgdGl0bGVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XG5jb25zdCBpbWFnZU5hbWVJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGxhY2UtbmFtZVwiXScpO1xuY29uc3QgaW1hZ2VMaW5rSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImxpbmtcIl0nKTtcblxuY29uc3QgaW1hZ2VQb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpO1xuaW1hZ2VQb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4vL1Rva2VuIGFuZCBJRCBpbmZvXG4vL1Rva2VuOiBiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcbi8vR3JvdXAgSUQ6IGdyb3VwLTEyXG5cbmZldGNoKFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMi91c2Vycy9tZVwiLCB7XG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICB9LFxufSlcbiAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gIH0pO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBcImIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICB9LFxufSk7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlckluZm8oe1xuICB1c2VyTmFtZTogXCIucHJvZmlsZV9fbmFtZVwiLFxuICB1c2VySm9iOiBcIi5wcm9maWxlX190aXRsZVwiLFxuICB1c2VyQXZhdGFyOiBcIi5wcm9maWxlX19pbWFnZVwiLFxufSk7XG5cbi8vIGZ1bmN0aW9uIHJlbmRlckNhcmQoY2FyZENvbnRhaW5lciwgZGF0YSwgY2FyZFBvcHVwT2JqZWN0KVxuLy8ge1xuLy8gICBjb25zdCBjYXJkT2JqZWN0ID0gbmV3IENhcmQoZGF0YSwgXCIjY2FyZC10ZW1wbGF0ZVwiLCAoKSA9PiB7XG4vLyAgICAgY2FyZFBvcHVwT2JqZWN0Lm9wZW4oZGF0YSk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KCk7XG4vLyAgIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbi8vIH1cblxuZnVuY3Rpb24gaGFuZGxlQ2FyZENsaWNrKG5hbWUsIGltYWdlVXJsKSB7XG4gIGltYWdlUG9wdXBPYmplY3Qub3BlbihuYW1lLCBpbWFnZVVybCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUxpa2VDbGljayhjYXJkLCBjYXJkSWQsIGlzTGlrZWQpIHtcbiAgYXBpXG4gICAgLnVwZGF0ZUxpa2VzKGNhcmRJZCwgaXNMaWtlZClcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY2FyZC5fbGlrZXMgPSBkYXRhLmxpa2VzO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59XG5cbmNvbnN0IGNhcmRHcmlkT2JqZWN0ID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICBpdGVtczogbnVsbCxcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBkYXRhLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIFwiLnBob3RvLWdyaWRfX2NhcmRzXCJcbik7XG5cbmFwaVxuICAuZ2V0VXNlckluZm8oKVxuICAudGhlbigoZGF0YSkgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm8oZGF0YSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGFwaVxuICAgICAgLmdldEluaXRpYWxDYXJkcygpXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnNldEl0ZW1zKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnJlbmRlckl0ZW1zKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QsIGRlbGV0ZVBvcHVwT2JqZWN0KSB7XG4gIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0LnNldENhcmRUb0RlbGV0ZShjYXJkT2JqZWN0KTtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0Lm9wZW4oKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGlmIChjYXJkT2JqZWN0LmdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkgPT0gZmFsc2UpIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLmxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTsgXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlcbiAgICAgICAgICAudW5MaWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1c2VyXG4gICk7XG5cbiAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQodXNlcik7XG4gIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbn1cblxuY29uc3QgZm9ybUVsZW1lbnRzTGlzdCA9IEFycmF5LmZyb20oXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY3VzdG9tU2V0dGluZ3MuZm9ybVNlbGVjdG9yKVxuKTtcblxuY29uc3QgZm9ybVZhbGlkYXRvck9iamVjdExpc3QgPSBmb3JtRWxlbWVudHNMaXN0Lm1hcCgoZm9ybSkgPT4ge1xuICBjb25zdCBmb3JtT2JqZWN0ID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGZvcm0pO1xuICBmb3JtT2JqZWN0LmVuYWJsZVZhbGlkYXRpb24oKTtcbiAgcmV0dXJuIGZvcm1PYmplY3Q7XG59KTtcblxuY29uc3QgZWRpdFByb2ZpbGVGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kZGVzY3JpcHRpb25cIlxuKTtcblxuY29uc3QgYWRkQ2FyZEZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRsaW5rXCJcbik7XG5cbmNvbnN0IGVkaXRBdmF0YXJGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJhdmF0YXJmb3JtXCJcbik7XG5cbmNvbnN0IGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjYXZhdGFyLXBvcHVwXCIsXG4gICh2YWx1ZXMpID0+IHtcbiAgICBhdmF0YXJJbWcuc3JjID0gdmFsdWVzLmF2YXRhcjtcbiAgICBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICAgIGFwaVxuICAgICAgLnBhdGNoVXNlckF2YXRhcih2YWx1ZXMpXG4gICAgICAudGhlbihlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAudGhlbihlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjZWRpdC1wb3B1cFwiLFxuICAodmFsdWVzKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mb1RleHRPbmx5KHsgbmFtZTogdmFsdWVzLm5hbWUsIGFib3V0OiB2YWx1ZXMudGl0bGUgfSk7XG4gICAgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gICAgYXBpXG4gICAgICAucGF0Y2hVc2VySW5mbyh1c2VyLmdldFVzZXJJbmZvKCkpXG4gICAgICAudGhlbihlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLnRoZW4oZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoKSA9PiB7XG4gIGNvbnN0IG5ld0NhcmRJbmZvID0ge1xuICAgIG5hbWU6IGltYWdlTmFtZUlucHV0LnZhbHVlLFxuICAgIGxpbms6IGltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIGxpa2VzOiBbXSxcbiAgICBvd25lcjogdXNlci5nZXRVc2VySW5mbygpLFxuICB9O1xuXG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC51cGxvYWRDYXJkKG5ld0NhcmRJbmZvKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IGRhdGEgfSk7XG5cbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBuZXdDYXJkSW5mbyxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9KVxuXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm0ucmVzZXQoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybU9iamVjdC5zZXRCdXR0b25JbmFjdGl2ZSgpKVxuICAgIC50aGVuKGFkZENhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldGxvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXG4gIFwiI2RlbGV0ZS1wb3B1cFwiLFxuICAoY2FyZE9ialRvRGVsZXRlKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkT2JqVG9EZWxldGUuZ2V0SWQoKSlcbiAgICAgIC50aGVuKGNhcmRPYmpUb0RlbGV0ZS5kZWxldGVGcm9tUGFnZSgpKVxuICAgICAgLnRoZW4oZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5lZGl0QXZhdGFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmFkZENhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG59KTtcblxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcklucHV0ID0gdXNlci5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcm5hbWU7XG4gIHRpdGxlSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcmluZm87XG4gIGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcblxuICAvL3VzZXIuZ2V0VXNlckluZm8oKTtcblxuICAvL25hbWVJbnB1dC52YWx1ZSA9IG5hbWVUZXh0LnRleHRDb250ZW50O1xuICAvL3RpdGxlSW5wdXQudmFsdWUgPSB0aXRsZVRleHQudGV4dENvbnRlbnQ7XG5cbiAgZWRpdFByb2ZpbGVGb3JtT2JqZWN0LmNsZWFyQWxsRXJyb3JzKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRVc2VySW5mbyIsInBhdGNoVXNlckF2YXRhciIsImluZm8iLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGNoVXNlckluZm8iLCJkZWxldGVDYXJkIiwiaWQiLCJ1cGxvYWRDYXJkIiwibGlrZUNhcmQiLCJ1bkxpa2VDYXJkIiwiQ2FyZCIsImRhdGEiLCJ0ZW1wbGF0ZVNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiX2VsZW1lbnQiLCJyZW1vdmUiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2NhcmROYW1lIiwibmFtZSIsIl9jYXJkTGluayIsImxpbmsiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9jYXJkSW1hZ2UiLCJjcmVhdGVDYXJkRWxlbWVudCIsIl9nZXRFbGVtZW50IiwiX3NldEltYWdlQW5kTmFtZSIsIl9zZXRFdmVudExpc3RlbmVyIiwiY2xvbmVOb2RlIiwibGlrZUJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJfbGlrZSIsIl9kZWxldGUiLCJjYXJkSW1hZ2UiLCJldnQiLCJoZWFydCIsInRhcmdldCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInN0eWxlIiwidGV4dENvbnRlbnQiLCJjdXN0b21TZXR0aW5ncyIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbGVtZW50IiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwiaW5wdXRFcnJvckNsYXNzIiwiYWRkIiwiZXJyb3JDbGFzcyIsIl9oaWRlSW5wdXRFcnJvciIsImNsZWFyQWxsRXJyb3JzIiwiaW5wdXRMaXN0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJmb3JFYWNoIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oYXNJbnZhbGlkSW5wdXQiLCJzb21lIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiYnV0dG9uRWxlbWVudCIsIl9kaXNhYmxlQnV0dG9uIiwiX2VuYWJsZUJ1dHRvbiIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJzZXRCdXR0b25JbmFjdGl2ZSIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiZW5hYmxlVmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsImtleSIsImNsb3NlIiwiX3BvcHVwIiwiX2J1dHRvbiIsIm9wZW4iLCJfaGFuZGxlRXNjQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJjb250YWlucyIsIlBvcHVwV2l0aENvbmZpcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9jYXJkVG9EZWxldGUiLCJzZXRDYXJkVG9EZWxldGUiLCJjYXJkT2JqIiwicHJldmVudERlZmF1bHQiLCJQb3B1cFdpdGhGb3JtIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRzIiwiaW5wdXRPYmoiLCJpbnB1dCIsInZhbHVlIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9zZXREYXRhSW1hZ2VQb3B1cCIsImltYWdlUG9wdXBQaWMiLCJpbWFnZVBvcHVwVGV4dCIsInNyYyIsImFsdCIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXNBcnJheSIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJzZXRJdGVtcyIsImNsZWFyIiwiaW5uZXJIVE1MIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJ1c2VyQXZhdGFyIiwidXNlck5hbWVFbGVtZW50IiwidXNlckpvYkVsZW1lbnQiLCJ1c2VyQXZhdGFyRWxlbWVudCIsInNldFVzZXJJbmZvIiwibmV3TmFtZSIsIm5ld0pvYiIsIm5ld0F2YXRhciIsIm5ld09iamVjdCIsInVzZXJuYW1lIiwidXNlcmluZm8iLCJpbml0aWFsQ2FyZHMiLCJmb3JtU2VsZWN0b3IiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJCdXR0b24iLCJhdmF0YXJJbWciLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwiaW1hZ2VQb3B1cE9iamVjdCIsImF1dGhvcml6YXRpb24iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiYXBpIiwidXNlciIsImltYWdlVXJsIiwiaGFuZGxlTGlrZUNsaWNrIiwiY2FyZCIsImNhcmRJZCIsImlzTGlrZWQiLCJ1cGRhdGVMaWtlcyIsIl9saWtlcyIsImxpa2VzIiwiY2F0Y2giLCJlcnIiLCJjYXJkR3JpZE9iamVjdCIsInJlbmRlckNhcmQiLCJkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0IiwiY2FyZENvbnRhaW5lciIsImNhcmRQb3B1cE9iamVjdCIsImRlbGV0ZVBvcHVwT2JqZWN0IiwiY2FyZE9iamVjdCIsImdldElzTGlrZWRCeUN1cnJlbnRVc2VyIiwiZ2V0SWQiLCJzZXRMaWtlcyIsIm5ld0NhcmQiLCJmb3JtRWxlbWVudHNMaXN0IiwiZm9ybVZhbGlkYXRvck9iamVjdExpc3QiLCJtYXAiLCJmb3JtIiwiZm9ybU9iamVjdCIsImVkaXRQcm9maWxlRm9ybU9iamVjdCIsImZpbmQiLCJvYmoiLCJnZXRBdHRyaWJ1dGUiLCJhZGRDYXJkRm9ybU9iamVjdCIsImVkaXRBdmF0YXJGb3JtT2JqZWN0IiwiZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdCIsInZhbHVlcyIsImF2YXRhciIsInNldExvYWRpbmdUZXh0IiwiZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QiLCJzZXRVc2VySW5mb1RleHRPbmx5IiwiYWJvdXQiLCJ0aXRsZSIsImFkZENhcmRGb3JtUG9wdXBPYmplY3QiLCJuZXdDYXJkSW5mbyIsIm93bmVyIiwic2V0bG9hZGluZ1RleHQiLCJjYXJkT2JqVG9EZWxldGUiLCJkZWxldGVGcm9tUGFnZSIsInVzZXJJbnB1dCJdLCJzb3VyY2VSb290IjoiIn0=