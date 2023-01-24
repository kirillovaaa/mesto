import Card from "./Card.js";
import { placePopup, profilePopup } from "./Popup.js";
import FormValidator from "./FormValidator.js";

const profileFormValidator = new FormValidator({
  formSelector: "#form-profile", // id формы
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
});
const placeFormValidator = new FormValidator({
  formSelector: "#form-place", // id формы
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
});

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

const initialPlaces = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupOpenProfileButton = document.querySelector(".profile__edit-button"); // Кнопки для показа окна
const popupOpenPlaceButton = document.querySelector(".profile__add-button"); // Кнопки для показа окна

const places = document.querySelector(".places");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//форма профиля
const profileFormEdit = document.forms.profile;
//поля формы профиля
const inputName = profileFormEdit.elements.name;
const inputDescription = profileFormEdit.elements.description;

// форма добавления места
const placeFormAdd = document.forms.place;
// поля формы добавления места
const placeNameField = placeFormAdd.elements.name;
const placeLinkField = placeFormAdd.elements.link;

function openPopupProfile() {
  profilePopup.open();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closeAndSaveProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  profilePopup.close();
}

function closeAndSavePlace(e) {
  e.preventDefault();
  let name = placeFormAdd.elements.name.value;
  let link = placeFormAdd.elements.link.value;
  let place = { name, link };
  renderCard(place);
  placePopup.close();
}

popupOpenProfileButton.addEventListener("click", openPopupProfile);
popupOpenPlaceButton.addEventListener("click", function () {
  placeNameField.value = "";
  placeLinkField.value = "";
  const popupPlace = document.querySelector("#popup-place");
  const saveButton = popupPlace.querySelector(".popup__save-button");
  saveButton.classList.add("popup__save-button_inactive");
  saveButton.disabled = true;
  placePopup.open();
});

profileFormEdit.addEventListener("submit", closeAndSaveProfile);
placeFormAdd.addEventListener("submit", closeAndSavePlace);

function renderCard(place) {
  const card = new Card("#place-card-template", place.name, place.link);
  places.prepend(card.generateCard());
}

initialPlaces.forEach(renderCard);
