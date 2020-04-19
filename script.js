const btnClose = document.getElementById('btnClose')
const btnEdit = document.getElementById('btnEdit')
const popup = document.querySelector('.popup')
const container = document.querySelector('.popup__container')
const btnSave = document.querySelector('.popup__btn-save')

function openPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

btnEdit.addEventListener('click', openPopup)
btnClose.addEventListener('click', closePopup)



function formSubmitHandler (evt) {       
    evt.preventDefault()

    let nameInput = document.querySelector('.popup__text_name')
    let jobInput = document.querySelector('.popup__text_description') 

    nameInput = nameInput.value
    jobInput = jobInput.value

    let nameForm = document.querySelector('.profile__title') 
    let jobForm = document.querySelector('.profile__subtitle')

    nameForm.textContent = nameInput
    jobForm.textContent = jobInput
}

container.addEventListener('submit', formSubmitHandler);


function save() {
  popup.classList.remove('popup_opened')
}

btnSave.addEventListener('click', save)

document.getElementById('name').value = document.getElementById('profileName').textContent
document.getElementById('description').value = document.getElementById('profileDescription').textContent

