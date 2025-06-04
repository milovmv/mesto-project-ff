export function likeItem(elem) {
    const targetButton = elem.target;
    if(!targetButton.classList.contains('card__like-button_is-active')) {
      targetButton.classList.add('card__like-button_is-active');
  } else {
      targetButton.classList.remove('card__like-button_is-active')
  }
  }
  
export function createCard(incomeCard, likeFunc, showImageFunc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  //  const deleteButton = cardElement.querySelector('.card__delete-button');
    //const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikesNumber = cardElement.querySelector('.card__likes-number');
        
    cardImage.src = incomeCard.link;
    cardImage.alt = incomeCard.name;
    cardTitle.textContent = incomeCard.name;
    cardLikesNumber.textContent = incomeCard.likes;

//    deleteButton.addEventListener('click', function () {
//        deleteFunc(deleteButton);
//    });
   // likeButton.addEventListener('click', likeFunc);
    cardImage.addEventListener('click', showImageFunc);
    
    return cardElement;
  }

  export function hideDeleteButton (cardElement, userId, index) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (!(userId[index]._id == 'e1dc32dca280a12214f72aad')) {
      deleteButton.disabled = true;
      deleteButton.style.visibility = 'hidden';
    } 
  }