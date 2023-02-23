export default class Popup {
  constructor(popupId) {
    this._element = document.querySelector(popupId);
    this._closeButton = this._element.querySelector(".popup__close-button");
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
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  open() {
    this._element.classList.add("popup_opened");
  }

  close() {
    this._element.classList.remove("popup_opened");
  }
}
