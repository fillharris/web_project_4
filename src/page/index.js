import "./index.css";

// Imported Classes
import Card from "../components/Card";
import {
  cardsContainer,
  cardSelector,
  settings,
} from "../utils/constants";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Api from "../utils/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";


const editProfileIcon = document.querySelector(".profile__info-edit-button");
const addPictureIcon = document.querySelector(".profile__add-button");
const editProfileForm = document.querySelector("#edit-popup");
const addPictureForm = document.querySelector("#create-popup");
const editProfilePicForm = document.querySelector(".avatar-popup");
const formFieldAuthor = document.querySelector("#edit-profile-form");
const formFieldPicture = document.querySelector("#create-place-form");
const inputProfileName = document.querySelector("#profile-name");
const inputProfileTitle = document.querySelector("#profile-title");
const profilePicInput = document.querySelector("#avatar-url");
const editProfilePicIcon = document.querySelector(".profile__icon");

// //Token and ID info
// //Token: b1411637-441a-4d25-9227-6de5bf8bcf24
// //Group ID: group-12

// API class
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json",
  },
});


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

const placePopup = new PopupWithForm("#create-popup", (inputValues) => {
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

let cardSection = null;

function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.name;
  inputProfileTitle.value = result.about;
}
function handleOpenProfileForm() {
  // formFieldAuthor.reset();
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
  // formFieldPicture.reset();

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
