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
  },

  getStartCards: function() {
    return fetch (`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
  },

  getID: function() {
    return fetch (`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
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
    .then(checkResponse)
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
    .then(checkResponse)
  },

  sendNewAvatar: function(popupAvatarInput) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: `${popupAvatarInput}`
      })
    })
    .then(checkResponse)
  },

  deleteItem: function(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse)
  },

  likeItemPut: function(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(checkResponse)
  },

  likeItemDelete: function(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse)
  },

  changeLikeNumber: function(index) {
    return fetch(`${config.baseUrl}/cards/`, {
        method: 'GET',
        headers: config.headers  
        })
        .then(checkResponse)
        .then(result => {
            return result[index].likes.length;
        })
  }
}