const btnClose = document.getElementById('btnClose')
const btnEdit = document.getElementById('btnEdit')
const popup = document.querySelector('.popup')
const container = document.querySelector('.popup__container')
const btnSave = document.querySelector('.popup__btn-save')

function openPopup() {
  popup.classList.add('popup_opened')
  document.getElementById('name').value = document.getElementById('profileName').textContent
  document.getElementById('description').value = document.getElementById('profileDescription').textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {       
    evt.preventDefault()

    const nameInput = document.querySelector('.popup__text_name').value
    const jobInput = document.querySelector('.popup__text_description').value

    let nameForm = document.querySelector('.profile__title')
    let jobForm = document.querySelector('.profile__subtitle')

    nameForm.textContent = nameInput
    jobForm.textContent = jobInput

    btnSave.addEventListener('click', closePopup)
}


container.addEventListener('submit', formSubmitHandler);
btnEdit.addEventListener('click', openPopup)
btnClose.addEventListener('click', closePopup)



