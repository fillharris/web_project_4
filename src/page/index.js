import './index.css'
//Import classes
import Api from "../components/Api.js";

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

const imagePopupObject = new PopupWithImage("#preview-popup"); 
imagePopupObject.setEventListeners();

const user = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__title",
  userAvatar: ".profile__image"
});


//Token and ID info
//Token: b1411637-441a-4d25-9227-6de5bf8bcf24 
//Group ID: group-12
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json"
  }
}); 

api
  .getUserInfo()
  .then((data) => {
    user.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

function renderCard(cardContainer, data, cardPopupObject)
{
  const cardObject = new Card(data, "#card-template", () => {
    cardPopupObject.open(data);
  }); 

  const newCard = cardObject.createCardElement();
  cardContainer.addItem(newCard);
}



const formElementsList = Array.from(
  document.querySelectorAll(customSettings.formSelector)
);

const formValidatorObjectList = formElementsList.map((form) => {
  const formObject = new FormValidator(customSettings, form);
  formObject.enableValidation();
  return formObject;
});

const editProfileFormObject = formValidatorObjectList.find(
  (obj) => obj.formElement.getAttribute("name") == "nameanddescription"
);
console.log(editProfileFormObject);
const addCardFormObject = formValidatorObjectList.find(
  (obj) => obj.formElement.getAttribute("name") == "nameandlink"
);console.log(addCardFormObject);

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
  user.setUserInfo({ newName: values.name, newJob: values.description });
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
  const userInput = user.getUserInfo();
  nameInput.value = userInput.username;
  titleInput.value = userInput.userinfo;
  editProfileFormPopupObject.open();
  
 //user.getUserInfo();
  
  //nameInput.value = nameText.textContent;
  //titleInput.value = titleText.textContent;
  
  editProfileFormObject.clearAllErrors();

});