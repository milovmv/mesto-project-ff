import {api} from './api.js'
  
export function createCard(incomeCard, showImageFunc, cardId, index) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikesNumber = cardElement.querySelector('.card__likes-number');
        
    cardImage.src = incomeCard.link;
    cardImage.alt = incomeCard.name;
    cardTitle.textContent = incomeCard.name;
    cardLikesNumber.textContent = incomeCard.likes;

    cardImage.addEventListener('click', showImageFunc);
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      api.deleteItem(cardId)
          .then(cardElement.remove())
          .catch((error) => {
            console.error('Ошибка:', error);
          })
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
      api.likeItem(cardElement.querySelector('.card__like-button'), cardId)
        .then((res) => `res`)
        .catch((error) => {
          console.error('Ошибка:', error);
        })
      api.changeLikeNumber(cardElement.querySelector('.card__like-button'), index)
        .then((res) => `res`)
        .catch((error) => {
          console.error('Ошибка:', error);
        })
  })

    return cardElement;
  }

  export function hideDeleteButton (cardElement, userId, index) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (!(userId[index]._id == 'e1dc32dca280a12214f72aad')) {
      deleteButton.disabled = true;
      deleteButton.style.visibility = 'hidden';
    } 
  }