import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super (popupSelector);
        this._popupElement = document.querySelector(popupSelector);
    }
    //публичный метод:перезаписываем родительский метод открытия окна
    openPopup(cardElementImage) {
        const image =  this._popupElement.querySelector('.popup__big-image');
        image.src = cardElementImage.src;
        image.alt = cardElementImage.alt;
        this._popupElement.querySelector('.popup__caption').textContent = cardElementImage.alt;
        super.openPopup();
    }
}
