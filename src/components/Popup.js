export class Popup {
  constructor(formSelector) {
    this._popupElement = document.querySelector(formSelector);
    this._closeButton = this._popupElement.querySelector('.popup__btn-close');

    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    };
    this.setEventListeners();
  }

  // публичный метод добавления слушателей
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('mousedown', (evt) =>
        evt.target.classList.contains('popup') ? this.close() : null
    );
  }

  // публичный метод открытия попапа
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичный метод закрытия попапа
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}