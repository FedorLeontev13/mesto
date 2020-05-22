// Функция отображения ошибок валидации
const showImputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector('.popup__text-error')
  inputElement.classList.add(obj.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(obj.errorClass)
}

// Функция скрытия ошибок валидации
const hideImputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector('.popup__text-error')
  inputElement.classList.remove(obj.inputErrorClass)
  errorElement.classList.remove(obj.errorClass)
  errorElement.textContent = ''
}

// Функция проверяет formInput на корректность введённых данных и вызывает hideError/showError
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage, obj)
  } else {
    hideImputError(formElement ,inputElement, inputElement.validationMessage, obj)
  }
}

// Функция обходит массив полей для проверки их валидности
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция принимает массив полей ввода и элемент формы, содержащий кнопку, состояние которой нужно поменять
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass)
  }
}

// Функция добавления слушателей событий всем полям ввода формы
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector))
  const buttonElement = formElement.querySelector(obj.buttonSelector)
  toggleButtonState(inputList, buttonElement, obj)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, obj)
      toggleButtonState(inputList, buttonElement, obj)
    })
  })
}

// Функция запуска процесса валидации полей ввода всех форм
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector))
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj)
  })
}

// Вызовем функцию
enableValidation(setObj)


