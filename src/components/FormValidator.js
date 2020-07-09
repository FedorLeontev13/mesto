export default class FormValidator {
  constructor(formConfig, formElement, inputList, submitButton) {
    this._formConfig = formConfig;
    this._formElement = formElement;
    this._inputList = inputList;
    this._submitButton = submitButton;
  }

  _showInputError(formElement, inputElement, errorMessage, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
  }

  clearErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement, this._formConfig);
    });
  }

  submitButtonState() {
    this._toggleButtonState(this._inputList, this._submitButton, this._formConfig);
  }

  _hideInputError(formElement, inputElement, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement, formConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
    } else {
      this._hideInputError(formElement ,inputElement, formConfig);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement, formConfig) {
    if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(formConfig.inactiveButtonClass);
    buttonElement.disabled = true;
    } else {
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
    buttonElement.disabled = false;
    }
  }

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

  enableValidation() {
    this._setEventListeners(this._formElement, this._formConfig);
  }
}

