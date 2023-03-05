import Popup from "./Popup.js";

export default class PicturePopup extends Popup {
  constructor(popupId) {
    super(popupId);
    this._image = this._element.querySelector(".popup__image");
    this._description = this._element.querySelector(
      ".popup__image-description"
    );
  }

  open(name, image) {
    super.open();
    this._image.src = image;
    this._image.alt = name;
    this._description.textContent = name;
  }
}
