export default class Popup {
  constructor(popupId) {
    this._element = document.querySelector(popupId);
    this.setEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    const buttonElement = this._element.querySelector(".popup__close-button");
    buttonElement.addEventListener("click", () => {
      this.close();
    });
  }

  _handleBackgroundClick() {
    this._element.children[0].addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this._element.addEventListener("click", () => {
      this.close();
    });
  }

  setEventListeners() {
    this._handleCloseButtonClick();
    this._handleBackgroundClick();
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
