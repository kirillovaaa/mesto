let popupBg = document.querySelector('.popup'); // Весь попап с фоном
let editForm = document.querySelector('.popup__form'); // Форма редактирования
let openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputProfileName = document.querySelector('.popup__input-name');
let inputProfileDescription = document.querySelector('.popup__input-description');

function openPopup() {
  popupBg.style = 'visibility: initial';
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function closePopup(e) {
  e.preventDefault();
  popupBg.style = 'visibility: hidden';
}

function closeAndSave(e) {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(e);
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', closeAndSave);
