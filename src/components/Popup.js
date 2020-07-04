export class Popup {
    constructor({ formSelector }) {
        this._popupElement = document.querySelector(formSelector);
    }

    // приватный метод закрытия попапа клавишей Esc / Overlay
    _handleEscClose(evt) {
        if ((this._popupElement.classList.contains('popup_opened')) && ((evt.target.classList.contains('popup')) || (evt.key === 'Escape'))) {
            this._popupElement.classList.remove('popup_opened');
        }
    }

    // публичный метод добавления слушателей
    setEventListeners() {
        this._popupCloseButton = this._popupElement
            .querySelector('.popup__btn-close');
        this._popupCloseButton.addEventListener('click', () => this.closePopup());
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        document.addEventListener('click', (evt) => this._handleEscClose(evt));
    }
    
    // публичный метод закрытия попапа
    closePopup() {
        this._popupElement.classList.remove('popup_opened');
    }

    // публичный метод открытия попапа
    openPopup() {
        this._popupElement.classList.add('popup_opened');
    }
}