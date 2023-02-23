import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupId, onSubmit) {
    super(popupId);
    this._form = this._element.querySelector(".popup__form");
    this._onSubmit = onSubmit;
  }

  _getInputValues(e) {
    return [e.target[0].value, e.target[1].value];
  }

  _handleSubmit(e) {
    e.preventDefault();
    const values = this._getInputValues(e);
    this._onSubmit(values);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }
}
