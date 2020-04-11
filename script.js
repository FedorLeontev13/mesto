let popup = document.querySelector('.popup')
let container = document.querySelector('.popup__container')
let btnEdit = document.getElementById('btnEdit')
let btnClose = document.getElementById('btnClose')
let btnSave = document.querySelector('.popup__btn_save')

function edit() {
  popup.style.display = "block"
}

function close() {
  popup.style.display = "none"
}

btnEdit.addEventListener('click', edit)
btnClose.addEventListener('click', close)



function formSubmitHandler (evt) {
    evt.preventDefault()

    let nameInput = document.querySelector('.popup__name')
    let jobInput = document.querySelector('.popup__description')

    nameInput = nameInput.value
    jobInput = jobInput.value

    let nameForm = document.querySelector('.profile__title')
    let jobForm = document.querySelector('.profile__subtitle')

    nameForm.textContent = nameInput
    jobForm.textContent = jobInput
}

container.addEventListener('submit', formSubmitHandler);

function save() {
  popup.style.display = "none"
}

btnSave.addEventListener('click', save)