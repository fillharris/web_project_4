import './index.css'
//Import classes
import { FormValidator} from "../components/FormValidator.js";

import {Card } from "../components/Card.js";

import { initialCards, customSettings  } from "../components/constants.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";


// Buttons and other DOM elements

const editProfileButton = document.querySelector("#profile__edit-button"); 
const editProfileModal = document.querySelector("#edit-popup"); 
const editProfileForm = editProfileModal.querySelector(".popup__form"); 
const addCardButton = document.querySelector("#profile__add-button"); 
const addCardPopup = document.querySelector("#create-popup"); 
const addCardForm = addCardPopup.querySelector(".popup__form");

// Form data
const nameText = document.querySelector(".profile__name");
const titleText = document.querySelector(".profile__title");
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="description"]');
const imageNameInput = addCardForm.querySelector('[name="place-name"]');
const imageLinkInput = addCardForm.querySelector('[name="link"]');

function renderCard(cardContainer, data, cardPopupObject)
{
  const cardObject = new Card(data, "#card-template", () => {
    cardPopupObject.open(data);
  }); 

  const newCard = cardObject.createCardElement();
  cardContainer.addItem(newCard);
}

const imagePopupObject = new PopupWithImage("#preview-popup"); 
imagePopupObject.setEventListeners();

const user = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__title",
});


const formElementsList = Array.from(
  document.querySelectorAll(customSettings.formSelector)
);

const formValidatorObjectList = formElementsList.map((form) => {
  const formObject = new FormValidator(customSettings, form);
  formObject.enableValidation();
  return formObject;
});

const editProfileFormObject = formValidatorObjectList.find(
  (obj) => obj.formElement.getAttribute("name") == "nameandtitle"
);
const addCardFormObject = formValidatorObjectList.find(
  (obj) => obj.formElement.getAttribute("name") == "imagenameandlink"
);

const cardGridObject = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      renderCard(cardGridObject, data, imagePopupObject);
    },
  },
  ".photo-grid__cards"
);

cardGridObject.renderItems();

const editProfileFormPopupObject = new PopupWithForm("#edit-popup", (values) => {
  user.setUserInfo({ newName: values.name, newJob: values.title });
  editProfileFormPopupObject.close();
});
editProfileFormPopupObject.setEventListeners();

const addCardFormPopupObject = new PopupWithForm("#create-popup", () => {
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
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
  editProfileFormPopupObject.open();
  
  nameInput.value = nameText.textContent;
  titleInput.value = titleText.textContent;
  
  editProfileFormObject.clearAllErrors();

});