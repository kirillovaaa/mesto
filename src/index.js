import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithConfirmation from "./scripts/PopupWithConfirmation.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";
import "./pages/index.css";

/** Структура данных пользователя */
const user = new UserInfo(
  ".profile__avatar",
  ".profile__name",
  ".profile__description"
);

const gridSection = new Section({ renderer: renderCard }, ".places");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "7cc35801-29be-4380-959c-1a6e60ca73ce",
    "Content-Type": "application/json",
  },
});

// Попапы

const popupDelete = new PopupWithConfirmation(
  "#popup-delete",
  handleDeleteSubmit
);
popupDelete.setEventListeners();

const popupProfile = new PopupWithForm("#popup-profile", handleProfileSubmit);
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm("#popup-place", handlePlaceSubmit);
popupPlace.setEventListeners();

const popupAvatar = new PopupWithForm("#popup-avatar", handleAvatarSubmit);
popupAvatar.setEventListeners();

const popupImage = new PopupWithImage("#popup-image");
popupImage.setEventListeners();

/** Форма профиля */
const formProfile = document.forms.profile;
const fieldProfileName = formProfile.elements.name;
const fieldProfileDescription = formProfile.elements.about;
const buttonOpenProfileForm = document.querySelector(".profile__edit-button");

/** Форма нового места */
const formPlace = document.forms.place;

/** Кнопка открытия формы новой карточки */
const buttonOpenPlacePopup = document.querySelector(".profile__add-button");

/** Кнопка открытия формы аватара */
const buttonOpenAvatarPopup = document.querySelector(".profile__avatar-edit");

/** Форма аватара */
const formAvatar = document.forms.avatar;

// Валидаторы
const selectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
  invalidClass: "popup__input_invalid",
};
const formValidatorProfile = new FormValidator(formProfile, selectors);
const formValidatorPlace = new FormValidator(formPlace, selectors);
const formValidatorAvatar = new FormValidator(formAvatar, selectors);

// Активация валидаторов форм
formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();

//
//
// Сетка карточек
//

/** Функция, которую передаем в карточку при инициализации */
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleCardLike(card) {
  const { _id } = card.getPlace();
  const method = card.checkUserLike() ? api.removeLike : api.addLike;
  method(_id)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => console.log(err));
}

function handleCardDelete(card) {
  popupDelete.open(card);
}

function handleDeleteSubmit(card) {
  const { _id } = card.getPlace();
  popupDelete.setButtonText("Удаление...");
  api
    .removeCard(_id)
    .then(() => {
      card.remove();
      popupDelete.setButtonText("Да");
    })
    .catch((err) => console.log(err));
}

/** Функция создания карточки */
function renderCard(place) {
  return new Card(
    "#place-card-template",
    place,
    user._id,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  ).generateCard();
}

Promise.all([api.getMe(), api.getInitialCards()])
  .then(([me, cards]) => {
    user.initializeUser(me._id, me.avatar, me.name, me.about);
    gridSection.renderElements(cards);
  })
  .catch((err) => console.log(err));

//
//
// Аватар
//

function handleOpenAvatarPopup() {
  formValidatorAvatar.clearErrors();
  formValidatorAvatar.toggleButtonState();
  popupAvatar.open();
}

/** Обработчик отправки формы редактирования профиля */
function handleAvatarSubmit(values) {
  popupAvatar.setButtonText("Сохранение...");
  api
    .updateAvatar(values.link)
    .then((res) => {
      user.setAvatar(res.avatar);
      popupAvatar.setButtonText("Сохранить");
    })
    .catch((err) => console.log(err));
}

/** Слушатель нажатия на кнопку открытия формы аватара */
buttonOpenAvatarPopup.addEventListener("click", handleOpenAvatarPopup);

//
//
// Профиль
//

/** Обработчик нажатия на кнопку редактирования профиля */
function openProfilePopup() {
  const { name, about } = user.getUserInfo();
  fieldProfileName.value = name;
  fieldProfileDescription.value = about;
  formValidatorProfile.toggleButtonState();
  popupProfile.open();
}

/** Обработчик отправки формы редактирования профиля */
function handleProfileSubmit(values) {
  popupProfile.setButtonText("Сохранение...");
  api
    .updateProfile(values.name, values.about)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
      popupProfile.setButtonText("Сохранить");
    })
    .catch((err) => console.log(err));
}

/** Слушатель нажатия на кнопку редактирования профиля */
buttonOpenProfileForm.addEventListener("click", openProfilePopup);

//
//
// Новое место
//

/** Обработчик открытия формы нового места */
function handleOpenPlacePopupButton() {
  formValidatorPlace.clearErrors();
  formValidatorPlace.toggleButtonState();
  popupPlace.open();
}

/** Обработчик отправки формы нового места */
function handlePlaceSubmit(values) {
  popupPlace.setButtonText("Сохранение...");
  api
    .addCard(values.name, values.link)
    .then((res) => {
      gridSection.addItem(renderCard(res));
      popupPlace.setButtonText("Сохранить");
    })
    .catch((err) => console.log(err));
}

/** Слушатель */
buttonOpenPlacePopup.addEventListener("click", handleOpenPlacePopupButton);
