//Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors, settings } from "../utils/constants.js";

// Wrappers

const editPopupWindow = document.querySelector(".edit-popup");
const createPopupWindow = document.querySelector(".create-popup");
const editForm = document.querySelector(".popup__edit-container");
const photoGridWrap = document.querySelector(".photo-grid__cards");
const createForm = document.querySelector(
  ".popup__create-container .popup__form"
);

const nameText = document.querySelector(".profile__info-name");
const titleText = document.querySelector(".profile__info-title");

// Buttons and other DOM elements

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup__edit-container");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".create-popup");
const addCardForm = addCardPopup.querySelector(".popup__form");

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
const imageNameInput = addCardForm.querySelector('[name="place-name"]');
const imageLinkInput = addCardForm.querySelector('[name="link"]');

//Create instances of the classes
const cardSection = new Section(
  {
    items: initialCards,
    renderer: function (item) {
      const card = new Card(item, selectors.cardTemplate).generateCard();
      cardSection.addItem(card);
    },
  },
  selectors.cardSection
);

//Initialize all the instances
cardSection.renderItems(initialCards);

//All the rest
//form
const editProfileFormPopup = new PopupWithForm({
  popupSelector: ".popup__edit-container",
  handleformsubmit: () => {
    const newuser = new UserInfo({
      name: ".popup__input_type_title",
      job: ".popup__input_type_description",
    });
    newuser.setUserInfo({ newName: nameInput.value, newJob: titleInput.value });
    editProfileFormPopup.close();
  },
});

editProfileFormPopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editProfileFormPopup.open();
});

const addCardFormPopup = new PopupWithForm({
  popupSelector: ".popup__create-container",
  handleFormSubmit: () => {
    const newCardInfo = {
      name: imageNameInput.value,
      link: imageLinkInput.value,
    };

    const cardPopup = new PopupWithImage(newCardInfo, ".card__image");

    cardPopup.setEventListeners();

    const cardObj = new Card(newCardInfo, "#card-template", () => {
      cardPopup.open();
    });

    const newCard = cardObj.createCardElement();
    cardGrid.addItem(newCard);

    addCardForm.reset();
    addCardFormObj.setButtonInactive();
    addCardFormPopup.close();
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
