let popupBg = document.querySelector('.popup'); // Весь попап с фоном
let openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let editForm = document.forms.profile;
let inputName = editForm.elements.name;
let inputDescription = editForm.elements.description;


function openPopup() {
  popupBg.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closePopup() {
  popupBg.classList.remove('popup_opened');
}

function closeAndSave(e) {
  profileName.textContent = inputName.value;
  e.preventDefault();
  profileDescription.textContent = inputDescription.value;
  closePopup();
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', closeAndSave);

