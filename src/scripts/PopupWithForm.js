import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupId, onSubmit) {
    super(popupId);
    this._form = this._element.querySelector(".popup__form");
    this._inputList = Array.from(
      this._element.querySelectorAll(".popup__input")
    );
    this._onSubmit = onSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleSubmit(e) {
    e.preventDefault();
    const values = this._getInputValues();
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
