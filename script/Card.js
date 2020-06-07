
import { bigImage, popupCaption, popupImg, togglePopup } from './index.js'

export default class Card {
    constructor(item, cardSelector) {
        this._link = item.link;
        this._name = item.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector) // #card
            .content
            .querySelector('.element')
            .cloneNode(true);

        this._element = cardElement
    }

    // установка слушателей
    _setEventListeners() {
        this._element.querySelector('.element__btn-like').addEventListener('click', () => {
            this._switchBtnLike()
        });
        this._element.querySelector('.element__btn-delete').addEventListener('click', () => {
            this._deleteCard()
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupImg()
        })
    }

    // приватный метод переключения лайка
    _switchBtnLike() {
        this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active')
    }

    // приватный метод удаления карточки
    _deleteCard() {
        this._element.querySelector('.element__btn-delete').closest('.element').remove()
    }

    // приватный метод открытия попапа с большым изображением
    _openPopupImg() {
        bigImage.src = this._element.querySelector('.element__image').src;
        bigImage.alt = this._element.querySelector('.element__image').alt;
        popupCaption.textContent = this._element.querySelector('.element__image').alt;
        togglePopup(popupImg)
    }

    // публичный метод наполнение карточки данными
    generateCard() {
        this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element
    }
}
