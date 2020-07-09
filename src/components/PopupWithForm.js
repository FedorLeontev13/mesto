import { Popup } from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({ formSelector, handleFormSubmit, submitButton}) {
    super(formSelector);
    this._popupElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = submitButton;
    this._submitButtonText = this._submitButton.textContent;
    this._handleSubmitPopupWithForm = this._handleSubmitPopupWithForm.bind(this);
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleSubmitPopupWithForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(
      this._getInputValues()
    );
  }

  setBtnStartLoading() {
    this._submitButton.textContent = 'Сохранение...';
  }
  setBtnEndLoading() {
    this._submitButton.textContent = this._submitButtonText;
  }

  open() {
    super.open();
    this._popupElement.addEventListener('submit', this._handleSubmitPopupWithForm);
  }

  close() {
    super.close();
    this._popupElement.removeEventListener('submit', this._handleSubmitPopupWithForm);
  }
}

