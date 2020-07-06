import { Popup }  from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    //приватный метод: собирает данные всех полей формы
    _getInputValues () {
        this._inputList = this._popupElement.querySelectorAll('.popup__text');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    //публичный метод: установка слушателя
    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }
    //публичный метод:перезаписываем родительский метод закрытия окна
    closePopup() {
        super.closePopup();
        this._popupElement.querySelector('.popup__container').reset();
    }
}