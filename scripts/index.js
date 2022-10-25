let popupBg = document.querySelector('.popup'); // Весь попап с фоном
let openPopupButton = document.querySelector('.profile__edit-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна

let places = document.querySelector('.places');

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

const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addPlaceToGrid(place) { 
  const placeItem = document.createElement('div'); //создать элемент
  placeItem.classList.add('places__item'); //добавить в класслист (add)

  const image = document.createElement('img');
  image.classList.add('places__image');
  image.alt = place.name;
  image.src = place.link;

  const nameWrapper = document.createElement('div');
  nameWrapper.classList.add('places__name-wrapper');

  const name = document.createElement('h2'); 
  name.classList.add('places__name'); 
  name.textContent = place.name; // название места из массива 
 
  const favButton = document.createElement('button');
  favButton.classList.add('places__fav-button');
  favButton.type = 'button';
  favButton.addEventListener('click', function (event) { 
    favButton.classList.toggle('places__fav-button_selected');
  });

  nameWrapper.append(name, favButton); // добавляем в nameWrapper name и favButton
  placeItem.append(image, nameWrapper); // добавляем в placesItem image и nameWrapper
  places.append(placeItem); //добавляем в places placeItem 
}
 
initialPlaces.forEach(addPlaceToGrid);
