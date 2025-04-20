import './index.css';
import {initialCards} from './scripts/cards.js';
import {openModal, closeModal} from './scripts/modals.js';
import {deleteItem, likeItem, createCard} from './scripts/card.js'

const cardsOnPage = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

popups.forEach((item) => {
    item.classList.add('popup_is-animated');
});

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
       closeModal(popup);
    });
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    });
}); 


//Переменные для попапа редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formProfileElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//Переменные для попапа добавления карточки
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const formCardElement = document.querySelector('.popup_type_new-card');
const popupCardNameInput = document.querySelector('.popup__input_type_card-name');
const popupCardURLInput = document.querySelector('.popup__input_type_url');

//Переменные для попапа изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');

//Функция отправки формы редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupTypeEdit);
}

//Функция отправки формы добавления карточки
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const cardForCreate = {};
    cardForCreate.name = popupCardNameInput.value;
    cardForCreate.link = popupCardURLInput.value
    const newCard = createCard(cardForCreate, deleteItem, likeItem, showImage);
    cardsOnPage.prepend(newCard);
    closeModal(popupNewCard);
}

//Повесим обработчик события на отправку формы
formCardElement.addEventListener('submit', handleProfileFormSubmit);
formProfileElement.addEventListener('submit', handleFormSubmit);

//Функция увеличения изображения
function showImage(elem) {
    popupImageContent.src = elem.target.src;
    popupImageContent.alt = elem.target.alt;
    popupImageText.textContent = elem.target.alt;
  
    openModal(popupImage);
  }

//Добавляем имеющиеся карточки
initialCards.forEach(function(item) {
    const newCard = createCard(item, deleteItem, likeItem, showImage);
    cardsOnPage.append(newCard);
});


//Добавляем обработчик событий на кнопку редактирования профиля
profileEditButton.addEventListener('click', function(){
    openModal(popupTypeEdit);

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})


//Добавляем обработчик событий на кнопку добавления карточки
profileAddButton.addEventListener('click', function(){
    openModal(popupNewCard);
})

