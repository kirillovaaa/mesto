import likeInactive from "../images/heart-stroke.svg";
import likeActive from "../images/heart-fill.svg";

export default class Card {
  constructor(
    templateSelector, // позволяет нам собрать карточку из шаблона
    place, // вся инфа по месту: название, картинка, лайки
    userId, // позволяет нам внутри класса решить, показывать удаление или нет И показывать пользовательский лайк
    handleCardClick, // обработчик нажатия на карточку
    handleLike, // обработчик нажатия на кнопку "лайк"
    handleDelete //обработчик нажатия на кнопку удалить
  ) {
    this._templateSelector = templateSelector;
    this._place = place;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    /** Шаблон карточки */
    const cardTemplate = document.querySelector(this._templateSelector).content
      .firstElementChild;
    /** Карточка */
    const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон и сохраняем в класс
    return cardElement;
  }

  _setLikeCount(count) {
    this._likesCountElement.textContent = count;
  }

  _setLikeImage(isLiked) {
    this._likeImageElement.src = isLiked ? likeActive : likeInactive;
  }

  _handleImageClick() {
    this._handleCardClick(this._place.name, this._place.link);
  }

  _handleDeleteButtonClick() {
    this._handleDelete(this._place._id, this._remove.bind(this));
  }

  _handleFavClick() {
    this._handleLike(this._place).then((res) => {
      this._place = res;
      const isLiked = res.likes.find((like) => like._id === this._userId);
      const likesCount = res.likes.length;
      this._setLikeImage(isLiked);
      this._setLikeCount(likesCount);
    });
  }

  _remove() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    /** Слушатель нажатия на картинку */
    this._imageElement.addEventListener(
      "click",
      // В обработчике событий this по умолчанию будет изображением,
      // а не классом Card. Поэтому мы делаем bind(this), чтобы
      // в обработчике событий обратиться к сохраненным в классе
      // свойствам изображения и текста (this._imageLink и this._title
      this._handleImageClick.bind(this)
    );

    /** Слушатель нажатия на кнопку удаления */
    this._deleteButtonElement.addEventListener(
      "click",
      // В обработчике событий this по умолчанию будет кнопкой,
      // а не классом Card. Поэтому мы делаем bind(this), чтобы
      // в обработчике событий обратиться к элементу карточки
      // (this._element) и удалить его из DOM (.remove())
      this._handleDeleteButtonClick.bind(this)
    );

    /** Слушатель нажатия на кнопку "лайк" */
    this._favButtonElement.addEventListener(
      "click",
      this._handleFavClick.bind(this)
    );
  }

  generateCard() {
    /** Сохраняем карточку в класс */
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".places__image");
    this._deleteButtonElement = this._element.querySelector(
      ".places__delete-button"
    );
    this._favButtonElement = this._element.querySelector(".places__fav-button");
    this._imageElement = this._element.querySelector(".places__image");
    this._titleElement = this._element.querySelector(".places__name");
    this._likeImageElement = this._element.querySelector(".places__fav-image");
    this._likesCountElement = this._element.querySelector(".places__fav-likes");

    /** Изображение в карточке класса */
    this._imageElement.alt = this._place.name; // задаем текстовое описание картинки
    this._imageElement.src = this._place.link; // задаем источник картинки

    /** Заголовок в карточке класса */
    this._titleElement.textContent = this._place.name; // задаем название места

    /** Количество лайков */
    this._setLikeCount(this._place.likes.length);

    /** Подсветим пользовательский лайк */
    if (this._place.likes.find((like) => like._id === this._userId)) {
      this._setLikeImage(true);
    } else {
      this._setLikeImage(false);
    }

    /** Скрыть кнопку удаления карточки, если карточка другого пользователя */
    if (this._place.owner._id !== this._userId) {
      this._deleteButtonElement.remove();
    }

    /** Активируем обработчики событий */
    this._setEventListeners();

    return this._element;
  }
}
