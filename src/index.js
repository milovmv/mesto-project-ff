import './index.css';
import {openModal, closeModal} from './scripts/modals.js';
import {createCard, hideDeleteButton} from './scripts/card.js'
import {enableValidation, clearValidation} from './scripts/validate.js'
import {api} from './scripts/api.js'
import {checkResponse} from './utils/error.js'

//Список карточек
const cardsOnPage = document.querySelector('.places__list');
//Список попапов
const popups = document.querySelectorAll('.popup');
//Список кнопок удаления карточек

//Кнопки главной страницы:
//Редактировать профиль
const profileEditButton = document.querySelector('.profile__edit-button');
//Добавить карточку
const profileAddButton = document.querySelector('.profile__add-button');
//Обновить аватар
const profileAvatarEdit = document.querySelector('.profile__image')

//Элементы главной страницы:
//Название профиля
const profileTitle = document.querySelector('.profile__title');
//Описание профиля
const profileDescription = document.querySelector('.profile__description');
//Аватар
const profileAvatar = document.querySelector('.profile__image');

//Попапы:
//Попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
//Попап добавления карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
//Попап с увеличенным изображением карточки
const popupImage = document.querySelector('.popup_type_image');
//Попап нового аватара
const popupNewAvatar = document.querySelector('.popup_type_new-avatar')

//Форма заполнения профиля
const formProfileElement = document.querySelector('.form__edit-profile');
//Ввод названия профиля
const nameInput = document.querySelector('.popup__input_type_name');
//Ввод описания профиля
const jobInput = document.querySelector('.popup__input_type_description');

//Форма добавления карточки
const formCardElement = document.querySelector('.form__new-place');
//Ввод имени карточки
const popupCardNameInput = document.querySelector('.popup__input_type_card-name');
//Вводссылки на картинку
const popupCardURLInput = document.querySelector('.popup__input_type_url');

//Форма обновления аватара
const formAvatarElement = document.querySelector('.form__new-avatar');
//Ввод ссылки на аватар
const popupAvatarURLInput = document.querySelector('.popup__input_type_avatar-url')

//Увеличенное изображение в попапе
const popupImageContent = popupImage.querySelector('.popup__image');
//Название карточки в попапе
const popupImageText = popupImage.querySelector('.popup__caption');

//Переменные для запросов с сервера
let userId = []; // Для _id пользователя
let cardsId = []; // Для _id карточек
let initialCards = []; // Для карточек

//Далее функции

//Для каждого попапа вешаем появление и исчезновения с анимацией, закрытие по кретику и закрытие по клику вне зоны попапа
popups.forEach((item) => {
    item.classList.add('popup_is-animated');
    const closeButton = item.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
       closeModal(item);
    });
    item.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(item);
        }
    });
});

//Функция увеличения изображения
function showImage(elem) {
    popupImageContent.src = elem.target.src;
    popupImageContent.alt = elem.target.alt;
    popupImageText.textContent = elem.target.alt;
    openModal(popupImage);
}

//Функция отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    const saveButton = formProfileElement.querySelector('.popup__button');
    const originalButtonText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';
    saveButton.disabled = true;
    api.sendProfileInfo(nameInput.value, jobInput.value)
        .then(closeModal(popupTypeEdit))
        .catch((error) => {
            console.error('Ошибка при лайке:', error);
        })
        .finally(() => {
            saveButton.textContent = originalButtonText;
            saveButton.disabled = false;
        });
}

//Функция отправки формы аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    profileAvatar.style.backgroundImage = `url(${popupAvatarURLInput.value})`
    const saveButton = formAvatarElement.querySelector('.popup__button');
    const originalButtonText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';
    saveButton.disabled = true;
    api.sendNewAvatar(popupAvatarURLInput.value)
        .then(closeModal(popupNewAvatar))
        .catch((error) => {
            console.error('Ошибка при лайке:', error);
        })
        .finally(() => {
            saveButton.textContent = originalButtonText;
            saveButton.disabled = false;
        });
}

//Функция отправки формы добавления карточки
function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const cardForCreate = {};
    cardForCreate.name = popupCardNameInput.value;
    cardForCreate.link = popupCardURLInput.value;
    const saveButton = formCardElement.querySelector('.popup__button');
    const originalButtonText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';
    saveButton.disabled = true;
    const newCard = createCard(cardForCreate, showImage, cardsId[0]._id, 0);
    cardsOnPage.prepend(newCard);
    //Отправим карточку на сервер
    api.sendNewCard(popupCardNameInput.value, popupCardURLInput.value)
        .then(closeModal(popupNewCard))
        .catch((error) => {
            console.error('Ошибка при лайке:', error);
        })
        .finally(() => {
            saveButton.textContent = originalButtonText;
            saveButton.disabled = false;
        });
}

//Далее функциональность

//Получаем с сервера стартовые данные профиля
api.getStartProfile()
    .then(result => {
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
        profileAvatar.style.backgroundImage = `url(${result.avatar})`;
    });

//Отправляем запрос на сервер дляполучения массива карточек и Id пользователей и карточек
Promise.all([api.getID(userId, cardsId), api.getStartCards(initialCards)])
    .then(res => {
        initialCards.forEach(function(item) {
            console.log(cardsId[initialCards.indexOf(item)]._id)
            const newCard = createCard(item, showImage, cardsId[initialCards.indexOf(item)]._id, initialCards.indexOf(item));
            hideDeleteButton(newCard, userId, initialCards.indexOf(item));
            cardsOnPage.append(newCard);
            
        });
        
        //Повесим обработчик события на отправку формы
        formCardElement.addEventListener('submit', handleFormCardSubmit);
        formProfileElement.addEventListener('submit', handleProfileFormSubmit);
        formAvatarElement.addEventListener('submit', handleAvatarFormSubmit);

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

profileAvatarEdit.addEventListener('click', function() {
    openModal(popupNewAvatar);
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

//Включаем валидацию всех форм
enableValidation({
    formSelector: '.popup__form'
  }); 



