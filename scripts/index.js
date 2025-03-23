
function deleteItem() {
    const listItem = document.querySelector('.card');
    listItem.remove();
};

function createCard(deletefunc) {
    const cardMassive = [];
    for (let i = 0; i<initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        
        const deleteButton = cardElement.querySelector('.card__delete-button');
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        
        cardImage.src = initialCards[i].link;
        cardImage.alt = initialCards[i].name;
        cardTitle.textContent = initialCards[i].name;
        

        deleteButton.addEventListener('click', deletefunc);
        cardMassive[i] = cardElement;
    }

    return cardMassive;
}

createCard(deleteItem).forEach(function(item) {
    const cardsOnPage = document.querySelector('.places__list');
    cardsOnPage.append(item);
});


