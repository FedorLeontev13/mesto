export default class Card {
    constructor({name, link, _id, owner, likes}, userId, cardSelector, handleCardClick, handleDeleteBtnClick, handleLikeBtnClick) {
        this._name = name;
        this._link = link;
        this._cardId = _id;
        this._ownerId = owner._id;
        this._likes = likes;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteBtnClick = handleDeleteBtnClick;
        this._handleLikeBtnClick = handleLikeBtnClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        this._cardElement = cardElement;
    }

    _getConstants () {
        this._imgElement = this._cardElement.querySelector('.element__image');
        this._imgTextElement = this._cardElement.querySelector('.element__title');
        this._likeButton = this._cardElement.querySelector('.element__btn-like');
        this._deleteButton = this._cardElement.querySelector('.element__btn-delete');
        this._placeCountLike = this._cardElement.querySelector('.element__num-like');
    }

    _handleClickLike(evt) {
        this._handleLikeBtnClick(this._cardId, this._likes.some(item => item._id === this._userId))
            .then(res => {
                this._likes = res.likes;
                this._placeCountLike.textContent = res.likes.length;
                evt.target.classList.toggle('element__btn-like_active');
            })
            .catch(err => console.log(err));
    }

    _handleDelete() {
        if (this._userId !== this._ownerId) {
            this._deleteButton.remove();
        }
        if (this._likes.some(item => item._id === this._userId)) {
            this._likeButton.classList.add('element__btn-like_active');
        }
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', (e) => {
            this._handleClickLike(e);
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteBtnClick(this._cardId, () => this._deleteCard());
        });

        this._imgElement.addEventListener('click', () => this._handleCardClick({
            name: this._name,
            link: this._link
        }));
    }

    _deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    generateCard() {
        this._getTemplate();
        this._getConstants();
        this._setEventListeners();
        this._handleDelete();
        this._imgTextElement.textContent = this._name;
        this._imgElement.src = this._link;
        this._imgElement.alt = this._name;
        this._placeCountLike.textContent = this._likes.length;
        return this._cardElement;
    }
}