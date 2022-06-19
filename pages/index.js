
//Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  selectors,
} from "../utils/constants.js";

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
