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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGNBQXRCO0FBQ0QsQ0FaRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aENvbmZpcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvcGFnZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IoeyBiYXNlVXJsLCBoZWFkZXJzIH0pIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLl9oZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhdGNoVXNlckF2YXRhcihpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZS9hdmF0YXJcIiwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJJbmZvKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL3VzZXJzL21lXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIHVwbG9hZENhcmQoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBsaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICB1bkxpa2VDYXJkKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkcy9saWtlcy9cIiArIGlkLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBBcGkgfTtcbiIsImNsYXNzIENhcmQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIHRlbXBsYXRlU2VsZWN0b3IsIGhhbmRsZUNhcmRDbGljaykge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgICAgdGhpcy5fY2FyZE5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICB0aGlzLl9jYXJkTGluayA9IGRhdGEubGluaztcbiAgICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKHRlbXBsYXRlU2VsZWN0b3IpXG4gICAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQ7IFxuICAgICAgdGhpcy5fY2FyZEltYWdlOyBcbiAgICB9XG4gICAgY3JlYXRlQ2FyZEVsZW1lbnQoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICBcbiAgICAgIHRoaXMuX3NldEltYWdlQW5kTmFtZSgpO1xuICAgICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcigpO1xuICBcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICAgIH1cbiAgXG4gICAgX2dldEVsZW1lbnQoKVxuICAgIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYXJkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpOyBcbiAgICB9XG4gICAgX3NldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICBjb25zdCBsaWtlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgICBsaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9saWtlKTsgXG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2RlbGV0ZSk7XG4gIFxuICAgICAgY29uc3QgY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgICAgY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljaygpO1xuICAgICAgfSk7XG4gICAgfSBcbiAgXG4gICAgX2xpa2UoZXZ0KSB7XG4gICAgICBjb25zdCBoZWFydCA9IGV2dC50YXJnZXQ7IFxuICAgICAgaGVhcnQuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2FjdGl2ZS1idXR0b25cIik7XG4gICAgfVxuICBcbiAgICBfZGVsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgXG4gICAgX3NldEltYWdlQW5kTmFtZSgpIHtcbiAgICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICAgIHRoaXMuX2NhcmRJbWFnZS5zdHlsZSA9IGBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3RoaXMuX2NhcmRMaW5rfSk7YDtcbiAgICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX2NhcmROYW1lO1xuICAgIH1cbiAgfVxuICBcbiAgXG4gIFxuICBcbiAgZXhwb3J0IHtDYXJkfTtcbiAgIiwiaW1wb3J0IHtjdXN0b21TZXR0aW5nc30gZnJvbSBcIi4vY29uc3RhbnRzLmpzXCI7XG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQsIGVycm9yTWVzc2FnZSkge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTsgXG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKTsgXG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7IFxuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyk7IFxuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICBjbGVhckFsbEVycm9ycygpXG4gIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBjdXN0b21TZXR0aW5ncy5pbnB1dFNlbGVjdG9yXG4gICAgICApXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG4gIFxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xuICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQsIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpIHtcbiAgICByZXR1cm4gaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSk7XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbmFibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCkge1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9XG5cbiAgX2VuYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KSB7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cblxuICBzZXRCdXR0b25JbmFjdGl2ZSgpIHsgXG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2V0dGluZ3MuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLnNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpOyBcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCk7IFxuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgRm9ybVZhbGlkYXRvcn07IiwiY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIC8qIFRoZSB2aXNpYmxlIGNsYXNzIG92ZXJyaWRlcyB0aGUgcHJldmlvdXMgY2xhc3MgYmVjYXVzZSBpdHMgZmFydGhlciBkb3duIHRoZSBwYWdlLiBzZWUgbW9kYWwuY3NzLiovXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcbiAgICAgIFwicG9wdXBfb3BlblwiXG4gICAgKTsgLyphY3RpdmF0ZSBhIGNsYXNzIHRoYXQgbWFrZXMgaXQgdmlzaWJsZSovXG4gICAgXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpOyAvL2Nsb3NlIG9uIGVzY1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIFwicG9wdXBfb3BlblwiXG4gICAgKTsgLypkZWFjdGl2YXRlIGEgY2xhc3MgdGhhdCBtYWtlcyBpdCB2aXNpYmxlKi9cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PntcbiAgICAvL3RoaXMgaXMgYW4gYXJyb3cgZnVuY3Rpb25cbiAgICAvL3RoYXQgd2F5LCB3ZSBkbyBub3QgaGF2ZSB0byBjcmVhdGUgYW4gYXJyb3cgZnVuY3Rpb24gd2hlbiBzZXR0aW5nIHRoZSBldmVudCBsaXN0ZW5lclxuICAgIC8vYWxzbyBiZWNhdXNlIHdlIGRvIG5vdCBjcmVhdGUgYSBuZXcgYXJyb3cgZnVuY3Rpb24gd2hlbiBzZXR0aW5nIGV2ZW50IGxpc3RlbmVyLCB3ZSBjYW4gcmVtb3ZlIHRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vY2xvc2Ugd2hlbiBYIGlzIGNsaWNrZWRcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XG5cbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQpID0+IHtcbiAgICAgIC8vdXNlIG1vdXNlZG93biBzbyB0aGF0IGlmIHVzZXIgY2xpY2tzIG9uIGJveCBhbmQgZHJhZ3Mgb3V0c2lkZSwgdGhpcyBldmVudCBkb2VzIG5vdCB0cmlnZ2VyXG4gICAgICAvL29ubHkgdHJpZ2dlcnMgaWYgdGhleSBjbGljayBvdXRzaWRlIG1vZGFsIGJveFxuXG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cFwiKSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXA7O1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvcHVwU2VsZWN0b3IsXG4gICAgaGFuZGxlRm9ybVN1Ym1pdCBcbiAgKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7IFxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuXG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlO1xuICB9XG5cbiAgc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmopIHtcbiAgICB0aGlzLl9jYXJkVG9EZWxldGUgPSBjYXJkT2JqO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IFxuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9jYXJkVG9EZWxldGUpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTsiLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcG9wdXBTZWxlY3RvcixcbiAgICBoYW5kbGVGb3JtU3VibWl0IFxuICApIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTsgXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG5cbiAgICBjb25zdCBpbnB1dE9iaiA9IHt9O1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRPYmpbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnB1dE9iajsgXG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpOyBcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IFxuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEZvcm07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCJcblxuY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cHtcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKVxuICAgIHtcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgIH1cbiAgICBfc2V0RGF0YUltYWdlUG9wdXAoKSB7XG4gICAgICAgIGNvbnN0IGltYWdlUG9wdXBQaWMgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgICAgICBjb25zdCBpbWFnZVBvcHVwVGV4dCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICAgICAgaW1hZ2VQb3B1cFBpYy5zcmMgPSB0aGlzLmxpbms7XG4gICAgICAgIGltYWdlUG9wdXBUZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgICAgICBpbWFnZVBvcHVwUGljLmFsdCA9IHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICBvcGVuKGRhdGEpLy9kYXRhIGNvbnRhaW5zIG5hbWUgYW5kIGxpbmsuIHNlbnQgaGVyZSBhbmQgbm90IGluIHRoZSBjb25zdHJ1Y3RvclxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbms7XG4gICAgICAgIHRoaXMuX3NldERhdGFJbWFnZVBvcHVwKCk7XG4gICAgICAgIHN1cGVyLm9wZW4oKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEltYWdlOzsiLCJcblxuY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICBzZXRJdGVtcyhpdGVtcykge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgfVxuXG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cbiBcbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uOyIsIlxuY2xhc3MgVXNlckluZm8ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgeyB1c2VyTmFtZSwgdXNlckpvYiwgdXNlckF2YXRhciB9IFxuICAgICkgXG4gICAge1xuICAgICAgdGhpcy51c2VyTmFtZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICAgIHRoaXMudXNlckpvYkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJKb2IpO1xuICAgICAgdGhpcy51c2VyQXZhdGFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckF2YXRhcik7XG4gICAgfVxuICAgIHNldFVzZXJJbmZvKHsgbmFtZSwgYWJvdXQsIGF2YXRhciwgX2lkIH0pIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQuc3JjID0gYXZhdGFyO1xuICAgICAgdGhpcy5pZCA9IF9pZDsgXG4gICAgfVxuXG4gICAgc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWUsIGFib3V0IH0pIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgICB9XG5cbiAgIGdldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IHtcbiAgICAgIG5hbWU6IHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICB9O1xuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cbiAgICB9XG4gIFxuICBleHBvcnQgeyBVc2VySW5mbyB9OzsiLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xuICB7XG4gICAgbmFtZTogXCJTYXNzYWZyYXMgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk4NTU5MDY5MzUyLTNkODQzN2IwZDQyYz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQW5nZWwgVHJlZVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTE4NTkzMjgwNTMtM2NiYzlmOTM5OWY0P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MjYmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJNeXJ0bGUgQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3ODU4Nzk3MTc1LWI3ZGJhM2M1YzhmYz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHpaV0Z5WTJoOE1UbDhmRzE1Y25Sc1pTVXlNR0psWVdOb0pUSXdjMjkxZEdnbE1qQmpZWEp2YkdsdVlYeGxibnd3Zkh3d2ZIdyUzRCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkVkaXN0byBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDYxODg5OTQtZmVhMGVjYmIwNGE0P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz02ODcmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUYWJsZSBSb2NrIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzkxMjY4OTQzMC0yOGQ2NjI0ZmU0Njc/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3Y205bWFXeGxMWEJoWjJWOE4zeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJDb25nYXJlZSBOYXRpb25hbCBQYXJrXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNTY1MzA1MTk2OC02OWMyYjBlNDMzNDc/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG5dO1xuXG4gZXhwb3J0IGNvbnN0IGN1c3RvbVNldHRpbmdzID0ge1xuICBmb3JtU2VsZWN0b3I6IFwiLnBvcHVwX19mb3JtXCIsXG4gIGlucHV0U2VsZWN0b3I6IFwiLnBvcHVwX19pbnB1dFwiLFxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J1dHRvblwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcInBvcHVwX19zYXZlLWJ1dHRvbl9kaXNhYmxlZFwiLFxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcbiAgcHJvZmlsZUltYWdlU2VsZWN0b3I6IFwiLnByb2ZpbGVfX2ltYWdlXCJcbn1cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xuLy9JbXBvcnQgY2xhc3Nlc1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpLmpzXCI7XG5cbmltcG9ydCB7IEZvcm1WYWxpZGF0b3IgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XG5cbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XG5cbmltcG9ydCB7IGN1c3RvbVNldHRpbmdzIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzXCI7XG5cbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcblxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoQ29uZmlybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzXCI7XG5cbi8vIEJ1dHRvbnMgYW5kIG90aGVyIERPTSBlbGVtZW50c1xuXG5jb25zdCBlZGl0UHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fZWRpdC1idXR0b25cIik7XG5jb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVGb3JtID0gZWRpdFByb2ZpbGVNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IGFkZENhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpO1xuY29uc3QgYWRkQ2FyZEZvcm0gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGVkaXRBdmF0YXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2F2YXRhci1idXR0b25cIik7XG5jb25zdCBhdmF0YXJJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2ltYWdlXCIpO1xuXG4vLyBGb3JtIGRhdGFcbmNvbnN0IG5hbWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19uYW1lXCIpO1xuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm5hbWVcIl0nKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJkZXNjcmlwdGlvblwiXScpO1xuY29uc3QgaW1hZ2VOYW1lSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInBsYWNlLW5hbWVcIl0nKTtcbmNvbnN0IGltYWdlTGlua0lucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJsaW5rXCJdJyk7XG5cbmNvbnN0IGltYWdlUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1wb3B1cFwiKTtcbmltYWdlUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuLy9Ub2tlbiBhbmQgSUQgaW5mb1xuLy9Ub2tlbjogYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XG4vL0dyb3VwIElEOiBncm91cC0xMlxuXG5mZXRjaChcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTIvdXNlcnMvbWVcIiwge1xuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgfSxcbn0pXG4gIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICB9KTtcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7XG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxuICBoZWFkZXJzOiB7XG4gICAgYXV0aG9yaXphdGlvbjogXCJiMTQxMTYzNy00NDFhLTRkMjUtOTIyNy02ZGU1YmY4YmNmMjRcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgfSxcbn0pO1xuXG5jb25zdCB1c2VyID0gbmV3IFVzZXJJbmZvKHtcbiAgdXNlck5hbWU6IFwiLnByb2ZpbGVfX25hbWVcIixcbiAgdXNlckpvYjogXCIucHJvZmlsZV9fdGl0bGVcIixcbiAgdXNlckF2YXRhcjogXCIucHJvZmlsZV9faW1hZ2VcIixcbn0pO1xuXG4vLyBmdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdClcbi8vIHtcbi8vICAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKGRhdGEsIFwiI2NhcmQtdGVtcGxhdGVcIiwgKCkgPT4ge1xuLy8gICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuLy8gICB9KTtcblxuLy8gICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCgpO1xuLy8gICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG4vLyB9XG5cbmNvbnN0IGNhcmRHcmlkT2JqZWN0ID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICBpdGVtczogbnVsbCxcbiAgICByZW5kZXJlcjogKGRhdGEpID0+IHtcbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBkYXRhLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIFwiLnBob3RvLWdyaWRfX2NhcmRzXCJcbik7XG5cbmFwaVxuICAuZ2V0VXNlckluZm8oKVxuICAudGhlbigoZGF0YSkgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm8oZGF0YSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGFwaVxuICAgICAgLmdldEluaXRpYWxDYXJkcygpXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnNldEl0ZW1zKHJlc3VsdCk7XG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LnJlbmRlckl0ZW1zKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9KTtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QsIGRlbGV0ZVBvcHVwT2JqZWN0KSB7XG4gIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChcbiAgICBkYXRhLFxuICAgIFwiI2NhcmQtdGVtcGxhdGVcIixcbiAgICAoKSA9PiB7XG4gICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0LnNldENhcmRUb0RlbGV0ZShjYXJkT2JqZWN0KTtcbiAgICAgIGRlbGV0ZVBvcHVwT2JqZWN0Lm9wZW4oKTtcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGlmIChjYXJkT2JqZWN0LmdldElzTGlrZWRCeUN1cnJlbnRVc2VyKCkgPT0gZmFsc2UpIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLmxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwaVxuICAgICAgICAgIC51bkxpa2VDYXJkKGNhcmRPYmplY3QuZ2V0SWQoKSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gY2FyZE9iamVjdC5zZXRMaWtlcyhkYXRhLmxpa2VzKSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVzZXJcbiAgKTtcblxuICBjb25zdCBuZXdDYXJkID0gY2FyZE9iamVjdC5jcmVhdGVDYXJkRWxlbWVudCh1c2VyKTtcbiAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xufVxuXG5jb25zdCBmb3JtRWxlbWVudHNMaXN0ID0gQXJyYXkuZnJvbShcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjdXN0b21TZXR0aW5ncy5mb3JtU2VsZWN0b3IpXG4pO1xuXG5jb25zdCBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdCA9IGZvcm1FbGVtZW50c0xpc3QubWFwKChmb3JtKSA9PiB7XG4gIGNvbnN0IGZvcm1PYmplY3QgPSBuZXcgRm9ybVZhbGlkYXRvcihjdXN0b21TZXR0aW5ncywgZm9ybSk7XG4gIGZvcm1PYmplY3QuZW5hYmxlVmFsaWRhdGlvbigpO1xuICByZXR1cm4gZm9ybU9iamVjdDtcbn0pO1xuXG5jb25zdCBlZGl0UHJvZmlsZUZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRkZXNjcmlwdGlvblwiXG4pO1xuXG5jb25zdCBhZGRDYXJkRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGxpbmtcIlxuKTtcblxuY29uc3QgZWRpdEF2YXRhckZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcImF2YXRhcmZvcm1cIlxuKTtcblxuY29uc3QgZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIiNhdmF0YXItcG9wdXBcIixcbiAgKHZhbHVlcykgPT4ge1xuICAgIGF2YXRhckltZy5zcmMgPSB2YWx1ZXMuYXZhdGFyO1xuICAgIGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gICAgYXBpXG4gICAgICAucGF0Y2hVc2VyQXZhdGFyKHZhbHVlcylcbiAgICAgIC50aGVuKGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC50aGVuKGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIiNlZGl0LXBvcHVwXCIsXG4gICh2YWx1ZXMpID0+IHtcbiAgICB1c2VyLnNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lOiB2YWx1ZXMubmFtZSwgYWJvdXQ6IHZhbHVlcy50aXRsZSB9KTtcbiAgICBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgICBhcGlcbiAgICAgIC5wYXRjaFVzZXJJbmZvKHVzZXIuZ2V0VXNlckluZm8oKSlcbiAgICAgIC50aGVuKGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAudGhlbihlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5lZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGRDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY3JlYXRlLXBvcHVwXCIsICgpID0+IHtcbiAgY29uc3QgbmV3Q2FyZEluZm8gPSB7XG4gICAgbmFtZTogaW1hZ2VOYW1lSW5wdXQudmFsdWUsXG4gICAgbGluazogaW1hZ2VMaW5rSW5wdXQudmFsdWUsXG4gICAgbGlrZXM6IFtdLFxuICAgIG93bmVyOiB1c2VyLmdldFVzZXJJbmZvKCksXG4gIH07XG5cbiAgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgYXBpXG4gICAgLnVwbG9hZENhcmQobmV3Q2FyZEluZm8pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZGF0YSB9KTtcblxuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIG5ld0NhcmRJbmZvLFxuICAgICAgICBpbWFnZVBvcHVwT2JqZWN0LFxuICAgICAgICBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0XG4gICAgICApO1xuICAgIH0pXG5cbiAgICAudGhlbihhZGRDYXJkRm9ybS5yZXNldCgpKVxuICAgIC50aGVuKGFkZENhcmRGb3JtT2JqZWN0LnNldEJ1dHRvbkluYWN0aXZlKCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgIC50aGVuKGFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0bG9hZGluZ1RleHQoZmFsc2UpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSk7XG5hZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoQ29uZmlybShcbiAgXCIjZGVsZXRlLXBvcHVwXCIsXG4gIChjYXJkT2JqVG9EZWxldGUpID0+IHtcbiAgICBhcGlcbiAgICAgIC5kZWxldGVDYXJkKGNhcmRPYmpUb0RlbGV0ZS5nZXRJZCgpKVxuICAgICAgLnRoZW4oY2FyZE9ialRvRGVsZXRlLmRlbGV0ZUZyb21QYWdlKCkpXG4gICAgICAudGhlbihkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5kZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmVkaXRBdmF0YXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG59KTtcblxuYWRkQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBhZGRDYXJkRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcbn0pO1xuXG5lZGl0UHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCB1c2VySW5wdXQgPSB1c2VyLmdldFVzZXJJbmZvKCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHVzZXJJbnB1dC51c2VybmFtZTtcbiAgdGl0bGVJbnB1dC52YWx1ZSA9IHVzZXJJbnB1dC51c2VyaW5mbztcbiAgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xuXG4gIC8vdXNlci5nZXRVc2VySW5mbygpO1xuXG4gIC8vbmFtZUlucHV0LnZhbHVlID0gbmFtZVRleHQudGV4dENvbnRlbnQ7XG4gIC8vdGl0bGVJbnB1dC52YWx1ZSA9IHRpdGxlVGV4dC50ZXh0Q29udGVudDtcblxuICBlZGl0UHJvZmlsZUZvcm1PYmplY3QuY2xlYXJBbGxFcnJvcnMoKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsImNvbnN0cnVjdG9yIiwiYmFzZVVybCIsImhlYWRlcnMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0SW5pdGlhbENhcmRzIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInN0YXR1cyIsImdldFVzZXJJbmZvIiwicGF0Y2hVc2VyQXZhdGFyIiwiaW5mbyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGF0Y2hVc2VySW5mbyIsImRlbGV0ZUNhcmQiLCJpZCIsInVwbG9hZENhcmQiLCJsaWtlQ2FyZCIsInVuTGlrZUNhcmQiLCJDYXJkIiwiZGF0YSIsInRlbXBsYXRlU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJfZWxlbWVudCIsInJlbW92ZSIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfY2FyZE5hbWUiLCJuYW1lIiwiX2NhcmRMaW5rIiwibGluayIsIl9jYXJkVGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiX2NhcmRJbWFnZSIsImNyZWF0ZUNhcmRFbGVtZW50IiwiX2dldEVsZW1lbnQiLCJfc2V0SW1hZ2VBbmROYW1lIiwiX3NldEV2ZW50TGlzdGVuZXIiLCJjbG9uZU5vZGUiLCJsaWtlQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9saWtlIiwiX2RlbGV0ZSIsImNhcmRJbWFnZSIsImV2dCIsImhlYXJ0IiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwic3R5bGUiLCJ0ZXh0Q29udGVudCIsImN1c3RvbVNldHRpbmdzIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJpbnB1dEVycm9yQ2xhc3MiLCJhZGQiLCJlcnJvckNsYXNzIiwiX2hpZGVJbnB1dEVycm9yIiwiY2xlYXJBbGxFcnJvcnMiLCJpbnB1dExpc3QiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hhc0ludmFsaWRJbnB1dCIsInNvbWUiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJidXR0b25FbGVtZW50IiwiX2Rpc2FibGVCdXR0b24iLCJfZW5hYmxlQnV0dG9uIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsInNldEJ1dHRvbkluYWN0aXZlIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJlbmFibGVWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwia2V5IiwiY2xvc2UiLCJfcG9wdXAiLCJfYnV0dG9uIiwib3BlbiIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRFdmVudExpc3RlbmVycyIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9mb3JtIiwiX2NhcmRUb0RlbGV0ZSIsInNldENhcmRUb0RlbGV0ZSIsImNhcmRPYmoiLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwV2l0aEZvcm0iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dHMiLCJpbnB1dE9iaiIsImlucHV0IiwidmFsdWUiLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3NldERhdGFJbWFnZVBvcHVwIiwiaW1hZ2VQb3B1cFBpYyIsImltYWdlUG9wdXBUZXh0Iiwic3JjIiwiYWx0IiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtc0FycmF5IiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInNldEl0ZW1zIiwiY2xlYXIiLCJpbm5lckhUTUwiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJhZGRJdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsInVzZXJBdmF0YXIiLCJ1c2VyTmFtZUVsZW1lbnQiLCJ1c2VySm9iRWxlbWVudCIsInVzZXJBdmF0YXJFbGVtZW50Iiwic2V0VXNlckluZm8iLCJhYm91dCIsImF2YXRhciIsIl9pZCIsInNldFVzZXJJbmZvVGV4dE9ubHkiLCJuZXdPYmplY3QiLCJpbml0aWFsQ2FyZHMiLCJmb3JtU2VsZWN0b3IiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJCdXR0b24iLCJhdmF0YXJJbWciLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwiaW1hZ2VQb3B1cE9iamVjdCIsImF1dGhvcml6YXRpb24iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiYXBpIiwidXNlciIsImNhcmRHcmlkT2JqZWN0IiwicmVuZGVyQ2FyZCIsImRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QiLCJjYXRjaCIsImVyciIsImNhcmRDb250YWluZXIiLCJjYXJkUG9wdXBPYmplY3QiLCJkZWxldGVQb3B1cE9iamVjdCIsImNhcmRPYmplY3QiLCJnZXRJc0xpa2VkQnlDdXJyZW50VXNlciIsImdldElkIiwic2V0TGlrZXMiLCJsaWtlcyIsIm5ld0NhcmQiLCJmb3JtRWxlbWVudHNMaXN0IiwiZm9ybVZhbGlkYXRvck9iamVjdExpc3QiLCJtYXAiLCJmb3JtIiwiZm9ybU9iamVjdCIsImVkaXRQcm9maWxlRm9ybU9iamVjdCIsImZpbmQiLCJvYmoiLCJnZXRBdHRyaWJ1dGUiLCJhZGRDYXJkRm9ybU9iamVjdCIsImVkaXRBdmF0YXJGb3JtT2JqZWN0IiwiZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdCIsInZhbHVlcyIsInNldExvYWRpbmdUZXh0IiwiZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QiLCJ0aXRsZSIsImFkZENhcmRGb3JtUG9wdXBPYmplY3QiLCJuZXdDYXJkSW5mbyIsIm93bmVyIiwic2V0bG9hZGluZ1RleHQiLCJjYXJkT2JqVG9EZWxldGUiLCJkZWxldGVGcm9tUGFnZSIsInVzZXJJbnB1dCIsInVzZXJuYW1lIiwidXNlcmluZm8iXSwic291cmNlUm9vdCI6IiJ9