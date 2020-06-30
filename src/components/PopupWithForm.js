import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ formSelector, handleFormSubmit }) {
        super(formSelector);
        this._popupElement = document.querySelector(formSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__text');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    // публичный метод добавления слушателей
    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            super.close();
        });
    }

    // публичный метод закрытия попапа
    close() {
        super.close();
        this._popupElement.querySelector('.popup__container').reset();
    }
}

