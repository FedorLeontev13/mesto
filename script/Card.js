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
            this._delCard();
        });
        // настройка открытия попапа с большым изображением
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this.openPopupImg();
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

    // приватный метод открытия попапа с большым изображением
    openPopupImg() {
        const bigImage = document.querySelector('.popup__big-image');
        const popupCaption = document.querySelector('.popup__caption');
        const popupImg = document.querySelector('.popup_type_image');
        const cardImageElement = this._element.querySelector('.element__image');
        bigImage.src = cardImageElement.src;
        bigImage.alt = cardImageElement.alt;
        popupCaption.textContent = cardImageElement.alt;
        popupImg.classList.toggle('popup_opened')
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
    };
};
