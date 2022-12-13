export default class FormValidator {
  constructor(params) {
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._errorClass = params.errorClass;
    this._element = document.querySelector(params.formSelector); // сама форма
  }

  _showInputError(inputElement) {
    const fieldError = document.querySelector(`#${inputElement.id}-error`);
    fieldError.classList.add(this._errorClass);
    fieldError.textContent = inputElement.message;
  }

  _hideInputError(inputElement) {
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._element.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValidInput(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._element.addEventListener("invalid", (e) => e.preventDefault(), true);
  }

  enableValidation(params) {
    this._setEventListeners();
  }
}
