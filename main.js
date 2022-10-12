let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputProfileName = document.querySelector('.popup__input-name');
let inputProfileDescription = document.querySelector('.popup__input-description');

let popupOpen = false;

function openPopup() {
  popupBg.style = 'visibility: initial';
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}
function closePopup() {
  popupBg.style = 'visibility: hidden';
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

