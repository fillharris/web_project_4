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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0sseUJBQXlCLENBQUM5RyxJQUExQjtBQUNELENBRkQ7QUFJQTRELGFBQWEsQ0FBQzlHLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLE1BQU07RUFDNUNxSyxzQkFBc0IsQ0FBQ25ILElBQXZCO0FBQ0QsQ0FGRDtBQUlBeUQsaUJBQWlCLENBQUMzRyxnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsTUFBTTtFQUNoRCxNQUFNMkssU0FBUyxHQUFHNUMsSUFBSSxDQUFDbkssV0FBTCxFQUFsQjtFQUNBeUosU0FBUyxDQUFDakQsS0FBVixHQUFrQnVHLFNBQVMsQ0FBQ0MsUUFBNUI7RUFDQXRELFVBQVUsQ0FBQ2xELEtBQVgsR0FBbUJ1RyxTQUFTLENBQUNFLFFBQTdCO0VBQ0FWLDBCQUEwQixDQUFDakgsSUFBM0IsR0FKZ0QsQ0FNaEQ7RUFFQTtFQUNBOztFQUVBd0cscUJBQXFCLENBQUNuSSxjQUF0QjtBQUNELENBWkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi9jYXJkc1wiLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwYXRjaFVzZXJBdmF0YXIoaW5mbykge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvdXNlcnMvbWUvYXZhdGFyXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm8pLFxuICAgIH0pO1xuICB9XG5cbiAgcGF0Y2hVc2VySW5mbyhpbmZvKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuX2Jhc2VVcmwgKyBcIi91c2Vycy9tZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbmZvKSxcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDYXJkKGluZm8pIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5mbyksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgbGlrZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5fYmFzZVVybCArIFwiL2NhcmRzL2xpa2VzL1wiICsgaWQsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0pO1xuICB9XG5cbiAgdW5MaWtlQ2FyZChpZCkge1xuICAgIHJldHVybiBmZXRjaCh0aGlzLl9iYXNlVXJsICsgXCIvY2FyZHMvbGlrZXMvXCIgKyBpZCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQXBpIH07XG4iLCJjbGFzcyBDYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCB0ZW1wbGF0ZVNlbGVjdG9yLCBoYW5kbGVDYXJkQ2xpY2spIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICAgIHRoaXMuX2NhcmROYW1lID0gZGF0YS5uYW1lO1xuICAgICAgdGhpcy5fY2FyZExpbmsgPSBkYXRhLmxpbms7XG4gICAgICB0aGlzLl9jYXJkVGVtcGxhdGUgPSBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3Rvcih0ZW1wbGF0ZVNlbGVjdG9yKVxuICAgICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIik7XG4gICAgICB0aGlzLl9lbGVtZW50OyBcbiAgICAgIHRoaXMuX2NhcmRJbWFnZTsgXG4gICAgfVxuICAgIGNyZWF0ZUNhcmRFbGVtZW50KCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnQoKTtcbiAgXG4gICAgICB0aGlzLl9zZXRJbWFnZUFuZE5hbWUoKTtcbiAgICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIoKTtcbiAgXG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICB9XG4gIFxuICAgIF9nZXRFbGVtZW50KClcbiAgICB7XG4gICAgICByZXR1cm4gdGhpcy5fY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTsgXG4gICAgfVxuICAgIF9zZXRFdmVudExpc3RlbmVyKCkge1xuICAgICAgY29uc3QgbGlrZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKTtcbiAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnV0dG9uXCIpO1xuICAgICAgbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fbGlrZSk7IFxuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9kZWxldGUpO1xuICBcbiAgICAgIGNvbnN0IGNhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICAgIGNhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soKTtcbiAgICAgIH0pO1xuICAgIH0gXG4gIFxuICAgIF9saWtlKGV2dCkge1xuICAgICAgY29uc3QgaGVhcnQgPSBldnQudGFyZ2V0OyBcbiAgICAgIGhlYXJ0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19hY3RpdmUtYnV0dG9uXCIpO1xuICAgIH1cbiAgXG4gICAgX2RlbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIFxuICAgIF9zZXRJbWFnZUFuZE5hbWUoKSB7XG4gICAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgICB0aGlzLl9jYXJkSW1hZ2Uuc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTp1cmwoJHt0aGlzLl9jYXJkTGlua30pO2A7XG4gICAgICB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9jYXJkTmFtZTtcbiAgICB9XG4gIH1cbiAgXG4gIFxuICBcbiAgXG4gIGV4cG9ydCB7Q2FyZH07XG4gICIsImltcG9ydCB7Y3VzdG9tU2V0dGluZ3N9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWxlbWVudCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7IFxuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyk7IFxuICB9XG5cbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpOyBcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpOyBcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9XG5cbiAgY2xlYXJBbGxFcnJvcnMoKVxuICB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgY3VzdG9tU2V0dGluZ3MuaW5wdXRTZWxlY3RvclxuICAgICAgKVxuICAgICk7XG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuICBcbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSB7XG4gICAgcmV0dXJuIGlucHV0TGlzdC5zb21lKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoaW5wdXRMaXN0KSkge1xuICAgICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxuXG4gIF9lbmFibGVCdXR0b24oYnV0dG9uRWxlbWVudCkge1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9XG5cbiAgc2V0QnV0dG9uSW5hY3RpdmUoKSB7IFxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLnNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICB9XG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XG4gICAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNldHRpbmdzLmlucHV0U2VsZWN0b3IpXG4gICAgKTtcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTsgXG4gICAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpOyBcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IEZvcm1WYWxpZGF0b3J9OyIsImNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jbG9zZS1idXR0b25cIik7XG4gIH1cbiAgb3BlbigpIHtcbiAgICAvKiBUaGUgdmlzaWJsZSBjbGFzcyBvdmVycmlkZXMgdGhlIHByZXZpb3VzIGNsYXNzIGJlY2F1c2UgaXRzIGZhcnRoZXIgZG93biB0aGUgcGFnZS4gc2VlIG1vZGFsLmNzcy4qL1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXG4gICAgICBcInBvcHVwX29wZW5cIlxuICAgICk7IC8qYWN0aXZhdGUgYSBjbGFzcyB0aGF0IG1ha2VzIGl0IHZpc2libGUqL1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTsgLy9jbG9zZSBvbiBlc2NcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBcInBvcHVwX29wZW5cIlxuICAgICk7IC8qZGVhY3RpdmF0ZSBhIGNsYXNzIHRoYXQgbWFrZXMgaXQgdmlzaWJsZSovXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlID0gKGV2dCkgPT57XG4gICAgLy90aGlzIGlzIGFuIGFycm93IGZ1bmN0aW9uXG4gICAgLy90aGF0IHdheSwgd2UgZG8gbm90IGhhdmUgdG8gY3JlYXRlIGFuIGFycm93IGZ1bmN0aW9uIHdoZW4gc2V0dGluZyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAvL2Fsc28gYmVjYXVzZSB3ZSBkbyBub3QgY3JlYXRlIGEgbmV3IGFycm93IGZ1bmN0aW9uIHdoZW4gc2V0dGluZyBldmVudCBsaXN0ZW5lciwgd2UgY2FuIHJlbW92ZSB0aGlzIGV2ZW50IGxpc3RlbmVyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAvL2Nsb3NlIHdoZW4gWCBpcyBjbGlja2VkXG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XG4gICAgICAvL3VzZSBtb3VzZWRvd24gc28gdGhhdCBpZiB1c2VyIGNsaWNrcyBvbiBib3ggYW5kIGRyYWdzIG91dHNpZGUsIHRoaXMgZXZlbnQgZG9lcyBub3QgdHJpZ2dlclxuICAgICAgLy9vbmx5IHRyaWdnZXJzIGlmIHRoZXkgY2xpY2sgb3V0c2lkZSBtb2RhbCBib3hcblxuICAgICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXBcIikpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwOztcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xuXG5jbGFzcyBQb3B1cFdpdGhDb25maXJtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwb3B1cFNlbGVjdG9yLFxuICAgIGhhbmRsZUZvcm1TdWJtaXQgXG4gICkge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpOyBcbiAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0ID0gaGFuZGxlRm9ybVN1Ym1pdDtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcblxuICAgIHRoaXMuX2NhcmRUb0RlbGV0ZTtcbiAgfVxuXG4gIHNldENhcmRUb0RlbGV0ZShjYXJkT2JqKSB7XG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlID0gY2FyZE9iajtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fY2FyZFRvRGVsZXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aENvbmZpcm07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvcHVwU2VsZWN0b3IsXG4gICAgaGFuZGxlRm9ybVN1Ym1pdCBcbiAgKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7IFxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGlucHV0cyA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuXG4gICAgY29uc3QgaW5wdXRPYmogPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0T2JqW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5wdXRPYmo7IFxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTsgXG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBzdXBlci5jbG9zZSgpO1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhGb3JtOyIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiXG5cbmNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXB7XG4gICAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvcilcbiAgICB7XG4gICAgICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgICAgICBcbiAgICB9XG4gICAgX3NldERhdGFJbWFnZVBvcHVwKCkge1xuICAgICAgICBjb25zdCBpbWFnZVBvcHVwUGljID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fcHJldmlldy1pbWFnZVwiKTtcbiAgICAgICAgY29uc3QgaW1hZ2VQb3B1cFRleHQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LW5hbWVcIik7XG4gICAgICAgIGltYWdlUG9wdXBQaWMuc3JjID0gdGhpcy5saW5rO1xuICAgICAgICBpbWFnZVBvcHVwVGV4dC50ZXh0Q29udGVudCA9IHRoaXMubmFtZTtcbiAgICAgICAgaW1hZ2VQb3B1cFBpYy5hbHQgPSB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgb3BlbihkYXRhKS8vZGF0YSBjb250YWlucyBuYW1lIGFuZCBsaW5rLiBzZW50IGhlcmUgYW5kIG5vdCBpbiB0aGUgY29uc3RydWN0b3JcbiAgICB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5saW5rID0gZGF0YS5saW5rO1xuICAgICAgICB0aGlzLl9zZXREYXRhSW1hZ2VQb3B1cCgpO1xuICAgICAgICBzdXBlci5vcGVuKCk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFdpdGhJbWFnZTs7IiwiXG5cbmNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2l0ZW1zQXJyYXkgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgc2V0SXRlbXMoaXRlbXMpIHtcbiAgICB0aGlzLl9pdGVtc0FycmF5ID0gaXRlbXM7XG4gIH1cblxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG4gXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjsiLCJcbmNsYXNzIFVzZXJJbmZvIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHsgdXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIgfSBcbiAgICApIFxuICAgIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJBdmF0YXIpO1xuICAgIH1cbiAgICBzZXRVc2VySW5mbyh7IG5hbWUsIGFib3V0LCBhdmF0YXIsIF9pZCB9KSB7XG4gICAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50LnNyYyA9IGF2YXRhcjtcbiAgICAgIHRoaXMuaWQgPSBfaWQ7IFxuICAgIH1cblxuICAgIHNldFVzZXJJbmZvVGV4dE9ubHkoeyBuYW1lLCBhYm91dCB9KSB7XG4gICAgICB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50ID0gYWJvdXQ7XG4gICAgfVxuXG4gICBnZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgIGFib3V0OiB0aGlzLnVzZXJKb2JFbGVtZW50LnRleHRDb250ZW50LFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG4gICAgfVxuICBcbiAgZXhwb3J0IHsgVXNlckluZm8gfTs7IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiU2Fzc2FmcmFzIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5ODU1OTA2OTM1Mi0zZDg0MzdiMGQ0MmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkFuZ2VsIFRyZWVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjExODU5MzI4MDUzLTNjYmM5ZjkzOTlmND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzI2JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTXlydGxlIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzg1ODc5NzE3NS1iN2RiYTNjNWM4ZmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVGw4ZkcxNWNuUnNaU1V5TUdKbFlXTm9KVEl3YzI5MWRHZ2xNakJqWVhKdmJHbHVZWHhsYm53d2ZId3dmSHclM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJFZGlzdG8gQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ2MTg4OTk0LWZlYTBlY2JiMDRhND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9Njg3JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVGFibGUgUm9jayBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc5MTI2ODk0MzAtMjhkNjYyNGZlNDY3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2NtOW1hV3hsTFhCaFoyVjhOM3g4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ29uZ2FyZWUgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTU2NTMwNTE5NjgtNjljMmIwZTQzMzQ3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuXTtcblxuIGV4cG9ydCBjb25zdCBjdXN0b21TZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5wb3B1cF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJwb3B1cF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG4gIHByb2ZpbGVJbWFnZVNlbGVjdG9yOiBcIi5wcm9maWxlX19pbWFnZVwiXG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcbi8vSW1wb3J0IGNsYXNzZXNcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuLi9jb21wb25lbnRzL0FwaS5qc1wiO1xuXG5pbXBvcnQgeyBGb3JtVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xuXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuXG5pbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50cy5qc1wiO1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5cbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qc1wiO1xuXG4vLyBCdXR0b25zIGFuZCBvdGhlciBET00gZWxlbWVudHNcblxuY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hdmF0YXItYnV0dG9uXCIpO1xuY29uc3QgYXZhdGFySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbWFnZVwiKTtcblxuLy8gRm9ybSBkYXRhXG5jb25zdCBuYW1lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbmNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJyk7XG5jb25zdCB0aXRsZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiZGVzY3JpcHRpb25cIl0nKTtcbmNvbnN0IGltYWdlTmFtZUlucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJwbGFjZS1uYW1lXCJdJyk7XG5jb25zdCBpbWFnZUxpbmtJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibGlua1wiXScpO1xuXG5jb25zdCBpbWFnZVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5pbWFnZVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vVG9rZW4gYW5kIElEIGluZm9cbi8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuZmV0Y2goXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyL3VzZXJzL21lXCIsIHtcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gIH0sXG59KVxuICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgfSk7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VySW5mbyh7XG4gIHVzZXJOYW1lOiBcIi5wcm9maWxlX19uYW1lXCIsXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXG4gIHVzZXJBdmF0YXI6IFwiLnByb2ZpbGVfX2ltYWdlXCIsXG59KTtcblxuLy8gZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QpXG4vLyB7XG4vLyAgIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChkYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcbi8vICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbi8vICAgfSk7XG5cbi8vICAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQoKTtcbi8vICAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xuLy8gfVxuXG5mdW5jdGlvbiBoYW5kbGVDYXJkQ2xpY2sobmFtZSwgaW1hZ2VVcmwpIHtcbiAgaW1hZ2VQb3B1cE9iamVjdC5vcGVuKG5hbWUsIGltYWdlVXJsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmQsIGNhcmRJZCwgaXNMaWtlZCkge1xuICBhcGlcbiAgICAudXBkYXRlTGlrZXMoY2FyZElkLCBpc0xpa2VkKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjYXJkLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn1cblxuY29uc3QgY2FyZEdyaWRPYmplY3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBudWxsLFxuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgXCIucGhvdG8tZ3JpZF9fY2FyZHNcIlxuKTtcblxuYXBpXG4gIC5nZXRVc2VySW5mbygpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mbyhkYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAudGhlbigoKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZ2V0SW5pdGlhbENhcmRzKClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3Quc2V0SXRlbXMocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3QucmVuZGVySXRlbXMoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdCwgZGVsZXRlUG9wdXBPYmplY3QpIHtcbiAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Quc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmplY3QpO1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Qub3BlbigpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGNhcmRPYmplY3QuZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIoKSA9PSBmYWxzZSkge1xuICAgICAgICBhcGlcbiAgICAgICAgICAubGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBpXG4gICAgICAgICAgLnVuTGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXNlclxuICApO1xuXG4gIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KHVzZXIpO1xuICBjYXJkQ29udGFpbmVyLmFkZEl0ZW0obmV3Q2FyZCk7XG59XG5cbmNvbnN0IGZvcm1FbGVtZW50c0xpc3QgPSBBcnJheS5mcm9tKFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGN1c3RvbVNldHRpbmdzLmZvcm1TZWxlY3Rvcilcbik7XG5cbmNvbnN0IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0ID0gZm9ybUVsZW1lbnRzTGlzdC5tYXAoKGZvcm0pID0+IHtcbiAgY29uc3QgZm9ybU9iamVjdCA9IG5ldyBGb3JtVmFsaWRhdG9yKGN1c3RvbVNldHRpbmdzLCBmb3JtKTtcbiAgZm9ybU9iamVjdC5lbmFibGVWYWxpZGF0aW9uKCk7XG4gIHJldHVybiBmb3JtT2JqZWN0O1xufSk7XG5cbmNvbnN0IGVkaXRQcm9maWxlRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwibmFtZWFuZGRlc2NyaXB0aW9uXCJcbik7XG5cbmNvbnN0IGFkZENhcmRGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kbGlua1wiXG4pO1xuXG5jb25zdCBlZGl0QXZhdGFyRm9ybU9iamVjdCA9IGZvcm1WYWxpZGF0b3JPYmplY3RMaXN0LmZpbmQoXG4gIChvYmopID0+IG9iai5mb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IFwiYXZhdGFyZm9ybVwiXG4pO1xuXG5jb25zdCBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI2F2YXRhci1wb3B1cFwiLFxuICAodmFsdWVzKSA9PiB7XG4gICAgYXZhdGFySW1nLnNyYyA9IHZhbHVlcy5hdmF0YXI7XG4gICAgZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dCh0cnVlKTtcbiAgICBhcGlcbiAgICAgIC5wYXRjaFVzZXJBdmF0YXIodmFsdWVzKVxuICAgICAgLnRoZW4oZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLnRoZW4oZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdC5zZXRMb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cbik7XG5lZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXG4gIFwiI2VkaXQtcG9wdXBcIixcbiAgKHZhbHVlcykgPT4ge1xuICAgIHVzZXIuc2V0VXNlckluZm9UZXh0T25seSh7IG5hbWU6IHZhbHVlcy5uYW1lLCBhYm91dDogdmFsdWVzLnRpdGxlIH0pO1xuICAgIGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICAgIGFwaVxuICAgICAgLnBhdGNoVXNlckluZm8odXNlci5nZXRVc2VySW5mbygpKVxuICAgICAgLnRoZW4oZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC50aGVuKGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGFkZENhcmRGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNjcmVhdGUtcG9wdXBcIiwgKCkgPT4ge1xuICBjb25zdCBuZXdDYXJkSW5mbyA9IHtcbiAgICBuYW1lOiBpbWFnZU5hbWVJbnB1dC52YWx1ZSxcbiAgICBsaW5rOiBpbWFnZUxpbmtJbnB1dC52YWx1ZSxcbiAgICBsaWtlczogW10sXG4gICAgb3duZXI6IHVzZXIuZ2V0VXNlckluZm8oKSxcbiAgfTtcblxuICBhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICBhcGlcbiAgICAudXBsb2FkQ2FyZChuZXdDYXJkSW5mbylcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coeyBkYXRhIH0pO1xuXG4gICAgICByZW5kZXJDYXJkKFxuICAgICAgICBjYXJkR3JpZE9iamVjdCxcbiAgICAgICAgbmV3Q2FyZEluZm8sXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSlcblxuICAgIC50aGVuKGFkZENhcmRGb3JtLnJlc2V0KCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1PYmplY3Quc2V0QnV0dG9uSW5hY3RpdmUoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRsb2FkaW5nVGV4dChmYWxzZSkpXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59KTtcbmFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhDb25maXJtKFxuICBcIiNkZWxldGUtcG9wdXBcIixcbiAgKGNhcmRPYmpUb0RlbGV0ZSkgPT4ge1xuICAgIGFwaVxuICAgICAgLmRlbGV0ZUNhcmQoY2FyZE9ialRvRGVsZXRlLmdldElkKCkpXG4gICAgICAudGhlbihjYXJkT2JqVG9EZWxldGUuZGVsZXRlRnJvbVBhZ2UoKSlcbiAgICAgIC50aGVuKGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuZWRpdEF2YXRhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcbn0pO1xuXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXIuZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJuYW1lO1xuICB0aXRsZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJpbmZvO1xuICBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG5cbiAgLy91c2VyLmdldFVzZXJJbmZvKCk7XG5cbiAgLy9uYW1lSW5wdXQudmFsdWUgPSBuYW1lVGV4dC50ZXh0Q29udGVudDtcbiAgLy90aXRsZUlucHV0LnZhbHVlID0gdGl0bGVUZXh0LnRleHRDb250ZW50O1xuXG4gIGVkaXRQcm9maWxlRm9ybU9iamVjdC5jbGVhckFsbEVycm9ycygpO1xufSk7XG4iXSwibmFtZXMiOlsiQXBpIiwiY29uc3RydWN0b3IiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwiZ2V0VXNlckluZm8iLCJwYXRjaFVzZXJBdmF0YXIiLCJpbmZvIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRjaFVzZXJJbmZvIiwiZGVsZXRlQ2FyZCIsImlkIiwidXBsb2FkQ2FyZCIsImxpa2VDYXJkIiwidW5MaWtlQ2FyZCIsIkNhcmQiLCJkYXRhIiwidGVtcGxhdGVTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9jYXJkTmFtZSIsIm5hbWUiLCJfY2FyZExpbmsiLCJsaW5rIiwiX2NhcmRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJfY2FyZEltYWdlIiwiY3JlYXRlQ2FyZEVsZW1lbnQiLCJfZ2V0RWxlbWVudCIsIl9zZXRJbWFnZUFuZE5hbWUiLCJfc2V0RXZlbnRMaXN0ZW5lciIsImNsb25lTm9kZSIsImxpa2VCdXR0b24iLCJkZWxldGVCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiX2xpa2UiLCJfZGVsZXRlIiwiY2FyZEltYWdlIiwiZXZ0IiwiaGVhcnQiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJzdHlsZSIsInRleHRDb250ZW50IiwiY3VzdG9tU2V0dGluZ3MiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWxlbWVudCIsImVycm9yTWVzc2FnZSIsImVycm9yRWxlbWVudCIsImlucHV0RXJyb3JDbGFzcyIsImFkZCIsImVycm9yQ2xhc3MiLCJfaGlkZUlucHV0RXJyb3IiLCJjbGVhckFsbEVycm9ycyIsImlucHV0TGlzdCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJ2YWxpZGl0eSIsInZhbGlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGFzSW52YWxpZElucHV0Iiwic29tZSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImJ1dHRvbkVsZW1lbnQiLCJfZGlzYWJsZUJ1dHRvbiIsIl9lbmFibGVCdXR0b24iLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwic2V0QnV0dG9uSW5hY3RpdmUiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImVuYWJsZVZhbGlkYXRpb24iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsIl9wb3B1cCIsIl9idXR0b24iLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldEV2ZW50TGlzdGVuZXJzIiwiY29udGFpbnMiLCJQb3B1cFdpdGhDb25maXJtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2Zvcm0iLCJfY2FyZFRvRGVsZXRlIiwic2V0Q2FyZFRvRGVsZXRlIiwiY2FyZE9iaiIsInByZXZlbnREZWZhdWx0IiwiUG9wdXBXaXRoRm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfc2V0RGF0YUltYWdlUG9wdXAiLCJpbWFnZVBvcHVwUGljIiwiaW1hZ2VQb3B1cFRleHQiLCJzcmMiLCJhbHQiLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zQXJyYXkiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwic2V0SXRlbXMiLCJjbGVhciIsImlubmVySFRNTCIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlckF2YXRhciIsInVzZXJOYW1lRWxlbWVudCIsInVzZXJKb2JFbGVtZW50IiwidXNlckF2YXRhckVsZW1lbnQiLCJzZXRVc2VySW5mbyIsImFib3V0IiwiYXZhdGFyIiwiX2lkIiwic2V0VXNlckluZm9UZXh0T25seSIsIm5ld09iamVjdCIsImluaXRpYWxDYXJkcyIsImZvcm1TZWxlY3RvciIsInByb2ZpbGVJbWFnZVNlbGVjdG9yIiwiZWRpdFByb2ZpbGVCdXR0b24iLCJlZGl0UHJvZmlsZU1vZGFsIiwiZWRpdFByb2ZpbGVGb3JtIiwiYWRkQ2FyZEJ1dHRvbiIsImFkZENhcmRQb3B1cCIsImFkZENhcmRGb3JtIiwiZWRpdEF2YXRhckJ1dHRvbiIsImF2YXRhckltZyIsIm5hbWVUZXh0IiwidGl0bGVUZXh0IiwibmFtZUlucHV0IiwidGl0bGVJbnB1dCIsImltYWdlTmFtZUlucHV0IiwiaW1hZ2VMaW5rSW5wdXQiLCJpbWFnZVBvcHVwT2JqZWN0IiwiYXV0aG9yaXphdGlvbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJhcGkiLCJ1c2VyIiwiaW1hZ2VVcmwiLCJoYW5kbGVMaWtlQ2xpY2siLCJjYXJkIiwiY2FyZElkIiwiaXNMaWtlZCIsInVwZGF0ZUxpa2VzIiwiX2xpa2VzIiwibGlrZXMiLCJjYXRjaCIsImVyciIsImNhcmRHcmlkT2JqZWN0IiwicmVuZGVyQ2FyZCIsImRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3QiLCJjYXJkQ29udGFpbmVyIiwiY2FyZFBvcHVwT2JqZWN0IiwiZGVsZXRlUG9wdXBPYmplY3QiLCJjYXJkT2JqZWN0IiwiZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIiLCJnZXRJZCIsInNldExpa2VzIiwibmV3Q2FyZCIsImZvcm1FbGVtZW50c0xpc3QiLCJmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdCIsIm1hcCIsImZvcm0iLCJmb3JtT2JqZWN0IiwiZWRpdFByb2ZpbGVGb3JtT2JqZWN0IiwiZmluZCIsIm9iaiIsImdldEF0dHJpYnV0ZSIsImFkZENhcmRGb3JtT2JqZWN0IiwiZWRpdEF2YXRhckZvcm1PYmplY3QiLCJlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0IiwidmFsdWVzIiwic2V0TG9hZGluZ1RleHQiLCJlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdCIsInRpdGxlIiwiYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdCIsIm5ld0NhcmRJbmZvIiwib3duZXIiLCJzZXRsb2FkaW5nVGV4dCIsImNhcmRPYmpUb0RlbGV0ZSIsImRlbGV0ZUZyb21QYWdlIiwidXNlcklucHV0IiwidXNlcm5hbWUiLCJ1c2VyaW5mbyJdLCJzb3VyY2VSb290IjoiIn0=