import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupId, onSubmit) {
    super(popupId);
    this._onSubmit = onSubmit;
    this._form = this._element.querySelector(".popup__form");
  }

  _getInputValues() {
    // собирает данные всех полей формы
  }

  setEventListeners() {
    super.setEventListeners();
    // должен не только добавлять обработчик клика иконке закрытия,
    // но и добавлять обработчик сабмита формы
  }

  close() {
    super.close();
    // при закрытии попапа форма должна ещё и сбрасываться
  }
}
