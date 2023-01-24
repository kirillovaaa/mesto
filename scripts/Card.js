import { imagePopup, openPopup } from "./index.js";

export default class Card {
  constructor(templateSelector, title, imageLink) {
    this._templateSelector = templateSelector;
    this._title = title;
    this._imageLink = imageLink;
  }

  _getTemplate() {
    /** Шаблон карточки */
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;
    /** Карточка */
    const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон и сохраняем в класс
    return cardElement;
  }

  _handleImageClick() {
    /** Картинка в попапе */
    const popupImageElement = imagePopup.querySelector(".popup__image");
    popupImageElement.alt = this._title;
    popupImageElement.src = this._imageLink;
    /** Подпись картинки в попапе */
    const popupImageDescriptionElement = imagePopup.querySelector(
      ".popup__image-description"
    );
    popupImageDescriptionElement.textContent = this._title;

    // используем импортированные сюда из index.js функцию openPopup
    // и сам попап с изображением
    openPopup(imagePopup);
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _handleFavButtonClick(e) {
    e.target.classList.toggle("places__fav-button_selected");
  }

  _setEventListeners() {
    /** Слушатель нажатия на картинку */
    const imageElement = this._element.querySelector(".places__image");
    imageElement.addEventListener(
      "click",
      // В обработчике событий this по умолчанию будет изображением,
      // а не классом Card. Поэтому мы делаем bind(this), чтобы
      // в обработчике событий обратиться к сохраненным в классе
      // свойствам изображения и текста (this._imageLink и this._title
      this._handleImageClick.bind(this)
    );

    /** Слушатель нажатия на кнопку удаления */
    const deleteButtonElement = this._element.querySelector(
      ".places__delete-button"
    );
    deleteButtonElement.addEventListener(
      "click",
      // В обработчике событий this по умолчанию будет кнопкой,
      // а не классом Card. Поэтому мы делаем bind(this), чтобы
      // в обработчике событий обратиться к элементу карточки
      // (this._element) и удалить его из DOM (.remove())
      this._handleDeleteButtonClick.bind(this)
    );

    /** Слушатель нажатия на кнопку "лайк" */
    const favButtonElement = this._element.querySelector(".places__fav-button");
    favButtonElement.addEventListener("click", this._handleFavButtonClick);
  }

  generateCard() {
    /** Сохраняем карточку в класс */
    this._element = this._getTemplate();
    /** Активируем обработчики событий */
    this._setEventListeners();

    /** Изображение в карточке класса */
    const imageElement = this._element.querySelector(".places__image");
    imageElement.alt = this._title; // задаем текстовое описание картинки
    imageElement.src = this._imageLink; // задаем источник картинки

    /** Заголовок в карточке класса */
    const titleElement = this._element.querySelector(".places__name");
    titleElement.textContent = this._title; // задаем название места

    return this._element;
  }
}
