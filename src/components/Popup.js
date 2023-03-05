export default class Popup {
  constructor(popupId) {
    this._element = document.querySelector(popupId);
    this._closeButton = this._element.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleClose() {
    this.close();
  }

  _handleFormClick(e) {
    e.stopPropagation();
  }

  setEventListeners() {
    this._element.children[0].addEventListener(
      "click",
      this._handleFormClick.bind(this)
    );
    this._element.addEventListener("click", this._handleClose.bind(this));
    this._closeButton.addEventListener("click", this._handleClose.bind(this));
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
