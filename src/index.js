import './index.css';
import {initialCards} from './scripts/cards.js';
import {openModal, closeModal, showImage} from './scripts/modals.js';
import {deleteItem, likeItem, createCard} from './scripts/cards.js'

const cardsOnPage = document.querySelector('.places__list');

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

//Функция отправки формы редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupTypeEdit.classList.remove('popup_is-opened');
}

//Функция отправки формы добавления карточки
function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const cardForCreate = {};
    cardForCreate.name = popupCardNameInput.value;
    cardForCreate.link = popupCardURLInput.value
    const newCard = createCard(cardForCreate, deleteItem, likeItem, showImage);
    cardsOnPage.prepend(newCard);
    popupNewCard.classList.remove('popup_is-opened');
}


//Добавляем имеющиеся карточки
initialCards.forEach(function(item) {
    const newCard = createCard(item, deleteItem, likeItem, showImage);
    cardsOnPage.append(newCard);
});


//Добавляем обработчик событий на кнопку редактирования профиля
profileEditButton.addEventListener('click', function(){
    openModal(popupTypeEdit);
    closeModal(popupTypeEdit);

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    formProfileElement.addEventListener('submit', handleFormSubmit);
})


//Добавляем обработчик событий на кнопку добавления карточки
profileAddButton.addEventListener('click', function(){
    openModal(popupNewCard);
    closeModal(popupNewCard);

    formCardElement.addEventListener('submit', handleFormCardSubmit);
})
 