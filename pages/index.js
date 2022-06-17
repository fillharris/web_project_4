
//Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImages.js";
import {
  initialCards,
  selectors,
} from "../utils/constants.js";

//Create instances of the classes
const cardSection = new Section ({
  data: items,
  renderer: (item) => {
    const card = new Card(item, selectors.cardTemplate).generateCard();
  },
 selector: selectors.cardSection
})


//Initialize all the instances
cardSection.renderItems(initialCards);


//All the rest
