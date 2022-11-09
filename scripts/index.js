const popupProfile = document.querySelector("#popup-profile"); // Весь попап с фоном
const popupPlace = document.querySelector("#popup-place");
const popupImage = document.querySelector("#popup-image");
const popupImageLarge = document.querySelector(".popup__image");
const popupOpenProfileButton = document.querySelector(".profile__edit-button"); // Кнопки для показа окна
const popupOpenPlaceButton = document.querySelector(".profile__add-button"); // Кнопки для показа окна
const popupCloseProfileButton = document.querySelector("#popup-profile-close"); // Кнопка для скрытия окна
const popupClosePlaceButton = document.querySelector("#popup-place-close"); // Кнопка для скрытия картинки
const popupImageDescription = document.querySelector(
  ".popup__image-description"
);

const popupImageButtonClose = document.querySelector("#popup-image-close");

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

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function addPlaceToGrid(place) {
  const card = createCard(place);
  places.prepend(card);
}

function openPopupProfile() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closeAndSaveProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
}

function closeAndSavePlace(e) {
  e.preventDefault();
  let name = placeFormAdd.elements.name.value;
  let link = placeFormAdd.elements.link.value;
  let place = { name, link };
  addPlaceToGrid(place);
  closePopup(popupPlace);
}

function handlePopupOverlayClose(popupElement) {
  popupElement.children[0].addEventListener("click", (e) => {
    e.stopPropagation();
  });
  popupElement.addEventListener("click", () => {
    closePopup(popupElement);
  });
}

handlePopupOverlayClose(popupProfile);
handlePopupOverlayClose(popupPlace);
handlePopupOverlayClose(popupImage);

popupOpenProfileButton.addEventListener("click", openPopupProfile);
popupOpenPlaceButton.addEventListener("click", function () {
  openPopup(popupPlace);
});

//закрытие попапа на Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup(popupProfile);
    closePopup(popupPlace);
    closePopup(popupImage);
  }
});

popupCloseProfileButton.addEventListener("click", function () {
  closePopup(popupProfile);
});
popupClosePlaceButton.addEventListener("click", function () {
  closePopup(popupPlace);
});
//
popupImageButtonClose.addEventListener("click", function () {
  closePopup(popupImage);
});

profileFormEdit.addEventListener("submit", closeAndSaveProfile);
placeFormAdd.addEventListener("submit", closeAndSavePlace);

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

function renderCard(place) {
  const card = createCard(place);
  places.prepend(card);
}

initialPlaces.forEach(renderCard);

function createCard(place) {
  const placeItem = document.createElement("div"); //создать элемент
  placeItem.classList.add("places__item"); //добавить в класслист (add)

  const image = document.createElement("img");
  image.classList.add("places__image");
  image.alt = place.name;
  image.src = place.link;

  const nameWrapper = document.createElement("div");
  nameWrapper.classList.add("places__name-wrapper");

  const name = document.createElement("h2");
  name.classList.add("places__name");
  name.textContent = place.name; // название места из массива

  const favButton = document.createElement("button");
  favButton.classList.add("places__fav-button");
  favButton.type = "button";
  favButton.addEventListener("click", function (event) {
    favButton.classList.toggle("places__fav-button_selected");
  });

  const deleteButton = document.createElement("button"); //кнопка урны
  const deleteIcon = document.createElement("img"); // создание иконки
  deleteIcon.src = "./images/delete.svg"; // адрес картинки
  deleteButton.type = "button"; // тип кнопки
  deleteButton.classList.add("places__delete-button"); //подключаем стиль
  deleteIcon.classList.add("places__delete-icon");

  deleteButton.addEventListener("click", function () {
    placeItem.remove();
  });

  //открытие попапа на весь экран
  image.addEventListener("click", function () {
    openPopup(popupImage);
    popupImageLarge.alt = place.name;
    popupImageLarge.src = place.link;
    popupImageDescription.textContent = place.name;
  });

  nameWrapper.append(name, favButton); // добавляем в nameWrapper name и favButton
  deleteButton.append(deleteIcon); // в кнопку удаления добавляем иконку
  placeItem.append(image, nameWrapper, deleteButton); // добавляем в placesItem image и nameWrapper
  return placeItem;
}
