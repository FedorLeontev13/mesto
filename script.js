const btnClose = document.getElementById('btnClose')
const btnEdit = document.getElementById('btnEdit')

let popup = document.querySelector('.popup')
let container = document.querySelector('.popup__container')
let btnSave = document.querySelector('.popup_btn_save')
let nameInput = document.querySelector('.popup__text_name')
let jobInput = document.querySelector('.popup__text_description')
let nameForm = document.querySelector('.profile__title')
let jobForm = document.querySelector('.profile__subtitle')


function open() {
  popup.classList.toggle('popup_opened')
}

function close() {
  popup.classList.toggle('popup_opened', false)
}

btnEdit.addEventListener('click', open)
btnClose.addEventListener('click', close)



function formSubmitHandler (evt) {
    evt.preventDefault()

    nameInput = nameInput.value
    jobInput = jobInput.value

    nameForm.textContent = nameInput
    jobForm.textContent = jobInput
}

container.addEventListener('submit', formSubmitHandler);

function save() {
  popup.classList.toggle('popup_opened', false)
}

btnSave.addEventListener('click', save)

