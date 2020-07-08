import { Popup } from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector('.popup__big-image');
        this._imageText = this._popupElement.querySelector('.popup__caption');
    }

    open(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._imageText.textContent = name;

        super.open();
    }
}