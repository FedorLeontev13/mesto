export class Popup {
    constructor(formSelector) {
        this._popupElement = document.querySelector(formSelector);
        this._closeButton = this._popupElement.querySelector('.popup__btn-close');


        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.closePopup();
            }
        };
        this.setEventListeners();

        this._handleEsc = this._handleEscClose.bind(this);
    }

    // публичный метод добавления слушателей
    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.closePopup());
        this._popupElement.addEventListener('mousedown', (evt) =>
            evt.target.classList.contains('popup') ? this.closePopup() : null
        );
    }

    // публичный метод открытия попапа
    openPopup() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEsc);
    }

    // публичный метод закрытия попапа
    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEsc);
    }
}