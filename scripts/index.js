let popupBg = document.querySelector('.popup'); // Весь попап с фоном
let editForm = document.forms.profile; // Форма редактирования
let openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup() {
  popupBg.classList.add('popup_opened');
  editForm.elements.name.value = profileName.textContent;
  editForm.elements.description.value = profileDescription.textContent;
}

function closePopup() {
  popupBg.classList.remove('popup_opened');
}

function closeAndSave(e) {
  e.preventDefault();
  profileName.textContent = editForm.elements.name.value;
  profileDescription.textContent = editForm.elements.description.value;
  closePopup();
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', closeAndSave);

