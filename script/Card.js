
export default class Card {
    constructor(item, cardSelector) {
        this._link = item.link;
        this._name = item.name;
        this._cardSelector = cardSelector;
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
        // настройка переключения лайка
        this._element.querySelector('.element__btn-like').addEventListener('click', () => {
            this._toggleLike();
        });
        // настройка удаления карточки
        this._element.querySelector('.element__btn-delete').addEventListener('click', () => {
            this._deleteCard();
        });
    }

    // приватный метод переключения лайка
    _toggleLike() {
        this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active');
    }

    // приватный метод удаления карточки
    _deleteCard() {
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
