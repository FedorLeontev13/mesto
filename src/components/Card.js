export default class Card {
    constructor({data, cardSelector, handleCardClick}){
        this._name = data.name;
        this._alt = data.alt;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)

        return cardElement;
    }

    //приватный метод like
    _toggleLikeActive() {
        this._element.querySelector('.element__btn-like').classList.toggle('element__btn-like_active');
    }

    //приватный метод delete
    _deleteButtonHandler() {
        this._element.querySelector('.element__btn-delete').closest('.element').remove();
    }

    //приватный метод установка слушателей
    _setEventListeners() {
        this._element.querySelector('.element__btn-like').addEventListener('click', () => {
            this._toggleLikeActive()});
        this._element.querySelector('.element__btn-delete').addEventListener('click', () => {
            this._deleteButtonHandler()});
        this._element.querySelector('.element__image').addEventListener('click',() => {
            this._handleCardClick(this._element.querySelector('.element__image'))
        });
    }

    //публичный метод создание карточки
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__title').textContent =this._name;
        const cardElementImage = this._element.querySelector('.element__image');
        cardElementImage.src=this._link;
        cardElementImage.alt = this._alt;

        return this._element;
    }
}
