import "./index.css";
// //Import classes

// // Buttons and other DOM elements

// const editProfileButton = document.querySelector("#profile__edit-button");
// const editProfileModal = document.querySelector("#edit-popup");
// const editProfileForm = editProfileModal.querySelector(".popup__form");
// const addCardButton = document.querySelector("#profile__add-button");
// const addCardPopup = document.querySelector("#create-popup");
// const addCardForm = addCardPopup.querySelector(".popup__form");
// const editAvatarModal = document.querySelector("#avatar-popup");
// const editAvatarForm = editAvatarModal.querySelector(".popup__form");
// const editAvatarButton = document.querySelector("#profile__avatar-button");
// const avatarImg = document.querySelector(".profile__avatar");

// // Form data
// const nameText = document.querySelector(".profile__name");
// const titleText = document.querySelector(".profile__title");
// const nameInput = editProfileForm.querySelector('[name="name"]');
// const titleInput = editProfileForm.querySelector('[name="description"]');
// const imageNameInput = addCardForm.querySelector('[name="place-name"]');
// const imageLinkInput = addCardForm.querySelector('[name="link"]');

// //Token and ID info
// //Token: b1411637-441a-4d25-9227-6de5bf8bcf24
// //Group ID: group-12

import Card from "../components/Card";
import {
  cardsContainer,
  cardSelector,
  settings,
} from "../components/constants";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";

// profile icons
const editProfileIcon = document.querySelector(".profile__edit-button");
const addPictureIcon = document.querySelector(".profile__add-button");
// author, add picture forms
const editProfileForm = document.querySelector("#edit-popup");
const addPictureForm = document.querySelector(".popup__preview-image");
const editProfilePicForm = document.querySelector(".avatar-popup");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#edit-profile-form");
const formFieldPicture = document.querySelector("#create-place-form");
// input fields for profile form popup
const inputProfileName = document.querySelector("#profile-name");
const inputProfileTitle = document.querySelector("#profile-title");
// profile section on the page
const profilePicInput = document.querySelector("#avatar-url");
const editProfilePicIcon = document.querySelector(".profile__icon");

// instantiate API class
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json",
  },
});

// handle Like Click function passed in as callback to Card.js
function handleLikeClick(cardId, action, card) {
  if (action === "remove") {
    api
      .removeLike(cardId)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((res) => {
        alert(res);
      });
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((res) => {
        alert(res);
      });
  }
}

// add picture form functions
function renderCard(inputValues) {
  const card = new Card(
    inputValues,
    cardSelector,
    handleCardClick,
    handleTrashButton,
    currentUserId,
    handleLikeClick
  );
  const cardEl = card.createCard();
  cardSection.addItem(cardEl);
}

// add picture form submit
const placePopup = new PopupWithForm(".create-popup", (inputValues) => {
  placePopup.renderLoading(true, "Saving...");
  api
    .addNewCard(inputValues)
    .then((inputValues) => {
      renderCard(inputValues);
      placePopup.close();
    })
    .catch((res) => {
      alert(res);
    })
    .finally(() => {
      placePopup.renderLoading(false, "Saving...");
    });
});

const imagePopup = new PopupWithImage("#preview-popup");
function handleCardClick(image) {
  imagePopup.open(image);
}

const deleteCardConfirmation = new PopupWithConfirm(".delete-popup");

// to interact with the Card class, open popup, then wait for delete to complete
function handleTrashButton(card) {
  deleteCardConfirmation.setSubmit(() => {
    deleteCardConfirmation.renderLoading(true, "Saving...");
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        deleteCardConfirmation.close();
      })
      .catch((res) => {
        alert(res);
      })
      .finally(() => {
        deleteCardConfirmation.renderLoading(false, "Saving...");
      });
  });
  deleteCardConfirmation.open();
}

// initialize card Section class variable to take api call result and interact with Section.js
let cardSection = null;

// profile form functions
function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.name;
  inputProfileTitle.value = result.about;
}
function handleOpenProfileForm() {
  formFieldAuthor.reset();
  fillProfileForm();
  addProfileFormValidator.resetValidation();
  profilePopup.open();
}
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-title",
  avatarSelector: ".profile__avatar",
});
const profilePopup = new PopupWithForm("#edit-popup", (inputValues, button) => {
  profilePopup.renderLoading(true, "Saving...");
  api
    .editUserProfile(inputValues)
    .then((inputValues) => {
      userInfo.setUserInfo(inputValues);
      profilePopup.close();
    })
    .catch((res) => {
      alert(res);
    })
    .finally(() => {
      profilePopup.renderLoading(false, "Saving...");
    });
});

const profilePicPopup = new PopupWithForm(
  ".avatar-popup",
  (inputValues, button) => {
    profilePicPopup.renderLoading(true, "Saving...");
    api
      .editProfilePic(inputValues)
      .then((inputValues) => {
        userInfo.setUserAvatar(inputValues);
        profilePicPopup.close();
      })
      .catch((res) => {
        alert(res);
      })
      .finally(() => {
        profilePicPopup.renderLoading(false, "Saving...");
      });
  }
);

// validators
const addProfileFormValidator = new FormValidator(settings, editProfileForm);
addProfileFormValidator.enableValidator();
const addPictureFormValidator = new FormValidator(settings, addPictureForm);
addPictureFormValidator.enableValidator();
const editProfilePicFormValidator = new FormValidator(
  settings,
  editProfilePicForm
);
editProfilePicFormValidator.enableValidator();

function handleOpenAddPictureForm() {
  formFieldPicture.reset();

  addPictureFormValidator.resetValidation();
  placePopup.open();
}

function handleOpenEditProfilePicForm() {
  profilePicInput.value = userInfo.getUserInfo().avatar;
  editProfilePicFormValidator.resetValidation();
  profilePicPopup.open();
}
addPictureIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editProfileIcon.addEventListener("mouseup", handleOpenProfileForm);
editProfilePicIcon.addEventListener("mouseup", handleOpenEditProfilePicForm);

let currentUserId = null;
api
  .initialize()
  .then(([user, cards]) => {
    currentUserId = user._id;
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      cardsContainer
    );
    cardSection.renderItems();

    userInfo.setUserInfo(user);
  })
  .catch((res) => {
    alert(res);
  });
