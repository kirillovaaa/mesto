const showInputError = (element, message, params) => {
  // элемент ошибки поля
  const fieldError = document.querySelector(`#${element.id}-error`);
  fieldError.classList.add(params.errorClass);
  fieldError.textContent = message;
};

const hideInputError = (element, params) => {
  // элемент ошибки поля
  const fieldError = document.querySelector(`#${element.id}-error`);
  fieldError.classList.remove(params.errorClass);
  fieldError.textContent = "";
};

function isValidInput(element, params) {
  if (!element.validity.valid) {
    showInputError(element, element.validationMessage, params); // передаем браузерное сообщение об ошибке
  } else {
    hideInputError(element, params);
  }
}

//принимаем массив полей и определяем валидность формы
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, params) => {
  if (hasInvalidInput(inputList)) {
    // сделать кнопку неактивной
    buttonElement.classList.add(params.inactiveButtonClass);
  } else {
    // сделать кнопку активной
    buttonElement.classList.remove(params.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValidInput(inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });

  // убираем браузерное окошко с ошибкой
  formElement.addEventListener("invalid", (e) => e.preventDefault(), true);
};

function enableValidation(params) {
  document.querySelectorAll(params.formSelector).forEach((form) => {
    setEventListeners(form, params);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  errorClass: "popup__input-error_active",
});
