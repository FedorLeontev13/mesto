import { Popup } from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleDelete) {
        super(popupSelector);
        this._handleDelete = handleDelete;
    }

    _setEventListeners() {
        super._setEventListeners();
        this._form = this._popupElement.querySelector('.popup__container');
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleDelete(this._id, this._delConfirm);
        });
    }

    open(id, delConfirm) {
        this._id = id;
        this._delConfirm = delConfirm;
        super.open();
    }
}
