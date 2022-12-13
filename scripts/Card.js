import { imagePopup } from "./Popup.js";

export default class Card {
  constructor(title, imageLink) {
    this._title = title;
    this._imageLink = imageLink;
  }

  _createCard() {
    this._element = document.createElement("div"); // создать элемент карточки места
    this._element.classList.add("places__item"); // применяем к этому элементу стиль

    const image = document.createElement("img"); // создать элемент изображения
    image.classList.add("places__image"); // применить к нему стиль
    image.alt = this._title; // задать текстовое описание картинки
    image.src = this._imageLink; // задать источник картинки

    const nameWrapper = document.createElement("div"); // создать обёртку для названия места
    nameWrapper.classList.add("places__name-wrapper"); // применяем к обёртке стиль

    const name = document.createElement("h2"); // создаем элемент заголовка этого места
    name.classList.add("places__name"); // применяем к нему стиль
    name.textContent = this._title; // название места из массива

    const favButton = document.createElement("button"); // создаем кнопку-сердечко
    favButton.classList.add("places__fav-button"); // применяем стиль
    favButton.type = "button"; // задаем ей тип

    const deleteButton = document.createElement("button"); //кнопка урны
    const deleteIcon = document.createElement("img"); // создание иконки
    deleteIcon.src = "./images/delete.svg"; // адрес картинки
    deleteButton.type = "button"; // тип кнопки
    deleteButton.classList.add("places__delete-button"); //подключаем стиль
    deleteIcon.classList.add("places__delete-icon");

    nameWrapper.append(name, favButton); // добавляем в nameWrapper name и favButton
    deleteButton.append(deleteIcon); // в кнопку удаления добавляем иконку
    this._element.append(image, nameWrapper, deleteButton); // добавляем в placesItem image и nameWrapper
  }

  _handleImageClick() {
    const imageElement = this._element.querySelector(".places__image");
    imageElement.addEventListener("click", (e) => {
      imagePopup.open();
      const popupImageElement = document.querySelector(".popup__image");
      const popupImageDescriptionElement = document.querySelector(
        ".popup__image-description"
      );
      popupImageElement.alt = this._title;
      popupImageElement.src = this._imageLink;
      popupImageDescriptionElement.textContent = this._title;
    });
  }

  _handleFavButtonClick() {
    const favButtonElement = this._element.querySelector(".places__fav-button");
    favButtonElement.addEventListener("click", () => {
      favButtonElement.classList.toggle("places__fav-button_selected");
    });
  }

  _handleDeleteButtonClick() {
    const deleteButtonElement = this._element.querySelector(
      ".places__delete-button"
    );
    deleteButtonElement.addEventListener("click", () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._createCard();
    this._handleImageClick();
    this._handleFavButtonClick();
    this._handleDeleteButtonClick();

    return this._element;
  }
}
