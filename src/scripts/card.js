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
      if(!cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
        api.likeItemPut(cardId)
        .then(cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active'))
        .catch((error) => {
          console.error('Ошибка:', error);
        })
      } else {
        api.likeItemDelete(cardId)
        .then(cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active'))
        .catch((error) => {
          console.error('Ошибка:', error);
        })
      };
      api.changeLikeNumber(index)
        .then(res => {
          cardElement.querySelector('.card__like-button').parentElement.querySelector('.card__likes-number').textContent = res;
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        })
  })

    return cardElement;
  }

  export function hideDeleteButton (cardElement, usersId, index, userId) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (!(usersId[index]._id == userId)) {
      deleteButton.disabled = true;
      deleteButton.style.visibility = 'hidden';
    } 
  }