
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  selectors,
} from "../utils/constants.js";

import Card from "../components/Card.js";

import Section from "../components/section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

////////////////////////////////////////////////Set up edit profile text button and modal for it
//use const so that the value does not change
const editProfileButton = document.querySelector("#profile-info-edit-button"); ///find the edit button from profile-this opens the modal panel
const editProfileModal = document.querySelector("#edit-profile-modal"); //using ID to find the modal (pop up). ID is unique, makes it a little better than a class. needed because there are multiple modals (pop ups) with same class
const editProfileForm = editProfileModal.querySelector(".modal__form"); //find the form. form has 2 text boxes and a submit button. Search within editProfileModal instead of document so that we find the correct form
//find the text on the page that shows name and title
const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

//////////////////////////////////////////////////////////
// find the form fields in the DOM
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="title"]');
/////////////////////////////////////////////////////Set up add card button and modal for it
const addCardButton = document.querySelector("#profile-add-button"); ///find the + button (add card)-this opens the modal panel
const addCardModal = document.querySelector("#add-card-modal"); //using ID to find the modal (pop up).
const addCardForm = addCardModal.querySelector(".modal__form"); //find the form.

// find the form fields in the DOM
const imageNameInput = addCardForm.querySelector('[name="imagename"]');
const imageLinkInput = addCardForm.querySelector('[name="imagelink"]');
/////////////////////////////////////////////

/////////////////////////get all forms and create FormValidator objects out of them

const formElementsList = Array.from(document.querySelectorAll(customSettings.formSelector));
//get an array of form elements- these are the html elements in the DOM

//map takes each form element in the array and creates the formValidator object for it, then stores the form
//object in the array
const formValidatorObjList = formElementsList.map((form) => {

  //Create a form object and call the public method enableValidation
  const formObj = new FormValidator(customSettings, form);
  formObj.enableValidation();
  return formObj;
}); 

//within the form object, get to the form element and then find the form with the correct name
const editProfileFormObj = formValidatorObjList.find( obj => obj.formElement.getAttribute("name") == "nameandtitle");
const addCardFormObj = formValidatorObjList.find( obj => obj.formElement.getAttribute("name") == "imagenameandlink");

const cardGridObject = new Section({items:initialCards, renderer: (data) => {
//templateSelector should be set to "#card-template" (may change if more card templates are added)
const cardPopupObj = new PopupWithImage(data, "#image-popup"); //create popup image for card
//we will send its open() method into cardObj
cardPopupObj.setEventListeners();
const cardObj = new Card(data, "#card-template", () => {cardPopupObj.open()});//create a card object

const newCard = cardObj.createCardElement(); //create a card element
cardGridObject.addItem(newCard);
}}, ".grid");

cardGridObject.renderItems();



//////////////////////////////////////////////////////////////////////make the PopupWithFormObject for each form
const editProfileFormPopupObj = new PopupWithForm(
  "#edit-profile-modal",
  () => {
    //create UserInfo object
    const newuser = new UserInfo({userName:".profile__info-name", userJob:".profile__info-title"});
    newuser.setUserInfo({newName: nameInput.value, newJob: titleInput.value});
    //nameInput and titleInput are set earlier, ie nameInput = editProfileForm.querySelector('[name="name"]');
    editProfileFormPopupObj.close();

  },
);
editProfileFormPopupObj.setEventListeners();
//editProfileFormPopupObj._getInputValues(); //calling private method for testing purposes

const addCardFormPopupObj = new PopupWithForm(
  "#add-card-modal",
  () => {
    //make a new object to store the image url and image label
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
  };

  const cardPopupObj = new PopupWithImage(newCardInfo, "#image-popup"); //create popup image for card
//we will send its open() method into cardObj
cardPopupObj.setEventListeners();
const cardObj = new Card(newCardInfo, "#card-template", () => {cardPopupObj.open()});//create a card object

  const newCard = cardObj.createCardElement(); //create a card element
  cardGridObject.addItem(newCard);

  addCardForm.reset();   //clear out the input fields
  addCardFormObj.setButtonInactive();  //Set button to inactive-it needs to be hidden because the fields are empty
  addCardFormPopupObj.close(); //close the modal panel when submitted
  },
);
addCardFormPopupObj.setEventListeners();

/////////////////////////////////////////////////////////////////////add click events to buttons that open form modals
//Set up button that opens add card modal
addCardButton.addEventListener("click", () => {
  addCardFormPopupObj.open();
});

//Set up button that opens edit profile modal
editProfileButton.addEventListener("click", () => {
  editProfileFormPopupObj.open();
  //this makes sure data in the form field is correct if you close without saving
  //if you close without saving it should be set to the previous values from the page, NOT whatever u typed and didnt save
  nameInput.value = nameText.textContent;
  titleInput.value = titleText.textContent;
  //get the parameters to send to checkInputValidity
  
  const inputList = Array.from(
    editProfileFormObj.formElement.querySelectorAll(customSettings.inputSelector)
  );
  //loop through all fields in the form and call checkInputValidity to determine if they are valid (and if error should be displayed)
  inputList.forEach((inputElement) => {
    //because we reset the form fields to previous values, they should all be valid- so we clear the error for each one
    editProfileFormObj.hideInputError(inputElement);
  });
});

