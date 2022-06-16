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