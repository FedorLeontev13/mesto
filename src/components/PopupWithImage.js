import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super (popupSelector);
        this._popupElement = document.querySelector(popupSelector);
    }
    //публичный метод:перезаписываем родительский метод открытия окна
    openPopup(cardElementImage) {
        this._popupElement.querySelector('.popup__big-image').src = cardElementImage.src;
        this._popupElement.querySelector('.popup__big-image').alt = cardElementImage.alt;
        super.openPopup();
    }
}
