export function openModal(popupType) {
    popupType.classList.add('popup_is-opened', 'popup_is-animated');
}

export function closeModal(popupType) {
    const popupCloseButton = popupType.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function() {
        popupType.classList.remove('popup_is-opened');
    })
    popupType.addEventListener('click', function(evt) {
        if (evt.currentTarget === evt.target) {
            popupType.classList.remove('popup_is-opened');
        }
      })
    document.addEventListener('keydown', function(evt) {
        if (evt.key == "Escape") {
            popupType.classList.remove('popup_is-opened');
        }
      })
}

export function showImage(elem) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageContent = popupImage.querySelector('.popup__image');
    const popupImageText = popupImage.querySelector('.popup__caption');
  
    popupImageContent.src = elem.target.src;
    popupImageContent.alt = elem.target.alt;
    popupImageText.textContent = elem.target.alt;
  
    openModal(popupImage);
    closeModal(popupImage);
  }
