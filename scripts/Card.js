import { imagePopup } from "./Popup.js";

export default class Card {
  constructor(templateSelector, title, imageLink) {
    this._templateSelector = templateSelector;
    this._title = title;
    this._imageLink = imageLink;
  }

  _createCard() {
    /** Шаблон карточки */
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;

    /** Карточка */
    this._element = cardTemplate.cloneNode(true); // клонируем шаблон и сохраняем в класс

    /** Изображение в карточке класса */
    const imageElement = this._element.querySelector(".places__image");
    imageElement.alt = this._title; // задаем текстовое описание картинки
    imageElement.src = this._imageLink; // задаем источник картинки

    /** Заголовок в карточке класса */
    const titleElement = this._element.querySelector(".places__name");
    titleElement.textContent = this._title; // задаем название места
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
