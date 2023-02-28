import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

/** Места, которые будут загружаться изначально */
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

/** Структура данных пользователя */
const user = new UserInfo(".profile__name", ".profile__description");

/** Элемент сетки с карточками мест */
const gridSection = new Section(
  { items: initialPlaces, renderer: renderCard },
  ".places"
);

// Попапы

// const deletePopup = new PopupDeleteForm("#popup-delete",  onDeleteSubmit);
// deletePopup.setEventListeners();

const profilePopup = new PopupWithForm("#popup-profile", onProfileSubmit);
profilePopup.setEventListeners();

const placePopup = new PopupWithForm("#popup-place", onPlaceSubmit);
placePopup.setEventListeners();

const imagePopup = new PopupWithImage("#popup-image");
imagePopup.setEventListeners();

/** Форма профиля */
const profileForm = document.forms.profile;
const profileNameField = profileForm.elements.name;
const profileDescriptionField = profileForm.elements.description;
const openProfileFormButton = document.querySelector(".profile__edit-button");

/** Форма нового места */
const placeForm = document.forms.place;

/** Кнопка открытия формы новой карточки */
const openPlacePopupButton = document.querySelector(".profile__add-button");

// !NEW!
// Кнопка открытия формы удаления
// const openDeletePopupButton = document.querySelector(".places__delete-button");

// Валидаторы
const selectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
  invalidClass: "popup__input_invalid",
};
const profileFormValidator = new FormValidator(profileForm, selectors);
const placeFormValidator = new FormValidator(placeForm, selectors);

// Активация валидаторов форм
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

//
//
// Профиль
//

/** Обработчик нажатия на кнопку редактирования профиля */
function openProfilePopup() {
  const { name, description } = user.getUserInfo();
  profileNameField.value = name;
  profileDescriptionField.value = description;
  profileFormValidator.toggleButtonState();
  profilePopup.open();
}

/** Обработчик отправки формы редактирования профиля */
function onProfileSubmit(values) {
  user.setUserInfo(values.name, values.description);
}

/** Слушатель нажатия на кнопку редактирования профиля */
openProfileFormButton.addEventListener("click", openProfilePopup);

//
//
// Новое место
//

/** Обработчик открытия формы нового места */
function handleOpenPlacePopupButton() {
  placeFormValidator.clearErrors();
  placeFormValidator.toggleButtonState();
  placePopup.open();
}

/** Обработчик отправки формы нового места */
function onPlaceSubmit(values) {
  const name = values.name;
  const link = values.link;
  gridSection.addItem(renderCard({ name, link }));
  placePopup.close();
}

// // Обработчик открытия формы удаления карточки
// function handleOpenDeleteCardButton() {
// }

// // Обработчик отправки формы удаления карточки
// function onDeleteSubmit() {
// }

/** Слушатель */
openPlacePopupButton.addEventListener("click", handleOpenPlacePopupButton);

// openDeletePopupButton.addEventListener("click", handleOpenDeleteCardButton);

//
//
// Попап с картинкой
//

/** Функция, которую передаем в карточку при инициализации */
function onCardClick(name, link) {
  imagePopup.open(name, link);
}

//
//
// Сетка карточек
//

/** Функция создания карточки */
function renderCard(place) {
  return new Card(
    "#place-card-template",
    place.name,
    place.link,
    onCardClick
  ).generateCard();
}

// делаем изначальную загрузку мест
gridSection.renderElements();
