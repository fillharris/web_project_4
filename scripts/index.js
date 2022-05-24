
const initialCards = [
  {
    name: "Sassafras Mountain",
    link: "https://images.unsplash.com/photo-1598559069352-3d8437b0d42c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Angel Tree",
    link: "https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80",
  },
  {
    name: "Myrtle Beach",
    link: "https://images.unsplash.com/photo-1617858797175-b7dba3c5c8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG15cnRsZSUyMGJlYWNoJTIwc291dGglMjBjYXJvbGluYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
  },
  {
    name: "Edisto Beach",
    link: "https://images.unsplash.com/photo-1546188994-fea0ecbb04a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Table Rock Mountain",
    link: "https://images.unsplash.com/photo-1617912689430-28d6624fe467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60",
  },
  {
    name: "Congaree National Park",
    link: "https://images.unsplash.com/photo-1615653051968-69c2b0e43347?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers

const photoGridWrap = document.querySelector(".photo-grid__cards");
const editPopupWindow = document.querySelector(".edit-popup");
const createPopupWindow = document.querySelector(".create-popup");
const editForm = document.querySelector(".popup__edit-container");
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
const previewImagePopup = document.querySelector(".preview-popup");
const previewCardImage = document.querySelector(".popup__preview-image");
const previewCardName = document.querySelector(".popup__preview-name");

// Form Data

const titleInputField = editForm.querySelector(".popup__input_type_title");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

const nameInputField = createForm.querySelector(".popup__input_type_name");
const linkInputField = createForm.querySelector(".popup__input_type_link");

function closeWithEsc(evt) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popups);
    }
}); 
}

function openPopup(popup) {
      popup.classList.add("popup_open");
      document.addEventListener("keydown", closeWithEsc);
    }

function closePopup(popup) {
      popup.classList.remove(
        "popup_open"
      );
      document.removeEventListener("keydown", closeWithEsc);
    }

function handleEditFormSubmit(evt) {
      evt.preventDefault();
      profileTitle.textContent = titleInputField.value;
      profileDescription.textContent = descriptionInputField.value;

      closePopup(editPopupWindow);
    }

function handleCreateFormSubmit(evt) {
      evt.preventDefault();

      renderCard(
        {
          name: nameInputField.value,
          link: linkInputField.value,
        },
        photoGridWrap
      );

      closePopup(createPopupWindow);
      createForm.reset();
      const saveButton = createForm.querySelector(".popup__save-button");
      toggleButtonState(inactiveButtonClass, settings);
    }

editForm.addEventListener("submit", handleEditFormSubmit);
  createForm.addEventListener("submit", handleCreateFormSubmit);
  editButton.addEventListener("click", () => {
    titleInputField.value = profileTitle.textContent;
    descriptionInputField.value = profileDescription.textContent;

    openPopup(editPopupWindow);
  });
  addButton.addEventListener("click", () => {
    openPopup(createPopupWindow);
  });

  const closeButtons = document.querySelectorAll(".popup__close-button");

  closeButtons.forEach((button) => {
    // find the closest popup
    const popup = button.closest(".popup");
    // set the listener
    // button.addEventListener("click", () => closePopup(popup));
  });

  const createCardElement = (data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    const imagePreview = cardElement.querySelector(".card__image");
    const imagePreviewTitle = cardElement.querySelector(".card__title");

    //imagePreview.src = data.link;
    imagePreviewTitle.textContent = data.name;

    cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url('${data.link}')`;
    cardElement.querySelector(".card__title").textContent = data.name;

    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__active-button");
      });

    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    imagePreview.addEventListener("click", function () {
      previewCardImage.src = data.link;
      previewCardImage.alt = `'Photo of ${data.name}'`;
      previewCardName.textContent = data.name;
      openPopup(previewImagePopup);
    });

    return cardElement;
  };

  const renderCard = (data, wrapper) => {
    const newCard = createCardElement(data);

    wrapper.prepend(newCard);
  };

  initialCards.forEach((data) => {
    renderCard(data, photoGridWrap);
  });

  //Close popup by clicking outside

  const popups = Array.from(document.querySelectorAll(".popup"));
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {

      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        closePopup(popup);
      }
    });

    // document.addEventListener("keydown", (evt) => {
    //   if (evt.key === "Escape") {
    //     closePopup(popup);
    //   }
    // });
  });

