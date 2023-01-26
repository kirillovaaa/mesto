import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//
//
// Валидаторы форм
//

/** Валидатор формы профиля */
const profileFormValidator = new FormValidator({
  formSelector: "#form-profile", // id формы
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
  invalidClass: "popup__input_invalid",
});
/** Валидатор формы места */
const placeFormValidator = new FormValidator({
  formSelector: "#form-place", // id формы
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
  invalidClass: "popup__input_invalid",
});
// Активация валидаторов форм
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

//
//
// Попапы
//

/** Попап с формой редактирования профиля */
const profilePopup = document.querySelector("#popup-profile");
/** Попап с формой добавления места */
const placePopup = document.querySelector("#popup-place");
/** Попап с картинкой */
export const imagePopup = document.querySelector("#popup-image");

/** Обработчик нажатия на кнопку Esc */
function handlePressEsc(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
/** Функция открытия попапа */
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handlePressEsc);
}
/** Функция закрытия попапа */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePressEsc);
}
/** Функция обработчика нажатия на фон попапа */
function handlePopupOverlayClose(popupElement) {
  popupElement.children[0].addEventListener("click", (e) => {
    e.stopPropagation();
  });
  popupElement.addEventListener("click", () => {
    closePopup(popupElement);
  });
}
// активация слушателей нажатия на фон попапов
handlePopupOverlayClose(profilePopup);
handlePopupOverlayClose(placePopup);
handlePopupOverlayClose(imagePopup);

/** Функция обработчика нажатия на кнопку "закрыть попап" */
function handleClosePopupButtonClick(popupElement) {
  closePopup(popupElement);
}
// активация слушателей нажатия на закрытие попапов
profilePopup
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    handleClosePopupButtonClick(profilePopup);
  });
placePopup
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    handleClosePopupButtonClick(placePopup);
  });
imagePopup
  .querySelector(".popup__close-button")
  .addEventListener("click", () => {
    handleClosePopupButtonClick(imagePopup);
  });

//
//
// Профиль
//

/** Кнопка открытия формы профиля */
const openProfileFormButton = document.querySelector(".profile__edit-button");

/** Имя профиля */
const profileNameLabel = document.querySelector(".profile__name");
/** Описание профиля */
const profileDescriptionLabel = document.querySelector(".profile__description");

/** Форма профиля */
const profileForm = document.forms.profile;
/** Поле ввода имени профиля */
const profileNameField = profileForm.elements.name;
/** Поле ввода описания профиля */
const profileDescriptionField = profileForm.elements.description;

/** Обработчик нажатия на кнопку редактирования профиля */
function openProfilePopup() {
  profileFormValidator.clearErrors();
  profileNameField.value = profileNameLabel.textContent;
  profileDescriptionField.value = profileDescriptionLabel.textContent;
  profileFormValidator.toggleButtonState();
  openPopup(profilePopup);
}

/** Обработчик отправки формы редактирования профиля */
function closeAndSaveProfile(e) {
  e.preventDefault();
  profileNameLabel.textContent = profileNameField.value;
  profileDescriptionLabel.textContent = profileDescriptionField.value;
  closePopup(profilePopup);
}

/** Слушатель нажатия на кнопку редактирования профиля */
openProfileFormButton.addEventListener("click", openProfilePopup);
/** Слушатель отправки формы редактирования профиля */
profileForm.addEventListener("submit", closeAndSaveProfile);

//
//
// Новое место
//

/** Кнопка открытия формы новой карточки */
const openPlacePopupButton = document.querySelector(".profile__add-button");

/** Форма нового места */
const placeForm = document.forms.place;

/** Обработчик открытия формы нового места */
function handleOpenPlacePopupButton() {
  placeForm.reset();
  placeFormValidator.clearErrors();
  placeFormValidator.toggleButtonState();
  openPopup(placePopup);
}

/** Обработчик отправки формы нового места */
function handlePlaceSubmit(e) {
  e.preventDefault();
  const name = placeForm.elements.name.value;
  const link = placeForm.elements.link.value;
  renderCard({ name, link });
  closePopup(placePopup);
}

/** Слушатель */
openPlacePopupButton.addEventListener("click", handleOpenPlacePopupButton);
/** Слушатель отправки формы места */
placeForm.addEventListener("submit", handlePlaceSubmit);

//
//
// Сетка карточек
//

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

/** Элемент сетки с карточками мест */
const places = document.querySelector(".places");

/** Функция отрисовки карточки */
function renderCard(place) {
  const card = new Card("#place-card-template", place.name, place.link);
  // добавляем карточку в начало сетки
  places.prepend(card.generateCard());
}

// делаем изначальную загрузку мест
initialPlaces.forEach(renderCard);
