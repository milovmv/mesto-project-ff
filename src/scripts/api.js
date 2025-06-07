import {checkResponse} from '../utils/error.js'

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
    'Content-Type': 'application/json',
  },
};

export const api = {
  getStartProfile: function() {
    return fetch (`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
    .then((result) => {
      return result;
    })
  },

  getStartCards: function(initialCards) {
    return fetch (`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
    .then((result) => {
      for(let i = 0; i < result.length; i++) {
          initialCards.push({name: `${result[i].name}`, link: `${result[i].link}`, likes: `${result[i].likes.length}`});
      }
      return initialCards;
    }) 
  },

  getID: function(userId, cardsId) {
    return fetch (`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
    .then((result) => {
      for(let i = 0; i < result.length; i++) {
          userId.push({_id: `${result[i].owner._id}`});
          cardsId.push({_id: `${result[i]._id}`});
      }
      return userId, cardsId;
    })
  },

  sendProfileInfo: function(nameInput, jobInput) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: `${nameInput}`,
        about: `${jobInput}`
      })
    })
  },

  sendNewCard: function(popupCardNameInput, popupCardURLInput) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: `${popupCardNameInput}`,
        link: `${popupCardURLInput}`
      })
    })
  },

  sendNewAvatar: function(popupAvatarInput) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: `${popupAvatarInput}`
      })
    })
  },

  deleteItem: function(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
  },

  likeItem: function(elem, cardId) {
    const targetButton = elem.closest('.card__like-button');
    if(!targetButton.classList.contains('card__like-button_is-active')) {
        targetButton.classList.add('card__like-button_is-active');
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: config.headers
        })
    } else {
        targetButton.classList.remove('card__like-button_is-active')
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
    }
  },

  changeLikeNumber: function(elem, index) {
    const newLikesNumber = elem.parentElement.querySelector('.card__likes-number');
    return fetch(`${config.baseUrl}/cards/`, {
        method: 'GET',
        headers: config.headers  
        })
        .then(res => res.json())
        .then(result => {
            return newLikesNumber.textContent = result[index].likes.length;
        })
  }
}