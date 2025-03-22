function addCard(cardElement) {
    for (let i = 0; i<initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card-template').content;
        cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        
        const cardsOnPage = document.querySelector('.places__list');
        const deleteButton = cardElement.querySelector('.card__delete-button');
        console.log(deleteButton);
    
        cardElement.querySelector('.card__image').src = initialCards[i].link;
        cardElement.querySelector('.card__image').alt = initialCards[i].name;
        cardElement.querySelector('.card__title').textContent = initialCards[i].name;
        console.log(cardElement);
    
        cardsOnPage.append(cardElement);

        deleteButton.addEventListener('click', function () {
            const listItem = deleteButton.closest('.card');
            listItem.remove();
        });
    }
}


addCard()
