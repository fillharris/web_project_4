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
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getInitialCards() {
    return fetch(this.baseURL + "/cards", {
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  editUserProfile() {
    return fetch(this.baseURL + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  editAvatar(link) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addNewCard(_ref) {
    let {
      title,
      imageUrl
    } = _ref;
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: imageUrl
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/".concat(cardId), {
      method: "DELETE",
      headers: this.headers
    });
  }

  updateLikes(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(this.baseUrl + "/cards/likes/".concat(cardId), {
      method: method,
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
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
        console.log(err); // log the error to the console
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5iYXNlVXJsICsgXCIvdXNlcnMvbWVcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2godGhpcy5iYXNlVVJMICsgXCIvY2FyZHNcIiwge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRVc2VyUHJvZmlsZSgpIHtcbiAgICByZXR1cm4gZmV0Y2ggKHRoaXMuYmFzZVVSTCArIFwiL3VzZXJzL21lXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgYWJvdXQ6IGpvYixcbiAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZWRpdEF2YXRhcihsaW5rKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuYmFzZVVybCArIFwiL3VzZXJzL21lL2F2YXRhclwiLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyOiBsaW5rLFxuICAgICAgfSksXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkTmV3Q2FyZCh7IHRpdGxlLCBpbWFnZVVybCB9KSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuYmFzZVVybCArIFwiL2NhcmRzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IHRpdGxlLFxuICAgICAgICBsaW5rOiBpbWFnZVVybCxcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKHRoaXMuYmFzZVVybCArIGAvY2FyZHMvJHtjYXJkSWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTGlrZXMoY2FyZElkLCBpc0xpa2VkKSB7ICBcbiAgICBjb25zdCBtZXRob2QgPSBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCI7XG4gICAgcmV0dXJuIGZldGNoKFxuICAgICAgdGhpcy5iYXNlVXJsICsgYC9jYXJkcy9saWtlcy8ke2NhcmRJZH1gLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgfVxuICAgICkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiIsImNsYXNzIENhcmQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIHRlbXBsYXRlU2VsZWN0b3IsIGhhbmRsZUNhcmRDbGljaykge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgICAgdGhpcy5fY2FyZE5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICB0aGlzLl9jYXJkTGluayA9IGRhdGEubGluaztcbiAgICAgIHRoaXMuX2NhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKHRlbXBsYXRlU2VsZWN0b3IpXG4gICAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQ7IFxuICAgICAgdGhpcy5fY2FyZEltYWdlOyBcbiAgICB9XG4gICAgY3JlYXRlQ2FyZEVsZW1lbnQoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICBcbiAgICAgIHRoaXMuX3NldEltYWdlQW5kTmFtZSgpO1xuICAgICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcigpO1xuICBcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICAgIH1cbiAgXG4gICAgX2dldEVsZW1lbnQoKVxuICAgIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYXJkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpOyBcbiAgICB9XG4gICAgX3NldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICBjb25zdCBsaWtlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xuICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG4gICAgICBsaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9saWtlKTsgXG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2RlbGV0ZSk7XG4gIFxuICAgICAgY29uc3QgY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgICAgY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljaygpO1xuICAgICAgfSk7XG4gICAgfSBcbiAgXG4gICAgX2xpa2UoZXZ0KSB7XG4gICAgICBjb25zdCBoZWFydCA9IGV2dC50YXJnZXQ7IFxuICAgICAgaGVhcnQuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2FjdGl2ZS1idXR0b25cIik7XG4gICAgfVxuICBcbiAgICBfZGVsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgXG4gICAgX3NldEltYWdlQW5kTmFtZSgpIHtcbiAgICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcbiAgICAgIHRoaXMuX2NhcmRJbWFnZS5zdHlsZSA9IGBiYWNrZ3JvdW5kLWltYWdlOnVybCgke3RoaXMuX2NhcmRMaW5rfSk7YDtcbiAgICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX2NhcmROYW1lO1xuICAgIH1cbiAgfVxuICBcbiAgXG4gIFxuICBcbiAgZXhwb3J0IHtDYXJkfTtcbiAgIiwiaW1wb3J0IHtjdXN0b21TZXR0aW5nc30gZnJvbSBcIi4vY29uc3RhbnRzLmpzXCI7XG5jbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQsIGVycm9yTWVzc2FnZSkge1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxuICAgICk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTsgXG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKTsgXG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7IFxuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyk7IFxuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cblxuICBjbGVhckFsbEVycm9ycygpXG4gIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBjdXN0b21TZXR0aW5ncy5pbnB1dFNlbGVjdG9yXG4gICAgICApXG4gICAgKTtcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG4gIFxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xuICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQsIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpIHtcbiAgICByZXR1cm4gaW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSk7XG4gIH1cblxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbmFibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCkge1xuICAgIGJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICB9XG5cbiAgX2VuYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KSB7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cblxuICBzZXRCdXR0b25JbmFjdGl2ZSgpIHsgXG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gIH1cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2V0dGluZ3MuaW5wdXRTZWxlY3RvcilcbiAgICApO1xuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICB0aGlzLnNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpOyBcbiAgICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCk7IFxuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgRm9ybVZhbGlkYXRvcn07IiwiY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlLWJ1dHRvblwiKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIC8qIFRoZSB2aXNpYmxlIGNsYXNzIG92ZXJyaWRlcyB0aGUgcHJldmlvdXMgY2xhc3MgYmVjYXVzZSBpdHMgZmFydGhlciBkb3duIHRoZSBwYWdlLiBzZWUgbW9kYWwuY3NzLiovXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcbiAgICAgIFwicG9wdXBfb3BlblwiXG4gICAgKTsgLyphY3RpdmF0ZSBhIGNsYXNzIHRoYXQgbWFrZXMgaXQgdmlzaWJsZSovXG4gICAgXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpOyAvL2Nsb3NlIG9uIGVzY1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIFwicG9wdXBfb3BlblwiXG4gICAgKTsgLypkZWFjdGl2YXRlIGEgY2xhc3MgdGhhdCBtYWtlcyBpdCB2aXNpYmxlKi9cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PntcbiAgICAvL3RoaXMgaXMgYW4gYXJyb3cgZnVuY3Rpb25cbiAgICAvL3RoYXQgd2F5LCB3ZSBkbyBub3QgaGF2ZSB0byBjcmVhdGUgYW4gYXJyb3cgZnVuY3Rpb24gd2hlbiBzZXR0aW5nIHRoZSBldmVudCBsaXN0ZW5lclxuICAgIC8vYWxzbyBiZWNhdXNlIHdlIGRvIG5vdCBjcmVhdGUgYSBuZXcgYXJyb3cgZnVuY3Rpb24gd2hlbiBzZXR0aW5nIGV2ZW50IGxpc3RlbmVyLCB3ZSBjYW4gcmVtb3ZlIHRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vY2xvc2Ugd2hlbiBYIGlzIGNsaWNrZWRcbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XG5cbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQpID0+IHtcbiAgICAgIC8vdXNlIG1vdXNlZG93biBzbyB0aGF0IGlmIHVzZXIgY2xpY2tzIG9uIGJveCBhbmQgZHJhZ3Mgb3V0c2lkZSwgdGhpcyBldmVudCBkb2VzIG5vdCB0cmlnZ2VyXG4gICAgICAvL29ubHkgdHJpZ2dlcnMgaWYgdGhleSBjbGljayBvdXRzaWRlIG1vZGFsIGJveFxuXG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cFwiKSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXA7O1xuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XG5cbmNsYXNzIFBvcHVwV2l0aENvbmZpcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvcHVwU2VsZWN0b3IsXG4gICAgaGFuZGxlRm9ybVN1Ym1pdCBcbiAgKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7IFxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtXCIpO1xuXG4gICAgdGhpcy5fY2FyZFRvRGVsZXRlO1xuICB9XG5cbiAgc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmopIHtcbiAgICB0aGlzLl9jYXJkVG9EZWxldGUgPSBjYXJkT2JqO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IFxuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9jYXJkVG9EZWxldGUpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdXBXaXRoQ29uZmlybTsiLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcG9wdXBTZWxlY3RvcixcbiAgICBoYW5kbGVGb3JtU3VibWl0IFxuICApIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTsgXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG5cbiAgICBjb25zdCBpbnB1dE9iaiA9IHt9O1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRPYmpbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnB1dE9iajsgXG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpOyBcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IFxuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEZvcm07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCJcblxuY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cHtcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKVxuICAgIHtcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgIH1cbiAgICBfc2V0RGF0YUltYWdlUG9wdXAoKSB7XG4gICAgICAgIGNvbnN0IGltYWdlUG9wdXBQaWMgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgICAgICBjb25zdCBpbWFnZVBvcHVwVGV4dCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICAgICAgaW1hZ2VQb3B1cFBpYy5zcmMgPSB0aGlzLmxpbms7XG4gICAgICAgIGltYWdlUG9wdXBUZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgICAgICBpbWFnZVBvcHVwUGljLmFsdCA9IHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICBvcGVuKGRhdGEpLy9kYXRhIGNvbnRhaW5zIG5hbWUgYW5kIGxpbmsuIHNlbnQgaGVyZSBhbmQgbm90IGluIHRoZSBjb25zdHJ1Y3RvclxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbms7XG4gICAgICAgIHRoaXMuX3NldERhdGFJbWFnZVBvcHVwKCk7XG4gICAgICAgIHN1cGVyLm9wZW4oKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEltYWdlOzsiLCJcblxuY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjsiLCJcbmNsYXNzIFVzZXJJbmZvIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHsgdXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIgfSBcbiAgICApIFxuICAgIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICAgIHRoaXMudXNlckF2YXRhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJBdmF0YXIpO1xuICAgIH1cbiAgICBzZXRVc2VySW5mbyh7IG5ld05hbWUsIG5ld0pvYiwgbmV3QXZhdGFyIH0pIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmV3TmFtZTtcbiAgICAgIHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBuZXdKb2I7XG4gICAgICB0aGlzLnVzZXJBdmF0YXJFbGVtZW50LnNyYyA9IG5ld0F2YXRhcjtcbiAgICB9XG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgdXNlcmluZm86IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICAgIHVzZXJBdmF0YXI6IHRoaXMudXNlckF2YXRhckVsZW1lbnQuc3JjLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPYmplY3Q7XG4gICAgfVxuICAgIH1cbiAgXG4gIGV4cG9ydCB7IFVzZXJJbmZvIH07OyIsImV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIlNhc3NhZnJhcyBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTg1NTkwNjkzNTItM2Q4NDM3YjBkNDJjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJBbmdlbCBUcmVlXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxMTg1OTMyODA1My0zY2JjOWY5Mzk5ZjQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcyNiZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIk15cnRsZSBCZWFjaFwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc4NTg3OTcxNzUtYjdkYmEzYzVjOGZjP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4elpXRnlZMmg4TVRsOGZHMTVjblJzWlNVeU1HSmxZV05vSlRJd2MyOTFkR2dsTWpCallYSnZiR2x1WVh4bGJud3dmSHd3Zkh3JTNEJmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiRWRpc3RvIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU0NjE4ODk5NC1mZWEwZWNiYjA0YTQ/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTY4NyZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRhYmxlIFJvY2sgTW91bnRhaW5cIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE3OTEyNjg5NDMwLTI4ZDY2MjRmZTQ2Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdjbTltYVd4bExYQmhaMlY4TjN4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTcwMCZxPTYwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkNvbmdhcmVlIE5hdGlvbmFsIFBhcmtcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE1NjUzMDUxOTY4LTY5YzJiMGU0MzM0Nz9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9ODcwJnE9ODBcIixcbiAgfSxcbl07XG5cbiBleHBvcnQgY29uc3QgY3VzdG9tU2V0dGluZ3MgPSB7XG4gIGZvcm1TZWxlY3RvcjogXCIucG9wdXBfX2Zvcm1cIixcbiAgaW5wdXRTZWxlY3RvcjogXCIucG9wdXBfX2lucHV0XCIsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5wb3B1cF9fYnV0dG9uXCIsXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX3NhdmUtYnV0dG9uX2Rpc2FibGVkXCIsXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JcIixcbiAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiLFxuICBwcm9maWxlSW1hZ2VTZWxlY3RvcjogXCIucHJvZmlsZV9faW1hZ2VcIlxufVxuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG4vL0ltcG9ydCBjbGFzc2VzXG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaS5qc1wiO1xuXG5pbXBvcnQgeyBGb3JtVmFsaWRhdG9yIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xuXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuXG5pbXBvcnQgeyBjdXN0b21TZXR0aW5ncyB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50cy5qc1wiO1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5cbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcblxuaW1wb3J0IFBvcHVwV2l0aENvbmZpcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoQ29uZmlybS5qc1wiO1xuXG4vLyBCdXR0b25zIGFuZCBvdGhlciBET00gZWxlbWVudHNcblxuY29uc3QgZWRpdFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgZWRpdFByb2ZpbGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1wb3B1cFwiKTtcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcbmNvbnN0IGFkZENhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XG5jb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZS1wb3B1cFwiKTtcbmNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5jb25zdCBlZGl0QXZhdGFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hdmF0YXItYnV0dG9uXCIpO1xuY29uc3QgYXZhdGFySW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19pbWFnZVwiKTtcblxuLy8gRm9ybSBkYXRhXG5jb25zdCBuYW1lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcbmNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG5jb25zdCBuYW1lSW5wdXQgPSBlZGl0UHJvZmlsZUZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJyk7XG5jb25zdCB0aXRsZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiZGVzY3JpcHRpb25cIl0nKTtcbmNvbnN0IGltYWdlTmFtZUlucHV0ID0gYWRkQ2FyZEZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJwbGFjZS1uYW1lXCJdJyk7XG5jb25zdCBpbWFnZUxpbmtJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibGlua1wiXScpO1xuXG5jb25zdCBpbWFnZVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI3ByZXZpZXctcG9wdXBcIik7XG5pbWFnZVBvcHVwT2JqZWN0LnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbi8vVG9rZW4gYW5kIElEIGluZm9cbi8vVG9rZW46IGIxNDExNjM3LTQ0MWEtNGQyNS05MjI3LTZkZTViZjhiY2YyNFxuLy9Hcm91cCBJRDogZ3JvdXAtMTJcblxuZmV0Y2goXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyL3VzZXJzL21lXCIsIHtcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiNzIwMTI3MWItMmNjZS00NmFiLTlmMjgtZDMyNGI4MjJmOGNiXCIsXG4gIH0sXG59KVxuICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgfSk7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcbiAgaGVhZGVyczoge1xuICAgIGF1dGhvcml6YXRpb246IFwiYjE0MTE2MzctNDQxYS00ZDI1LTkyMjctNmRlNWJmOGJjZjI0XCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0sXG59KTtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VySW5mbyh7XG4gIHVzZXJOYW1lOiBcIi5wcm9maWxlX19uYW1lXCIsXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXG4gIHVzZXJBdmF0YXI6IFwiLnByb2ZpbGVfX2ltYWdlXCIsXG59KTtcblxuLy8gZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QpXG4vLyB7XG4vLyAgIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChkYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcbi8vICAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbi8vICAgfSk7XG5cbi8vICAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQoKTtcbi8vICAgY2FyZENvbnRhaW5lci5hZGRJdGVtKG5ld0NhcmQpO1xuLy8gfVxuXG5mdW5jdGlvbiBoYW5kbGVDYXJkQ2xpY2sobmFtZSwgaW1hZ2VVcmwpIHtcbiAgaW1hZ2VQb3B1cE9iamVjdC5vcGVuKG5hbWUsIGltYWdlVXJsKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTGlrZUNsaWNrKGNhcmQsIGNhcmRJZCwgaXNMaWtlZCkge1xuICBhcGlcbiAgICAudXBkYXRlTGlrZXMoY2FyZElkLCBpc0xpa2VkKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjYXJkLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn1cblxuY29uc3QgY2FyZEdyaWRPYmplY3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBudWxsLFxuICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgcmVuZGVyQ2FyZChcbiAgICAgICAgY2FyZEdyaWRPYmplY3QsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGltYWdlUG9wdXBPYmplY3QsXG4gICAgICAgIGRlbGV0ZUNhcmRGb3JtUG9wdXBPYmplY3RcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgXCIucGhvdG8tZ3JpZF9fY2FyZHNcIlxuKTtcblxuYXBpXG4gIC5nZXRVc2VySW5mbygpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mbyhkYXRhKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAudGhlbigoKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZ2V0SW5pdGlhbENhcmRzKClcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3Quc2V0SXRlbXMocmVzdWx0KTtcbiAgICAgICAgY2FyZEdyaWRPYmplY3QucmVuZGVySXRlbXMoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH0pO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmRDb250YWluZXIsIGRhdGEsIGNhcmRQb3B1cE9iamVjdCwgZGVsZXRlUG9wdXBPYmplY3QpIHtcbiAgY29uc3QgY2FyZE9iamVjdCA9IG5ldyBDYXJkKFxuICAgIGRhdGEsXG4gICAgXCIjY2FyZC10ZW1wbGF0ZVwiLFxuICAgICgpID0+IHtcbiAgICAgIGNhcmRQb3B1cE9iamVjdC5vcGVuKGRhdGEpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Quc2V0Q2FyZFRvRGVsZXRlKGNhcmRPYmplY3QpO1xuICAgICAgZGVsZXRlUG9wdXBPYmplY3Qub3BlbigpO1xuICAgIH0sXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGNhcmRPYmplY3QuZ2V0SXNMaWtlZEJ5Q3VycmVudFVzZXIoKSA9PSBmYWxzZSkge1xuICAgICAgICBhcGlcbiAgICAgICAgICAubGlrZUNhcmQoY2FyZE9iamVjdC5nZXRJZCgpKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBjYXJkT2JqZWN0LnNldExpa2VzKGRhdGEubGlrZXMpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpOyAvLyBsb2cgdGhlIGVycm9yIHRvIHRoZSBjb25zb2xlXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcGlcbiAgICAgICAgICAudW5MaWtlQ2FyZChjYXJkT2JqZWN0LmdldElkKCkpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhcmRPYmplY3Quc2V0TGlrZXMoZGF0YS5saWtlcykpXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1c2VyXG4gICk7XG5cbiAgY29uc3QgbmV3Q2FyZCA9IGNhcmRPYmplY3QuY3JlYXRlQ2FyZEVsZW1lbnQodXNlcik7XG4gIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbn1cblxuY29uc3QgZm9ybUVsZW1lbnRzTGlzdCA9IEFycmF5LmZyb20oXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY3VzdG9tU2V0dGluZ3MuZm9ybVNlbGVjdG9yKVxuKTtcblxuY29uc3QgZm9ybVZhbGlkYXRvck9iamVjdExpc3QgPSBmb3JtRWxlbWVudHNMaXN0Lm1hcCgoZm9ybSkgPT4ge1xuICBjb25zdCBmb3JtT2JqZWN0ID0gbmV3IEZvcm1WYWxpZGF0b3IoY3VzdG9tU2V0dGluZ3MsIGZvcm0pO1xuICBmb3JtT2JqZWN0LmVuYWJsZVZhbGlkYXRpb24oKTtcbiAgcmV0dXJuIGZvcm1PYmplY3Q7XG59KTtcblxuY29uc3QgZWRpdFByb2ZpbGVGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kZGVzY3JpcHRpb25cIlxuKTtcblxuY29uc3QgYWRkQ2FyZEZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRsaW5rXCJcbik7XG5cbmNvbnN0IGVkaXRBdmF0YXJGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJhdmF0YXJmb3JtXCJcbik7XG5cbmNvbnN0IGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjYXZhdGFyLXBvcHVwXCIsXG4gICh2YWx1ZXMpID0+IHtcbiAgICBhdmF0YXJJbWcuc3JjID0gdmFsdWVzLmF2YXRhcjtcbiAgICBlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KHRydWUpO1xuICAgIGFwaVxuICAgICAgLnBhdGNoVXNlckF2YXRhcih2YWx1ZXMpXG4gICAgICAudGhlbihlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LmNsb3NlKCkpXG4gICAgICAudGhlbihlZGl0QXZhdGFyRm9ybVBvcHVwT2JqZWN0LnNldExvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuKTtcbmVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjZWRpdC1wb3B1cFwiLFxuICAodmFsdWVzKSA9PiB7XG4gICAgdXNlci5zZXRVc2VySW5mb1RleHRPbmx5KHsgbmFtZTogdmFsdWVzLm5hbWUsIGFib3V0OiB2YWx1ZXMudGl0bGUgfSk7XG4gICAgZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gICAgYXBpXG4gICAgICAucGF0Y2hVc2VySW5mbyh1c2VyLmdldFVzZXJJbmZvKCkpXG4gICAgICAudGhlbihlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLnRoZW4oZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQoZmFsc2UpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2NyZWF0ZS1wb3B1cFwiLCAoKSA9PiB7XG4gIGNvbnN0IG5ld0NhcmRJbmZvID0ge1xuICAgIG5hbWU6IGltYWdlTmFtZUlucHV0LnZhbHVlLFxuICAgIGxpbms6IGltYWdlTGlua0lucHV0LnZhbHVlLFxuICAgIGxpa2VzOiBbXSxcbiAgICBvd25lcjogdXNlci5nZXRVc2VySW5mbygpLFxuICB9O1xuXG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Quc2V0TG9hZGluZ1RleHQodHJ1ZSk7XG4gIGFwaVxuICAgIC51cGxvYWRDYXJkKG5ld0NhcmRJbmZvKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IGRhdGEgfSk7XG5cbiAgICAgIHJlbmRlckNhcmQoXG4gICAgICAgIGNhcmRHcmlkT2JqZWN0LFxuICAgICAgICBuZXdDYXJkSW5mbyxcbiAgICAgICAgaW1hZ2VQb3B1cE9iamVjdCxcbiAgICAgICAgZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdFxuICAgICAgKTtcbiAgICB9KVxuXG4gICAgLnRoZW4oYWRkQ2FyZEZvcm0ucmVzZXQoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybU9iamVjdC5zZXRCdXR0b25JbmFjdGl2ZSgpKVxuICAgIC50aGVuKGFkZENhcmRGb3JtUG9wdXBPYmplY3QuY2xvc2UoKSlcbiAgICAudGhlbihhZGRDYXJkRm9ybVBvcHVwT2JqZWN0LnNldGxvYWRpbmdUZXh0KGZhbHNlKSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0pO1xuYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBkZWxldGVDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aENvbmZpcm0oXG4gIFwiI2RlbGV0ZS1wb3B1cFwiLFxuICAoY2FyZE9ialRvRGVsZXRlKSA9PiB7XG4gICAgYXBpXG4gICAgICAuZGVsZXRlQ2FyZChjYXJkT2JqVG9EZWxldGUuZ2V0SWQoKSlcbiAgICAgIC50aGVuKGNhcmRPYmpUb0RlbGV0ZS5kZWxldGVGcm9tUGFnZSgpKVxuICAgICAgLnRoZW4oZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5lZGl0QXZhdGFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGVkaXRBdmF0YXJGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmFkZENhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG59KTtcblxuZWRpdFByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3QgdXNlcklucHV0ID0gdXNlci5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcm5hbWU7XG4gIHRpdGxlSW5wdXQudmFsdWUgPSB1c2VySW5wdXQudXNlcmluZm87XG4gIGVkaXRQcm9maWxlRm9ybVBvcHVwT2JqZWN0Lm9wZW4oKTtcblxuICAvL3VzZXIuZ2V0VXNlckluZm8oKTtcblxuICAvL25hbWVJbnB1dC52YWx1ZSA9IG5hbWVUZXh0LnRleHRDb250ZW50O1xuICAvL3RpdGxlSW5wdXQudmFsdWUgPSB0aXRsZVRleHQudGV4dENvbnRlbnQ7XG5cbiAgZWRpdFByb2ZpbGVGb3JtT2JqZWN0LmNsZWFyQWxsRXJyb3JzKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJBcGkiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJiYXNlVXJsIiwiaGVhZGVycyIsImdldFVzZXJJbmZvIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwib2siLCJqc29uIiwiZ2V0SW5pdGlhbENhcmRzIiwiYmFzZVVSTCIsImVkaXRVc2VyUHJvZmlsZSIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZSIsImFib3V0Iiwiam9iIiwiZWRpdEF2YXRhciIsImxpbmsiLCJhdmF0YXIiLCJhZGROZXdDYXJkIiwidGl0bGUiLCJpbWFnZVVybCIsImRlbGV0ZUNhcmQiLCJjYXJkSWQiLCJ1cGRhdGVMaWtlcyIsImlzTGlrZWQiLCJDYXJkIiwiZGF0YSIsInRlbXBsYXRlU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJfZWxlbWVudCIsInJlbW92ZSIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfY2FyZE5hbWUiLCJfY2FyZExpbmsiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9jYXJkSW1hZ2UiLCJjcmVhdGVDYXJkRWxlbWVudCIsIl9nZXRFbGVtZW50IiwiX3NldEltYWdlQW5kTmFtZSIsIl9zZXRFdmVudExpc3RlbmVyIiwiY2xvbmVOb2RlIiwibGlrZUJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJfbGlrZSIsIl9kZWxldGUiLCJjYXJkSW1hZ2UiLCJldnQiLCJoZWFydCIsInRhcmdldCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInN0eWxlIiwidGV4dENvbnRlbnQiLCJjdXN0b21TZXR0aW5ncyIsIkZvcm1WYWxpZGF0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwiX3Nob3dJbnB1dEVycm9yIiwiaW5wdXRFbGVtZW50IiwiZXJyb3JNZXNzYWdlIiwiZXJyb3JFbGVtZW50IiwiaWQiLCJpbnB1dEVycm9yQ2xhc3MiLCJhZGQiLCJlcnJvckNsYXNzIiwiX2hpZGVJbnB1dEVycm9yIiwiY2xlYXJBbGxFcnJvcnMiLCJpbnB1dExpc3QiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5wdXRTZWxlY3RvciIsImZvckVhY2giLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hhc0ludmFsaWRJbnB1dCIsInNvbWUiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJidXR0b25FbGVtZW50IiwiX2Rpc2FibGVCdXR0b24iLCJfZW5hYmxlQnV0dG9uIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsInNldEJ1dHRvbkluYWN0aXZlIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJlbmFibGVWYWxpZGF0aW9uIiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwia2V5IiwiY2xvc2UiLCJfcG9wdXAiLCJfYnV0dG9uIiwib3BlbiIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRFdmVudExpc3RlbmVycyIsImNvbnRhaW5zIiwiUG9wdXBXaXRoQ29uZmlybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfaGFuZGxlRm9ybVN1Ym1pdCIsIl9mb3JtIiwiX2NhcmRUb0RlbGV0ZSIsInNldENhcmRUb0RlbGV0ZSIsImNhcmRPYmoiLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwV2l0aEZvcm0iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dHMiLCJpbnB1dE9iaiIsImlucHV0IiwidmFsdWUiLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3NldERhdGFJbWFnZVBvcHVwIiwiaW1hZ2VQb3B1cFBpYyIsImltYWdlUG9wdXBUZXh0Iiwic3JjIiwiYWx0IiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtc0FycmF5IiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsImNsZWFyIiwiaW5uZXJIVE1MIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJ1c2VyQXZhdGFyIiwidXNlck5hbWVFbGVtZW50IiwidXNlckpvYkVsZW1lbnQiLCJ1c2VyQXZhdGFyRWxlbWVudCIsInNldFVzZXJJbmZvIiwibmV3TmFtZSIsIm5ld0pvYiIsIm5ld0F2YXRhciIsIm5ld09iamVjdCIsInVzZXJuYW1lIiwidXNlcmluZm8iLCJpbml0aWFsQ2FyZHMiLCJmb3JtU2VsZWN0b3IiLCJwcm9maWxlSW1hZ2VTZWxlY3RvciIsImVkaXRQcm9maWxlQnV0dG9uIiwiZWRpdFByb2ZpbGVNb2RhbCIsImVkaXRQcm9maWxlRm9ybSIsImFkZENhcmRCdXR0b24iLCJhZGRDYXJkUG9wdXAiLCJhZGRDYXJkRm9ybSIsImVkaXRBdmF0YXJCdXR0b24iLCJhdmF0YXJJbWciLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwiaW1hZ2VQb3B1cE9iamVjdCIsImF1dGhvcml6YXRpb24iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiYXBpIiwidXNlciIsImhhbmRsZUxpa2VDbGljayIsImNhcmQiLCJfbGlrZXMiLCJsaWtlcyIsImNhdGNoIiwiZXJyIiwiY2FyZEdyaWRPYmplY3QiLCJyZW5kZXJDYXJkIiwiZGVsZXRlQ2FyZEZvcm1Qb3B1cE9iamVjdCIsInNldEl0ZW1zIiwiY2FyZENvbnRhaW5lciIsImNhcmRQb3B1cE9iamVjdCIsImRlbGV0ZVBvcHVwT2JqZWN0IiwiY2FyZE9iamVjdCIsImdldElzTGlrZWRCeUN1cnJlbnRVc2VyIiwibGlrZUNhcmQiLCJnZXRJZCIsInNldExpa2VzIiwidW5MaWtlQ2FyZCIsIm5ld0NhcmQiLCJmb3JtRWxlbWVudHNMaXN0IiwiZm9ybVZhbGlkYXRvck9iamVjdExpc3QiLCJtYXAiLCJmb3JtIiwiZm9ybU9iamVjdCIsImVkaXRQcm9maWxlRm9ybU9iamVjdCIsImZpbmQiLCJvYmoiLCJnZXRBdHRyaWJ1dGUiLCJhZGRDYXJkRm9ybU9iamVjdCIsImVkaXRBdmF0YXJGb3JtT2JqZWN0IiwiZWRpdEF2YXRhckZvcm1Qb3B1cE9iamVjdCIsInZhbHVlcyIsInNldExvYWRpbmdUZXh0IiwicGF0Y2hVc2VyQXZhdGFyIiwiZWRpdFByb2ZpbGVGb3JtUG9wdXBPYmplY3QiLCJzZXRVc2VySW5mb1RleHRPbmx5IiwicGF0Y2hVc2VySW5mbyIsImFkZENhcmRGb3JtUG9wdXBPYmplY3QiLCJuZXdDYXJkSW5mbyIsIm93bmVyIiwidXBsb2FkQ2FyZCIsInNldGxvYWRpbmdUZXh0IiwiY2FyZE9ialRvRGVsZXRlIiwiZGVsZXRlRnJvbVBhZ2UiLCJ1c2VySW5wdXQiXSwic291cmNlUm9vdCI6IiJ9