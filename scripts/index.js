
const cardsOnPage = document.querySelector('.places__list');

function deleteItem(elem) {
    const listitem = elem.closest('.card');
    listitem.remove();
};

function createCard(incomeCard, deleteFunc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
        
    cardImage.src = incomeCard.link;
    cardImage.alt = incomeCard.name;
    cardTitle.textContent = incomeCard.name;
        
    deleteButton.addEventListener('click', function () {
        deleteFunc(deleteButton);
    });
    
    return cardElement;
    
}


initialCards.forEach(function(item) {
    const newCard = createCard(item, deleteItem);
    cardsOnPage.append(newCard);
});


