
export default class FormValidator {
  constructor(setObj, formElement) {
    this._obj = setObj;
    this._formElement = formElement;
  }

  // приватный метод отображения ошибок валидации
  _showInputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  }

  // приватный метод скрытия ошибок валидации
  _hideInputError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
  }

  // приватный метод проверяет formInput на корректность введённых данных и вызывает hideError/showError
  _checkInputValidity(formElement, inputElement, obj) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, obj)
    } else {
      this._hideInputError(formElement ,inputElement, obj);
    }
  }

  // приватный метод обходит массив полей для проверки их валидности
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement, obj) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  }

  // установка слушателей
  _setEventListeners(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.buttonSelector);
    this._toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, obj);
        this._toggleButtonState(inputList, buttonElement, obj);
      })
    })
  }

  // публичный метод включения валидации формы
  enableValidation() {
    this._setEventListeners(this._formElement, this._obj);
  }
}





