
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

const editProfileButton = document.querySelector(".profile__edit-button"); ///find the edit button from profile-this opens the modal panel
const editProfilePopup = document.querySelector(".popup__edit-container"); //using ID to find the modal (pop up). ID is unique, makes it a little better than a class. needed because there are multiple modals (pop ups) with same class
const editProfileForm = editProfilePopup.querySelector(".popup__form"); //find the form. form has 2 text boxes and a submit button. Search within editProfileModal instead of document so that we find the correct form
//find the text on the page that shows name and title
const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

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

 const nameInput = editProfileForm.querySelector('[name="name"]');
 const titleInput = editProfileForm.querySelector('[name="description"]');

 const nameInputField = createForm.querySelector(".popup__input_type_name");
 const linkInputField = createForm.querySelector(".popup__input_type_link");

const addCardButton = document.querySelector(".profile__add-button"); ///find the + button (add card)-this opens the modal panel
const addCardPopup = document.querySelector(".create-popup"); //using ID to find the modal (pop up).
const addCardForm = addCardPopup.querySelector(".popup__form"); //find the form.

const imageNameInput = addCardForm.querySelector('[name="imagename"]');
const imageLinkInput = addCardForm.querySelector('[name="imagelink"]');

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
const editProfileFormPopup = new PopupWithForm({
 popupSelector: ".popup__edit-container",
 handleformsubmit: () => {
    const newuser = new UserInfo({name:".popup__input_type_title" , job:".popup__input_type_description"});
    newuser.setUserInfo({newName: nameInput.value, newJob: titleInput.value});
    //nameInput and titleInput are set earlier, ie nameInput = editProfileForm.querySelector('[name="name"]');
    editProfileFormPopup.close();
  },
});
editProfileFormPopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editProfileFormPopup.open();
});

const addCardFormPopup = new PopupWithForm({
  popupSelector: ".create-popup",
  handleFormSubmit: () => {
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };

  const cardPopup = new PopupWithImage(newCardInfo, ".card__image"); //create popup image for card
//we will send its open() method into cardObj
cardPopup.setEventListeners();
const cardObj = new Card(newCardInfo, "#card-template", () => {cardPopup.open()});//create a card object

  const newCard = cardObj.createCardElement(); //create a card element
  cardGrid.addItem(newCard);

  addCardForm.reset();   //clear out the input fields
  addCardFormObj.setButtonInactive();  //Set button to inactive-it needs to be hidden because the fields are empty
  addCardFormPopup.close(); //close the modal panel when submitted
  },
});
addCardFormPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});




// Validation
const addFormElement = createPopupWindow.querySelector(".popup__form");
const editFormElement = editPopupWindow.querySelector(".popup__form");

const addFormValidator = new FormValidator(settings, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(settings, editFormElement);
editFormValidator.enableValidation();