export default class FormValidator {
  constructor(formElement, params) {
    this._element = formElement;
    this._inputList = Array.from(
      this._element.querySelectorAll(params.inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      params.submitButtonSelector
    );
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._invalidClass = params.invalidClass;
    this._errorClass = params.errorClass;
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._invalidClass);
    const fieldError = document.querySelector(`#${inputElement.id}-error`);
    fieldError.classList.add(this._errorClass);
    fieldError.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._invalidClass);
    const fieldError = document.querySelector(`#${inputElement.id}-error`);
    fieldError.classList.remove(this._errorClass);
    fieldError.textContent = "";
  }

  _isValidInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValidInput(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  /**
   * Метод, который устанавливает класс кнопки "Сохранить"
   * в зависимости от текущего состояния
   * */
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  /** Функция, которая снимает все стили ошибок со всех полей */
  clearErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
