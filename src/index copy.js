import './index.css';
import {openModal, closeModal} from './scripts/modals.js';
import {deleteItem, likeItem, createCard, hideDeleteButton} from './scripts/card.js'
import {enableValidation, clearValidation} from './scripts/validate.js'
import {getStartProfile, getStartCards, getID, sendProfileInfo, sendNewCard, deleteCard} from './api.js'

//Список карточек
const cardsOnPage = document.querySelector('.places__list');

//Переменные для попапа редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const formProfileElement = document.querySelector('.form__edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//Переменные для попапа добавления карточки
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const formCardElement = document.querySelector('.form__new-place');
const popupCardNameInput = document.querySelector('.popup__input_type_card-name');
const popupCardURLInput = document.querySelector('.popup__input_type_url');

//Переменные для попапа изображения
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');

//Находим все попапы
const popups = document.querySelectorAll('.popup');

//Для каждого попапа вешаем появление и исчезновения с анимацией
popups.forEach((item) => {
    item.classList.add('popup_is-animated');
});

//Для каждого попапа вешаем обработчик событий на кнопку закрытия (крестик)
popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
       closeModal(popup);
    });
});

//Для каждого попапа вешаем обработчик событий на клик вне области попапа
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    });
}); 

//Функция отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    sendProfileInfo(nameInput.value, jobInput.value);
    closeModal(popupTypeEdit);
}

//Функция отправки формы добавления карточки
function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const cardForCreate = {};
    cardForCreate.name = popupCardNameInput.value;
    cardForCreate.link = popupCardURLInput.value;
    const newCard = createCard(cardForCreate, deleteItem, likeItem, showImage);
    cardsOnPage.prepend(newCard);
    console.log(cardsOnPage);
    sendNewCard(popupCardNameInput.value, popupCardURLInput.value);
    closeModal(popupNewCard);
}

//Повесим обработчик события на отправку формы
formCardElement.addEventListener('submit', handleFormCardSubmit);
formProfileElement.addEventListener('submit', handleProfileFormSubmit);

//Функция увеличения изображения
function showImage(elem) {
    popupImageContent.src = elem.target.src;
    popupImageContent.alt = elem.target.alt;
    popupImageText.textContent = elem.target.alt;

    openModal(popupImage);
}

//Добавляем имеющиеся карточки
let userId = []; // Для _id пользователя
let cardsId = []; // Для _id карточек
let initialCards = []; // Для карточек
let useridid = [];


Promise.all([getID(userId, cardsId), getStartCards(initialCards)])
    .then(res => {
        useridid = userId;
        initialCards.forEach(function(item) {
            const newCard = createCard(item, deleteItem, likeItem, showImage);
            hideDeleteButton(newCard, userId, initialCards.indexOf(item));
            cardsOnPage.append(newCard);
            deleteCard();
        });
    })
    .catch(error => {
        console.error("Произошла ошибка:", error);
    });

//Добавляем обработчик событий на кнопку редактирования профиля
profileEditButton.addEventListener('click', function() {
    openModal(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formProfileElement, {inputSelector: '.popup__input'});
});


//Добавляем обработчик событий на кнопку добавления карточки
profileAddButton.addEventListener('click', function(){
    openModal(popupNewCard);
    popupCardNameInput.value = "";
    popupCardURLInput.value = "";
    const buttonElement = formCardElement.querySelector('.button');
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
    clearValidation(formCardElement, {inputSelector: '.popup__input'});
});

enableValidation({
    formSelector: '.popup__form'
  }); 

getStartProfile(profileTitle, profileDescription, profileAvatar);

