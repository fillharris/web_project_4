
//Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  selectors,
  settings
} from "../utils/constants.js";

// Wrappers

 const editPopupWindow = document.querySelector(".edit-popup");
 const createPopupWindow = document.querySelector(".create-popup");
 const editForm = document.querySelector(".popup__edit-container");
 const photoGridWrap = document.querySelector(".photo-grid__cards");
 const createForm = document.querySelector(
".popup__create-container .popup__form"
);

// Buttons and other DOM elements

 const editButton = document.querySelector(".profile__edit-button");
 const addButton = document.querySelector(".profile__add-button");
 const editCloseButton = document.querySelector(".popup__close-edit");
 const createCloseButton = document.querySelector(".popup__close-create");
 const profileTitle = document.querySelector(".profile__name");
 const profileDescription = document.querySelector(".profile__title");
 

// Form Data

 const titleInputField = editForm.querySelector(".popup__input_type_title");
 const descriptionInputField = editForm.querySelector(
".popup__input_type_description"
);

 const nameInputField = createForm.querySelector(".popup__input_type_name");
 const linkInputField = createForm.querySelector(".popup__input_type_link");



//Create instances of the classes
const cardSection = new Section ({
  items: initialCards,
  renderer: function(item) {
    const card = new Card(item, selectors.cardTemplate).generateCard();
  cardSection.addItem(card);
  },
},
selectors.cardSection)


//Initialize all the instances
cardSection.renderItems(initialCards);


//All the rest
//form
const editProfileFormPopup = new PopupWithForm(
  "#edit-profile-modal",
  () => {
    //create UserInfo object
    const newuser = new UserInfo({userName:".profile__info-name", userJob:".profile__info-title"});
    newuser.setUserInfo({newName: nameInput.value, newJob: titleInput.value});
    //nameInput and titleInput are set earlier, ie nameInput = editProfileForm.querySelector('[name="name"]');
    editProfileFormPopup.close();

  },
);
editProfileFormPopup.setEventListeners();
//editProfileFormPopupObj._getInputValues(); //calling private method for testing purposes

const addCardFormPopup = new PopupWithForm(
  "#add-card-modal",
  () => {
    //make a new object to store the image url and image label
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };

  const cardPopup = new PopupWithImage(newCardInfo, "#image-popup"); //create popup image for card
//we will send its open() method into cardObj
cardPopup.setEventListeners();
const cardObj = new Card(newCardInfo, "#card-template", () => {cardPopup.open()});//create a card object

  const newCard = cardObj.createCardElement(); //create a card element
  cardGrid.addItem(newCard);

  addCardForm.reset();   //clear out the input fields
  addCardFormObj.setButtonInactive();  //Set button to inactive-it needs to be hidden because the fields are empty
  addCardFormPopup.close(); //close the modal panel when submitted
  },
);
addCardFormPopup.setEventListeners();


// Validation
const addFormElement = createPopupWindow.querySelector(".popup__form");
const editFormElement = editPopupWindow.querySelector(".popup__form");

const addFormValidator = new FormValidator(settings, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(settings, editFormElement);
editFormValidator.enableValidation();