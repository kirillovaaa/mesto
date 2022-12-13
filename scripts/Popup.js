class Popup {
  constructor(popupId) {
    this._element = document.querySelector(popupId);
    this._handleBackgroundClick();
    this._handleCloseButtonClick();
  }

  _handleBackgroundClick() {
    this._element.children[0].addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this._element.addEventListener("click", () => {
      this.close();
    });
  }

  _handleKeyDown(e) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    const buttonElement = this._element.querySelector(".popup__close-button");
    buttonElement.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleKeyDown);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleKeyDown);
  }
}

export const imagePopup = new Popup("#popup-image");
export const placePopup = new Popup("#popup-place");
export const profilePopup = new Popup("#popup-profile");
