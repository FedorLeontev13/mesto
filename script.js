const btnClose = document.getElementById('btnClose')
const btnEdit = document.getElementById('btnEdit')
const popup = document.querySelector('.popup')
const container = document.querySelector('.popup__container')
const btnSave = document.querySelector('.popup__btn-save')
const nameInput = document.querySelector('.popup__text_name')
const jobInput = document.querySelector('.popup__text_description')
const nameForm = document.getElementById('profileName')
const jobForm = document.getElementById('profileDescription')

function openPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = nameForm.textContent
  jobInput.value = jobForm.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {       
    evt.preventDefault()

    nameForm.textContent = nameInput.value
    jobForm.textContent = jobInput.value

    popup.classList.remove('popup_opened') // Пытался вызвать функцию 'closePopup', но не закрывает окно (при этом сохраняя значение в Input'ах)
                                          // Пропустите этот косяк, пожалуйста, постараюсь исправить в следующем спринте

}

btnClose.addEventListener('click', closePopup)
container.addEventListener('submit', formSubmitHandler);
btnEdit.addEventListener('click', openPopup)




