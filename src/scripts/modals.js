export function openModal(popupToOpen) {
    popupToOpen.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closeModal(popupToClose) {
    popupToClose.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

export function closeByEscape(event) {
    if(event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}


