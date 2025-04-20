export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function deleteItem(elem) {
  const listitem = elem.closest('.card');
  listitem.remove();
};

export function likeItem(elem) {
  const targetButton = elem.target;
  targetButton.classList.add('card__like-button_is-active');
}

export function createCard(incomeCard, deleteFunc, likeFunc, showImageFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
      
  cardImage.src = incomeCard.link;
  cardImage.alt = incomeCard.name;
  cardTitle.textContent = incomeCard.name;
      
  deleteButton.addEventListener('click', function () {
      deleteFunc(deleteButton);
  });
  likeButton.addEventListener('click', likeFunc);
  cardImage.addEventListener('click', showImageFunc);
  
  return cardElement;
}