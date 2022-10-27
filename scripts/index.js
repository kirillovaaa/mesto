let popupProfile = document.querySelector("#popup-profile"); // Весь попап с фоном
let popupPlace = document.querySelector("#popup-place");
let popupImage = document.querySelector("#popup-image");
let popupImageLarge = document.querySelector(".popup__image");
let openPopupProfileButton = document.querySelector(".profile__edit-button"); // Кнопки для показа окна
let openPopupPlaceButton = document.querySelector(".profile__add-button"); // Кнопки для показа окна
let closePopupProfileButton = document.querySelector("#popup-profile-close"); // Кнопка для скрытия окна
let closePopupPlaceButton = document.querySelector("#popup-place-close"); // Кнопка для скрытия картинки
let popupImageDescription = document.querySelector(".popup__image-description"); // Информация
//
let closePopupImageButton = document.querySelector("#popup-image-close");

let places = document.querySelector(".places");

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

let editProfileForm = document.forms.profile;
let inputName = editProfileForm.elements.name;
let inputDescription = editProfileForm.elements.description;

let addPlaceForm = document.forms.place;

function openPopupProfile() {
  popupProfile.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}

function openPopupPlace() {
  popupPlace.classList.add("popup_opened");
}

function closePopupPlace() {
  popupPlace.classList.remove("popup_opened");
}
// new
function closePopupImage() {
  popupImage.classList.remove("popup_opened");
}

function closeAndSaveProfile(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopupProfile();
}

function closeAndSavePlace(e) {
  e.preventDefault();
  let name = addPlaceForm.elements.name.value;
  let link = addPlaceForm.elements.link.value;
  let place = { name, link };
  addPlaceToGrid(place);
  closePopupPlace();
}

openPopupProfileButton.addEventListener("click", openPopupProfile);
openPopupPlaceButton.addEventListener("click", openPopupPlace);

closePopupProfileButton.addEventListener("click", closePopupProfile);
closePopupPlaceButton.addEventListener("click", closePopupPlace);
//
closePopupImageButton.addEventListener("click", closePopupImage);

editProfileForm.addEventListener("submit", closeAndSaveProfile);
addPlaceForm.addEventListener("submit", closeAndSavePlace);

const initialPlaces = [
  // {
  //   name: "Архыз",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  // },
  // {
  //   name: "Челябинская область",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  // },
  // {
  //   name: "Иваново",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  // },
  // {
  //   name: "Камчатка",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  // },
  // {
  //   name: "Холмогорский район",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  // },
  // {
  //   name: "Байкал",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  // },
];

function addPlaceToGrid(place) {
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
  deleteButton.append(deleteIcon); // в кнопку удаления добавляем иконку
  deleteIcon.src = "../images/delete.svg"; // адрес картинки
  deleteButton.type = "button"; // тип кнопки
  deleteButton.classList.add("places__delete-button"); //подключаем стиль
  deleteIcon.classList.add("places__delete-icon");

  deleteButton.addEventListener("click", function () {
    placeItem.remove();
  });

  //открытие попапа на весь экран
  image.addEventListener("click", function () {
    popupImage.classList.add("popup_opened");
    popupImageLarge.src = place.link;
    popupImageDescription.textContent = place.name;
  });

  nameWrapper.append(name, favButton); // добавляем в nameWrapper name и favButton
  placeItem.append(image, nameWrapper, deleteButton); // добавляем в placesItem image и nameWrapper
  places.prepend(placeItem); //добавляем в places placeItem
}

initialPlaces.forEach(addPlaceToGrid);
