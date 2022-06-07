export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__error",
    errorClass: "popup__error_visible",
  }

  // Wrappers

export const photoGridWrap = document.querySelector(".photo-grid__cards");
export const editPopupWindow = document.querySelector(".edit-popup");
export const createPopupWindow = document.querySelector(".create-popup");
export const editForm = document.querySelector(".popup__edit-container");
export const createForm = document.querySelector(
  ".popup__create-container .popup__form"
);

// Buttons and other DOM elements

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editCloseButton = document.querySelector(".popup__close-edit");
export const createCloseButton = document.querySelector(".popup__close-create");
export const profileTitle = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__title");
export const previewImagePopup = document.querySelector(".preview-popup");
export const previewCardImage = document.querySelector(".popup__preview-image");
export const previewCardName = document.querySelector(".popup__preview-name");

// Form Data

export const titleInputField = editForm.querySelector(".popup__input_type_title");
export const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

export const nameInputField = createForm.querySelector(".popup__input_type_name");
export const linkInputField = createForm.querySelector(".popup__input_type_link");

export const closeWithEsc = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closePopup(popup);
  }
};

export const openPopup = (popup) => {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closeWithEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closeWithEsc);
};