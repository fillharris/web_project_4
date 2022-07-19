import "./index.css";
//Import classes
import { Api } from "../components/Api.js";

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";

import { customSettings } from "../components/constants.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import { UserInfo } from "../components/UserInfo.js";

import PopupWithConfirm from "../components/PopupWithConfirm.js";

// Buttons and other DOM elements

const editProfileButton = document.querySelector("#profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const addCardButton = document.querySelector("#profile__add-button");
const addCardPopup = document.querySelector("#create-popup");
const addCardForm = addCardPopup.querySelector(".popup__form");
const editAvatarButton = document.querySelector("#profile__avatar-button");
const avatarImg = document.querySelector(".profile__avatar");

// Form data
const nameText = document.querySelector(".profile__name");
const titleText = document.querySelector(".profile__title");
const nameInput = editProfileForm.querySelector('[name="name"]');
const titleInput = editProfileForm.querySelector('[name="description"]');
const imageNameInput = addCardForm.querySelector('[name="place-name"]');
const imageLinkInput = addCardForm.querySelector('[name="link"]');

const imagePopupObject = new PopupWithImage("#preview-popup");
imagePopupObject.setEventListeners();

//Token and ID info
//Token: b1411637-441a-4d25-9227-6de5bf8bcf24
//Group ID: group-12

fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b1411637-441a-4d25-9227-6de5bf8bcf24",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo({
  userName: ".profile__info-name",
  userJob: ".profile__info-title",
  userAvatar: ".profile__avatar",
});

// function renderCard(cardContainer, data, cardPopupObject)
// {
//   const cardObject = new Card(data, "#card-template", () => {
//     cardPopupObject.open(data);
//   });

//   const newCard = cardObject.createCardElement();
//   cardContainer.addItem(newCard);
// }

const cardGridObject = new Section(
  {
    items: null,
    renderer: (data) => {
      renderCard(
        cardGridObject,
        data,
        imagePopupObject,
        deleteCardFormPopupObject
      );
    },
  },
  ".photo-grid__cards"
);

api
  .getUserInfo()
  .then((data) => {
    user.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    api
      .getInitialCards()
      .then((result) => {
        console.log(result);
        cardGridObject.setItems(result);
        cardGridObject.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });
  });

function renderCard(cardContainer, data, cardPopupObject, deletePopupObject) {
  const cardObject = new Card(
    data,
    "#card-template",
    () => {
      cardPopupObject.open(data);
    },
    () => {
      deletePopupObject.setCardToDelete(cardObject);
      deletePopupObject.open();
    },
    () => {
      if (cardObject.getIsLikedByCurrentUser() == false) {
        api
          .likeCard(cardObject.getId())
          .then((data) => cardObject.setLikes(data.likes))
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .unLikeCard(cardObject.getId())
          .then((data) => cardObject.setLikes(data.likes))
          .catch((err) => {
            console.log(err);
          });
      }
    },
    user
  );

  const newCard = cardObject.createCardElement(user);
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

const addCardFormObject = formValidatorObjectList.find(
  (obj) => obj.formElement.getAttribute("name") == "nameandlink"
);

const editAvatarFormObject = formValidatorObjectList.find(
  (obj) => obj.formElement.getAttribute("name") == "avatarform"
);

const editAvatarFormPopupObject = new PopupWithForm(
  "#avatar-popup",
  (values) => {
    avatarImg.src = values.avatar;
    editAvatarFormPopupObject.setLoadingText(true);
    api
      .patchUserAvatar(values)
      .then(editAvatarFormPopupObject.close())
      .then(editAvatarFormPopupObject.setLoadingText(false))
      .catch((err) => {
        console.log(err);
      });
  }
);
editAvatarFormPopupObject.setEventListeners();

const editProfileFormPopupObject = new PopupWithForm(
  "#edit-popup",
  (values) => {
    user.setUserInfoTextOnly({ name: values.name, about: values.title });
    editProfileFormPopupObject.setLoadingText(true);
    api
      .patchUserInfo(user.getUserInfo())
      .then(editProfileFormPopupObject.close())
      .then(editProfileFormPopupObject.setLoadingText(false))
      .catch((err) => {
        console.log(err);
      });
  }
);
editProfileFormPopupObject.setEventListeners();

const addCardFormPopupObject = new PopupWithForm("#create-popup", () => {
  const newCardInfo = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
    likes: [],
    owner: user.getUserInfo(),
  };

  addCardFormPopupObject.setLoadingText(true);
  api
    .uploadCard(newCardInfo)
    .then((data) => {
      console.log({ data });

      renderCard(
        cardGridObject,
        newCardInfo,
        imagePopupObject,
        deleteCardFormPopupObject
      );
    })

    .then(addCardForm.reset())
    .then(addCardFormObject.setButtonInactive())
    .then(addCardFormPopupObject.close())
    .then(addCardFormPopupObject.setloadingText(false))
    .catch((err) => {
      console.log(err);
    });
});
addCardFormPopupObject.setEventListeners();

const deleteCardFormPopupObject = new PopupWithConfirm(
  "#delete-popup",
  (cardObjToDelete) => {
    api
      .deleteCard(cardObjToDelete.getId())
      .then(cardObjToDelete.deleteFromPage())
      .then(deleteCardFormPopupObject.close())
      .catch((err) => {
        console.log(err);
      });
  }
);
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
  editProfileFormPopupObject.open();

  //user.getUserInfo();

  //nameInput.value = nameText.textContent;
  //titleInput.value = titleText.textContent;

  editProfileFormObject.clearAllErrors();
});
