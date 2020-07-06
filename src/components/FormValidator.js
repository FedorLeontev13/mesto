export class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
  }

  // приватный метод отображения ошибок валидации
  _showInputError(formElement, inputElement, errorMessage, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
  }

  // публичный метод скрытия ошибок валидации
  hideInputError(formElement, inputElement, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    errorElement.textContent = '';
  }

  // приватный метод проверяет formInput на корректность введённых данных и вызывает hideError/showError
  _checkInputValidity(formElement, inputElement, formConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
    } else {
      this.hideInputError(formElement ,inputElement, formConfig);
    }
  }

  // приватный метод обходит массив полей для проверки их валидности
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // приватный метод принимает массив полей ввода и элемент формы, содержащий кнопку, состояние которой нужно поменять
  _toggleButtonState(inputList, buttonElement, formConfig) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(formConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(formConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // установка слушателей
  _setEventListeners(formElement, formConfig) {
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.buttonSelector);
    this._toggleButtonState(inputList, buttonElement, formConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, formConfig);
        this._toggleButtonState(inputList, buttonElement, formConfig);
      });
    });
  }

  // публичный метод включения валидации формы
  enableValidation() {
    this._setEventListeners(this._formElement, this._formConfig);
  }
}