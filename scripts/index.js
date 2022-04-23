// 1. Get all relevant elements from DOM

const popupWindow = document.querySelector('.popup');
const editForm = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const nameInputField = document.querySelector('.popup__input_type_name');
const titleInputField = document.querySelector('.popup__input_type_description');

//2. Write functions to toggle popup visibility and submit button

function toggleModalVisibility() {
if (!popupWindow.classList.contains('popup__is_opened')) {
    nameInputField.value = profileName.textContent;
    titleInputField.value = profileTitle.textContent;
}    
    popupWindow.classList.toggle('popup__is_opened');

}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputField.value;
    profileTitle.textContent = titleInputField.value;

    toggleModalVisibility();
}

//3. Wiring the functions from step 2, to appropriate elements from step 1

editForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', toggleModalVisibility);
closeButton.addEventListener('click', toggleModalVisibility);
