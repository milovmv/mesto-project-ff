  export const getStartProfile = (profileTitle, profileDescription, profileAvatar) => {
    fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-39/users/me', {
        method: 'GET',
        headers: {
        authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
        'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((result) => {
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
        profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      });
  }
  
  export const getStartCards = (initialCards) => {
    return fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-39/cards', {
        method: 'GET',
        headers: {
        authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
        'Content-Type': 'application/json'
        }
      })
    .then(res => res.json())
    
    .then((result) => {
        for(let i = 0; i < result.length; i++) {
            initialCards.push({name: `${result[i].name}`, link: `${result[i].link}`, likes: `${result[i].likes.length}`});
        }
        return initialCards;
    })
    .catch(error => {
        console.error("Ошибка при получении карточек:", error);
        return []; 
    });
  }

  export const getID = (userId, cardsId) => {
    return fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-39/cards', {
        method: 'GET',
        headers: {
        authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
        'Content-Type': 'application/json'
        }
      })
    .then(res => res.json())
    
    .then((result) => {
        for(let i = 0; i < result.length; i++) {
            userId.push({_id: `${result[i].owner._id}`});
            cardsId.push({_id: `${result[i]._id}`});
        }
        console.log(cardsId[0])
        return userId, cardsId;
    })
    .catch(error => {
        console.error("Ошибка при получении карточек:", error);
        return []; 
    });
  }

  export const sendProfileInfo = (nameInput, jobInput) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-39/users/me', {
        method: 'PATCH',
        headers: {
          authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${nameInput}`,
          about: `${jobInput}`
        })
      },
    );
  }

  export const sendNewCard = (popupCardNameInput, popupCardURLInput) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-39/cards', {
        method: 'POST',
        headers: {
          authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${popupCardNameInput}`,
          link: `${popupCardURLInput}`
        })
      });
  }

  export const sendNewAvatar = (popupAvatarInput, name, job) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-39/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: `${popupAvatarInput}`
        })
      });
  }

  export function deleteItem(elem, cardId) {
    const listitem = elem.closest('.card');
    listitem.remove();
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
            'Content-Type': 'application/json'
        }
    })
  };

export function likeItem(elem, cardId) {
    const targetButton = elem.closest('.card__like-button');
    if(!targetButton.classList.contains('card__like-button_is-active')) {
        targetButton.classList.add('card__like-button_is-active');
        return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
                'Content-Type': 'application/json'
            }
        })
    } else {
        targetButton.classList.remove('card__like-button_is-active')
        return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
                'Content-Type': 'application/json'
            }
        })
    }
}

export function changeLikeNumber(elem, index) {
    const newLikesNumber = elem.parentElement.querySelector('.card__likes-number');
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-39/cards/`, {
        method: 'GET',
        headers: {
        authorization: 'cb8cc2b3-c15b-4303-b84a-0af84ebd8a85',
        'Content-Type': 'application/json'
        }  
        })
        .then(res => res.json())
        .then(result => {
            return newLikesNumber.textContent = result[index].likes.length;
        })
  }

   