import { api } from '../pages/index.js';

export default class Card {
	constructor({ item, cardSelector, handleCardClick, handleTrashBtnClick }) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._numLikes = item.likes.length;
    this._ownerId = item.owner._id;
    this._cardId = item._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBtnClick = handleTrashBtnClick;
	}

  _getTemplate() {
  	const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    this._element = cardElement;
  }

	_setEventListeners() {
		this._element.querySelector('.element__btn-like').addEventListener('click', () => {
			this._toggleLike();
    });
    this._element.querySelector('.element__btn-delete').addEventListener('click', () => {
      this._handleTrashBtnClick(this._element, this._cardId);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._element.querySelector('.element__image'));
    });
	}

  _toggleLike() {
    const cardLike = this._element.querySelector('.element__btn-like');
    if (!cardLike.classList.contains('element__btn-like_active')) {
      api.putLike(this._cardId)
        .then((data) => {
          cardLike.classList.add('element__btn-like_active');
          this._element.querySelector('.element__num-like').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    } else {
      api.delLike(this._cardId)
        .then((data) => {
          cardLike.classList.remove('element__btn-like_active');
          this._element.querySelector('.element__num-like').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        });
    }
  }

  generateCard(userId) {
    this._getTemplate();
    this._setEventListeners();

    const cardImageElement = this._element.querySelector('.element__image');
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__num-like').textContent = this._numLikes;

    if (this._ownerId != userId) {
      this._element.querySelector('.element__btn-delete').classList.add('element__btn-delete_hidden');
    }

    this._likes.forEach((like) => {
      if (like._id == userId) {
        this._element.querySelector('.element__btn-like').classList.add('element__btn-like');
      }
    });

    return this._element;
  }
}
