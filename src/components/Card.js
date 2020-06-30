export class Card {
    constructor({ item, cardSelector, handleCardClick }) {
        this._link = item.link;
        this._name = item.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        this._element = cardElement;
    }

    // установка слушателей
    _setEventListeners() {
        this._element.querySelector('.element__btn-like').addEventListener('click', () => {
            this._toggleLike();
        });

        this._element.querySelector('.element__btn-delete').addEventListener('click', () => {
            this._delCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._element.querySelector('.element__image'));
        });
    }

    // приватный метод переключения лайка
    _toggleLike() {
        this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active');
    }

    // приватный метод удаления карточки
    _delCard() {
        this._element.querySelector('.element__btn-delete').closest('.element').remove();
    }

    // публичный метод наполнение карточки данными
    generateCard() {
        this._getTemplate();
        this._setEventListeners();

        const cardImageElement = this._element.querySelector('.element__image');
        cardImageElement.src = this._link;
        cardImageElement.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }
}

