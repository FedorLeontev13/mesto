import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor({ formSelector, popupBigImage, popupFigcaption }) {
    super(formSelector);
    this._popupBigImage = popupBigImage;
    this._popupFigcaption = popupFigcaption;
  }

  // публичный метод открытия попапа
  open(cardImageElement) {
    super.open();
    this._popupBigImage.src = cardImageElement.src;
    this._popupBigImage.alt = cardImageElement.alt;
    this._popupFigcaption.textContent = cardImageElement.alt;
  }
}
