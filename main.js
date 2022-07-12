/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
      userJob
    } = _ref;
    this.userNameElement = document.querySelector(userName);
    this.userJobElement = document.querySelector(userJob);
  }

  setUserInfo(_ref2) {
    let {
      newName,
      newJob
    } = _ref2;
    this.userNameElement.textContent = newName;
    this.userJobElement.textContent = newJob;
  }

  getUserInfo() {
    const newObject = {
      username: this.userNameElement.textContent,
      userinfo: this.userJobElement.textContent
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
  errorClass: "popup__error_visible"
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
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/constants.js */ "./src/components/constants.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
 //Import classes







 // Buttons and other DOM elements

const editProfileButton = document.querySelector("#profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const addCardButton = document.querySelector("#profile__add-button");
const addCardPopup = document.querySelector("#create-popup");
const addCardForm = addCardPopup.querySelector(".popup__form"); // Form data

const nameText = document.querySelector(".profile__name");
const titleText = document.querySelector(".profile__title");
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="description"]');
const imageNameInput = addCardForm.querySelector('[name="place-name"]');
const imageLinkInput = addCardForm.querySelector('[name="link"]');

function renderCard(cardContainer, data, cardPopupObject) {
  const cardObject = new _components_Card_js__WEBPACK_IMPORTED_MODULE_2__.Card(data, "#card-template", () => {
    cardPopupObject.open(data);
  });
  const newCard = cardObject.createCardElement();
  cardContainer.addItem(newCard);
}

const imagePopupObject = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__["default"]("#preview-popup");
imagePopupObject.setEventListeners();
const user = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__.UserInfo({
  userName: ".profile__name",
  userJob: ".profile__title"
});
const formElementsList = Array.from(document.querySelectorAll(_components_constants_js__WEBPACK_IMPORTED_MODULE_3__.customSettings.formSelector));
const formValidatorObjectList = formElementsList.map(form => {
  const formObject = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(_components_constants_js__WEBPACK_IMPORTED_MODULE_3__.customSettings, form);
  formObject.enableValidation();
  return formObject;
});
const editProfileFormObject = formValidatorObjectList.find(obj => obj.formElement.getAttribute("name") == "nameanddescription");
console.log(editProfileFormObject);
const addCardFormObject = formValidatorObjectList.find(obj => obj.formElement.getAttribute("name") == "nameandlink");
console.log(addCardFormObject);
const cardGridObject = new _components_Section_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
  items: _components_constants_js__WEBPACK_IMPORTED_MODULE_3__.initialCards,
  renderer: data => {
    renderCard(cardGridObject, data, imagePopupObject);
  }
}, ".photo-grid__cards");
cardGridObject.renderItems();
const editProfileFormPopupObject = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__["default"]("#edit-popup", values => {
  user.setUserInfo({
    newName: values.name,
    newJob: values.description
  });
  editProfileFormPopupObject.close();
});
editProfileFormPopupObject.setEventListeners();
const addCardFormPopupObject = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__["default"]("#create-popup", () => {
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value
  };
  renderCard(cardGridObject, newCardInfo, imagePopupObject);
  addCardForm.reset();
  addCardFormObject.setButtonInactive();
  addCardFormPopupObject.close();
});
addCardFormPopupObject.setEventListeners();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsSUFBTixDQUFXO0VBQ1BDLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxnQkFBUCxFQUF5QkMsZUFBekIsRUFBMEM7SUFBQSxpQ0F3QzNDLE1BQU07TUFDZCxLQUFLQyxRQUFMLENBQWNDLE1BQWQ7O01BQ0EsS0FBS0QsUUFBTCxHQUFnQixJQUFoQjtJQUNELENBM0NvRDs7SUFDbkQsS0FBS0UsZ0JBQUwsR0FBd0JILGVBQXhCO0lBQ0EsS0FBS0ksU0FBTCxHQUFpQk4sSUFBSSxDQUFDTyxJQUF0QjtJQUNBLEtBQUtDLFNBQUwsR0FBaUJSLElBQUksQ0FBQ1MsSUFBdEI7SUFDQSxLQUFLQyxhQUFMLEdBQXFCQyxRQUFRLENBQzFCQyxhQURrQixDQUNKWCxnQkFESSxFQUVsQlksT0FGa0IsQ0FFVkQsYUFGVSxDQUVJLE9BRkosQ0FBckI7SUFHQSxLQUFLVCxRQUFMO0lBQ0EsS0FBS1csVUFBTDtFQUNEOztFQUNEQyxpQkFBaUIsR0FBRztJQUNsQixLQUFLWixRQUFMLEdBQWdCLEtBQUthLFdBQUwsRUFBaEI7O0lBRUEsS0FBS0MsZ0JBQUw7O0lBQ0EsS0FBS0MsaUJBQUw7O0lBRUEsT0FBTyxLQUFLZixRQUFaO0VBQ0Q7O0VBRURhLFdBQVcsR0FDWDtJQUNFLE9BQU8sS0FBS04sYUFBTCxDQUFtQlMsU0FBbkIsQ0FBNkIsSUFBN0IsQ0FBUDtFQUNEOztFQUNERCxpQkFBaUIsR0FBRztJQUNsQixNQUFNRSxVQUFVLEdBQUcsS0FBS2pCLFFBQUwsQ0FBY1MsYUFBZCxDQUE0QixvQkFBNUIsQ0FBbkI7O0lBQ0EsTUFBTVMsWUFBWSxHQUFHLEtBQUtsQixRQUFMLENBQWNTLGFBQWQsQ0FBNEIsc0JBQTVCLENBQXJCOztJQUNBUSxVQUFVLENBQUNFLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLEtBQUtDLEtBQTFDO0lBQ0FGLFlBQVksQ0FBQ0MsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBS0UsT0FBNUM7O0lBRUEsTUFBTUMsU0FBUyxHQUFHLEtBQUt0QixRQUFMLENBQWNTLGFBQWQsQ0FBNEIsY0FBNUIsQ0FBbEI7O0lBQ0FhLFNBQVMsQ0FBQ0gsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsTUFBTTtNQUN4QyxLQUFLakIsZ0JBQUw7SUFDRCxDQUZEO0VBR0Q7O0VBRURrQixLQUFLLENBQUNHLEdBQUQsRUFBTTtJQUNULE1BQU1DLEtBQUssR0FBR0QsR0FBRyxDQUFDRSxNQUFsQjtJQUNBRCxLQUFLLENBQUNFLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCLHFCQUF2QjtFQUNEOztFQU9EYixnQkFBZ0IsR0FBRztJQUNqQixLQUFLSCxVQUFMLEdBQWtCLEtBQUtYLFFBQUwsQ0FBY1MsYUFBZCxDQUE0QixjQUE1QixDQUFsQjtJQUNBLEtBQUtFLFVBQUwsQ0FBZ0JpQixLQUFoQixrQ0FBZ0QsS0FBS3ZCLFNBQXJEO0lBQ0EsS0FBS0wsUUFBTCxDQUFjUyxhQUFkLENBQTRCLGNBQTVCLEVBQTRDb0IsV0FBNUMsR0FBMEQsS0FBSzFCLFNBQS9EO0VBQ0Q7O0FBbERNOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FYOztBQUNBLE1BQU00QixhQUFOLENBQW9CO0VBQ2xCbkMsV0FBVyxDQUFDb0MsUUFBRCxFQUFXQyxXQUFYLEVBQXdCO0lBQ2pDLEtBQUtELFFBQUwsR0FBZ0JBLFFBQWhCO0lBQ0EsS0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7RUFDRDs7RUFFREMsZUFBZSxDQUFDQyxZQUFELEVBQWVDLFlBQWYsRUFBNkI7SUFDMUMsTUFBTUMsWUFBWSxHQUFHLEtBQUtKLFdBQUwsQ0FBaUJ4QixhQUFqQixZQUNmMEIsWUFBWSxDQUFDRyxFQURFLFlBQXJCO0lBR0FELFlBQVksQ0FBQ1IsV0FBYixHQUEyQk8sWUFBM0I7SUFDQUMsWUFBWSxDQUFDWCxTQUFiLENBQXVCekIsTUFBdkIsQ0FBOEIsS0FBSytCLFFBQUwsQ0FBY08sZUFBNUM7SUFDQUYsWUFBWSxDQUFDWCxTQUFiLENBQXVCYyxHQUF2QixDQUEyQixLQUFLUixRQUFMLENBQWNTLFVBQXpDO0VBQ0Q7O0VBRURDLGVBQWUsQ0FBQ1AsWUFBRCxFQUFlO0lBQzVCLE1BQU1FLFlBQVksR0FBRyxLQUFLSixXQUFMLENBQWlCeEIsYUFBakIsWUFDZjBCLFlBQVksQ0FBQ0csRUFERSxZQUFyQjtJQUdBRCxZQUFZLENBQUNYLFNBQWIsQ0FBdUJjLEdBQXZCLENBQTJCLEtBQUtSLFFBQUwsQ0FBY08sZUFBekM7SUFDQUYsWUFBWSxDQUFDWCxTQUFiLENBQXVCekIsTUFBdkIsQ0FBOEIsS0FBSytCLFFBQUwsQ0FBY1MsVUFBNUM7SUFDQUosWUFBWSxDQUFDUixXQUFiLEdBQTJCLEVBQTNCO0VBQ0Q7O0VBRURjLGNBQWMsR0FDZDtJQUNFLE1BQU1DLFNBQVMsR0FBR0MsS0FBSyxDQUFDQyxJQUFOLENBQ2hCLEtBQUtiLFdBQUwsQ0FBaUJjLGdCQUFqQixDQUNFakIsdUVBREYsQ0FEZ0IsQ0FBbEI7SUFLQWMsU0FBUyxDQUFDSyxPQUFWLENBQW1CZCxZQUFELElBQWtCO01BQ2xDLEtBQUtPLGVBQUwsQ0FBcUJQLFlBQXJCO0lBQ0QsQ0FGRDtFQUdEOztFQUVEZSxtQkFBbUIsQ0FBQ2YsWUFBRCxFQUFlO0lBQ2hDLElBQUksQ0FBQ0EsWUFBWSxDQUFDZ0IsUUFBYixDQUFzQkMsS0FBM0IsRUFBa0M7TUFDaEMsS0FBS2xCLGVBQUwsQ0FBcUJDLFlBQXJCLEVBQW1DQSxZQUFZLENBQUNrQixpQkFBaEQ7SUFDRCxDQUZELE1BRU87TUFDTCxLQUFLWCxlQUFMLENBQXFCUCxZQUFyQjtJQUNEO0VBQ0Y7O0VBRURtQixnQkFBZ0IsQ0FBQ1YsU0FBRCxFQUFZO0lBQzFCLE9BQU9BLFNBQVMsQ0FBQ1csSUFBVixDQUFnQnBCLFlBQUQsSUFBa0I7TUFDdEMsT0FBTyxDQUFDQSxZQUFZLENBQUNnQixRQUFiLENBQXNCQyxLQUE5QjtJQUNELENBRk0sQ0FBUDtFQUdEOztFQUVESSxrQkFBa0IsQ0FBQ1osU0FBRCxFQUFZYSxhQUFaLEVBQTJCO0lBQzNDLElBQUksS0FBS0gsZ0JBQUwsQ0FBc0JWLFNBQXRCLENBQUosRUFBc0M7TUFDcEMsS0FBS2MsY0FBTCxDQUFvQkQsYUFBcEI7SUFDRCxDQUZELE1BRU87TUFDTCxLQUFLRSxhQUFMLENBQW1CRixhQUFuQjtJQUNEO0VBQ0Y7O0VBRURDLGNBQWMsQ0FBQ0QsYUFBRCxFQUFnQjtJQUM1QkEsYUFBYSxDQUFDL0IsU0FBZCxDQUF3QmMsR0FBeEIsQ0FBNEIsS0FBS1IsUUFBTCxDQUFjNEIsbUJBQTFDO0VBQ0Q7O0VBRURELGFBQWEsQ0FBQ0YsYUFBRCxFQUFnQjtJQUMzQkEsYUFBYSxDQUFDL0IsU0FBZCxDQUF3QnpCLE1BQXhCLENBQStCLEtBQUsrQixRQUFMLENBQWM0QixtQkFBN0M7RUFDRDs7RUFFREMsaUJBQWlCLEdBQUc7SUFDbEIsTUFBTUosYUFBYSxHQUFHLEtBQUt4QixXQUFMLENBQWlCeEIsYUFBakIsQ0FDcEIsS0FBS3VCLFFBQUwsQ0FBYzhCLG9CQURNLENBQXRCOztJQUdBLEtBQUtKLGNBQUwsQ0FBb0JELGFBQXBCO0VBQ0Q7O0VBQ0RNLGdCQUFnQixHQUFHO0lBQ2pCLE1BQU1uQixTQUFTLEdBQUdDLEtBQUssQ0FBQ0MsSUFBTixDQUNoQixLQUFLYixXQUFMLENBQWlCYyxnQkFBakIsQ0FBa0MsS0FBS2YsUUFBTCxDQUFjZ0IsYUFBaEQsQ0FEZ0IsQ0FBbEI7SUFHQSxNQUFNUyxhQUFhLEdBQUcsS0FBS3hCLFdBQUwsQ0FBaUJ4QixhQUFqQixDQUNwQixLQUFLdUIsUUFBTCxDQUFjOEIsb0JBRE0sQ0FBdEI7O0lBR0EsS0FBS04sa0JBQUwsQ0FBd0JaLFNBQXhCLEVBQW1DYSxhQUFuQzs7SUFDQWIsU0FBUyxDQUFDSyxPQUFWLENBQW1CZCxZQUFELElBQWtCO01BQ2xDQSxZQUFZLENBQUNoQixnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNO1FBQzNDLEtBQUsrQixtQkFBTCxDQUF5QmYsWUFBekI7O1FBQ0EsS0FBS3FCLGtCQUFMLENBQXdCWixTQUF4QixFQUFtQ2EsYUFBbkM7TUFDRCxDQUhEO0lBSUQsQ0FMRDtFQU1EOztBQXRGaUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RwQixNQUFNTyxLQUFOLENBQVk7RUFDVnBFLFdBQVcsQ0FBQ3FFLGFBQUQsRUFBZ0I7SUFBQSx5Q0FvQlIxQyxHQUFELElBQVE7TUFDeEI7TUFDQTtNQUNBO01BQ0EsSUFBSUEsR0FBRyxDQUFDMkMsR0FBSixLQUFZLFFBQWhCLEVBQTBCO1FBQ3hCLEtBQUtDLEtBQUw7TUFDRDtJQUNGLENBM0IwQjs7SUFDekIsS0FBS0MsTUFBTCxHQUFjNUQsUUFBUSxDQUFDQyxhQUFULENBQXVCd0QsYUFBdkIsQ0FBZDtJQUNBLEtBQUtJLE9BQUwsR0FBZSxLQUFLRCxNQUFMLENBQVkzRCxhQUFaLENBQTBCLHNCQUExQixDQUFmO0VBQ0Q7O0VBQ0Q2RCxJQUFJLEdBQUc7SUFDTDtJQUNBLEtBQUtGLE1BQUwsQ0FBWTFDLFNBQVosQ0FBc0JjLEdBQXRCLENBQ0UsWUFERjtJQUVHOzs7SUFFSGhDLFFBQVEsQ0FBQ1csZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsS0FBS29ELGVBQTFDLEVBTkssQ0FNdUQ7RUFDN0Q7O0VBRURKLEtBQUssR0FBRztJQUNOLEtBQUtDLE1BQUwsQ0FBWTFDLFNBQVosQ0FBc0J6QixNQUF0QixDQUNFLFlBREY7SUFFRzs7O0lBQ0hPLFFBQVEsQ0FBQ2dFLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDLEtBQUtELGVBQTdDO0VBQ0Q7O0VBV0RFLGlCQUFpQixHQUFHO0lBQ2xCO0lBQ0EsS0FBS0osT0FBTCxDQUFhbEQsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsTUFBTSxLQUFLZ0QsS0FBTCxFQUE3Qzs7SUFFQSxLQUFLQyxNQUFMLENBQVlqRCxnQkFBWixDQUE2QixXQUE3QixFQUEyQ0ksR0FBRCxJQUFTO01BQ2pEO01BQ0E7TUFFQSxJQUFJQSxHQUFHLENBQUNFLE1BQUosQ0FBV0MsU0FBWCxDQUFxQmdELFFBQXJCLENBQThCLE9BQTlCLENBQUosRUFBNEM7UUFDMUMsS0FBS1AsS0FBTDtNQUNEO0lBQ0YsQ0FQRDtFQVFEOztBQTFDUzs7QUE2Q1osaUVBQWVILEtBQWY7QUFBcUI7Ozs7Ozs7Ozs7Ozs7OztBQzdDckI7O0FBRUEsTUFBTVcsYUFBTixTQUE0QlgsaURBQTVCLENBQWtDO0VBQ2hDcEUsV0FBVyxDQUNUcUUsYUFEUyxFQUVUVyxnQkFGUyxFQUdUO0lBQ0EsTUFBTVgsYUFBTjtJQUNBLEtBQUtZLGlCQUFMLEdBQXlCRCxnQkFBekI7SUFDQSxLQUFLRSxLQUFMLEdBQWEsS0FBS1YsTUFBTCxDQUFZM0QsYUFBWixDQUEwQixjQUExQixDQUFiO0VBQ0Q7O0VBRURzRSxlQUFlLEdBQUc7SUFDaEIsTUFBTUMsTUFBTSxHQUFHLEtBQUtGLEtBQUwsQ0FBVy9CLGdCQUFYLENBQTRCLE9BQTVCLENBQWY7O0lBRUEsTUFBTWtDLFFBQVEsR0FBRyxFQUFqQjtJQUNBRCxNQUFNLENBQUMvQixPQUFQLENBQWdCaUMsS0FBRCxJQUFXO01BQ3hCRCxRQUFRLENBQUNDLEtBQUssQ0FBQzlFLElBQVAsQ0FBUixHQUF1QjhFLEtBQUssQ0FBQ0MsS0FBN0I7SUFDRCxDQUZEO0lBSUEsT0FBT0YsUUFBUDtFQUNEOztFQUVEUixpQkFBaUIsR0FBRztJQUNsQixNQUFNQSxpQkFBTjs7SUFDQSxLQUFLSyxLQUFMLENBQVczRCxnQkFBWCxDQUE0QixRQUE1QixFQUF1Q0ksR0FBRCxJQUFTO01BQzdDQSxHQUFHLENBQUM2RCxjQUFKOztNQUNBLEtBQUtQLGlCQUFMLENBQXVCLEtBQUtFLGVBQUwsRUFBdkI7SUFDRCxDQUhEO0VBSUQ7O0VBRURaLEtBQUssR0FBRztJQUNOLE1BQU1BLEtBQU47O0lBQ0EsS0FBS1csS0FBTCxDQUFXTyxLQUFYO0VBQ0Q7O0FBaEMrQjs7QUFtQ2xDLGlFQUFlVixhQUFmOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7O0FBRUEsTUFBTVcsY0FBTixTQUE2QnRCLGlEQUE3QixDQUFrQztFQUM5QnBFLFdBQVcsQ0FBQ3FFLGFBQUQsRUFDWDtJQUNJLE1BQU1BLGFBQU47RUFFSDs7RUFDRHNCLGtCQUFrQixHQUFHO0lBQ2pCLE1BQU1DLGFBQWEsR0FBRyxLQUFLcEIsTUFBTCxDQUFZM0QsYUFBWixDQUEwQix1QkFBMUIsQ0FBdEI7O0lBQ0EsTUFBTWdGLGNBQWMsR0FBRyxLQUFLckIsTUFBTCxDQUFZM0QsYUFBWixDQUEwQixzQkFBMUIsQ0FBdkI7O0lBQ0ErRSxhQUFhLENBQUNFLEdBQWQsR0FBb0IsS0FBS3BGLElBQXpCO0lBQ0FtRixjQUFjLENBQUM1RCxXQUFmLEdBQTZCLEtBQUt6QixJQUFsQztJQUNBb0YsYUFBYSxDQUFDRyxHQUFkLEdBQW9CLEtBQUt2RixJQUF6QjtFQUNEOztFQUNIa0UsSUFBSSxDQUFDekUsSUFBRCxFQUFNO0VBQ1Y7SUFDSSxLQUFLTyxJQUFMLEdBQVlQLElBQUksQ0FBQ08sSUFBakI7SUFDQSxLQUFLRSxJQUFMLEdBQVlULElBQUksQ0FBQ1MsSUFBakI7O0lBQ0EsS0FBS2lGLGtCQUFMOztJQUNBLE1BQU1qQixJQUFOO0VBQ0g7O0FBbkI2Qjs7QUF1QmxDLGlFQUFlZ0IsY0FBZjtBQUE4Qjs7Ozs7Ozs7Ozs7Ozs7QUN2QjlCLE1BQU1NLE9BQU4sQ0FBYztFQUNaaEcsV0FBVyxPQUFzQmlHLGlCQUF0QixFQUF5QztJQUFBLElBQXhDO01BQUVDLEtBQUY7TUFBU0M7SUFBVCxDQUF3QztJQUNsRCxLQUFLQyxXQUFMLEdBQW1CRixLQUFuQjtJQUNBLEtBQUtHLFNBQUwsR0FBaUJGLFFBQWpCO0lBQ0EsS0FBS0csVUFBTCxHQUFrQjFGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qm9GLGlCQUF2QixDQUFsQjtFQUNEOztFQUVETSxLQUFLLEdBQUc7SUFDTixLQUFLRCxVQUFMLENBQWdCRSxTQUFoQixHQUE0QixFQUE1QjtFQUNEOztFQUVEQyxXQUFXLEdBQUc7SUFDWixLQUFLRixLQUFMOztJQUNBLEtBQUtILFdBQUwsQ0FBaUIvQyxPQUFqQixDQUEwQnFELElBQUQsSUFBVTtNQUNqQyxLQUFLTCxTQUFMLENBQWVLLElBQWY7SUFDRCxDQUZEO0VBR0Q7O0VBRURDLE9BQU8sQ0FBQ0MsT0FBRCxFQUFVO0lBQ2YsS0FBS04sVUFBTCxDQUFnQk8sT0FBaEIsQ0FBd0JELE9BQXhCO0VBQ0Q7O0FBcEJXOztBQXVCZCxpRUFBZVosT0FBZjs7Ozs7Ozs7Ozs7Ozs7QUN4QkEsTUFBTWMsUUFBTixDQUFlO0VBQ1g5RyxXQUFXLE9BR1g7SUFBQSxJQUZFO01BQUUrRyxRQUFGO01BQVlDO0lBQVosQ0FFRjtJQUNFLEtBQUtDLGVBQUwsR0FBdUJyRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUJrRyxRQUF2QixDQUF2QjtJQUNBLEtBQUtHLGNBQUwsR0FBc0J0RyxRQUFRLENBQUNDLGFBQVQsQ0FBdUJtRyxPQUF2QixDQUF0QjtFQUNEOztFQUNERyxXQUFXLFFBQXNCO0lBQUEsSUFBckI7TUFBRUMsT0FBRjtNQUFXQztJQUFYLENBQXFCO0lBQy9CLEtBQUtKLGVBQUwsQ0FBcUJoRixXQUFyQixHQUFtQ21GLE9BQW5DO0lBQ0EsS0FBS0YsY0FBTCxDQUFvQmpGLFdBQXBCLEdBQWtDb0YsTUFBbEM7RUFDRDs7RUFDREMsV0FBVyxHQUFHO0lBQ1osTUFBTUMsU0FBUyxHQUFHO01BQ2hCQyxRQUFRLEVBQUUsS0FBS1AsZUFBTCxDQUFxQmhGLFdBRGY7TUFFaEJ3RixRQUFRLEVBQUUsS0FBS1AsY0FBTCxDQUFvQmpGO0lBRmQsQ0FBbEI7SUFJQSxPQUFPc0YsU0FBUDtFQUNEOztBQWxCVTs7QUFxQmI7QUFBb0I7Ozs7Ozs7Ozs7Ozs7OztBQ3RCZixNQUFNRyxZQUFZLEdBQUcsQ0FDMUI7RUFDRWxILElBQUksRUFBRSxvQkFEUjtFQUVFRSxJQUFJLEVBQUU7QUFGUixDQUQwQixFQUsxQjtFQUNFRixJQUFJLEVBQUUsWUFEUjtFQUVFRSxJQUFJLEVBQUU7QUFGUixDQUwwQixFQVMxQjtFQUNFRixJQUFJLEVBQUUsY0FEUjtFQUVFRSxJQUFJLEVBQUU7QUFGUixDQVQwQixFQWExQjtFQUNFRixJQUFJLEVBQUUsY0FEUjtFQUVFRSxJQUFJLEVBQUU7QUFGUixDQWIwQixFQWlCMUI7RUFDRUYsSUFBSSxFQUFFLHFCQURSO0VBRUVFLElBQUksRUFBRTtBQUZSLENBakIwQixFQXFCMUI7RUFDRUYsSUFBSSxFQUFFLHdCQURSO0VBRUVFLElBQUksRUFBRTtBQUZSLENBckIwQixDQUFyQjtBQTJCQyxNQUFNd0IsY0FBYyxHQUFHO0VBQzdCeUYsWUFBWSxFQUFFLGNBRGU7RUFFN0J2RSxhQUFhLEVBQUUsZUFGYztFQUc3QmMsb0JBQW9CLEVBQUUsZ0JBSE87RUFJN0JGLG1CQUFtQixFQUFFLDZCQUpRO0VBSzdCckIsZUFBZSxFQUFFLGNBTFk7RUFNN0JFLFVBQVUsRUFBRTtBQU5pQixDQUF2Qjs7Ozs7Ozs7Ozs7QUMzQlI7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQ0xBOztBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtDQUlBOztBQUVBLE1BQU0rRSxpQkFBaUIsR0FBR2hILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBMUI7QUFDQSxNQUFNZ0gsZ0JBQWdCLEdBQUdqSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBekI7QUFDQSxNQUFNaUgsZUFBZSxHQUFHRCxnQkFBZ0IsQ0FBQ2hILGFBQWpCLENBQStCLGNBQS9CLENBQXhCO0FBQ0EsTUFBTWtILGFBQWEsR0FBR25ILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixzQkFBdkIsQ0FBdEI7QUFDQSxNQUFNbUgsWUFBWSxHQUFHcEgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQXJCO0FBQ0EsTUFBTW9ILFdBQVcsR0FBR0QsWUFBWSxDQUFDbkgsYUFBYixDQUEyQixjQUEzQixDQUFwQixFQUVBOztBQUNBLE1BQU1xSCxRQUFRLEdBQUd0SCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWpCO0FBQ0EsTUFBTXNILFNBQVMsR0FBR3ZILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixpQkFBdkIsQ0FBbEI7QUFDQSxNQUFNdUgsU0FBUyxHQUFHTixlQUFlLENBQUNqSCxhQUFoQixDQUE4QixlQUE5QixDQUFsQjtBQUNBLE1BQU13SCxVQUFVLEdBQUdQLGVBQWUsQ0FBQ2pILGFBQWhCLENBQThCLHNCQUE5QixDQUFuQjtBQUNBLE1BQU15SCxjQUFjLEdBQUdMLFdBQVcsQ0FBQ3BILGFBQVosQ0FBMEIscUJBQTFCLENBQXZCO0FBQ0EsTUFBTTBILGNBQWMsR0FBR04sV0FBVyxDQUFDcEgsYUFBWixDQUEwQixlQUExQixDQUF2Qjs7QUFFQSxTQUFTMkgsVUFBVCxDQUFvQkMsYUFBcEIsRUFBbUN4SSxJQUFuQyxFQUF5Q3lJLGVBQXpDLEVBQ0E7RUFDRSxNQUFNQyxVQUFVLEdBQUcsSUFBSTVJLHFEQUFKLENBQVNFLElBQVQsRUFBZSxnQkFBZixFQUFpQyxNQUFNO0lBQ3hEeUksZUFBZSxDQUFDaEUsSUFBaEIsQ0FBcUJ6RSxJQUFyQjtFQUNELENBRmtCLENBQW5CO0VBSUEsTUFBTTJJLE9BQU8sR0FBR0QsVUFBVSxDQUFDM0gsaUJBQVgsRUFBaEI7RUFDQXlILGFBQWEsQ0FBQzlCLE9BQWQsQ0FBc0JpQyxPQUF0QjtBQUNEOztBQUVELE1BQU1DLGdCQUFnQixHQUFHLElBQUluRCxxRUFBSixDQUFtQixnQkFBbkIsQ0FBekI7QUFDQW1ELGdCQUFnQixDQUFDaEUsaUJBQWpCO0FBRUEsTUFBTWlFLElBQUksR0FBRyxJQUFJaEMsNkRBQUosQ0FBYTtFQUN4QkMsUUFBUSxFQUFFLGdCQURjO0VBRXhCQyxPQUFPLEVBQUU7QUFGZSxDQUFiLENBQWI7QUFNQSxNQUFNK0IsZ0JBQWdCLEdBQUc5RixLQUFLLENBQUNDLElBQU4sQ0FDdkJ0QyxRQUFRLENBQUN1QyxnQkFBVCxDQUEwQmpCLGlGQUExQixDQUR1QixDQUF6QjtBQUlBLE1BQU04Ryx1QkFBdUIsR0FBR0QsZ0JBQWdCLENBQUNFLEdBQWpCLENBQXNCQyxJQUFELElBQVU7RUFDN0QsTUFBTUMsVUFBVSxHQUFHLElBQUloSCx1RUFBSixDQUFrQkQsb0VBQWxCLEVBQWtDZ0gsSUFBbEMsQ0FBbkI7RUFDQUMsVUFBVSxDQUFDaEYsZ0JBQVg7RUFDQSxPQUFPZ0YsVUFBUDtBQUNELENBSitCLENBQWhDO0FBTUEsTUFBTUMscUJBQXFCLEdBQUdKLHVCQUF1QixDQUFDSyxJQUF4QixDQUMzQkMsR0FBRCxJQUFTQSxHQUFHLENBQUNqSCxXQUFKLENBQWdCa0gsWUFBaEIsQ0FBNkIsTUFBN0IsS0FBd0Msb0JBRHJCLENBQTlCO0FBR0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTCxxQkFBWjtBQUNBLE1BQU1NLGlCQUFpQixHQUFHVix1QkFBdUIsQ0FBQ0ssSUFBeEIsQ0FDdkJDLEdBQUQsSUFBU0EsR0FBRyxDQUFDakgsV0FBSixDQUFnQmtILFlBQWhCLENBQTZCLE1BQTdCLEtBQXdDLGFBRHpCLENBQTFCO0FBRUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxpQkFBWjtBQUVGLE1BQU1DLGNBQWMsR0FBRyxJQUFJM0QsOERBQUosQ0FDckI7RUFDRUUsS0FBSyxFQUFFd0Isa0VBRFQ7RUFFRXZCLFFBQVEsRUFBR2xHLElBQUQsSUFBVTtJQUNsQnVJLFVBQVUsQ0FBQ21CLGNBQUQsRUFBaUIxSixJQUFqQixFQUF1QjRJLGdCQUF2QixDQUFWO0VBQ0Q7QUFKSCxDQURxQixFQU9yQixvQkFQcUIsQ0FBdkI7QUFVQWMsY0FBYyxDQUFDbEQsV0FBZjtBQUVBLE1BQU1tRCwwQkFBMEIsR0FBRyxJQUFJN0Usb0VBQUosQ0FBa0IsYUFBbEIsRUFBa0M4RSxNQUFELElBQVk7RUFDOUVmLElBQUksQ0FBQzNCLFdBQUwsQ0FBaUI7SUFBRUMsT0FBTyxFQUFFeUMsTUFBTSxDQUFDckosSUFBbEI7SUFBd0I2RyxNQUFNLEVBQUV3QyxNQUFNLENBQUNDO0VBQXZDLENBQWpCO0VBQ0FGLDBCQUEwQixDQUFDckYsS0FBM0I7QUFDRCxDQUhrQyxDQUFuQztBQUlBcUYsMEJBQTBCLENBQUMvRSxpQkFBM0I7QUFFQSxNQUFNa0Ysc0JBQXNCLEdBQUcsSUFBSWhGLG9FQUFKLENBQWtCLGVBQWxCLEVBQW1DLE1BQU07RUFDdEUsTUFBTWlGLFdBQVcsR0FBRztJQUNsQnhKLElBQUksRUFBRThILGNBQWMsQ0FBQy9DLEtBREg7SUFFbEI3RSxJQUFJLEVBQUU2SCxjQUFjLENBQUNoRDtFQUZILENBQXBCO0VBS0FpRCxVQUFVLENBQUNtQixjQUFELEVBQWlCSyxXQUFqQixFQUE4Qm5CLGdCQUE5QixDQUFWO0VBRUFaLFdBQVcsQ0FBQ3hDLEtBQVo7RUFDQWlFLGlCQUFpQixDQUFDekYsaUJBQWxCO0VBQ0E4RixzQkFBc0IsQ0FBQ3hGLEtBQXZCO0FBQ0QsQ0FYOEIsQ0FBL0I7QUFZQXdGLHNCQUFzQixDQUFDbEYsaUJBQXZCO0FBRUFrRCxhQUFhLENBQUN4RyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxNQUFNO0VBQzVDd0ksc0JBQXNCLENBQUNyRixJQUF2QjtBQUNELENBRkQ7QUFJQWtELGlCQUFpQixDQUFDckcsZ0JBQWxCLENBQW1DLE9BQW5DLEVBQTRDLE1BQU07RUFDaEQsTUFBTTBJLFNBQVMsR0FBR25CLElBQUksQ0FBQ3hCLFdBQUwsRUFBbEI7RUFDQWMsU0FBUyxDQUFDN0MsS0FBVixHQUFrQjBFLFNBQVMsQ0FBQ3pDLFFBQTVCO0VBQ0FhLFVBQVUsQ0FBQzlDLEtBQVgsR0FBbUIwRSxTQUFTLENBQUN4QyxRQUE3QjtFQUNBbUMsMEJBQTBCLENBQUNsRixJQUEzQixHQUpnRCxDQU1qRDtFQUVDO0VBQ0E7O0VBRUEwRSxxQkFBcUIsQ0FBQ3JHLGNBQXRCO0FBRUQsQ0FiRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC8uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguY3NzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViX3Byb2plY3RfNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2FyZCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgdGVtcGxhdGVTZWxlY3RvciwgaGFuZGxlQ2FyZENsaWNrKSB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgICB0aGlzLl9jYXJkTmFtZSA9IGRhdGEubmFtZTtcbiAgICAgIHRoaXMuX2NhcmRMaW5rID0gZGF0YS5saW5rO1xuICAgICAgdGhpcy5fY2FyZFRlbXBsYXRlID0gZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IodGVtcGxhdGVTZWxlY3RvcilcbiAgICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xuICAgICAgdGhpcy5fZWxlbWVudDsgXG4gICAgICB0aGlzLl9jYXJkSW1hZ2U7IFxuICAgIH1cbiAgICBjcmVhdGVDYXJkRWxlbWVudCgpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KCk7XG4gIFxuICAgICAgdGhpcy5fc2V0SW1hZ2VBbmROYW1lKCk7XG4gICAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVyKCk7XG4gIFxuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gICAgfVxuICBcbiAgICBfZ2V0RWxlbWVudCgpXG4gICAge1xuICAgICAgcmV0dXJuIHRoaXMuX2NhcmRUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7IFxuICAgIH1cbiAgICBfc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIGNvbnN0IGxpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcbiAgICAgIGxpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2xpa2UpOyBcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fZGVsZXRlKTtcbiAgXG4gICAgICBjb25zdCBjYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgICBjYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKCk7XG4gICAgICB9KTtcbiAgICB9IFxuICBcbiAgICBfbGlrZShldnQpIHtcbiAgICAgIGNvbnN0IGhlYXJ0ID0gZXZ0LnRhcmdldDsgXG4gICAgICBoZWFydC5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fYWN0aXZlLWJ1dHRvblwiKTtcbiAgICB9XG4gIFxuICAgIF9kZWxldGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgfVxuICBcbiAgICBfc2V0SW1hZ2VBbmROYW1lKCkge1xuICAgICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xuICAgICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5fY2FyZExpbmt9KTtgO1xuICAgICAgdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGhpcy5fY2FyZE5hbWU7XG4gICAgfVxuICB9XG4gIFxuICBcbiAgXG4gIFxuICBleHBvcnQge0NhcmR9O1xuICAiLCJpbXBvcnQge2N1c3RvbVNldHRpbmdzfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcbmNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xuICB9XG5cbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlKSB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXG4gICAgKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpOyBcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpOyBcbiAgfVxuXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcbiAgICApO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTsgXG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKTsgXG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIGNsZWFyQWxsRXJyb3JzKClcbiAge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIGN1c3RvbVNldHRpbmdzLmlucHV0U2VsZWN0b3JcbiAgICAgIClcbiAgICApO1xuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCwgaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBfaGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkge1xuICAgIHJldHVybiBpbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZDtcbiAgICB9KTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZShpbnB1dExpc3QsIGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KGlucHV0TGlzdCkpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oYnV0dG9uRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBfZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KSB7XG4gICAgYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cblxuICBfZW5hYmxlQnV0dG9uKGJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxuXG4gIHNldEJ1dHRvbkluYWN0aXZlKCkgeyBcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gdGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvclxuICAgICk7XG4gICAgdGhpcy5fZGlzYWJsZUJ1dHRvbihidXR0b25FbGVtZW50KTtcbiAgfVxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZXR0aW5ncy5pbnB1dFNlbGVjdG9yKVxuICAgICk7XG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcbiAgICApO1xuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7IFxuICAgIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTsgXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBGb3JtVmFsaWRhdG9yfTsiLCJjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fY2xvc2UtYnV0dG9uXCIpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgLyogVGhlIHZpc2libGUgY2xhc3Mgb3ZlcnJpZGVzIHRoZSBwcmV2aW91cyBjbGFzcyBiZWNhdXNlIGl0cyBmYXJ0aGVyIGRvd24gdGhlIHBhZ2UuIHNlZSBtb2RhbC5jc3MuKi9cbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFxuICAgICAgXCJwb3B1cF9vcGVuXCJcbiAgICApOyAvKmFjdGl2YXRlIGEgY2xhc3MgdGhhdCBtYWtlcyBpdCB2aXNpYmxlKi9cbiAgICBcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7IC8vY2xvc2Ugb24gZXNjXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgXCJwb3B1cF9vcGVuXCJcbiAgICApOyAvKmRlYWN0aXZhdGUgYSBjbGFzcyB0aGF0IG1ha2VzIGl0IHZpc2libGUqL1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+e1xuICAgIC8vdGhpcyBpcyBhbiBhcnJvdyBmdW5jdGlvblxuICAgIC8vdGhhdCB3YXksIHdlIGRvIG5vdCBoYXZlIHRvIGNyZWF0ZSBhbiBhcnJvdyBmdW5jdGlvbiB3aGVuIHNldHRpbmcgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgLy9hbHNvIGJlY2F1c2Ugd2UgZG8gbm90IGNyZWF0ZSBhIG5ldyBhcnJvdyBmdW5jdGlvbiB3aGVuIHNldHRpbmcgZXZlbnQgbGlzdGVuZXIsIHdlIGNhbiByZW1vdmUgdGhpcyBldmVudCBsaXN0ZW5lclxuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy9jbG9zZSB3aGVuIFggaXMgY2xpY2tlZFxuICAgIHRoaXMuX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xuICAgICAgLy91c2UgbW91c2Vkb3duIHNvIHRoYXQgaWYgdXNlciBjbGlja3Mgb24gYm94IGFuZCBkcmFncyBvdXRzaWRlLCB0aGlzIGV2ZW50IGRvZXMgbm90IHRyaWdnZXJcbiAgICAgIC8vb25seSB0cmlnZ2VycyBpZiB0aGV5IGNsaWNrIG91dHNpZGUgbW9kYWwgYm94XG5cbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cDs7XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcG9wdXBTZWxlY3RvcixcbiAgICBoYW5kbGVGb3JtU3VibWl0IFxuICApIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTsgXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG4gIH1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG5cbiAgICBjb25zdCBpbnB1dE9iaiA9IHt9O1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRPYmpbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnB1dE9iajsgXG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpOyBcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7IFxuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEZvcm07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCJcblxuY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cHtcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKVxuICAgIHtcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgIH1cbiAgICBfc2V0RGF0YUltYWdlUG9wdXAoKSB7XG4gICAgICAgIGNvbnN0IGltYWdlUG9wdXBQaWMgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19wcmV2aWV3LWltYWdlXCIpO1xuICAgICAgICBjb25zdCBpbWFnZVBvcHVwVGV4dCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX3ByZXZpZXctbmFtZVwiKTtcbiAgICAgICAgaW1hZ2VQb3B1cFBpYy5zcmMgPSB0aGlzLmxpbms7XG4gICAgICAgIGltYWdlUG9wdXBUZXh0LnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgICAgICBpbWFnZVBvcHVwUGljLmFsdCA9IHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICBvcGVuKGRhdGEpLy9kYXRhIGNvbnRhaW5zIG5hbWUgYW5kIGxpbmsuIHNlbnQgaGVyZSBhbmQgbm90IGluIHRoZSBjb25zdHJ1Y3RvclxuICAgIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbms7XG4gICAgICAgIHRoaXMuX3NldERhdGFJbWFnZVBvcHVwKCk7XG4gICAgICAgIHN1cGVyLm9wZW4oKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwV2l0aEltYWdlOzsiLCJcblxuY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXNBcnJheSA9IGl0ZW1zO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLl9pdGVtc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbjsiLCJcbmNsYXNzIFVzZXJJbmZvIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHsgdXNlck5hbWUsIHVzZXJKb2IgfSBcbiAgICApIFxuICAgIHtcbiAgICAgIHRoaXMudXNlck5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgICB0aGlzLnVzZXJKb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICB9XG4gICAgc2V0VXNlckluZm8oeyBuZXdOYW1lLCBuZXdKb2IgfSkge1xuICAgICAgdGhpcy51c2VyTmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuZXdOYW1lO1xuICAgICAgdGhpcy51c2VySm9iRWxlbWVudC50ZXh0Q29udGVudCA9IG5ld0pvYjtcbiAgICB9XG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICBjb25zdCBuZXdPYmplY3QgPSB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgdXNlcmluZm86IHRoaXMudXNlckpvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9XG4gICAgfVxuICBcbiAgZXhwb3J0IHsgVXNlckluZm8gfTs7IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiU2Fzc2FmcmFzIE1vdW50YWluXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU5ODU1OTA2OTM1Mi0zZDg0MzdiMGQ0MmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTg3MCZxPTgwXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkFuZ2VsIFRyZWVcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjExODU5MzI4MDUzLTNjYmM5ZjkzOTlmND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzI2JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTXlydGxlIEJlYWNoXCIsXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTYxNzg1ODc5NzE3NS1iN2RiYTNjNWM4ZmM/aXhsaWI9cmItMS4yLjEmaXhpZD1Nbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVGw4ZkcxNWNuUnNaU1V5TUdKbFlXTm9KVEl3YzI5MWRHZ2xNakJqWVhKdmJHbHVZWHhsYm53d2ZId3dmSHclM0QmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03MDAmcT02MFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJFZGlzdG8gQmVhY2hcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTQ2MTg4OTk0LWZlYTBlY2JiMDRhND9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9Njg3JnE9ODBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVGFibGUgUm9jayBNb3VudGFpblwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTc5MTI2ODk0MzAtMjhkNjYyNGZlNDY3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2NtOW1hV3hsTFhCaFoyVjhOM3g4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NzAwJnE9NjBcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ29uZ2FyZWUgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTU2NTMwNTE5NjgtNjljMmIwZTQzMzQ3P2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz04NzAmcT04MFwiLFxuICB9LFxuXTtcblxuIGV4cG9ydCBjb25zdCBjdXN0b21TZXR0aW5ncyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5wb3B1cF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLnBvcHVwX19idXR0b25cIixcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJwb3B1cF9fc2F2ZS1idXR0b25fZGlzYWJsZWRcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19lcnJvclwiLFxuICBlcnJvckNsYXNzOiBcInBvcHVwX19lcnJvcl92aXNpYmxlXCIsXG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2luZGV4LmNzcydcbi8vSW1wb3J0IGNsYXNzZXNcbmltcG9ydCB7IEZvcm1WYWxpZGF0b3J9IGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcblxuaW1wb3J0IHtDYXJkIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xuXG5pbXBvcnQgeyBpbml0aWFsQ2FyZHMsIGN1c3RvbVNldHRpbmdzICB9IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnN0YW50cy5qc1wiO1xuXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XG5cbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xuXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XG5cblxuLy8gQnV0dG9ucyBhbmQgb3RoZXIgRE9NIGVsZW1lbnRzXG5cbmNvbnN0IGVkaXRQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTsgXG5jb25zdCBlZGl0UHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LXBvcHVwXCIpOyBcbmNvbnN0IGVkaXRQcm9maWxlRm9ybSA9IGVkaXRQcm9maWxlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTsgXG5jb25zdCBhZGRDYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19hZGQtYnV0dG9uXCIpOyBcbmNvbnN0IGFkZENhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3JlYXRlLXBvcHVwXCIpOyBcbmNvbnN0IGFkZENhcmRGb3JtID0gYWRkQ2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1cIik7XG5cbi8vIEZvcm0gZGF0YVxuY29uc3QgbmFtZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpO1xuY29uc3QgbmFtZUlucHV0ID0gZWRpdFByb2ZpbGVGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpO1xuY29uc3QgdGl0bGVJbnB1dCA9IGVkaXRQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XG5jb25zdCBpbWFnZU5hbWVJbnB1dCA9IGFkZENhcmRGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicGxhY2UtbmFtZVwiXScpO1xuY29uc3QgaW1hZ2VMaW5rSW5wdXQgPSBhZGRDYXJkRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImxpbmtcIl0nKTtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkQ29udGFpbmVyLCBkYXRhLCBjYXJkUG9wdXBPYmplY3QpXG57XG4gIGNvbnN0IGNhcmRPYmplY3QgPSBuZXcgQ2FyZChkYXRhLCBcIiNjYXJkLXRlbXBsYXRlXCIsICgpID0+IHtcbiAgICBjYXJkUG9wdXBPYmplY3Qub3BlbihkYXRhKTtcbiAgfSk7IFxuXG4gIGNvbnN0IG5ld0NhcmQgPSBjYXJkT2JqZWN0LmNyZWF0ZUNhcmRFbGVtZW50KCk7XG4gIGNhcmRDb250YWluZXIuYWRkSXRlbShuZXdDYXJkKTtcbn1cblxuY29uc3QgaW1hZ2VQb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNwcmV2aWV3LXBvcHVwXCIpOyBcbmltYWdlUG9wdXBPYmplY3Quc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VySW5mbyh7XG4gIHVzZXJOYW1lOiBcIi5wcm9maWxlX19uYW1lXCIsXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXG59KTtcblxuXG5jb25zdCBmb3JtRWxlbWVudHNMaXN0ID0gQXJyYXkuZnJvbShcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjdXN0b21TZXR0aW5ncy5mb3JtU2VsZWN0b3IpXG4pO1xuXG5jb25zdCBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdCA9IGZvcm1FbGVtZW50c0xpc3QubWFwKChmb3JtKSA9PiB7XG4gIGNvbnN0IGZvcm1PYmplY3QgPSBuZXcgRm9ybVZhbGlkYXRvcihjdXN0b21TZXR0aW5ncywgZm9ybSk7XG4gIGZvcm1PYmplY3QuZW5hYmxlVmFsaWRhdGlvbigpO1xuICByZXR1cm4gZm9ybU9iamVjdDtcbn0pO1xuXG5jb25zdCBlZGl0UHJvZmlsZUZvcm1PYmplY3QgPSBmb3JtVmFsaWRhdG9yT2JqZWN0TGlzdC5maW5kKFxuICAob2JqKSA9PiBvYmouZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSA9PSBcIm5hbWVhbmRkZXNjcmlwdGlvblwiXG4pO1xuY29uc29sZS5sb2coZWRpdFByb2ZpbGVGb3JtT2JqZWN0KTtcbmNvbnN0IGFkZENhcmRGb3JtT2JqZWN0ID0gZm9ybVZhbGlkYXRvck9iamVjdExpc3QuZmluZChcbiAgKG9iaikgPT4gb2JqLmZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIikgPT0gXCJuYW1lYW5kbGlua1wiXG4pO2NvbnNvbGUubG9nKGFkZENhcmRGb3JtT2JqZWN0KTtcblxuY29uc3QgY2FyZEdyaWRPYmplY3QgPSBuZXcgU2VjdGlvbihcbiAge1xuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XG4gICAgICByZW5kZXJDYXJkKGNhcmRHcmlkT2JqZWN0LCBkYXRhLCBpbWFnZVBvcHVwT2JqZWN0KTtcbiAgICB9LFxuICB9LFxuICBcIi5waG90by1ncmlkX19jYXJkc1wiXG4pO1xuXG5jYXJkR3JpZE9iamVjdC5yZW5kZXJJdGVtcygpO1xuXG5jb25zdCBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2VkaXQtcG9wdXBcIiwgKHZhbHVlcykgPT4ge1xuICB1c2VyLnNldFVzZXJJbmZvKHsgbmV3TmFtZTogdmFsdWVzLm5hbWUsIG5ld0pvYjogdmFsdWVzLmRlc2NyaXB0aW9uIH0pO1xuICBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpO1xufSk7XG5lZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBhZGRDYXJkRm9ybVBvcHVwT2JqZWN0ID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjY3JlYXRlLXBvcHVwXCIsICgpID0+IHtcbiAgY29uc3QgbmV3Q2FyZEluZm8gPSB7XG4gICAgbmFtZTogaW1hZ2VOYW1lSW5wdXQudmFsdWUsXG4gICAgbGluazogaW1hZ2VMaW5rSW5wdXQudmFsdWUsXG4gIH07XG5cbiAgcmVuZGVyQ2FyZChjYXJkR3JpZE9iamVjdCwgbmV3Q2FyZEluZm8sIGltYWdlUG9wdXBPYmplY3QpO1xuXG4gIGFkZENhcmRGb3JtLnJlc2V0KCk7IFxuICBhZGRDYXJkRm9ybU9iamVjdC5zZXRCdXR0b25JbmFjdGl2ZSgpOyBcbiAgYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5jbG9zZSgpOyBcbn0pO1xuYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5hZGRDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFkZENhcmRGb3JtUG9wdXBPYmplY3Qub3BlbigpO1xufSk7XG5cbmVkaXRQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXIuZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJuYW1lO1xuICB0aXRsZUlucHV0LnZhbHVlID0gdXNlcklucHV0LnVzZXJpbmZvO1xuICBlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdC5vcGVuKCk7XG4gIFxuIC8vdXNlci5nZXRVc2VySW5mbygpO1xuICBcbiAgLy9uYW1lSW5wdXQudmFsdWUgPSBuYW1lVGV4dC50ZXh0Q29udGVudDtcbiAgLy90aXRsZUlucHV0LnZhbHVlID0gdGl0bGVUZXh0LnRleHRDb250ZW50O1xuICBcbiAgZWRpdFByb2ZpbGVGb3JtT2JqZWN0LmNsZWFyQWxsRXJyb3JzKCk7XG5cbn0pOyJdLCJuYW1lcyI6WyJDYXJkIiwiY29uc3RydWN0b3IiLCJkYXRhIiwidGVtcGxhdGVTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsIl9lbGVtZW50IiwicmVtb3ZlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9jYXJkTmFtZSIsIm5hbWUiLCJfY2FyZExpbmsiLCJsaW5rIiwiX2NhcmRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJfY2FyZEltYWdlIiwiY3JlYXRlQ2FyZEVsZW1lbnQiLCJfZ2V0RWxlbWVudCIsIl9zZXRJbWFnZUFuZE5hbWUiLCJfc2V0RXZlbnRMaXN0ZW5lciIsImNsb25lTm9kZSIsImxpa2VCdXR0b24iLCJkZWxldGVCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiX2xpa2UiLCJfZGVsZXRlIiwiY2FyZEltYWdlIiwiZXZ0IiwiaGVhcnQiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJzdHlsZSIsInRleHRDb250ZW50IiwiY3VzdG9tU2V0dGluZ3MiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWxlbWVudCIsImVycm9yTWVzc2FnZSIsImVycm9yRWxlbWVudCIsImlkIiwiaW5wdXRFcnJvckNsYXNzIiwiYWRkIiwiZXJyb3JDbGFzcyIsIl9oaWRlSW5wdXRFcnJvciIsImNsZWFyQWxsRXJyb3JzIiwiaW5wdXRMaXN0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJmb3JFYWNoIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oYXNJbnZhbGlkSW5wdXQiLCJzb21lIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiYnV0dG9uRWxlbWVudCIsIl9kaXNhYmxlQnV0dG9uIiwiX2VuYWJsZUJ1dHRvbiIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJzZXRCdXR0b25JbmFjdGl2ZSIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiZW5hYmxlVmFsaWRhdGlvbiIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsImtleSIsImNsb3NlIiwiX3BvcHVwIiwiX2J1dHRvbiIsIm9wZW4iLCJfaGFuZGxlRXNjQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqIiwiaW5wdXQiLCJ2YWx1ZSIsInByZXZlbnREZWZhdWx0IiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9zZXREYXRhSW1hZ2VQb3B1cCIsImltYWdlUG9wdXBQaWMiLCJpbWFnZVBvcHVwVGV4dCIsInNyYyIsImFsdCIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXNBcnJheSIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJjbGVhciIsImlubmVySFRNTCIsInJlbmRlckl0ZW1zIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlck5hbWVFbGVtZW50IiwidXNlckpvYkVsZW1lbnQiLCJzZXRVc2VySW5mbyIsIm5ld05hbWUiLCJuZXdKb2IiLCJnZXRVc2VySW5mbyIsIm5ld09iamVjdCIsInVzZXJuYW1lIiwidXNlcmluZm8iLCJpbml0aWFsQ2FyZHMiLCJmb3JtU2VsZWN0b3IiLCJlZGl0UHJvZmlsZUJ1dHRvbiIsImVkaXRQcm9maWxlTW9kYWwiLCJlZGl0UHJvZmlsZUZvcm0iLCJhZGRDYXJkQnV0dG9uIiwiYWRkQ2FyZFBvcHVwIiwiYWRkQ2FyZEZvcm0iLCJuYW1lVGV4dCIsInRpdGxlVGV4dCIsIm5hbWVJbnB1dCIsInRpdGxlSW5wdXQiLCJpbWFnZU5hbWVJbnB1dCIsImltYWdlTGlua0lucHV0IiwicmVuZGVyQ2FyZCIsImNhcmRDb250YWluZXIiLCJjYXJkUG9wdXBPYmplY3QiLCJjYXJkT2JqZWN0IiwibmV3Q2FyZCIsImltYWdlUG9wdXBPYmplY3QiLCJ1c2VyIiwiZm9ybUVsZW1lbnRzTGlzdCIsImZvcm1WYWxpZGF0b3JPYmplY3RMaXN0IiwibWFwIiwiZm9ybSIsImZvcm1PYmplY3QiLCJlZGl0UHJvZmlsZUZvcm1PYmplY3QiLCJmaW5kIiwib2JqIiwiZ2V0QXR0cmlidXRlIiwiY29uc29sZSIsImxvZyIsImFkZENhcmRGb3JtT2JqZWN0IiwiY2FyZEdyaWRPYmplY3QiLCJlZGl0UHJvZmlsZUZvcm1Qb3B1cE9iamVjdCIsInZhbHVlcyIsImRlc2NyaXB0aW9uIiwiYWRkQ2FyZEZvcm1Qb3B1cE9iamVjdCIsIm5ld0NhcmRJbmZvIiwidXNlcklucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==