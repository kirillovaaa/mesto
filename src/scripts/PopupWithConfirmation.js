import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popupId, onSubmit) {
    super(popupId, onSubmit);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._onSubmit(this._card);
    this.close();
  }

  open(card) {
    super.open();
    this._card = card;
  }
}
