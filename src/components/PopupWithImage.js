import { Popup } from './Popup.js';
import { bigImage, popupCaption } from '../utils/constants.js';

export class PopupWithImage extends Popup {
    constructor({ formSelector }) {
        super(formSelector);
        this._popupElement = document.querySelector(formSelector);
    }

    // публичный метод открытия попапа
    open(cardImageElement) {
        bigImage.src = cardImageElement.src;
        bigImage.alt = cardImageElement.alt;
        popupCaption.textContent = cardImageElement.alt;
        super.open();
    }
}
