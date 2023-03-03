import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";
import "./pages/index.css";

/** Структура данных пользователя */
const user = new UserInfo(
  ".profile__avatar",
  ".profile__name",
  ".profile__description"
);

let gridSection = null;

let deleteCardId = null;
let removeCard = null;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "7cc35801-29be-4380-959c-1a6e60ca73ce",
    "Content-Type": "application/json",
  },
});

// Попапы

const deletePopup = new PopupWithForm("#popup-delete", onDeleteSubmit);
deletePopup.setEventListeners();

const profilePopup = new PopupWithForm("#popup-profile", onProfileSubmit);
profilePopup.setEventListeners();

const placePopup = new PopupWithForm("#popup-place", onPlaceSubmit);
placePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#popup-avatar", onAvatarSubmit);
avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage("#popup-image");
imagePopup.setEventListeners();

/** Форма профиля */
const profileForm = document.forms.profile;
const profileNameField = profileForm.elements.name;
const profileDescriptionField = profileForm.elements.about;
const openProfileFormButton = document.querySelector(".profile__edit-button");

/** Форма нового места */
const placeForm = document.forms.place;

/** Кнопка открытия формы новой карточки */
const openPlacePopupButton = document.querySelector(".profile__add-button");

/** Кнопка открытия формы аватара */
const openAvatarPopupButton = document.querySelector(".profile__avatar-edit");

/** Форма аватара */
const avatarForm = document.forms.avatar;

/** Форма удаления карточки */
const deleteCardForm = document.forms.delete;

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
const avatarFormValidator = new FormValidator(avatarForm, selectors);
const deleteCardFormValidator = new FormValidator(deleteCardForm, selectors);

// Активация валидаторов форм
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// предзагрузка пользователя
api.getMe().then((res) => {
  /** Сохранить данные пользователя */
  user.initializeUser(res._id, res.avatar, res.name, res.about);
});

//
//
// Сетка карточек
//

/** Функция, которую передаем в карточку при инициализации */
function onCardClick(name, link) {
  imagePopup.open(name, link);
}

function onCardLike(place) {
  const method = place.likes.find((like) => like._id === user._id)
    ? api.removeLike
    : api.addLike;

  return method(place._id);
}

function onCardDelete(cardId, remove) {
  deleteCardId = cardId;
  removeCard = remove;
  deletePopup.open();
}

function onDeleteSubmit() {
  deleteCardFormValidator.setButtonText("Удаление...");
  api.removeCard(deleteCardId).then(() => {
    removeCard();
    deleteCardFormValidator.setButtonText("Да");
  });
}

/** Функция создания карточки */
function renderCard(place) {
  return new Card(
    "#place-card-template",
    place,
    user._id,
    onCardClick,
    onCardLike,
    onCardDelete
  ).generateCard();
}

/** Места, которые будут загружаться изначально */
api.getInitialCards().then((result) => {
  /** Элемент сетки с карточками мест */
  gridSection = new Section({ items: result, renderer: renderCard }, ".places");
  gridSection.renderElements();
});

//
//
// Аватар
//

function handleOpenAvatarPopup() {
  avatarFormValidator.clearErrors();
  avatarFormValidator.toggleButtonState();
  avatarPopup.open();
}

/** Обработчик отправки формы редактирования профиля */
function onAvatarSubmit(values) {
  avatarFormValidator.setButtonText("Сохранение...");
  api.updateAvatar(values.link).then((res) => {
    user.setAvatar(res.avatar);
    avatarFormValidator.setButtonText("Сохранить");
  });
}

/** Слушатель нажатия на кнопку открытия формы аватара */
openAvatarPopupButton.addEventListener("click", handleOpenAvatarPopup);

//
//
// Профиль
//

/** Обработчик нажатия на кнопку редактирования профиля */
function openProfilePopup() {
  const { name, about } = user.getUserInfo();
  profileNameField.value = name;
  profileDescriptionField.value = about;
  profileFormValidator.toggleButtonState();
  profilePopup.open();
}

/** Обработчик отправки формы редактирования профиля */
function onProfileSubmit(values) {
  profileFormValidator.setButtonText("Сохранение...");
  api.updateProfile(values.name, values.about).then((res) => {
    user.setUserInfo(res.name, res.about);
    profileFormValidator.setButtonText("Сохранить");
  });
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
  placeFormValidator.setButtonText("Сохранение...");
  api.addCard(values.name, values.link).then((res) => {
    gridSection.addItem(renderCard(res));
    placeFormValidator.setButtonText("Сохранить");
  });
}

/** Слушатель */
openPlacePopupButton.addEventListener("click", handleOpenPlacePopupButton);
