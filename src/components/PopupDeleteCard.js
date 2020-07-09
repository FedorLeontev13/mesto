import { Popup } from './Popup.js';

export default class PopupDeleteCard extends Popup {
	constructor({ formSelector, handleFormSubmit }) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmitDelCard = this._handleSubmitDelCard.bind(this);
  }

  _handleSubmitDelCard(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._cardId, this._element);
    super.close();
  }

  open(delElement, cardId) {
    super.open();
    this._element = delElement;
    this._cardId = cardId;
    this._popupElement.addEventListener('submit', this._handleSubmitDelCard);
  }

  close() {
    super.close();
    // снимаем слушатель
    this._popupElement.removeEventListener('submit', this._handleSubmitDelCard);
  }
}
